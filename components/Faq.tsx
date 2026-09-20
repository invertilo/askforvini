"use client";

import { KineticText } from "@/components/motion/KineticText";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import Link from "next/link";

type FaqProps = {
  locale: Locale;
  copy: Messages["faq"];
};

export function Faq({ locale, copy }: FaqProps) {
  return (
    <section className="page-wrap pb-24 pt-10 md:pb-32 md:pt-14">
      <KineticText
        as="h1"
        className="font-display text-[1.75rem] font-medium leading-tight md:text-[2rem]"
      >
        {copy.title}
      </KineticText>
      <p className="mt-5 max-w-[42rem] text-content-secondary">{copy.lede}</p>

      <div className="mt-14 space-y-12">
        {copy.groups.map((group) => (
          <div key={group.id}>
            <h2 className="font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
              {group.label}
            </h2>
            <div className="mt-4 divide-y divide-hairline border-y border-hairline">
              {group.items.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-display text-[1.1rem] font-medium leading-snug text-content marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 font-data text-content-secondary transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[42rem] text-content-secondary">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-14">
        <Link
          href={`/${locale}#connect`}
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-medium text-accent-fg"
        >
          {copy.ctaConnect}
        </Link>
      </p>
    </section>
  );
}
