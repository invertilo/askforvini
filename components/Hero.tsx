"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import { SectionSoftEdges } from "@/components/SectionSoftEdges";
import { SiteAscii } from "@/components/SiteAscii";
import { GrainGradient } from "@/components/ui/grain-gradient";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useTheme } from "@/components/motion/useTheme";
import type { Messages } from "@/lib/messages";

type HeroProps = {
  locale: string;
  copy: Messages["hero"];
};

export function Hero({ locale, copy }: HeroProps) {
  const reduce = useReducedMotion();
  const theme = useTheme();

  return (
    <section id="top" className="relative overflow-x-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <SectionSoftEdges className="opacity-80 md:opacity-85" bleed={false}>
        <GrainGradient
          className="absolute inset-0 h-full min-h-full w-full"
          colorLight={theme === "light" ? "#F1EBE0" : "#3A6EA5"}
          colorMid={theme === "light" ? "#F4EFE4" : "#1C1A16"}
          colorDark={theme === "light" ? "#D8C9A8" : "#12110E"}
          grain={theme === "light" ? 0.32 : 0.58}
          speed={reduce ? 0 : 1.2}
          softness={theme === "light" ? 0.55 : 0.42}
          scale={1.15}
          curve={0.48}
        />
      </SectionSoftEdges>
      <div className="page-wrap relative z-[1]">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="font-data text-[0.8125rem] tracking-[0.18em] text-content-secondary uppercase">
              {copy.place}
            </p>
            <h1 className="mt-6 font-display font-medium leading-[0.95] tracking-tight">
              {copy.name}
            </h1>
            <p className="mt-6 max-w-[36rem] text-content">{copy.lede}</p>
            <div className="mt-8">
              <InPageAnchor
                href={`/${locale}#connect`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-medium text-accent-fg shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
              >
                {copy.ctaConnect}
              </InPageAnchor>
            </div>
          </div>
          <div className="photo-frame h-24 w-24 shrink-0 overflow-hidden sm:h-36 sm:w-36 md:h-44 md:w-44">
            <SiteAscii
              imageSrc="/secundaria.png"
              alt={copy.portraitAlt}
              variant="image"
              fontSize={7}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
