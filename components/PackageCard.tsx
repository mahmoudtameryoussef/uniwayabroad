import Link from "next/link";

export type PackageCardProps = {
  title: string;
  description?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function PackageCard({
  title,
  description,
  features = [],
  ctaLabel = "Learn more",
  ctaHref = "/contact",
}: PackageCardProps) {
  return (
    <article className="rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-brand-navy">
          {title}
        </h3>
        {description ? (
          <p className="text-sm leading-6 text-brand-navy/75">{description}</p>
        ) : null}
      </div>

      {features.length ? (
        <ul className="mt-4 space-y-2 text-sm text-brand-navy/85">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden className="mt-0.5 text-brand-orange">
                •
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6">
        <Link
          href={ctaHref}
          className="inline-flex h-9 items-center justify-center rounded-full bg-brand-orange px-4 text-sm font-medium text-white transition-colors hover:brightness-110"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}

