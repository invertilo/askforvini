import en from "@/messages/en.json";
import es from "@/messages/es.json";
import type { Locale } from "@/lib/i18n";

const catalogs = { es, en } as const;

export type Messages = typeof es;

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}
