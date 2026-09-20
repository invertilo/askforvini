import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type CatchAllProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

/** Allow unknown paths so we can render the branded locale not-found UI. */
export const dynamicParams = true;

export function generateStaticParams() {
  return [] as { locale: string; rest: string[] }[];
}

/** Unknown paths under /[locale]/* invoke the locale not-found UI. */
export default async function LocaleCatchAll({ params }: CatchAllProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  notFound();
}
