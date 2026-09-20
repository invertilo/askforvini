"use client";

import { useIsClient } from "@/components/motion/useIsClient";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type StickyWorkCardProps = {
  children: ReactNode;
  index: number;
  className?: string;
};

export function StickyWorkCard({ children, index, className }: StickyWorkCardProps) {
  const reduce = useReducedMotion();
  const ready = useIsClient();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.55, 1, 1, 0.72]);
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [24, 0, -8]);

  if (reduce || !ready) {
    return (
      <article
        className={`work-sticky${className ? ` ${className}` : ""}`}
        style={{ zIndex: index + 1 }}
      >
        {children}
      </article>
    );
  }

  return (
    <motion.article
      ref={ref}
      className={`work-sticky${className ? ` ${className}` : ""}`}
      style={{ opacity, y, zIndex: index + 1 }}
    >
      {children}
    </motion.article>
  );
}
