"use client";

import { AsciiEffect } from "@/components/ui/ascii-effect";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useTheme } from "@/components/motion/useTheme";

const SITE_COLORS = ["#3A6EA5", "#C4A36A", "#F3EDE2"] as const;
const LIGHT_COLORS = ["#3A6EA5", "#8B7355", "#1A1814"] as const;

type SiteAsciiProps = {
  imageSrc: string;
  alt: string;
  variant?: "image" | "flow";
  fontSize?: number;
  className?: string;
};

export function SiteAscii({
  imageSrc,
  alt,
  variant = "image",
  fontSize = 9,
  className,
}: SiteAsciiProps) {
  const reduce = useReducedMotion();
  const theme = useTheme();

  const effectiveVariant = reduce ? "image" : variant;
  const colors = theme === "light" ? [...LIGHT_COLORS] : [...SITE_COLORS];
  const backgroundColor = theme === "light" ? "#F4EFE4" : "#12110E";

  return (
    <AsciiEffect
      imageSrc={imageSrc}
      alt={alt}
      variant={effectiveVariant}
      colors={colors}
      colorMode="gradient"
      backgroundColor={backgroundColor}
      fontFamily="IBM Plex Mono, ui-monospace, monospace"
      fontSize={fontSize}
      fit="cover"
      scale={1.12}
      flowSpeed={reduce ? 0 : 0.18}
      flowStrength={reduce ? 0 : 10}
      mouseStrength={reduce ? 0 : 18}
      revealDuration={reduce ? 0 : 1200}
      className={className}
    />
  );
}
