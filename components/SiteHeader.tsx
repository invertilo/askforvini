"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

type SiteHeaderProps = {
  locale: Locale;
  nav: Messages["nav"];
};

const SECTION_IDS = [
  "top",
  "about",
  "pillars",
  "work",
  "security",
  "connect",
] as const;

function useClientReady() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const ready = useClientReady();
  const pathname = usePathname() ?? "";
  const onFaq = pathname === `/${locale}/faq` || pathname.endsWith("/faq");
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (onFaq) return;

    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top) setActive(top);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.08, 0.25, 0.5] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [onFaq]);

  const items = [
    { id: "top", href: `/${locale}#top`, label: nav.home },
    { id: "about", href: `/${locale}#about`, label: nav.about },
    { id: "pillars", href: `/${locale}#pillars`, label: nav.pillars },
    { id: "work", href: `/${locale}#work`, label: nav.work },
    { id: "security", href: `/${locale}#security`, label: nav.security },
    { id: "connect", href: `/${locale}#connect`, label: nav.connect },
  ];

  const linkClass = (isCurrent: boolean) =>
    `nav-hit rounded-full text-[0.9375rem] ${
      isCurrent
        ? "text-content"
        : "text-content-secondary hover:text-content"
    }`;

  return (
    <header className={`site-header${ready && stuck ? " is-stuck" : ""}`}>
      <div className="page-wrap flex items-center py-3">
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          {items.map((item) => {
            const isCurrent = ready && !onFaq && active === item.id;
            return (
              <InPageAnchor
                key={item.href}
                href={item.href}
                className={linkClass(isCurrent)}
                aria-current={isCurrent ? "true" : undefined}
              >
                {item.label}
              </InPageAnchor>
            );
          })}
          <Link
            href={`/${locale}/faq`}
            className={linkClass(ready && onFaq)}
            aria-current={ready && onFaq ? "true" : undefined}
          >
            {nav.faq}
          </Link>
        </nav>
      </div>
    </header>
  );
}
