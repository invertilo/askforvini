import { SecurityShell } from "@/components/SecurityShell";
import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type SecurityRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: SecurityRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const security = getMessages(locale).security;
  const title = `${security.case.title} — askforvini.pw`;
  const description = security.case.summary;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/security`,
      languages: { es: "/es/security", en: "/en/security" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/security`,
      type: "article",
    },
  };
}

export default async function SecurityPage({ params }: SecurityRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SecurityShell locale={locale} messages={getMessages(locale)} />;
}
