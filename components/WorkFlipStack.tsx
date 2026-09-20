"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export type WorkFlipItem = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  background: string;
  foreground?: string;
  href: string;
  linkLabel: string;
};

type WorkFlipStackProps = {
  items: WorkFlipItem[];
  heading: string;
  hint: string;
  endLabel: string;
  className?: string;
};

function WorkCardMedia({
  item,
  index,
}: {
  item: WorkFlipItem;
  index: number;
}) {
  return (
    <div
      className={cn(
        "relative m-3 min-h-[180px] overflow-hidden rounded-2xl sm:ml-0",
        item.imageFit === "contain" && "bg-black",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.imageAlt}
        className={cn(
          "h-full w-full",
          item.imageFit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover",
        )}
        loading={index < 2 ? "eager" : "lazy"}
        draggable={false}
      />
    </div>
  );
}

function WorkCardBody({ item, index }: { item: WorkFlipItem; index: number }) {
  return (
    <>
      <span className="font-data text-[clamp(1.25rem,2.5vw,2rem)] font-medium leading-none tracking-tight">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-auto max-w-[46rem] pt-8">
        <p className="mb-3 font-data text-[0.6875rem] font-semibold tracking-[0.16em] uppercase opacity-70">
          {item.eyebrow}
        </p>
        <h3 className="max-w-[16ch] font-display text-[clamp(1.5rem,3.25vw,2.75rem)] font-semibold leading-[0.96] tracking-tight">
          {item.title}
        </h3>
        <p className="mt-4 max-w-[42rem] text-[clamp(0.875rem,1.1vw,1rem)] leading-[1.5] opacity-85">
          {item.description}
        </p>
        <a
          href={item.href}
          rel="noreferrer"
          target="_blank"
          className="mt-5 inline-flex min-h-11 items-center font-data text-[0.875rem] underline-offset-4 hover:underline"
        >
          {item.linkLabel}
        </a>
      </div>
    </>
  );
}

function FlipCard({
  item,
  index,
  total,
  progress,
}: {
  item: WorkFlipItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring> | ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd = index === 0 ? 0.0001 : Math.min(start, entryStart + segment * 0.7);
  const exitStart = start;
  const exitEnd = end;
  const stackedCardGap = Math.min(24, 72 / Math.max(total - 1, 1));
  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 12, 34);
  const restingScale = 1 - Math.min(index * 0.012, 0.035);

  const exitYPercent = useTransform(progress, [exitStart, exitEnd], [0, -118]);
  const exitStackOffset = useTransform(progress, [exitStart, exitEnd], [0, stackedOffset]);
  const exitY = useTransform([exitYPercent, exitStackOffset], ([yp, so]) => {
    return `calc(${yp}% + ${so}px)`;
  });
  const rotateX = useTransform(progress, [exitStart, exitEnd], [0, 22]);
  const opacity = useTransform(progress, [exitStart, exitEnd], [1, 1]);
  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1],
  );
  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0],
  );

  return (
    <motion.article
      className="absolute inset-x-0 top-0 aspect-[3/4] will-change-transform sm:aspect-[1.76/1]"
      style={{
        y: exitY,
        rotateX,
        opacity,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="grid h-full overflow-hidden rounded-[clamp(18px,2vw,30px)] shadow-[0_16px_48px_rgb(18_17_14/0.18)] ring-1 ring-white/10 sm:grid-cols-[1.15fr_0.85fr]"
        style={{
          backgroundColor: item.background,
          color: item.foreground ?? "white",
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        <div className="flex min-w-0 flex-col p-[clamp(24px,3vw,48px)]">
          <WorkCardBody item={item} index={index} />
        </div>
        <WorkCardMedia item={item} index={index} />
      </motion.div>
    </motion.article>
  );
}

function StaticWorkList({ items }: { items: WorkFlipItem[] }) {
  return (
    <div className="page-wrap grid gap-6 pb-16 md:gap-8">
      {items.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className="grid overflow-hidden rounded-[clamp(18px,2vw,30px)] shadow-[0_16px_48px_rgb(18_17_14/0.14)] ring-1 ring-white/10 sm:grid-cols-[1.15fr_0.85fr]"
          style={{
            backgroundColor: item.background,
            color: item.foreground ?? "white",
          }}
        >
          <div className="flex min-w-0 flex-col p-[clamp(24px,3vw,48px)]">
            <WorkCardBody item={item} index={index} />
          </div>
          <WorkCardMedia item={item} index={index} />
        </article>
      ))}
    </div>
  );
}

export function WorkFlipStack({
  items,
  heading,
  hint,
  endLabel,
  className,
}: WorkFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  });

  return (
    <div className={cn("relative", className)}>
      <div className="page-wrap flex min-h-[40vh] flex-col justify-end gap-6 pb-10 pt-10 md:min-h-[70vh] md:pb-16">
        <p className="font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
          {hint}
        </p>
        <h2 className="max-w-[18ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.92] tracking-tight text-content">
          {heading}
        </h2>
      </div>

      {reduceMotion ? (
        <StaticWorkList items={items} />
      ) : (
        <div
          ref={stackRef}
          className="relative"
          style={{ height: `${(Math.max(items.length, 1) + 1) * 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-[clamp(14px,4vw,64px)] py-8">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[860px] [perspective:800px] sm:aspect-[1.76/1]">
              {[...items].reverse().map((item, reverseIndex) => {
                const index = items.length - reverseIndex - 1;
                return (
                  <FlipCard
                    key={`${item.title}-${index}`}
                    item={item}
                    index={index}
                    total={items.length}
                    progress={smoothProgress}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-[30vh] items-center justify-center px-5 md:min-h-[50vh]">
        <p className="text-center font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none tracking-tight text-content">
          {endLabel}
        </p>
      </div>
    </div>
  );
}
