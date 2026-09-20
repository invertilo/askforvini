"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type FlippingWordSwapProps = {
  words: string[];
  className?: string;
  intervalMs?: number;
};

export function FlippingWordSwap({
  words,
  className,
  intervalMs = 2400,
}: FlippingWordSwapProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const safe = words.length > 0 ? words : [""];

  useEffect(() => {
    if (reduce || safe.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safe.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduce, safe.length]);

  const current = safe[index] ?? safe[0];

  if (reduce) {
    return <span className={className}>{safe.join(" · ")}</span>;
  }

  return (
    <span className={`word-swap${className ? ` ${className}` : ""}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, rotateX: 70, y: 8 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: -70, y: -8 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "50% 50%", backfaceVisibility: "hidden" }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
