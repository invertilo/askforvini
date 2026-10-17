import { notFound } from "next/navigation";
import { InfoNewsroom } from "@/components/InfoNewsroom";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "es" ? "Antisemitismo disfrazado de protesta — askforvini" : "Antisemitism disguised as protest — askforvini";
  const description = locale === "es" ? "Opinión y material documental para exponer antisemitismo, odio y contradicciones presentadas como protesta." : "Opinion and documentary material exposing antisemitism, hate, and contradictions presented as protest.";
  return {
    metadataBase: new URL("https://opinion.askforvini.pw"),
    title, description,
    alternates: { canonical: `/${locale}/opinion`, languages: { es: "/es/opinion", en: "/en/opinion" } },
    openGraph: { title, description, url: `/${locale}/opinion`, type: "website" },
  };
}

export default async function OpinionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InfoNewsroom locale={locale as Locale} />;
}
