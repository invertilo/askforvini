"use client";

import { SiteAscii } from "@/components/SiteAscii";
import { KineticText } from "@/components/motion/KineticText";
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
  return (
    <section id="pillars" className="page-wrap pb-20 md:pb-28">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-16">
        <article>
          <KineticText as="h2" className="font-display text-[1.75rem] font-medium leading-tight">
            {copy.faithTitle}
          </KineticText>
          <p className="hebrew mt-5 text-[1.65rem] leading-snug" dir="rtl" lang="he">
            {copy.faithMotto}
          </p>
          <p className="mt-4 max-w-[40rem] text-content-secondary">{copy.faithBody}</p>
        </article>
        <div className="photo-frame mx-auto aspect-[4/5] h-[360px] max-h-[22rem] w-full max-w-sm overflow-hidden md:mx-0 md:justify-self-end">
          <Atmosphere alt={copy.atmosphereAlt} />
        </div>
      </div>
    </section>
  );
}
