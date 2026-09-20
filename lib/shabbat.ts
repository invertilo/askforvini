export const SHABBAT_TIME_ZONE = "America/Argentina/Buenos_Aires";
export const SHABBAT_BOUNDARY_MINUTES = 18 * 60 + 30;
export const SHABBAT_CONTINUE_KEY = "shabbat-continue";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

type ArtClock = {
  weekday: number;
  minutes: number;
};

function artClock(now: Date): ArtClock {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SHABBAT_TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((part) => [part.type, part.value]),
  );

  const weekday = WEEKDAY_INDEX[parts.weekday ?? ""];
  let hour = Number(parts.hour);
  if (hour === 24) hour = 0;

  return {
    weekday,
    minutes: hour * 60 + Number(parts.minute),
  };
}

/**
 * Friday 18:30:00 ART inclusive through Saturday 18:30:00 ART exclusive.
 * The visitor clock is converted to America/Argentina/Buenos_Aires;
 * the local timezone never decides the weekday.
 */
export function isShabbatWindow(now: Date = new Date()): boolean {
  const { weekday, minutes } = artClock(now);

  if (weekday === 5) {
    return minutes >= SHABBAT_BOUNDARY_MINUTES;
  }

  if (weekday === 6) {
    return minutes < SHABBAT_BOUNDARY_MINUTES;
  }

  return false;
}

export function resolveShabbatOverride(
  search: string | URLSearchParams | null | undefined,
): boolean | null {
  if (search == null) return null;

  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;

  const value = params.get("shabbat");
  if (value === "1") return true;
  if (value === "0") return false;
  return null;
}

export function isShabbatActive(
  now: Date = new Date(),
  search?: string | URLSearchParams | null,
): boolean {
  const override = resolveShabbatOverride(search);
  if (override !== null) return override;
  return isShabbatWindow(now);
}
