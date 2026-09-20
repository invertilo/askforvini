"use client";

import { GithubIcon, InstagramIcon } from "@/components/BrandIcons";
import { KineticText } from "@/components/motion/KineticText";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useShabbat } from "@/components/ShabbatProvider";
import { TelegramIcon } from "@/components/TelegramIcon";
import { ClosingPlasma } from "@/components/ui/closing-plasma";
import type { Locale } from "@/lib/i18n";
import { CONNECT_LINKS, type ConnectId } from "@/lib/links";
import type { Messages } from "@/lib/messages";
import { Mail } from "lucide-react";
import Link from "next/link";

type ConnectProps = {
  locale: Locale;
  copy: Messages["connect"];
};

const ICONS: Record<
  ConnectId,
  typeof GithubIcon | typeof InstagramIcon | typeof TelegramIcon | typeof Mail
> = {
  github: GithubIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  email: Mail,
};

export function Connect({ locale, copy }: ConnectProps) {
  const { observing } = useShabbat();
  const reduce = useReducedMotion();

  return (
    <section id="connect" className="relative overflow-x-hidden pb-24 pt-2 md:pb-32 md:pt-4">
      <div
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 -z-0 opacity-[0.44] md:-top-28 [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_10%,rgba(0,0,0,0.55)_22%,black_40%,black_76%,rgba(0,0,0,0.45)_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_10%,rgba(0,0,0,0.55)_22%,black_40%,black_76%,rgba(0,0,0,0.45)_90%,transparent_100%)]"
        aria-hidden="true"
      >
        <ClosingPlasma
          className="h-full min-h-[100%] w-full"
          speed={reduce ? 0 : 0.7}
          opacity={0.9}
          turbulence={0.85}
          grain={0.9}
          sparkle={reduce ? 0 : 0.6}
          interactive={!reduce}
          darkColorA="#12110E"
          darkColorB="#3A6EA5"
          darkColorC="#C4A36A"
          lightColorA="#EBE4D6"
          lightColorB="#3A6EA5"
          lightColorC="#C4A36A"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-52 bg-gradient-to-b from-surface from-0% via-surface/40 via-[48%] to-transparent to-100% md:h-64"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-surface from-0% via-surface/35 via-50% to-transparent to-100% md:h-40"
        aria-hidden="true"
      />
      <div className="page-wrap relative z-[1]">
        <KineticText as="h2" className="font-display text-[1.75rem] font-medium leading-tight">
          {copy.title}
        </KineticText>
        <p className="mt-4 max-w-[42rem] text-content-secondary">{copy.body}</p>
        {observing ? (
          <p className="mt-4 max-w-[42rem] text-content" role="status">
            {copy.shabbatNote}
          </p>
        ) : null}
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {CONNECT_LINKS.map((link) => {
            const Icon = ICONS[link.id];
            const label = copy.links[link.id];
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  rel={link.id === "email" ? undefined : "noreferrer"}
                  target={link.id === "email" ? undefined : "_blank"}
                  className="flex min-h-14 items-center gap-4 rounded-2xl border border-hairline/50 bg-surface-raised/75 px-5 py-4 shadow-[0_8px_28px_rgb(18_17_14/0.06)] backdrop-blur-md"
                >
                  <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={2} />
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block font-data text-[0.8125rem] text-content-secondary">
                      {link.host}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-12 max-w-[46rem] text-content-secondary">{copy.closing}</p>
        <p className="mt-4">
          <Link
            href={`/${locale}/faq`}
            className="font-medium text-content underline-offset-4 hover:underline"
          >
            {copy.faqLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
