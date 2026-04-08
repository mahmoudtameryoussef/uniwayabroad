import Image from "next/image";
import { SectionLink } from "@/components/SectionLink";

/** File must live at `public/images/hero-berlin.png` (served as `/images/hero-berlin.png`). */
const HERO_SRC = "/images/hero-berlin1.jpg";

function FlagGermany({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 5 3"
      aria-hidden
    >
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh w-full shrink-0 scroll-mt-20 items-center justify-center overflow-hidden md:scroll-mt-24"
    >
      <div className="absolute inset-0 bg-neutral-900" aria-hidden>
        <Image
          src={HERO_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-[#09427f]/50" aria-hidden />
      <div className="absolute inset-0 bg-black/20" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-10">
        <h1 className="flex flex-nowrap items-center justify-center gap-2 text-[clamp(0.875rem,3.65vw+0.3rem,3.75rem)] font-semibold leading-none tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:gap-3">
          <span className="whitespace-nowrap">
            Start Your Study Journey in Germany
          </span>
          <FlagGermany className="h-[0.7em] w-[1.17em] shrink-0 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.35)] ring-1 ring-white/25" />
        </h1>
        <SectionLink
          sectionId="apply"
          className="mt-5 inline-flex h-12 min-w-[10rem] items-center justify-center rounded-full bg-brand-orange px-8 text-base font-semibold text-white shadow-lg transition-colors hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/80 sm:mt-6 sm:h-14 sm:min-w-[11rem] sm:px-10 sm:text-lg"
        >
          Apply Now
        </SectionLink>
      </div>
    </section>
  );
}
