import { serviceContentGap, serviceIsIndexable } from "./seo";
import type { Project, Review, Service, SiteSettings, TeamMember } from "./types";

export type Gap = {
  label: string;
  /** What filling this in actually turns on. */
  unlocks: string;
  href: string;
  severity: "blocking" | "recommended";
};

/* The exact label+value pairs shipped with the template. Matching on value
   alone would flag a genuine "9 years in practice" forever, with no way to
   clear it, so both have to match before this is called a placeholder. */
const PLACEHOLDER_STATS = [
  { label: "Projects shipped", value: 120 },
  { label: "Years in practice", value: 9 },
  { label: "Countries served", value: 14 },
  { label: "Clients who return", value: 98 },
];
const isFreeMail = (email: string) =>
  /@(gmail|yahoo|hotmail|outlook|rediffmail|proton(mail)?)\./i.test(email);
const isBareDomain = (href: string) => {
  try {
    return new URL(href).pathname.replace(/\/+$/, "").length === 0;
  } catch {
    return true;
  }
};

export function contentGaps({
  settings,
  services,
  projects,
  reviews,
  team,
}: {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  reviews: Review[];
  team: TeamMember[];
}): Gap[] {
  const gaps: Gap[] = [];
  const S = "/admin/settings";

  // --- trust: things that are currently wrong rather than merely absent
  if (settings.stats.some((s) => PLACEHOLDER_STATS.some((p) => p.label === s.label && p.value === s.value))) {
    gaps.push({
      label: "About page still shows the template's invented statistics",
      unlocks: "Removes a claim you cannot substantiate",
      href: S,
      severity: "blocking",
    });
  }
  if (settings.email && isFreeMail(settings.email)) {
    gaps.push({
      label: "Studio email is a personal free-mail address",
      unlocks: "Credibility, and deliverability once SPF/DKIM are set up",
      href: S,
      severity: "blocking",
    });
  }
  const bare = settings.socials.filter((s) => isBareDomain(s.href));
  if (bare.length) {
    gaps.push({
      label: `${bare.length} social link${bare.length > 1 ? "s" : ""} point at a bare domain`,
      unlocks: "Organization.sameAs — a broken link here damages the knowledge panel",
      href: S,
      severity: "blocking",
    });
  }

  // --- things that switch features on
  if (!settings.hq && !settings.address) {
    gaps.push({
      label: "No headquarters or address",
      unlocks: "LocalBusiness schema and local-pack eligibility",
      href: S,
      severity: "blocking",
    });
  }
  if (!settings.legal_entity) {
    gaps.push({ label: "No registered entity name", unlocks: "Footer and procurement checks", href: S, severity: "recommended" });
  }
  if (!settings.gstin) {
    gaps.push({ label: "No GSTIN", unlocks: "Invoicing credibility for Indian clients", href: S, severity: "recommended" });
  }
  if (!settings.founder_letter) {
    gaps.push({ label: "No founder letter", unlocks: "The About page section is built and waiting", href: S, severity: "recommended" });
  }
  if (!settings.reply_time_promise) {
    gaps.push({ label: "No reply-time promise", unlocks: "Shown on the CTA band and contact page", href: S, severity: "recommended" });
  }

  // --- services: the single biggest SEO lever
  const thin = services.filter((s) => !serviceIsIndexable(s));
  for (const s of thin) {
    const words = serviceContentGap(s);
    gaps.push({
      label: `“${s.title}” needs ${words > 0 ? `${words} more words` : "an outcome, scope or engagement type"}`,
      unlocks: "Indexes /services/" + s.slug + " and adds it to the sitemap",
      href: `/admin/services`,
      severity: "blocking",
    });
  }

  // --- proof
  const noImage = projects.filter((p) => !p.cover_image && p.gallery.length === 0);
  if (noImage.length) {
    gaps.push({
      label: `${noImage.length} of ${projects.length} projects have no images`,
      unlocks: "Real screenshots instead of generated posters, plus image search",
      href: "/admin/projects",
      severity: "recommended",
    });
  }
  const unverified = reviews.filter((r) => r.approved && !(r.verification_source && r.source_url));
  if (unverified.length) {
    gaps.push({
      label: `${unverified.length} approved review${unverified.length > 1 ? "s are" : " is"} not independently verifiable`,
      unlocks: "Review and AggregateRating rich results",
      href: "/admin/reviews",
      severity: "recommended",
    });
  }
  const noBio = team.filter((m) => m.published && !m.bio);
  if (noBio.length) {
    gaps.push({
      label: `${noBio.length} published team member${noBio.length > 1 ? "s have" : " has"} no bio`,
      unlocks: "Person schema detail on the Studio page",
      href: "/admin/team",
      severity: "recommended",
    });
  }

  return gaps;
}
