"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { isSamePageHash, scrollToHash } from "@/lib/smooth-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type InPageAnchorProps = ComponentProps<typeof Link>;

function hrefToString(href: InPageAnchorProps["href"]): string {
  if (typeof href === "string") return href;
  const path = href.pathname ?? "";
  const hash = href.hash
    ? href.hash.startsWith("#")
      ? href.hash
      : `#${href.hash}`
    : "";
  return `${path}${hash}`;
}

export function InPageAnchor({
  href,
  onClick,
  children,
  ...rest
}: InPageAnchorProps) {
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const resolved = hrefToString(href);
    if (!isSamePageHash(resolved, pathname)) return;

    const hash = resolved.includes("#")
      ? `#${resolved.split("#")[1] ?? ""}`
      : "";
    if (!hash || hash === "#") return;

    const scrolled = scrollToHash(hash, { reduceMotion: reduce });
    if (scrolled) event.preventDefault();
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
