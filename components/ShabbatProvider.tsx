"use client";

import { isShabbatWindow, resolveShabbatOverride, SHABBAT_CONTINUE_KEY } from "@/lib/shabbat";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";

type ShabbatState = {
  observing: boolean;
  open: boolean;
  dismiss: () => void;
};

const ShabbatContext = createContext<ShabbatState>({
  observing: false,
  open: false,
  dismiss: () => undefined,
});

export function useShabbat() {
  return useContext(ShabbatContext);
}

const CONTINUE_EVENT = "shabbat-continue";

function subscribeClock(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 60_000);
  window.addEventListener("focus", onStoreChange);
  return () => {
    window.clearInterval(id);
    window.removeEventListener("focus", onStoreChange);
  };
}

function subscribeContinue(onStoreChange: () => void) {
  window.addEventListener(CONTINUE_EVENT, onStoreChange);
  return () => window.removeEventListener(CONTINUE_EVENT, onStoreChange);
}

function subscribeMount() {
  return () => undefined;
}

function readContinued() {
  return sessionStorage.getItem(SHABBAT_CONTINUE_KEY) === "1";
}

function ShabbatProviderInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const override = resolveShabbatOverride(searchParams.toString());
  const mounted = useSyncExternalStore(subscribeMount, () => true, () => false);
  const inWindow = useSyncExternalStore(
    subscribeClock,
    () => isShabbatWindow(),
    () => false,
  );
  const observing = Boolean(mounted && (override ?? inWindow));

  const continued = useSyncExternalStore(subscribeContinue, readContinued, () => false);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SHABBAT_CONTINUE_KEY, "1");
    window.dispatchEvent(new Event(CONTINUE_EVENT));
  }, []);

  const value = useMemo<ShabbatState>(
    () => ({
      observing,
      open: observing && !continued,
      dismiss,
    }),
    [continued, dismiss, observing],
  );

  return <ShabbatContext.Provider value={value}>{children}</ShabbatContext.Provider>;
}

export function ShabbatProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <ShabbatProviderInner>{children}</ShabbatProviderInner>
    </Suspense>
  );
}
