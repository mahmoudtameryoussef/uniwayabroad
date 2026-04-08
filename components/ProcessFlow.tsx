type BodyBlock =
  | { type: "text"; text: string }
  | { type: "list"; heading: string; items: string[] }
  | { type: "highlight"; text: string };

const PROCESS_STEPS: {
  emoji: string;
  title: string;
  body: BodyBlock[];
  /** Use drawn flag instead of regional-indicator emoji (avoids “DE” on some systems) */
  iconFlag?: "de";
}[] = [
  {
    emoji: "📞",
    title: "Initial Consultation (Free)",
    body: [
      { type: "text", text: "Short call (10–15 minutes)" },
      {
        type: "list",
        heading: "Profile evaluation:",
        items: ["GPA", "Language level", "Field of study"],
      },
      {
        type: "highlight",
        text: "Decision: Eligible / Needs improvement",
      },
    ],
  },
  {
    emoji: "💰",
    title: "Agreement & Payment",
    body: [
      {
        type: "list",
        heading: "",
        items: [
          "Explain service package",
          "Student confirms & pays initial fee",
        ],
      },
    ],
  },
  {
    emoji: "📂",
    title: "Document Preparation",
    body: [
      {
        type: "list",
        heading: "Student provides:",
        items: [
          "Academic certificates",
          "Passport",
          "Language certificate",
        ],
      },
      {
        type: "list",
        heading: "We prepare:",
        items: ["CV", "Motivation letter"],
      },
    ],
  },
  {
    emoji: "🎓",
    title: "University Selection",
    body: [
      {
        type: "list",
        heading: "",
        items: [
          "Select 5–8 suitable universities",
          "Send list to student for approval",
        ],
      },
    ],
  },
  {
    emoji: "📨",
    title: "Admission Offer",
    body: [
      {
        type: "list",
        heading: "",
        items: [
          "Receive acceptance letter 🎉",
          "Guide student on next steps",
        ],
      },
    ],
  },
  {
    emoji: "🏦",
    title: "Visa Preparation",
    body: [
      {
        type: "text",
        text: "Prepare embassy documents:",
      },
      {
        type: "list",
        heading: "",
        items: [
          "Translate documents",
          "Legalization of documents",
          "Opening blocked account",
          "Motivation letter",
          "Health insurance",
        ],
      },
      {
        type: "text",
        text: "Book visa appointment",
      },
    ],
  },
  {
    emoji: "📅",
    title: "Appointments",
    body: [
      {
        type: "list",
        heading: "",
        items: ["Legalization appointment", "Visa appointment booking"],
      },
    ],
  },
  {
    emoji: "✈️",
    title: "Travel Preparation",
    body: [
      {
        type: "list",
        heading: "",
        items: ["Prepare student before departure"],
      },
    ],
  },
  {
    emoji: "",
    title: "Arrival in Germany",
    iconFlag: "de",
    body: [
      {
        type: "list",
        heading: "",
        items: ["Student arrives", "Provide post-arrival support"],
      },
    ],
  },
];

/** Steps 2–5, 8, 9 — bullets aligned beside phrases */
const BULLET_ROW_STEP_INDEXES = new Set([1, 2, 3, 4, 7, 8]);

function GermanFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 5 3"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

