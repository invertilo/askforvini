"use client";

import { SiteAscii } from "@/components/SiteAscii";
import { KineticText } from "@/components/motion/KineticText";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { Signature } from "@/components/ui/signature";
import type { Messages } from "@/lib/messages";

type AboutProps = {
  copy: Messages["about"];
  craftTitle: string;
  craftBody: string;
  craftLine: string;
};

export function About({ copy, craftTitle, craftBody, craftLine }: AboutProps) {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="page-wrap pb-20 md:pb-28">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-14">
        <div>
          <KineticText as="h2" className="font-display text-[1.75rem] font-medium leading-tight">
            {copy.title}
          </KineticText>
          <p className="mt-5 max-w-[42rem] text-content-secondary">{copy.body}</p>
          <h3 className="mt-10 font-display text-[1.35rem] font-medium leading-tight text-content">
            {craftTitle}
          </h3>
          <p className="mt-4 max-w-[42rem] text-content-secondary">{craftBody}</p>
          <p className="mt-6 max-w-[28rem] font-display text-[1.35rem] font-medium leading-snug text-content">
            {craftLine}
          </p>
          <div className="mt-8 text-content" aria-label={copy.signature}>
            {reduce ? (
              <p className="font-display text-[1.5rem] italic tracking-tight">{copy.signature}</p>
            ) : (
              <Signature
                text={copy.signature}
                fontUrl="/signature.ttf"
                fontSize={36}
                color="currentColor"
                inView
                once
                className="max-w-full"
              />
            )}
          </div>
        </div>
        <div className="photo-frame aspect-[4/5] h-[420px] max-h-[28rem] w-full max-w-md justify-self-center overflow-hidden md:justify-self-end">
          <SiteAscii
            imageSrc="/secundaria.png"
            alt={copy.portraitAlt}
            variant="image"
            fontSize={9}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
