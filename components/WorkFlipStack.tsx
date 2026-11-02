"use client";

import { cn } from "@/lib/utils";

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
        "pixel-work-media relative m-3 min-h-[180px] overflow-hidden rounded-2xl sm:ml-0",
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
      <span className="pixel-work-index font-data text-[clamp(1.25rem,2.5vw,2rem)] font-medium leading-none tracking-tight">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-8 max-w-[46rem] pt-2 md:mt-auto md:pt-8">
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
          className="pixel-link mt-5 inline-flex min-h-11 items-center font-data text-[0.875rem] underline-offset-4"
        >
          {item.linkLabel}
        </a>
      </div>
    </>
  );
}

function StaticWorkList({ items }: { items: WorkFlipItem[] }) {
  return (
    <div className="page-wrap grid gap-6 pb-16 md:gap-8">
      {items.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className="pixel-work-card grid overflow-hidden rounded-[clamp(18px,2vw,30px)] shadow-[0_16px_48px_rgb(18_17_14/0.14)] ring-1 ring-white/10 sm:grid-cols-[1.15fr_0.85fr]"
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
  return (
    <div className={cn("relative", className)}>
      <div className="page-wrap flex min-h-[24vh] flex-col justify-end gap-6 pb-10 pt-16 md:min-h-[40vh] md:pb-16">
        <p className="font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
          {hint}
        </p>
        <h2 className="max-w-[18ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.92] tracking-tight text-content">
          {heading}
        </h2>
      </div>

      <StaticWorkList items={items} />

      <div className="flex min-h-[20vh] items-center justify-center px-5 md:min-h-[32vh]">
        <p className="text-center font-display text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none tracking-tight text-content">
          {endLabel}
        </p>
      </div>
    </div>
  );
}
