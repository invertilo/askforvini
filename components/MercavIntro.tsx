"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import { Mervi } from "@/components/Mervi";
import { SectionSoftEdges } from "@/components/SectionSoftEdges";
import { GrainGradient } from "@/components/ui/grain-gradient";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useTheme } from "@/components/motion/useTheme";
import type { Messages } from "@/lib/messages";

type MercavIntroProps = {
  locale: string;
  copy: Messages["mercavIntro"];
};

export function MercavIntro({ locale, copy }: MercavIntroProps) {
  const reduce = useReducedMotion();
  const theme = useTheme();

  return (
    <section id="mercav" className="relative overflow-x-hidden pb-16 pt-16 md:pb-24 md:pt-24">
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
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Mervi mascot */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent/20 to-transparent blur-2xl" />
              <Mervi size={200} interactive={true} className="relative z-[2]" />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="font-data text-[0.8125rem] tracking-[0.18em] text-content-secondary uppercase">
              {copy.eyebrow}
            </p>
            <h2 className="mt-6 font-display text-[2.5rem] font-semibold leading-tight md:text-[3rem]">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-[42rem] text-content-secondary">{copy.body}</p>
            <div className="mt-8">
              <a
                href={copy.ctaHref}
                rel="noreferrer"
                target="_blank"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-medium text-accent-fg shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
              >
                {copy.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
