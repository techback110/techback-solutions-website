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
