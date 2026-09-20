"use client";

import { useShabbat } from "@/components/ShabbatProvider";
import type { Messages } from "@/lib/messages";
import { useEffect, useRef } from "react";

type ShabbatGateProps = {
  copy: Messages["shabbat"];
};

export function ShabbatGate({ copy }: ShabbatGateProps) {
  const { open, dismiss } = useShabbat();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    titleRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss, open]);

  if (!open) return null;

  return (
    <div className="shabbat-gate" role="presentation">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shabbat-title"
        className="w-full max-w-[34rem]"
      >
        <p
          className="hebrew mb-6 text-[1.75rem] leading-snug"
          dir="rtl"
          lang="he"
        >
          {copy.greeting}
        </p>
        <h2
          id="shabbat-title"
          ref={titleRef}
          tabIndex={-1}
          className="font-display text-[2.5rem] font-medium leading-none tracking-tight"
        >
          {copy.title}
        </h2>
        <p className="mt-5 text-content-secondary">{copy.body}</p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 font-medium text-accent-fg"
        >
          {copy.continue}
        </button>
      </div>
    </div>
  );
}
