function FlagAustria({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#ED2939" rx="1" />
      <rect y="5.33" width="24" height="5.34" fill="#FFF" />
    </svg>
  );
}

function FlagPoland({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#FFF" rx="1" />
      <rect y="8" width="24" height="8" fill="#DC143C" />
    </svg>
  );
}

function FlagCzech({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <path d="M0 0 L0 16 L20 8 Z" fill="#11457E" />
      <path d="M0 0 L24 0 L24 8 L20 8 Z" fill="#FFF" />
      <path d="M20 8 L24 8 L24 16 L0 16 L0 8 L20 8 Z" fill="#D7141A" />
    </svg>
  );
}

const DESTINATIONS = [
  { name: "Austria", Flag: FlagAustria },
  { name: "Poland", Flag: FlagPoland },
  { name: "Czech Republic", Flag: FlagCzech },
] as const;

export function StudyComingSoonCountries() {
  return (
    <div className="relative mt-16 overflow-hidden rounded-3xl border border-brand-navy/10 bg-gradient-to-br from-brand-navy/[0.06] via-white to-brand-orange/[0.06] shadow-md ring-1 ring-brand-navy/5 md:mt-20">
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-brand-orange/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -start-12 h-40 w-40 rounded-full bg-brand-navy/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Coming soon
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl">
            More study destinations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            Soon we&apos;ll help you plan travel and study pathways to{" "}
            <strong className="font-semibold text-brand-navy">Austria</strong>,{" "}
            <strong className="font-semibold text-brand-navy">Poland</strong>, and
            the{" "}
            <strong className="font-semibold text-brand-navy">
              Czech Republic
            </strong>
            —with the same guided support you expect from Uniway.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {DESTINATIONS.map(({ name, Flag }) => (
            <li key={name}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-brand-navy/10 bg-white/90 px-5 py-6 text-center shadow-sm backdrop-blur-sm transition hover:border-brand-orange/30 hover:shadow-md">
                <div className="overflow-hidden rounded-lg shadow ring-1 ring-black/5">
                  <Flag className="h-12 w-[4.5rem] sm:h-14 sm:w-[5.25rem]" />
                </div>
                <p className="mt-4 text-base font-semibold text-brand-navy">
                  {name}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-navy/45">
                  On the roadmap
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
