"use client";

import { useEffect } from "react";

export default function RedirectToHash({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(hash === "home" ? "/" : `/#${hash}`);
  }, [hash]);

  return (
    <p className="mx-auto max-w-7xl px-5 py-16 text-sm text-brand-navy/70 sm:px-8 lg:px-10">
      Redirecting…
    </p>
  );
}
