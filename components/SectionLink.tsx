"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SectionLinkProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

/** Fired on same-page section jumps (replaceState does not trigger hashchange). */
export const SECTION_NAVIGATE_EVENT = "uniway:section-navigate";

export function emitSectionNavigate(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent(SECTION_NAVIGATE_EVENT, { detail: { sectionId } }),
  );
}

export function SectionLink({
  sectionId,
  children,
  className,
  onNavigate,
}: SectionLinkProps) {
  const pathname = usePathname();
  const href = sectionId === "home" ? "/" : `/#${sectionId}`;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (pathname !== "/") return;

    event.preventDefault();

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      emitSectionNavigate("home");
      return;
    }

    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
    emitSectionNavigate(sectionId);
  }

  return (
    <Link href={href} className={className} onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}
