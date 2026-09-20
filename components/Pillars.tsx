"use client";

import { SiteAscii } from "@/components/SiteAscii";
import { KineticText } from "@/components/motion/KineticText";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { AuroraFlow } from "@/components/ui/aurora-flow";
import { TextRepel } from "@/components/ui/text-repel";
import type { Messages } from "@/lib/messages";

type PillarsProps = {
  copy: Messages["pillars"];
};

function Atmosphere({ alt }: { alt: string }) {
  return (
    <SiteAscii
      imageSrc="/principal.png"
      alt={alt}
      variant="flow"
      fontSize={8}
      className="h-full w-full"
    />
  );
}

export function Pillars({ copy }: PillarsProps) {
  const reduce = useReducedMotion();

  return (
    <section id="pillars" className="relative overflow-hidden pb-20 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.28]"
        aria-hidden="true"
      >
        <AuroraFlow
          className="h-full min-h-[100%] w-full"
          colors={["#3A6EA5", "#C4A36A", "#1C1A16", "#EBE4D6"]}
          opacity={0.85}
          speed={reduce ? 0 : 0.55}
          intensity={0.7}
          pointerInteraction={!reduce}
          scrollInteraction={false}
          lighting={!reduce}
          ambientGlow={!reduce}
        />
      </div>
      <div className="page-wrap relative z-[1]">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <article>
            <KineticText as="h2" className="font-display text-[1.75rem] font-medium leading-tight">
              {copy.craftTitle}
            </KineticText>
            <p className="mt-4 text-content-secondary">{copy.craftBody}</p>
            <div className="mt-6 hidden md:block">
              {reduce ? (
                <p className="font-display text-[1.25rem] font-medium leading-snug text-content">
                  {copy.craftRepel}
                </p>
              ) : (
                <TextRepel
                  text={copy.craftRepel}
                  className="font-display text-[1.25rem] font-medium leading-snug text-content"
                  letterClassName="font-display"
                  radius={90}
                  strength={28}
                />
              )}
            </div>
            <p className="mt-6 font-display text-[1.25rem] font-medium leading-snug text-content md:hidden">
              {copy.craftRepel}
            </p>
            <p className="mt-6 font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
              {copy.stackLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-surface-raised/90 px-3 py-1.5 font-data text-[0.8125rem] text-content backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <KineticText as="h2" className="font-display text-[1.75rem] font-medium leading-tight">
              {copy.faithTitle}
            </KineticText>
            <p className="hebrew mt-5 text-[1.65rem] leading-snug" dir="rtl" lang="he">
              {copy.faithMotto}
            </p>
            <p className="mt-4 text-content-secondary">{copy.faithBody}</p>
            <div className="photo-frame mt-8 hidden h-[360px] max-h-[22rem] w-full overflow-hidden md:block">
              <Atmosphere alt={copy.atmosphereAlt} />
            </div>
          </article>
        </div>
        <div className="photo-frame mx-auto mt-10 h-[360px] max-h-[22rem] w-full max-w-sm overflow-hidden md:hidden">
          <Atmosphere alt={copy.atmosphereAlt} />
        </div>
      </div>
    </section>
  );
}
