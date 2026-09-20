"use client";

import { GithubIcon, InstagramIcon } from "@/components/BrandIcons";
import { KineticText } from "@/components/motion/KineticText";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useShabbat } from "@/components/ShabbatProvider";
import { TelegramIcon } from "@/components/TelegramIcon";
import { ClosingPlasma } from "@/components/ui/closing-plasma";
import { CONNECT_LINKS, type ConnectId } from "@/lib/links";
import type { Messages } from "@/lib/messages";
import { Mail } from "lucide-react";

type ConnectProps = {
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

export function Connect({ copy }: ConnectProps) {
  const { observing } = useShabbat();
  const reduce = useReducedMotion();

  return (
    <section id="connect" className="relative overflow-hidden pb-24 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-40"
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
                  className="flex min-h-14 items-center gap-4 rounded-2xl bg-surface-raised/90 px-5 py-4 backdrop-blur-sm"
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
      </div>
    </section>
  );
}
