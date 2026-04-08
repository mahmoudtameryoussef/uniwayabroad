"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionLink } from "@/components/SectionLink";
import { useSplash } from "@/components/SplashProvider";

const textSections = [
  { id: "home" as const, label: "Home" },
  { id: "about" as const, label: "About" },
  { id: "services" as const, label: "Services" },
  { id: "study" as const, label: "Study" },
  { id: "process" as const, label: "Process" },
] as const;

function linkClassOnHero(isMobile: boolean) {
  return isMobile
    ? "block rounded-lg px-3 py-3 text-lg font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-brand-orange"
    : "text-base font-medium text-white/90 transition-colors hover:text-brand-orange md:text-lg";
}

function linkClassNormal(isMobile: boolean) {
  return isMobile
    ? "block rounded-lg px-3 py-3 text-lg font-medium text-foreground/90 transition-colors hover:bg-brand-navy/[0.06] hover:text-brand-orange"
    : "text-base font-medium text-foreground/85 transition-colors hover:text-brand-orange md:text-lg";
}

export default function Navbar() {
  const { triggerSplash } = useSplash();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    function tick() {
      const home = document.getElementById("home");
      const navH = topBarRef.current?.getBoundingClientRect().height ?? 96;
      if (!home) {
        setPastHero(true);
        return;
      }
      setPastHero(home.getBoundingClientRect().bottom <= navH);
    }

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  const onHero = !pastHero;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ${
        pastHero
          ? "border-b border-brand-navy/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90"
          : "border-b border-white/20 bg-[#09427f]/35 backdrop-blur-md"
      }`}
    >
      <div
        ref={topBarRef}
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-5 sm:h-24 sm:gap-4 sm:px-8 lg:px-10"
      >
        <SectionLink
          sectionId="home"
          className={`flex h-[4.5rem] max-h-full shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[5.25rem] ${
            onHero
              ? "focus-visible:ring-white/80 focus-visible:ring-offset-transparent"
              : "focus-visible:ring-brand-navy/35 focus-visible:ring-offset-background"
          }`}
          onNavigate={() => {
            closeMenu();
            triggerSplash();
          }}
        >
          <Image
            src="/images/uniway-1copy.png"
            alt="Uniway Study Abroad"
            width={360}
            height={252}
            priority
            className={`h-full w-auto max-w-[min(72vw,14rem)] object-contain object-left sm:max-w-[min(50vw,20rem)] ${
              onHero ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : ""
            }`}
          />
        </SectionLink>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-3 md:flex md:gap-5 lg:gap-6"
        >
          {textSections.map((item) => (
            <SectionLink
              key={item.id}
              sectionId={item.id}
              className={
                pastHero ? linkClassNormal(false) : linkClassOnHero(false)
              }
            >
              {item.label}
            </SectionLink>
          ))}
          <SectionLink
            sectionId="apply"
            className={
              pastHero
                ? "inline-flex h-10 min-w-[6.25rem] items-center justify-center rounded-full bg-brand-orange px-5 text-base font-semibold text-white shadow-sm transition-colors hover:brightness-110 md:h-11 md:min-w-[7rem] md:px-6 md:text-lg"
                : "inline-flex h-10 min-w-[6.25rem] items-center justify-center rounded-full bg-brand-orange px-5 text-base font-semibold text-white shadow-md transition-colors hover:brightness-110 md:h-11 md:min-w-[7rem] md:px-6 md:text-lg"
            }
          >
            Apply
          </SectionLink>
          <SectionLink
            sectionId="contact"
            className={
              pastHero ? linkClassNormal(false) : linkClassOnHero(false)
            }
          >
            Contact
          </SectionLink>
        </nav>

        <button
          type="button"
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 md:hidden ${
            onHero
              ? "text-white hover:bg-white/10 focus-visible:ring-white/40"
              : "text-foreground hover:bg-black/5 focus-visible:ring-black/20"
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t md:hidden ${
          menuOpen ? "block" : "hidden"
        } ${
          pastHero
            ? "border-brand-navy/10 bg-white"
            : "border-white/15 bg-[#09427f]/92 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Mobile primary"
          className="mx-auto max-w-7xl space-y-2 px-5 py-4 pb-6 sm:px-8 lg:px-10"
        >
          {textSections.map((item) => (
            <SectionLink
              key={item.id}
              sectionId={item.id}
              className={
                pastHero ? linkClassNormal(true) : linkClassOnHero(true)
              }
              onNavigate={closeMenu}
            >
              {item.label}
            </SectionLink>
          ))}
          <SectionLink
            sectionId="apply"
            className={
              pastHero
                ? "mt-3 flex h-12 items-center justify-center rounded-full bg-brand-orange text-base font-semibold text-white transition-colors hover:brightness-110"
                : "mt-3 flex h-12 items-center justify-center rounded-full bg-brand-orange text-base font-semibold text-white transition-colors hover:brightness-110"
            }
            onNavigate={closeMenu}
          >
            Apply
          </SectionLink>
          <SectionLink
            sectionId="contact"
            className={
              pastHero ? linkClassNormal(true) : linkClassOnHero(true)
            }
            onNavigate={closeMenu}
          >
            Contact
          </SectionLink>
        </nav>
      </div>
    </header>
  );
}
