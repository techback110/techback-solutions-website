import { site, siteUrl } from "./site";
import type { Project, Review, Service, SiteSettings, TeamMember } from "./types";

type Json = Record<string, unknown>;

/** Stable @id values so Organization, Person and CreativeWork resolve to one graph. */
export const orgId = () => `${siteUrl()}/#organization`;
export const webId = () => `${siteUrl()}/#website`;
export const personId = (member: Pick<TeamMember, "name">) =>
  `${siteUrl()}/about#${member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** A bare domain in sameAs produces a dead knowledge-panel link, so require a path. */
function profileLinks(settings: SiteSettings) {
  return settings.socials
    .map((s) => s.href?.trim())
    .filter((href): href is string => Boolean(href))
    .filter((href) => {
      try {
        return new URL(href).pathname.replace(/\/+$/, "").length > 0;
      } catch {
        return false;
      }
    });
}

function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v == null || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    })
  );
}

export function organizationLd(settings: SiteSettings): Json {
  const base = siteUrl();
  return compact({
    "@type": "Organization",
    "@id": orgId(),
    name: settings.legal_entity || site.name,
    alternateName: site.shortName,
    url: base,
    logo: `${base}/icon-512.png`,
    image: `${base}/icon-512.png`,
    description: settings.description,
    email: settings.email,
    telephone: settings.phone,
    sameAs: profileLinks(settings),
    address: settings.address
      ? compact({ "@type": "PostalAddress", streetAddress: settings.address, addressCountry: "IN" })
      : undefined,
    areaServed: settings.regions.length ? settings.regions : undefined,
  });
}

export function websiteLd(settings: SiteSettings): Json {
  const base = siteUrl();
  return compact({
    "@type": "WebSite",
    "@id": webId(),
    url: base,
    name: site.name,
    description: settings.description,
    publisher: { "@id": orgId() },
    inLanguage: "en",
  });
}

/** Hybrid type: ProfessionalService inherits LocalBusiness, which is what the
 *  local pack reads. Only emitted when there is a real address to back it up. */
export function localBusinessLd(settings: SiteSettings): Json | null {
  if (!settings.address && !settings.hq) return null;
  const base = siteUrl();
  return compact({
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${base}/#localbusiness`,
    name: settings.legal_entity || site.name,
    url: base,
    image: `${base}/icon-512.png`,
    email: settings.email,
    telephone: settings.phone,
    parentOrganization: { "@id": orgId() },
    address: compact({
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.hq,
      addressCountry: "IN",
    }),
    areaServed: settings.regions.length ? settings.regions : undefined,
    openingHours: settings.office_hours || undefined,
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "SaaS development",
      "CRM development",
      "Operations software",
      "Shopify Headless",
      "Brand identity",
    ],
  });
}

export function serviceLd(service: Service): Json {
  const base = siteUrl();
  return compact({
    "@type": "Service",
    // Keyed to the detail page so the node does not collide with the copy
    // emitted inside the /services ItemList, and so url matches the canonical.
    "@id": `${base}/services/${service.slug}#service`,
    name: service.title,
    description: service.summary || service.description,
    serviceType: service.title,
    provider: { "@id": orgId() },
    url: `${base}/services/${service.slug}`,
    offers: service.starting_from
      ? compact({
          "@type": "Offer",
          price: service.starting_from.replace(/[^\d.]/g, "") || undefined,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        })
      : undefined,
  });
}

export function serviceListLd(services: Service[]): Json {
  return {
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: serviceLd(s),
    })),
  };
}

export function creativeWorkLd(project: Project): Json {
  const base = siteUrl();
  return compact({
    "@type": "CreativeWork",
    "@id": `${base}/work/${project.slug}#work`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: `${base}/work/${project.slug}`,
    image: project.cover_image || project.gallery[0] || `${base}/opengraph-image.png`,
    creator: { "@id": orgId() },
    datePublished: project.created_at,
    keywords: project.tags.length ? project.tags.join(", ") : undefined,
    about: project.industry || project.category,
    genre: project.category,
  });
}

export function videoLd(project: Project): Json | null {
  if (!project.video_url) return null;
  return compact({
    "@type": "VideoObject",
    name: `${project.client} — ${project.title}`,
    description: project.summary,
    contentUrl: project.video_url,
    thumbnailUrl: project.cover_image || undefined,
    uploadDate: project.created_at,
  });
}

export function breadcrumbLd(trail: { name: string; path: string }[]): Json {
  const base = siteUrl();
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${base}${c.path}`,
    })),
  };
}

/** Google strips self-serving review markup, and it damages trust when it is
 *  caught. Only reviews with an independent source are described. */
export function reviewsLd(reviews: Review[]): Json | null {
  const verified = reviews.filter(
    (r) => r.approved && r.verification_source && r.source_url && r.permission_granted
  );
  if (verified.length === 0) return null;
  const avg = verified.reduce((n, r) => n + r.rating, 0) / verified.length;
  return {
    "@type": "Organization",
    "@id": orgId(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: verified.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: verified.map((r) =>
      compact({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        reviewBody: r.quote_short || r.content,
        datePublished: r.created_at,
        url: r.source_url,
      })
    ),
  };
}

export function personLd(member: TeamMember): Json {
  return compact({
    "@type": "Person",
    "@id": personId(member),
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.photo_url || undefined,
    worksFor: { "@id": orgId() },
    knowsAbout: member.specialty || undefined,
    sameAs: [member.linkedin_url, member.github_url].filter(Boolean),
  });
}

/** Wraps nodes in one @graph so crawlers see a single connected entity set. */
export function graph(...nodes: (Json | null | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
