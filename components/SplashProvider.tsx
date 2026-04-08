"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Between 2–3 seconds */
const SPLASH_DURATION_MS = 2800;

const SPINNER_NAVY = "#09427f";
const SPINNER_NAVY_FAINT = "rgba(9, 66, 127, 0.22)";

type SplashContextValue = {
  triggerSplash: () => void;
};

const SplashContext = createContext<SplashContextValue | null>(null);

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return ctx;
}

function SplashOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-12 bg-background px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading</span>
      <Image
        src="/images/uniway-1copy.png"
        alt="Uniway"
        width={560}
        height={392}
        priority
        fetchPriority="high"
        className="h-44 w-auto max-w-[min(92vw,26rem)] object-contain sm:h-56 sm:max-w-[min(94vw,32rem)] md:h-64 md:max-w-[36rem] lg:h-72 lg:max-w-[40rem]"
      />
      <div
        className="h-12 w-12 rounded-full border-[3px] motion-safe:animate-spin md:h-14 md:w-14 md:border-4"
        style={{
          borderColor: SPINNER_NAVY_FAINT,
          borderTopColor: SPINNER_NAVY,
        }}
        aria-hidden
      />
    </div>
  );
}

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, SPLASH_DURATION_MS);
  }, [clearTimer]);

  /** Full page load: initial splash timer */
  useEffect(() => {
    scheduleHide();
    return clearTimer;
  }, [scheduleHide, clearTimer]);

  const triggerSplash = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
    }
    return () => {
      root.style.overflow = "";
    };
  }, [visible]);

  const value = useMemo(
    () => ({ triggerSplash }),
    [triggerSplash],
  );

  return (
    <SplashContext.Provider value={value}>
      {visible ? <SplashOverlay /> : null}
      <div
        className={visible ? "invisible" : "visible"}
        aria-hidden={visible}
      >
        {children}
      </div>
    </SplashContext.Provider>
  );
}
