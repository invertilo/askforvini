export type Theme = "light" | "dark";

/** Dark 18:00–05:59, light 06:00–17:59 (local client hour). */
export function themeFromHour(hour: number): Theme {
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

export function themeFromDate(date: Date = new Date()): Theme {
  return themeFromHour(date.getHours());
}

/** Dev/QA override via ?theme=light|dark — ignored in production builds. */
export function themeFromSearchParam(value: string | null): Theme | null {
  if (process.env.NODE_ENV === "production") return null;
  if (value === "light" || value === "dark") return value;
  return null;
}

const allowThemeParam = process.env.NODE_ENV !== "production";

/** Inline before paint — keep hour thresholds in sync with themeFromHour. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t;${
  allowThemeParam
    ? 'var p=new URLSearchParams(location.search).get("theme");if(p==="light"||p==="dark")t=p;'
    : ""
}if(!t){var h=new Date().getHours();t=h>=6&&h<18?"light":"dark"}document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t}catch(e){}})();`;
