"use client";

import { type FormEvent, useState } from "react";

const fieldClass =
  "h-11 w-full rounded-xl border bg-background px-4 text-base outline-none transition focus:ring-2 focus:ring-black/10";

function fieldClassWithError(hasError: boolean) {
  return `${fieldClass} ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-black/10 focus:border-black/20"
  }`;
}

function isValidEmail(value: string) {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();

    const next: Record<string, string> = {};

    if (!firstName) next.firstName = "First name is required.";
    if (!lastName) next.lastName = "Last name is required.";
    if (!phone) next.phone = "Phone number is required.";
    if (!email) next.email = "Email is required.";
    else if (!isValidEmail(email)) next.email = "Please enter a valid email address.";
    if (!subject) next.subject = "Subject is required.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    alert("Form submitted successfully!");
    form.reset();
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl rounded-2xl border border-black/10 bg-background p-6 shadow-sm sm:p-8"
      noValidate
    >
      <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Fill in your details and we’ll get back to you as soon as we can.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-1">
          <label htmlFor="firstName" className="text-sm font-medium text-foreground">
            First name <span className="text-red-600">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={fieldClassWithError(Boolean(errors.firstName))}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName ? (
            <p id="firstName-error" className="text-sm text-red-600" role="alert">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-1">
          <label htmlFor="lastName" className="text-sm font-medium text-foreground">
            Last name <span className="text-red-600">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className={fieldClassWithError(Boolean(errors.lastName))}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName ? (
            <p id="lastName-error" className="text-sm text-red-600" role="alert">
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-1">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone number <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClassWithError(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="phone-error" className="text-sm text-red-600" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClassWithError(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            autoComplete="off"
            className={fieldClassWithError(Boolean(errors.subject))}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject ? (
            <p id="subject-error" className="text-sm text-red-600" role="alert">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`min-h-[120px] w-full rounded-xl border border-black/10 bg-background px-4 py-3 text-base outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/10`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto sm:min-w-[140px]"
      >
        Submit
      </button>
    </form>
  );
}
