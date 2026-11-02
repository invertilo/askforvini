"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import { useIsClient } from "@/components/motion/useIsClient";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const ready = useIsClient();
  const pathname = usePathname() ?? "";
  const onFaq = pathname === `/${locale}/faq` || pathname.endsWith("/faq");
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("top");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section = last section whose top has crossed a reading line near the top of the viewport.
  // Computed from geometry on scroll (rAF-throttled), so programmatic scrolls and tall sections stay in sync.
  useEffect(() => {
    if (onFaq) return;

    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (nodes.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      }
      // Bottom of the page: force the last section when it is fully in view.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = nodes[nodes.length - 1].id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onFaq]);

  // Pixel indicator: measures the current link and slides (stepped, via CSS) under it.
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!ready || !nav || !indicator) return;

    const place = () => {
      const current = nav.querySelector<HTMLElement>('[aria-current="true"]');
      if (!current) {
        indicator.removeAttribute("data-visible");
        nav.removeAttribute("data-indicator");
        return;
      }
      indicator.style.setProperty("--nav-indicator-x", `${current.offsetLeft}px`);
      indicator.style.setProperty("--nav-indicator-y", `${current.offsetTop}px`);
      indicator.style.setProperty("--nav-indicator-w", `${current.offsetWidth}px`);
      indicator.style.setProperty("--nav-indicator-h", `${current.offsetHeight}px`);
      indicator.setAttribute("data-visible", "");
      nav.setAttribute("data-indicator", "");
    };

    place();
    // Enable the stepped slide only after the first placement so it never animates in from 0.
    const frame = requestAnimationFrame(() => indicator.setAttribute("data-ready", ""));
    const resize = new ResizeObserver(place);
    resize.observe(nav);
    let alive = true;
    void document.fonts?.ready.then(() => {
      if (alive) place();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, [ready, active, onFaq]);

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
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative flex flex-wrap items-center gap-1"
        >
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
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
