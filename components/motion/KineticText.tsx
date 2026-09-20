"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

type KineticTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
} as const;

function useClientReady() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function KineticText({ children, className, as = "div" }: KineticTextProps) {
  const reduce = useReducedMotion();
  const ready = useClientReady();

  if (reduce || !ready) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const Tag = motionTags[as];
  return (
    <Tag
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
