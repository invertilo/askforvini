"use client";

import { useEffect, useState } from "react";

/** False on SSR and the hydration render; true after mount. */
export function useIsClient(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}
