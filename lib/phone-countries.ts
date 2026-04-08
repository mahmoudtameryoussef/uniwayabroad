import raw from "./phone-countries-data.json";

type RawRow = {
  name: string;
  iso: string;
  flag: string;
  dialCode: string;
};

export type PhoneCountryOption = {
  iso: string;
  /** Normalised calling prefix, e.g. "+49", "+1684" */
  code: string;
  flag: string;
  label: string;
};

/**
 * Turn gist dial strings into a single +digits prefix (hyphens removed,
 * "and …" second codes dropped).
 */
function normalizeDialCode(dialCode: string): string | null {
  let d = dialCode.trim();
  if (!d.startsWith("+")) return null;
  const firstPart = d.split(/\s+and\s+/i)[0]?.trim() ?? d;
  const digits = firstPart.slice(1).replace(/\D/g, "");
  if (!digits) return null;
  return `+${digits}`;
}

export const PHONE_COUNTRY_OPTIONS: PhoneCountryOption[] = (raw as RawRow[])
  .map((row) => {
    const code = normalizeDialCode(row.dialCode);
    if (!code) return null;
    return {
      iso: row.iso,
      code,
      flag: row.flag,
      label: row.name.trim(),
    };
  })
  .filter((row): row is PhoneCountryOption => row !== null)
  .sort((a, b) => a.label.localeCompare(b.label, "en"));

const dialByIso = new Map(
  PHONE_COUNTRY_OPTIONS.map((o) => [o.iso, o.code] as const),
);

/** Default Egypt if ISO missing from dataset */
export function dialCodeForCountryIso(iso: string): string {
  return dialByIso.get(iso) ?? "+20";
}

export const DEFAULT_PHONE_COUNTRY_ISO = "EG";
