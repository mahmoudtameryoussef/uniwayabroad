import { SectionLink } from "@/components/SectionLink";
import { ABOUT_POINTS } from "@/lib/about-content";

function FooterCheckIcon() {
  return (
    <svg
      className="mt-1 h-6 w-6 shrink-0 text-brand-orange"
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

const linkClass =
  "text-[0.9375rem] text-white/85 transition-colors hover:text-brand-orange";

const FOOTER_SOCIAL_LINK_CLASS =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/80 outline-none transition-colors hover:bg-white/10 hover:text-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy sm:h-12 sm:w-12";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand */}
          <div className="lg:col-span-3">
            <p className="text-2xl font-semibold tracking-tight text-white">
              Uniway
            </p>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-white/75">
              Study-abroad guidance for students and families—structured
              pathways to universities in Germany.
            </p>
            <div className="mt-6 h-1 w-14 rounded-full bg-brand-orange" />
            <SectionLink
              sectionId="apply"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-brand-orange px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Apply now
            </SectionLink>
          </div>

          {/* About (same copy as on-page About section) */}
          <div className="lg:col-span-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              About us
            </h2>
            <p className="mt-2 text-xl font-semibold tracking-tight text-white">
              Who we are
            </p>
            <ul className="mt-6 space-y-5">
              {ABOUT_POINTS.map((text) => (
                <li key={text} className="flex gap-3">
                  <FooterCheckIcon />
                  <p className="text-[0.9375rem] leading-relaxed text-white/80 md:text-base md:leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="grid grid-cols-2 gap-10 sm:gap-8 lg:col-span-4 lg:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Explore
              </h2>
              <nav
                aria-label="Footer"
                className="mt-4 flex flex-col gap-3"
              >
                <SectionLink sectionId="home" className={linkClass}>
                  Home
                </SectionLink>
                <SectionLink sectionId="about" className={linkClass}>
                  About
                </SectionLink>
                <SectionLink sectionId="services" className={linkClass}>
                  Services
                </SectionLink>
                <SectionLink sectionId="study" className={linkClass}>
                  Study in Germany
                </SectionLink>
                <SectionLink sectionId="process" className={linkClass}>
                  Process
                </SectionLink>
              </nav>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Get started
              </h2>
              <nav
                aria-label="Footer actions"
                className="mt-4 flex flex-col gap-3"
              >
                <SectionLink sectionId="apply" className={linkClass}>
                  Apply
                </SectionLink>
                <SectionLink sectionId="contact" className={linkClass}>
                  Contact
                </SectionLink>
              </nav>
              <p className="mt-8 text-sm leading-relaxed text-white/60">
                Questions about programs, visas, or timelines? Reach out—we
                respond as soon as we can.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © {year} Uniway. All rights reserved.
          </p>
          <ul
            className="flex flex-wrap items-center justify-start gap-2 sm:justify-end sm:gap-1"
            aria-label="Contact and social links"
          >
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Uniway.abroad1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Email Uniway on Gmail"
              >
                <svg
                  className="h-6 w-6"
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
              </a>
            </li>
            <li>
              <a
                href="tel:+4915214405504"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Call +49 1521 4405504"
              >
                <svg
                  className="h-6 w-6"
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
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/uniway.abroad/"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Uniway on Instagram"
              >
                <svg
                  className="h-6 w-6"
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
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@uniway.abroad"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_SOCIAL_LINK_CLASS}
                aria-label="Uniway on TikTok"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
