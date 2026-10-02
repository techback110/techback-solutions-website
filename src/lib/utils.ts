import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Splits a textarea value into trimmed, non-empty lines. */
export function lines(input: FormDataEntryValue | null) {
  return String(input ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Credential projects: no public link and a client starting with "Confidential". */
export function isConfidential(project: { client: string; live_url: string | null }) {
  return !project.live_url && /^confidential/i.test(project.client.trim());
}