function StepIcon({
  emoji,
  flag,
  compact,
}: {
  emoji: string;
  flag?: "de";
  compact?: boolean;
}) {
  const box =
    compact
      ? "h-11 w-11 rounded-xl text-xl md:h-12 md:w-12 md:text-2xl"
      : "h-14 w-14 rounded-2xl text-2xl md:h-16 md:w-16 md:text-3xl";
  if (flag === "de") {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden border border-brand-navy/10 bg-white shadow-sm ring-1 ring-brand-navy/5 ${box}`}
        aria-hidden
      >
        <GermanFlagIcon
          className={
            compact
              ? "h-7 w-[2.6rem] rounded-sm shadow-inner md:h-8 md:w-[2.85rem]"
              : "h-9 w-[3.25rem] rounded-sm shadow-inner md:h-10 md:w-[3.5rem]"
          }
        />
      </div>
    );
  }
  return (
    <div
      className={`flex shrink-0 items-center justify-center border border-brand-navy/10 bg-white shadow-sm ring-1 ring-brand-navy/5 ${box}`}
    >
      <span aria-hidden>{emoji}</span>
    </div>
  );
}

function BodyRenderer({
  blocks,
  bulletsBesidePhrases,
}: {
  blocks: BodyBlock[];
  bulletsBesidePhrases?: boolean;
}) {
  const listUlClass = bulletsBesidePhrases
    ? "list-outside list-disc space-y-1.5 ps-5 marker:text-brand-orange"
    : "list-inside list-disc space-y-1.5 marker:text-brand-orange";

  return (
    <div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-brand-navy/85 sm:text-[0.95rem]">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={`t-${i}`} className="text-brand-navy/90">
              {block.text}
            </p>
          );
        }
        if (block.type === "highlight") {
          return (
            <p
              key={`h-${i}`}
              className="rounded-lg border border-brand-orange/25 bg-brand-orange/10 px-4 py-3 font-semibold text-brand-navy"
            >
              {block.text}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <div key={`l-${i}`}>
              {block.heading ? (
                <p className="font-semibold text-brand-navy">{block.heading}</p>
              ) : null}
              <ul
                className={`${listUlClass} ${block.heading ? "mt-2" : ""}`}
              >
                {block.items.map((item) => (
                  <li key={item} className="ps-0.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function ProcessFlow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.04] shadow-md ring-1 ring-brand-navy/10">
      <div className="border-b border-brand-navy/10 bg-white px-5 py-4 sm:px-8 sm:py-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
          Your journey
        </p>
        <p className="mt-1 text-center text-sm text-brand-navy/75">
          Nine steps from initial consultation to arrival in Germany
        </p>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <ol
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6"
          role="list"
        >
          {PROCESS_STEPS.map((step, index) => {
            const isLast = index === PROCESS_STEPS.length - 1;
            return (
              <li
                key={step.title}
                role="listitem"
                className={
                  isLast
                    ? "md:col-span-2 md:flex md:justify-center"
                    : "min-w-0"
                }
              >
                <article
                  className={`flex h-full min-h-0 flex-col rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-sm ring-1 ring-brand-navy/[0.04] sm:p-5 ${
                    isLast
                      ? "w-full md:max-w-[calc((100%-1.5rem)/2)]"
                      : "w-full"
                  }`}
                >
                  <header className="flex gap-3 border-b border-brand-navy/[0.08] pb-3 sm:pb-4">
                    <StepIcon
                      emoji={step.emoji}
                      flag={step.iconFlag}
                      compact
                    />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className="inline-flex rounded-full bg-brand-orange/15 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-brand-orange sm:text-[0.6875rem]">
                        Step {index + 1}
                      </span>
                      <h3 className="mt-1 text-[0.9375rem] font-semibold leading-snug text-brand-navy sm:text-base">
                        <span className="sr-only">
                          Step {index + 1}:{" "}
                        </span>
                        {step.title}
                      </h3>
                    </div>
                  </header>
                  <div className="min-h-0 flex-1 pt-3 sm:pt-4">
                    <BodyRenderer
                      blocks={step.body}
                      bulletsBesidePhrases={BULLET_ROW_STEP_INDEXES.has(
                        index,
                      )}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="border-t border-brand-navy/10 bg-white px-5 py-4 sm:px-8 sm:py-5">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-brand-navy/80 sm:text-[0.9375rem] sm:leading-relaxed">
          <span className="font-semibold text-brand-navy">
            Our guidance, our responsibility.
          </span>{" "}
          Every step above happens with Uniway advising and supporting you
          along the way—we walk through the journey with you and stand behind
          this process.
        </p>
      </div>
    </div>
  );
}
