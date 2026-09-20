import { describe, expect, it } from "vitest";
import { localeFromAcceptLanguage } from "./i18n";
import { themeFromHour } from "./theme";

describe("localeFromAcceptLanguage", () => {
  it("picks Spanish for es* tags", () => {
    expect(localeFromAcceptLanguage("es-BO,es;q=0.9,en;q=0.8")).toBe("es");
    expect(localeFromAcceptLanguage("es")).toBe("es");
  });

  it("falls back to English for non-Spanish", () => {
    expect(localeFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
    expect(localeFromAcceptLanguage("fr-FR,fr;q=0.8")).toBe("en");
  });

  it("defaults to Spanish when header is empty", () => {
    expect(localeFromAcceptLanguage(null)).toBe("es");
    expect(localeFromAcceptLanguage("")).toBe("es");
  });
});

describe("themeFromHour", () => {
  it("is light from 06:00 through 17:59", () => {
    expect(themeFromHour(6)).toBe("light");
    expect(themeFromHour(12)).toBe("light");
    expect(themeFromHour(17)).toBe("light");
  });

  it("is dark from 18:00 through 05:59", () => {
    expect(themeFromHour(18)).toBe("dark");
    expect(themeFromHour(0)).toBe("dark");
    expect(themeFromHour(5)).toBe("dark");
  });
});
