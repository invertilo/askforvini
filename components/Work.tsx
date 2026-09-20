"use client";

import { WorkFlipStack } from "@/components/WorkFlipStack";
import { GithubCalendarSafe } from "@/components/GithubCalendarSafe";
import type { Messages } from "@/lib/messages";

type WorkProps = {
  copy: Messages["work"];
};

export function Work({ copy }: WorkProps) {
  const items = copy.items.map((item) => {
    const fit =
      "imageFit" in item && item.imageFit === "contain" ? ("contain" as const) : ("cover" as const);
    return {
      eyebrow: item.kind,
      title: item.title,
      description: item.body,
      image: item.image,
      imageAlt: "imageAlt" in item && typeof item.imageAlt === "string" ? item.imageAlt : item.title,
      imageFit: fit,
      background: item.background,
      foreground: item.foreground,
      href: item.href,
      linkLabel: item.linkLabel,
    };
  });

  return (
    <section id="work" className="pb-20 md:pb-28">
      <WorkFlipStack
        items={items}
        heading={copy.title}
        hint={copy.hint}
        endLabel={copy.endLabel}
      />
      <div className="page-wrap mt-4">
        <h3 className="font-display text-[1.35rem] font-medium leading-tight text-content">
          {copy.githubTitle}
        </h3>
        <p className="mt-2 max-w-[42rem] font-data text-[0.8125rem] text-content-secondary">
          {copy.githubHint}
        </p>
        <div className="mt-6 overflow-x-auto pb-2">
          <GithubCalendarSafe
            username="invertilo"
            colorSchema="blue"
            shape="rounded"
            showTotal
          />
        </div>
      </div>
    </section>
  );
}
