import "@/app/globals.css";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin", "latin-ext", "hebrew"],
  weight: ["400", "500", "700"],
  variable: "--font-frank",
  display: "swap",
});

const source = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600"],
  variable: "--font-heebo",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const messages = getMessages(locale);
  const languages = {
    es: "/es",
    en: "/en",
  };

  return {
    metadataBase: new URL("https://askforvini.pw"),
    title: messages.meta.title,
    description: messages.meta.description,
    applicationName: "askforvini.pw",
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: `/${locale}`,
      siteName: "askforvini.pw",
      locale: locale === "es" ? "es_BO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_BO"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: messages.meta.title,
      description: messages.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale as Locale}
      className={`${frank.variable} ${source.variable} ${heebo.variable} ${plex.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-surface font-sans text-content">
        <Script
          id="theme-by-hour"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
