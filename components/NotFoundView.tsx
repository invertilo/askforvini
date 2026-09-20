"use client";

import { ErrorPage } from "@/components/ErrorPage";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { usePathname } from "next/navigation";

function localeFromPath(pathname: string | null): Locale {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : defaultLocale;
}

export function NotFoundView() {
  const locale = localeFromPath(usePathname());
  const copy = getMessages(locale).errors.notFound;

  return (
    <ErrorPage
      code={copy.code}
      title={copy.title}
      body={copy.body}
      homeHref={`/${locale}`}
      homeLabel={copy.ctaHome}
      secondaryHref={`/${locale}/faq`}
      secondaryLabel={copy.ctaFaq}
    />
  );
}
