/**
 * Fixed branding and navigation. Contact details, socials, stats, clients and
 * About copy are editable in Admin → Settings (see getSettings in ./data).
 */
export const site = {
  name: "Noyada Studio",
  shortName: "Noyada",
  tagline: "Independent design & engineering studio",
  timezone: "Asia/Kolkata",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/about" },
    { label: "Reviews", href: "/reviews" },
  ],
  budgets: ["< $5k", "$5k – $15k", "$15k – $40k", "$40k +"],
} as const;

/**
 * Public origin without a trailing slash. Uses NEXT_PUBLIC_SITE_URL when it's a
 * usable URL (a missing "https://" is added), else Vercel's production domain,
 * else localhost — so an empty or bare-domain env var can't break the build.
 */
export function siteUrl() {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`).origin;
    } catch {
      // not a URL — try the next candidate
    }
  }
  return "http://localhost:3000";
}
