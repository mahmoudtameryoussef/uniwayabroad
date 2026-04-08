"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTION_IDS = new Set([
  "about",
  "services",
  "study",
  "process",
  "apply",
  "contact",
]);

/**
 * - Lands on `/` with `#section`: scroll to that section (instant).
 * - Lands on `/`, `/ #`, or `#home`: scroll to top so only the hero shows.
 * - Disables browser scroll restoration to avoid About peeking in on first paint.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.slice(1).toLowerCase();

    const run = () => {
      if (hash && SECTION_IDS.has(hash)) {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    run();
    const id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
