import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoNewsroom } from "@/components/InfoNewsroom";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "INFO / Opinión — askforvini",
  description: "Opinión, actualidad y contexto desde askforvini.",
};

export default async function InfoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InfoNewsroom locale={locale as Locale} />;
}
