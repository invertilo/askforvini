"use client";

import { About } from "@/components/About";
import { Connect } from "@/components/Connect";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { ShabbatGate } from "@/components/ShabbatGate";
import { ShabbatProvider, useShabbat } from "@/components/ShabbatProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { ThemeByHour } from "@/components/ThemeByHour";
import { Work } from "@/components/Work";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import type { ReactNode } from "react";

type SiteShellProps = {
  locale: Locale;
  messages: Messages;
};

function InertWhenGated({ children }: { children: ReactNode }) {
  const { open } = useShabbat();
  return (
    <div inert={open || undefined} aria-hidden={open || undefined}>
      {children}
    </div>
  );
}

export function SiteShell({ locale, messages }: SiteShellProps) {
  return (
    <ShabbatProvider>
      <ThemeByHour />
      <SkipLink label={messages.skip} />
      <ShabbatGate copy={messages.shabbat} />
      <InertWhenGated>
        <SiteHeader locale={locale} nav={messages.nav} />
        <main id="main">
          <Hero locale={locale} copy={messages.hero} />
          <About copy={messages.about} />
          <Pillars copy={messages.pillars} />
          <Work copy={messages.work} />
          <Connect copy={messages.connect} />
        </main>
      </InertWhenGated>
    </ShabbatProvider>
  );
}
