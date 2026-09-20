"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import { SectionSoftEdges } from "@/components/SectionSoftEdges";
import { SiteAscii } from "@/components/SiteAscii";
import { AnnotatedText } from "@/components/ui/annotated-text";
import { GrainGradient } from "@/components/ui/grain-gradient";
import { LetterCascade } from "@/components/ui/letter-cascade";
import { FlippingWordSwap } from "@/components/motion/FlippingWordSwap";
import { VelocityScroll } from "@/components/motion/VelocityScroll";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { MERCAV_HREF } from "@/lib/links";
import type { Messages } from "@/lib/messages";
import { useSyncExternalStore } from "react";

type HeroProps = {
  locale: string;
  copy: Messages["hero"];
};

function useTheme(): "light" | "dark" {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    },
    () =>
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
    () => "dark",
  );
}

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
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="font-data text-[0.8125rem] tracking-[0.18em] text-content-secondary uppercase">
              {copy.place}
            </p>
            <p className="mt-6 font-display text-[2.5rem] leading-none tracking-tight md:text-[3.5rem]">
              <span>{copy.brand}</span>
              <span className="lockup-pw font-data text-[0.62em] tracking-normal">{copy.tld}</span>
            </p>
            <h1
              className="mt-8 font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]"
              aria-label={copy.name}
            >
              {reduce ? (
                <span aria-hidden="true">{copy.name}</span>
              ) : (
                <span aria-hidden="true">
                  <LetterCascade
                    text={copy.name}
                    className="inline-block"
                    letterClassName="font-display text-[1.75rem] font-medium md:text-[2rem]"
                    stiffness={200}
                    damping={18}
                  />
                </span>
              )}
            </h1>
            <p
              className="hebrew mt-3 max-w-[28rem] text-[1.35rem] leading-snug md:text-[1.5rem]"
              dir="rtl"
              lang={copy.mottoLang}
            >
              <AnnotatedText
                variant="circle"
                color="text-signal"
                animate={!reduce}
                delay={0.4}
                duration={1.35}
              >
                בעזרת השם
              </AnnotatedText>
              <span>, כל עכבה לטובה.</span>
            </p>
            <p className="mt-6 max-w-[40rem] text-content">{copy.lede}</p>
            <p
              className="mt-4 max-w-[40rem] font-data text-[0.8125rem] text-content-secondary"
              aria-label={copy.roles}
            >
              <span aria-hidden="true">
                Systems /{" "}
                <FlippingWordSwap words={copy.roleWords} className="text-content" />
              </span>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <InPageAnchor
                href={`/${locale}#connect`}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 font-medium text-accent-fg"
              >
                {copy.ctaConnect}
              </InPageAnchor>
              <a
                href={MERCAV_HREF}
                rel="noreferrer"
                target="_blank"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-hairline px-5 font-medium text-content"
              >
                {copy.ctaMercav}
              </a>
            </div>
          </div>
          <div className="photo-frame hidden h-40 w-40 shrink-0 overflow-hidden md:block md:h-44 md:w-44">
            <SiteAscii
              imageSrc="/secundaria.png"
              alt={copy.portraitAlt}
              variant="image"
              fontSize={7}
              className="h-full w-full"
            />
          </div>
        </div>
        <VelocityScroll text={copy.velocitySkills} className="mt-14 border-y border-hairline py-3" />
      </div>
    </section>
  );
}
