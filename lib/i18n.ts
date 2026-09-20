export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Prefer Spanish when Accept-Language has any es* tag; otherwise English. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  const raw = header ?? "";
  const tokens = raw
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      const lang = (tag ?? "").trim().toLowerCase();
      return { lang, q: Number.isFinite(q) ? q : 0 };
    })
    .filter((t) => t.lang.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { lang } of tokens) {
    if (lang === "*" ) continue;
    if (lang === "es" || lang.startsWith("es-")) return "es";
  }

  return tokens.length > 0 ? "en" : defaultLocale;
}
