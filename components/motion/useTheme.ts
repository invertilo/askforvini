"use client";

import { useEffect, useState } from "react";

export type SiteTheme = "light" | "dark";

function readTheme(): SiteTheme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/**
 * Theme from `data-theme`. Always `"dark"` for SSR + hydration so markup
 * matches; syncs to the live attribute after mount (boot script / ThemeByHour).
 */
export function useTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
