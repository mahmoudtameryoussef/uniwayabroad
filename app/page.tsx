import Image from "next/image";
import ApplySection from "@/components/ApplySection";
import { HomeHero } from "@/components/HomeHero";
import { ABOUT_POINTS } from "@/lib/about-content";
import ProcessFlow from "@/components/ProcessFlow";
import { StudyComingSoonCountries } from "@/components/StudyComingSoonCountries";
import { StudyUniversitiesCarousel } from "@/components/StudyUniversitiesCarousel";
import ServicePackages from "@/components/ServicePackages";

const STUDY_GERMANY_REASONS = [
  {
    title: "Tuition-free universities",
    body: "Public universities in Germany offer high-quality education with little to no tuition fees, making it one of the most affordable study destinations in the world.",
  },
  {
    title: "High-quality education",
    body: "German universities are globally recognized for their strong academic standards, modern facilities, and focus on practical knowledge and research.",
  },
  {
    title: "Wide range of programs",
    body: "Students can choose from a variety of programs in English and German across fields like engineering, business, IT, and more.",
  },
  {
    title: "Work opportunities during studies",
    body: "International students are allowed to work part-time, helping them gain experience and support their living expenses.",
  },
  {
    title: "Post-graduation career opportunities",
    body: "Germany offers excellent job prospects after graduation, with options to stay and work in one of Europe’s strongest economies.",
  },
  {
    title: "Strong economy and job market",
    body: "Germany is home to leading global companies and offers high demand for skilled professionals, especially in technical fields.",
  },
  {
    title: "Safe and high quality of life",
    body: "Germany provides a safe environment, reliable public transport, and a high standard of living for students.",
  },
  {
    title: "International environment",
    body: "You will study alongside students from all over the world, building a global network and experiencing diverse cultures.",
  },
] as const;

function GreenCheckIcon() {
  return (
    <svg
      className="mt-1.5 h-7 w-7 shrink-0 text-brand-orange md:h-8 md:w-8"
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

/** Dark blue marker for “Why Study in Germany” (About keeps green checks) */
function StudyReasonMarker() {
  return (
    <svg
      className="mt-1.5 h-7 w-7 shrink-0 text-brand-navy md:h-8 md:w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

/** Inner content — wider than 6xl, not full 2xl (~1280px) */
const contentSectionShell =
  "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10";
/** Full-width bands alternate white / page grey below the hero */
const sectionBandWhite =
  "scroll-mt-20 md:scroll-mt-24 w-full bg-white";
const sectionBandMuted =
  "scroll-mt-20 md:scroll-mt-24 w-full bg-background";
const contentSectionLayout =
  `${contentSectionShell} flex min-h-dvh flex-col justify-center py-12 md:py-16`;
const contentSectionNudge = "-translate-y-5 md:-translate-y-10";

const sectionTitleClass =
  "mb-5 text-center text-4xl font-semibold tracking-tight text-brand-navy md:mb-6 md:text-[2.75rem]";

const sectionIntroClass =
  "mx-auto max-w-3xl text-center text-lg leading-relaxed text-brand-navy/80 md:max-w-4xl md:text-xl md:leading-relaxed";

export default function Home() {
  return (
    <>
      <HomeHero />

      <section id="about" className={sectionBandWhite}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>About Us</h1>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-14 md:grid-cols-2 md:gap-14">
            <ul className="mx-auto w-full space-y-6 text-left md:mx-0">
              {ABOUT_POINTS.map((text) => (
                <li key={text} className="flex gap-4">
                  <GreenCheckIcon />
                  <p className="text-lg leading-relaxed text-brand-navy/80 md:text-xl md:leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-brand-navy/10 shadow-lg md:mx-0 md:max-w-none">
              <Image
                src="/images/discuss.jpg"
                alt="Students and advisors discussing study plans"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      <section id="services" className={sectionBandMuted}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>Our Services</h1>
          <p className={`${sectionIntroClass} mt-2`}>
            Explore the support we offer—from university shortlisting and
            applications to visa guidance and pre-departure preparation.
          </p>
          <ServicePackages />
        </div>
        </div>
      </section>

      <section id="study" className={sectionBandWhite}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>Why Study in Germany</h1>

          <div className="mt-10 md:mt-12">
            <StudyUniversitiesCarousel />
          </div>

          <ul className="mx-auto mt-12 grid w-full max-w-none list-none gap-8 md:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:gap-x-14">
            {STUDY_GERMANY_REASONS.map(({ title, body }) => (
              <li key={title} className="flex gap-4">
                <StudyReasonMarker />
                <div>
                  <p className="text-lg font-semibold text-brand-navy md:text-xl">
                    {title}
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-brand-navy/80 md:text-xl md:leading-relaxed">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <StudyComingSoonCountries />
        </div>
        </div>
      </section>

      <section id="process" className={sectionBandMuted}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>Our Process</h1>
          <p className={`${sectionIntroClass} mt-2`}>
            From first message to landing in Germany—here’s how we work with
            you, step by step.
          </p>
          <div className="mt-12 text-left md:mt-14">
            <ProcessFlow />
          </div>
        </div>
        </div>
      </section>

      <section id="apply" className={sectionBandWhite}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>Apply Now</h1>
          <p className={`${sectionIntroClass} mt-2`}>
            Send your details below and we’ll get in touch to start your
            application.
          </p>
          <div className="mt-12 md:mt-14">
            <ApplySection />
          </div>
        </div>
        </div>
      </section>

      <section id="contact" className={sectionBandMuted}>
        <div className={contentSectionLayout}>
        <div className={contentSectionNudge}>
          <h1 className={sectionTitleClass}>Contact Us</h1>
          <p className={`${sectionIntroClass} mt-2`}>
            Reach out with questions or to book a consultation—we’re here to help
            you take the next step.
          </p>

          <nav
            className="mx-auto mt-10 max-w-4xl sm:mt-12"
            aria-label="Contact"
          >
            <ul className="grid grid-cols-2 gap-8 sm:gap-10">
              <li>
                <a
                  href="https://wa.me/4915214405504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center text-brand-navy no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  <svg
                    className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-sm font-semibold leading-snug sm:text-base">
                    +49 1521 4405504
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Uniway.abroad1@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center text-brand-navy no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  <svg
                    className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="break-all text-sm font-semibold leading-snug sm:text-[0.9375rem]">
                    Uniway.abroad1@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/uniway.abroad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center text-brand-navy no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  <svg
                    className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="text-sm font-semibold sm:text-base">
                    @uniway.abroad
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@uniway.abroad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 text-center text-brand-navy no-underline transition-colors hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  <svg
                    className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="text-sm font-semibold sm:text-base">
                    @uniway.abroad
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        </div>
      </section>
    </>
  );
}
