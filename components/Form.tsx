"use client";

import {
  type FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SECTION_NAVIGATE_EVENT } from "@/components/SectionLink";
import {
  DEFAULT_PHONE_COUNTRY_ISO,
  PHONE_COUNTRY_OPTIONS,
  dialCodeForCountryIso,
} from "@/lib/phone-countries";

const fieldClass =
  "h-12 w-full rounded-xl border bg-white px-4 text-lg text-foreground outline-none transition focus:ring-2 focus:ring-brand-orange/25";

function fieldClassWithError(hasError: boolean) {
  return `${fieldClass} ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-brand-navy/15 focus:border-brand-orange/50"
  }`;
}

function phoneCountrySelectClass(hasError: boolean) {
  return `h-12 basis-1/3 max-w-[12rem] min-w-0 shrink-0 rounded-xl border bg-white px-3 text-base text-foreground outline-none transition focus:ring-2 focus:ring-brand-orange/25 sm:px-3 sm:text-lg ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-brand-navy/15 focus:border-brand-orange/50"
  }`;
}

function isValidEmail(value: string) {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/** Local phone part: digits only (country code is chosen separately). */
function sanitizeLocalPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function buildSubmittedPhone(countryCode: string, localDigits: string) {
  const digits = sanitizeLocalPhoneDigits(localDigits);
  if (!digits) return "";
  return `${countryCode} ${digits}`;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvwznqo";

const FIELD_ORDER = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "fieldOfStudy",
] as const;

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneCountryIso, setPhoneCountryIso] = useState<string>(
    DEFAULT_PHONE_COUNTRY_ISO,
  );
  const [phoneLocal, setPhoneLocal] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) {
        setStatus("idle");
        setErrors({});
        setPhoneCountryIso(DEFAULT_PHONE_COUNTRY_ISO);
        setPhoneLocal("");
        formRef.current?.reset();
      }
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  /** Hide success/error panels when user leaves the apply section (navbar uses replaceState, no hashchange). */
  useEffect(() => {
    function clearSuccessAndErrorFeedback() {
      setStatus((s) =>
        s === "success" || s === "error" ? "idle" : s,
      );
    }

    function hashIsApplySection() {
      return (
        window.location.hash.replace(/^#/, "").toLowerCase() === "apply"
      );
    }

    function onSectionNavigate(e: Event) {
      const ce = e as CustomEvent<{ sectionId?: string }>;
      const id = ce.detail?.sectionId?.toLowerCase() ?? "";
      if (id !== "apply") clearSuccessAndErrorFeedback();
    }

    function onHashOrPopState() {
      if (!hashIsApplySection()) clearSuccessAndErrorFeedback();
    }

    window.addEventListener(SECTION_NAVIGATE_EVENT, onSectionNavigate);
    window.addEventListener("hashchange", onHashOrPopState);
    window.addEventListener("popstate", onHashOrPopState);

    return () => {
      window.removeEventListener(SECTION_NAVIGATE_EVENT, onSectionNavigate);
      window.removeEventListener("hashchange", onHashOrPopState);
      window.removeEventListener("popstate", onHashOrPopState);
    };
  }, []);

  useLayoutEffect(() => {
    if (status !== "success" && status !== "error") return;
    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    feedbackRef.current?.focus();
  }, [status]);

  function clearFieldError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const localDigits = sanitizeLocalPhoneDigits(phoneLocal);
    const email = String(fd.get("email") ?? "").trim();
    const fieldOfStudy = String(fd.get("fieldOfStudy") ?? "").trim();

    const next: Record<string, string> = {};
    if (!firstName) next.firstName = "First name is required.";
    if (!lastName) next.lastName = "Last name is required.";
    if (!localDigits) next.phone = "Phone number is required.";
    if (!email) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!fieldOfStudy)
      next.fieldOfStudy = "Field of study is required.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("idle");
      const firstId = FIELD_ORDER.find((key) => Boolean(next[key]));
      requestAnimationFrame(() => {
        const el = firstId ? document.getElementById(firstId) : null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (el instanceof HTMLElement) el.focus();
      });
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const submitBody = new FormData(form);
      submitBody.set(
        "phone",
        buildSubmittedPhone(
          dialCodeForCountryIso(phoneCountryIso),
          phoneLocal,
        ),
      );

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: submitBody,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setErrors({});
        setStatus("success");
        setPhoneCountryIso(DEFAULT_PHONE_COUNTRY_ISO);
        setPhoneLocal("");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8 md:max-w-4xl md:p-10"
      noValidate
    >
      <input
        type="hidden"
        name="_subject"
        value="Uniway website — contact form"
      />
      <h2 className="text-2xl font-semibold tracking-tight text-brand-navy md:text-3xl">
        Send a message
      </h2>
      <p className="mt-2 text-base leading-relaxed text-brand-navy/80 md:mt-3 md:text-lg md:leading-relaxed">
        Fill in your details and we’ll get back to you as soon as we can.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-1">
          <label htmlFor="firstName" className="text-base font-medium text-foreground">
            First name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={fieldClassWithError(Boolean(errors.firstName))}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            onChange={() => clearFieldError("firstName")}
          />
          {errors.firstName ? (
            <p id="firstName-error" className="text-sm text-red-600" role="alert">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-1">
          <label htmlFor="lastName" className="text-base font-medium text-foreground">
            Last name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={fieldClassWithError(Boolean(errors.lastName))}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            onChange={() => clearFieldError("lastName")}
          />
          {errors.lastName ? (
            <p id="lastName-error" className="text-sm text-red-600" role="alert">
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-1">
          <label htmlFor="phone" className="text-base font-medium text-foreground">
            Phone number <span className="text-brand-orange">*</span>
          </label>
          <div className="flex flex-nowrap gap-3">
            <select
              id="phoneCountry"
              value={phoneCountryIso}
              onChange={(e) => {
                setPhoneCountryIso(e.target.value);
                clearFieldError("phone");
              }}
              className={phoneCountrySelectClass(Boolean(errors.phone))}
              aria-label="Country calling code"
              aria-invalid={Boolean(errors.phone)}
            >
              {PHONE_COUNTRY_OPTIONS.map(({ iso, code, flag, label }) => (
                <option key={iso} value={iso}>
                  {flag} {code} ({label})
                </option>
              ))}
            </select>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phoneLocal}
              onChange={(e) => {
                setPhoneLocal(sanitizeLocalPhoneDigits(e.target.value));
                clearFieldError("phone");
              }}
              className={`${fieldClassWithError(Boolean(errors.phone))} min-w-0 flex-1`}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </div>
          {errors.phone ? (
            <p id="phone-error" className="text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="email" className="text-base font-medium text-foreground">
            Email <span className="text-brand-orange">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={fieldClassWithError(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearFieldError("email")}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label
            htmlFor="fieldOfStudy"
            className="text-base font-medium text-foreground"
          >
            Field of study <span className="text-brand-orange">*</span>
          </label>
          <input
            id="fieldOfStudy"
            name="fieldOfStudy"
            type="text"
            autoComplete="off"
            required
            className={fieldClassWithError(Boolean(errors.fieldOfStudy))}
            aria-invalid={Boolean(errors.fieldOfStudy)}
            aria-describedby={
              errors.fieldOfStudy ? "fieldOfStudy-error" : undefined
            }
            onChange={() => clearFieldError("fieldOfStudy")}
          />
          {errors.fieldOfStudy ? (
            <p
              id="fieldOfStudy-error"
              className="text-sm text-red-600"
              role="alert"
            >
              {errors.fieldOfStudy}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-base font-medium text-foreground">
            Message{" "}
            <span className="text-brand-navy/45">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="min-h-[140px] w-full rounded-xl border border-brand-navy/15 bg-white px-4 py-3 text-lg text-foreground outline-none transition focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/25"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-10 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-orange px-6 text-base font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[160px]"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>

      {status === "success" ? (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          className="mt-8 rounded-2xl border-2 border-emerald-200/90 bg-gradient-to-br from-emerald-50/95 via-white to-brand-navy/[0.03] p-6 shadow-md ring-4 ring-emerald-100/80 motion-safe:transition motion-safe:duration-500 sm:p-8"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex shrink-0 justify-center sm:justify-start">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner sm:h-[4.5rem] sm:w-[4.5rem]">
                <SuccessIcon className="h-8 w-8 sm:h-9 sm:w-9" />
              </span>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold tracking-tight text-brand-navy sm:text-xl">
                We’ve received your message
              </p>
              <p className="mt-2 text-base leading-relaxed text-brand-navy/80 sm:text-[1.0625rem] sm:leading-relaxed">
                Thank you for getting in touch. Your details were sent successfully,
                and our team will review them and respond using the email or phone
                you provided. Keep an eye on your inbox—{" "}
                <span className="font-medium text-brand-navy">
                  we’ll be in touch soon.
                </span>
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-navy">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-brand-orange motion-safe:animate-pulse"
                  aria-hidden
                />
                You’re on our list—no need to send the same form again.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          className="mt-8 rounded-2xl border-2 border-red-200/90 bg-gradient-to-br from-red-50/95 to-white p-6 shadow-md ring-4 ring-red-100/70 motion-safe:transition motion-safe:duration-500 sm:p-8"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex shrink-0 justify-center sm:justify-start">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-700">
                <ErrorIcon className="h-7 w-7" />
              </span>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-brand-navy sm:text-xl">
                We couldn’t send your message
              </p>
              <p className="mt-2 text-base leading-relaxed text-brand-navy/80">
                Something interrupted the submission. Check your internet
                connection, then press{" "}
                <span className="font-semibold text-brand-navy">Submit</span> again.
                If this keeps happening, reach out via WhatsApp or email so we can
                still help you.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
