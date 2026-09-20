/** Scroll to an element id (with or without leading `#`). */
export function scrollToHash(
  hash: string,
  options?: { reduceMotion?: boolean },
): boolean {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  // Restrict to CSS-safe ids so this helper stays safe if reused with dynamic hrefs.
  if (!id || !/^[A-Za-z][\w-:.]{0,127}$/.test(id)) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const reduce =
    options?.reduceMotion ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  if (typeof history !== "undefined" && history.replaceState) {
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(null, "", `${url.pathname}${url.search}#${id}`);
  }

  return true;
}

/** True when href is an in-page hash on the current path (or bare `#id`). */
export function isSamePageHash(href: string, pathname: string): boolean {
  try {
    if (href.startsWith("#") && href.length > 1) return true;
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    if (!url.hash || url.hash.length <= 1) return false;
    const path = pathname.replace(/\/$/, "") || "/";
    const target = url.pathname.replace(/\/$/, "") || "/";
    return path === target;
  } catch {
    return false;
  }
}
