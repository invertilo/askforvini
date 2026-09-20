"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type VelocityScrollProps = {
  text: string;
  className?: string;
};

/** Local Velocity Scroll: horizontal drift tied to scroll speed (Componentry registry name unavailable). */
export function VelocityScroll({ text, className }: VelocityScrollProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current;
      lastYRef.current = y;
      velocityRef.current += dy * 0.35;
    };

    const tick = () => {
      velocityRef.current *= 0.92;
      offsetRef.current += velocityRef.current * 0.08 + 0.35;
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (half > 0 && offsetRef.current > half) offsetRef.current -= half;
        if (half > 0 && offsetRef.current < 0) offsetRef.current += half;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  const line = `${text} · ${text} · `;

  if (reduce) {
    return (
      <p
        className={cn(
          "overflow-hidden font-data text-[0.8125rem] tracking-[0.12em] text-content-secondary uppercase",
          className,
        )}
      >
        {text}
      </p>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-data text-[0.8125rem] tracking-[0.12em] text-content-secondary uppercase will-change-transform"
      >
        <span>{line}</span>
        <span>{line}</span>
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
