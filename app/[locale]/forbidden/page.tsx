import { ErrorPage } from "@/components/ErrorPage";
import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ForbiddenPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ForbiddenPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getMessages(locale).errors.forbidden;
  return {
    title: `${copy.code} — askforvini.pw`,
    description: copy.body,
    robots: { index: false, follow: false },
  };
}

export default async function ForbiddenPage({ params }: ForbiddenPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = getMessages(locale).errors.forbidden;

  return (
    <ErrorPage
      code={copy.code}
      title={copy.title}
      body={copy.body}
      homeHref={`/${locale}`}
      homeLabel={copy.ctaHome}
    />
  );
}
