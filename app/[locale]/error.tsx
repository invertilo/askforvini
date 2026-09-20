"use client";

import { ErrorPage } from "@/components/ErrorPage";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { useParams } from "next/navigation";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function localeFromParams(params: ReturnType<typeof useParams>): Locale {
  const raw = params?.locale;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && isLocale(value) ? value : defaultLocale;
}

export default function LocaleError({ reset }: ErrorProps) {
  const locale = localeFromParams(useParams());
  const copy = getMessages(locale).errors.server;

  return (
    <ErrorPage
      code={copy.code}
      title={copy.title}
      body={copy.body}
      homeHref={`/${locale}`}
      homeLabel={copy.ctaHome}
      action={
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 font-medium text-content"
        >
          {copy.ctaRetry}
        </button>
      }
    />
  );
}
