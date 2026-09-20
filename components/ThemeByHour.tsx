"use client";

import { themeFromDate, themeFromSearchParam, type Theme } from "@/lib/theme";
import { useEffect } from "react";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function resolveTheme(): Theme {
  const param = new URLSearchParams(window.location.search).get("theme");
  return themeFromSearchParam(param) ?? themeFromDate();
}

/**
 * Sets data-theme from local hour (or ?theme= in development).
 * Inline script in layout prevents first-paint flash; this keeps it in sync.
 */
export function ThemeByHour() {
  useEffect(() => {
    const sync = () => applyTheme(resolveTheme());
    sync();

    const interval = window.setInterval(sync, 60_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
