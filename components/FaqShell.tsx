"use client";

import { Faq } from "@/components/Faq";
import { ShabbatGate } from "@/components/ShabbatGate";
import { ShabbatProvider, useShabbat } from "@/components/ShabbatProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { ThemeByHour } from "@/components/ThemeByHour";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import type { ReactNode } from "react";

type FaqShellProps = {
  locale: Locale;
  messages: Messages;
};

function InertWhenGated({ children }: { children: ReactNode }) {
  const { open } = useShabbat();
  return (
    <div {...(open ? { inert: true, "aria-hidden": true } : {})}>
      {children}
    </div>
  );
}

export function FaqShell({ locale, messages }: FaqShellProps) {
  return (
    <ShabbatProvider>
      <ThemeByHour />
      <SkipLink label={messages.skip} />
      <ShabbatGate copy={messages.shabbat} />
      <InertWhenGated>
        <SiteHeader locale={locale} nav={messages.nav} />
        <main id="main">
          <Faq locale={locale} copy={messages.faq} />
        </main>
      </InertWhenGated>
    </ShabbatProvider>
  );
}
