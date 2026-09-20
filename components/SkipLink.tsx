"use client";

import { InPageAnchor } from "@/components/InPageAnchor";

type SkipLinkProps = {
  label: string;
};

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <InPageAnchor className="skip-link" href="#main">
      {label}
    </InPageAnchor>
  );
}
