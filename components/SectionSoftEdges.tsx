import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionSoftEdgesProps = {
  children: ReactNode;
  /** Extra classes on the atmosphere layer (e.g. opacity). */
  className?: string;
  /** Extend the atmosphere slightly into the previous section. */
  bleed?: boolean;
};

/**
 * Soft top/bottom fades for full-bleed section atmospheres
 * so joins with neighbouring sections are not a hard cut.
 */
export function SectionSoftEdges({
  children,
  className,
  bleed = true,
}: SectionSoftEdgesProps) {
  return (
    <>
      <div
        className={cn(
          "section-atmos pointer-events-none absolute inset-x-0 bottom-0 -z-0",
          bleed ? "section-atmos--bleed" : "top-0",
          className,
        )}
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="section-veil section-veil--top" aria-hidden="true" />
      <div className="section-veil section-veil--bottom" aria-hidden="true" />
    </>
  );
}
