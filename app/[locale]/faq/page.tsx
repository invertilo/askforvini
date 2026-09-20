import { FaqShell } from "@/components/FaqShell";
import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type FaqRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: FaqRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const faq = getMessages(locale).faq;
  return {
    title: faq.metaTitle,
    description: faq.metaDescription,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { es: "/es/faq", en: "/en/faq" },
    },
    openGraph: {
      title: faq.metaTitle,
      description: faq.metaDescription,
      url: `/${locale}/faq`,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function FaqPage({ params }: FaqRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <FaqShell locale={locale} messages={getMessages(locale)} />;
}
