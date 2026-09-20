import { describe, expect, it } from "vitest";
import { isShabbatActive, isShabbatWindow, resolveShabbatOverride } from "./shabbat";

describe("isShabbatWindow", () => {
  it("is off on Friday 18:29 ART", () => {
    expect(isShabbatWindow(new Date("2026-09-18T18:29:00-03:00"))).toBe(false);
  });

  it("is on at Friday 18:30 ART", () => {
    expect(isShabbatWindow(new Date("2026-09-18T18:30:00-03:00"))).toBe(true);
  });

  it("is on at Saturday 18:29 ART", () => {
    expect(isShabbatWindow(new Date("2026-09-19T18:29:00-03:00"))).toBe(true);
  });

  it("is off at Saturday 18:30 ART", () => {
    expect(isShabbatWindow(new Date("2026-09-19T18:30:00-03:00"))).toBe(false);
  });

  it("is off on Thursday", () => {
    expect(isShabbatWindow(new Date("2026-09-17T21:00:00-03:00"))).toBe(false);
  });

  it("converts a non-ART clock into ART before deciding", () => {
    expect(isShabbatWindow(new Date("2026-09-18T21:30:00Z"))).toBe(true);
    expect(isShabbatWindow(new Date("2026-09-18T21:29:00Z"))).toBe(false);
  });
});

describe("resolveShabbatOverride", () => {
  it("reads query flags", () => {
    expect(resolveShabbatOverride("?shabbat=1")).toBe(true);
    expect(resolveShabbatOverride("shabbat=0")).toBe(false);
    expect(resolveShabbatOverride("")).toBe(null);
  });
});

describe("isShabbatActive", () => {
  it("lets query flags win over the clock", () => {
    const thursday = new Date("2026-09-17T21:00:00-03:00");
    expect(isShabbatActive(thursday, "?shabbat=1")).toBe(true);
    expect(isShabbatActive(new Date("2026-09-18T18:45:00-03:00"), "?shabbat=0")).toBe(
      false,
    );
  });
});
