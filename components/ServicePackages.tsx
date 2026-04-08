import type { ReactNode } from "react";
import { SectionLink } from "@/components/SectionLink";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.5 6l2.5 3 4.5-5.5" />
    </svg>
  );
}

function IconFolder({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.89l-.812-1.22A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
    </svg>
  );
}

function IconFileLines({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6M8 9h2" />
    </svg>
  );
}

function IconLandmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-4h6v4" />
    </svg>
  );
}

function IconMessages({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconPlane({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

const subsectionIcons = {
  folder: IconFolder,
  file: IconFileLines,
  landmark: IconLandmark,
  messages: IconMessages,
} as const;

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-brand-navy/85 sm:text-[0.9375rem]">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-brand-orange pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy/55">
      {children}
    </p>
  );
}

const SILVER_FEATURES = [
  "Full profile evaluation (GPA, background, chances)",
  "Short consultation call",
  "Shortlisting 5 suitable programs",
  "Professional application submission to 5 universities",
  "Email support during application phase",
] as const;

const GOLD_SUBSECTIONS: {
  label: string;
  items: readonly string[];
  icon: keyof typeof subsectionIcons;
}[] = [
  {
    label: "Document preparation",
    icon: "folder",
    items: [
      "Guidance on required embassy documents",
      "Document translation & legalization guidance",
      "Assistance with Blocked Account setup",
      "Health insurance guidance",
    ],
  },
  {
    label: "Application documents",
    icon: "file",
    items: ["Professional Motivation Letter review/editing"],
  },
  {
    label: "Embassy process",
    icon: "landmark",
    items: [
      "Visa file preparation checklist",
      "Assistance with booking visa appointment",
      "Step-by-step visa guidance",
    ],
  },
  {
    label: "Extra support",
    icon: "messages",
    items: [
      "Priority support (WhatsApp / Chat)",
      "Continuous follow-up until visa submission",
    ],
  },
] as const;

const ADD_ONS: { label: string; price: string }[] = [
  { label: "Extra university", price: "€50" },
  { label: "Accommodation support", price: "€150" },
];

export default function ServicePackages() {
  return (
    <div className="mx-auto mt-12 w-full max-w-6xl md:mt-14">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Silver */}
        <article className="relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm ring-1 ring-brand-navy/[0.04] before:absolute before:inset-y-0 before:start-0 before:w-1 before:bg-gradient-to-b before:from-slate-300 before:to-slate-400/70 sm:before:w-[3px]">
          <div className="flex flex-col gap-4 p-6 ps-7 sm:p-7 sm:ps-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Silver
                </p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl">
                  Silver package
                </h3>
              </div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-brand-navy sm:text-[1.65rem]">
                <span className="text-base font-semibold text-brand-navy/45">
                  €
                </span>
                400
              </p>
            </div>
            <p className="text-sm leading-relaxed text-brand-navy/72 sm:text-[0.9375rem]">
              Perfect for students who want professional applications with
              minimal support.
            </p>
            <div className="pt-1">
              <SectionLabel>Includes</SectionLabel>
              <div className="mt-3">
                <FeatureList items={[...SILVER_FEATURES]} />
              </div>
            </div>
          </div>
        </article>

        {/* Gold */}
        <article className="relative overflow-hidden rounded-2xl border border-brand-orange/25 bg-white shadow-md ring-1 ring-brand-orange/10 before:absolute before:inset-y-0 before:start-0 before:w-1 before:bg-gradient-to-b before:from-brand-orange before:to-amber-600/90 sm:before:w-[3px]">
          <div className="flex flex-col gap-4 p-6 ps-7 sm:p-7 sm:ps-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-amber-800/90">
                  Gold
                </p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl">
                  Gold package
                </h3>
              </div>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-brand-orange sm:text-[1.65rem]">
                <span className="text-base font-semibold text-brand-orange/70">
                  €
                </span>
                900
              </p>
            </div>
            <p className="text-sm leading-relaxed text-brand-navy/72 sm:text-[0.9375rem]">
              Complete support from application to visa.
            </p>
            <div className="pt-1">
              <SectionLabel>Everything in Silver, plus</SectionLabel>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-navy/[0.04] px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-navy/65">
                <IconPlane className="h-4 w-4 shrink-0 text-brand-orange" />
                Visa preparation support
              </div>
              <div className="mt-5 flex flex-col gap-5">
                {GOLD_SUBSECTIONS.map(({ label, items, icon }) => {
                  const Icon = subsectionIcons[icon];
                  return (
                    <div key={label} className="flex gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy/[0.06] text-brand-navy/80"
                        aria-hidden
                      >
                        <Icon className="h-[1.125rem] w-[1.125rem]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-brand-navy">
                          {label}
                        </p>
                        <div className="mt-2">
                          <FeatureList items={[...items]} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Add-ons */}
      <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.025] p-5 sm:p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy/50">
          Add-ons
        </p>
        <ul className="mx-auto mt-4 flex max-w-md flex-col gap-3 sm:max-w-2xl sm:flex-row sm:justify-center sm:gap-4">
          {ADD_ONS.map(({ label, price }) => (
            <li
              key={label}
              className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-brand-navy/10 bg-white px-4 py-3.5 text-sm shadow-sm sm:max-w-xs sm:justify-center sm:gap-6"
            >
              <span className="font-medium text-brand-navy">{label}</span>
              <span className="tabular-nums text-base font-bold text-brand-orange">
                {price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <SectionLink
          sectionId="apply"
          className="inline-flex h-12 min-w-[10rem] items-center justify-center rounded-full bg-brand-orange px-8 text-base font-semibold text-white shadow-sm transition-colors hover:brightness-110 sm:h-12 sm:min-w-[11rem] sm:px-10 sm:text-lg"
        >
          Apply now
        </SectionLink>
      </div>
    </div>
  );
}
