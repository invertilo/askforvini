import { localeFromAcceptLanguage, locales } from "@/lib/i18n";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 120;
const requestBuckets = new Map<string, { startedAt: number; count: number }>();

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function securityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const now = Date.now();
  const key = clientKey(request);
  const bucket = requestBuckets.get(key);
  const current = !bucket || now - bucket.startedAt >= WINDOW_MS
    ? { startedAt: now, count: 0 }
    : bucket;
  current.count += 1;
  requestBuckets.set(key, current);
  if (requestBuckets.size > 10_000) {
    for (const [bucketKey, value] of requestBuckets) {
      if (now - value.startedAt >= WINDOW_MS) requestBuckets.delete(bucketKey);
    }
  }
  if (current.count > MAX_REQUESTS_PER_WINDOW) {
    const response = NextResponse.json(
      { error: "Too many requests", retryAfterSeconds: Math.ceil((WINDOW_MS - (now - current.startedAt)) / 1000) },
      { status: 429 },
    );
    response.headers.set("Retry-After", String(Math.ceil((WINDOW_MS - (now - current.startedAt)) / 1000)));
    return securityHeaders(response);
  }

  const host = request.headers.get("host")?.split(":")[0];
  if (host === "opinion.askforvini.pw" && (pathname === "/" || pathname === "/es" || pathname === "/en")) {
    const locale = pathname === "/es" || pathname === "/en"
      ? pathname.slice(1)
      : localeFromAcceptLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/opinion`;
    return securityHeaders(NextResponse.rewrite(url));
  }
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return securityHeaders(NextResponse.next());

  const locale = localeFromAcceptLanguage(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return securityHeaders(NextResponse.redirect(url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/data|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|otf|woff|woff2|mp4|webm)$).*)",
  ],
};
