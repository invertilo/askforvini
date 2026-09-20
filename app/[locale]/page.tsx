import { SiteShell } from "@/components/SiteShell";
import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SiteShell locale={locale} messages={getMessages(locale)} />;
}
