"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False on SSR and the hydration render; true after mount. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
