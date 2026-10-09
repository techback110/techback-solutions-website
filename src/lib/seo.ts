import type { Metadata } from "next";
import { siteUrl } from "./site";
import type { Service } from "./types";

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * A service page earns indexing by having something to say. Six near-empty URLs
 * dilute the site rather than extending it, so a sparse page is rendered (so it
 * can be previewed and filled in) but kept out of the index and the sitemap.
 * It promotes itself as soon as the copy is there.
 */
export function serviceIsIndexable(service: Service) {
  const hasDepth = wordCount(service.description) >= 120;
  const hasDetail =
    Boolean(service.outcome) ||
    (service.in_scope?.length ?? 0) > 0 ||
    (service.engagement_types?.length ?? 0) > 0;
  return hasDepth && hasDetail;
}

/** Words still needed before the page indexes — surfaced in the admin list. */
export function serviceContentGap(service: Service) {
  return Math.max(0, 120 - wordCount(service.description));
}

/** Self-referential hreflang. One English tree serves every region, so each tag
 *  points at the same canonical rather than at a /en-us duplicate. */
const LOCALES = ["en-IN", "en-US", "en-GB"] as const;

export function canonical(path: string) {
  const base = siteUrl();
  return path === "/" ? base : `${base}${path.replace(/\/+$/, "")}`;
}

export function pageMeta({
  path,
  title,
  description,
  images,
  type = "website",
  publishedTime,
  keywords,
}: {
  path: string;
  title?: string;
  description: string;
  images?: (string | null | undefined)[];
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const url = canonical(path);
  const img = (images ?? []).filter((i): i is string => Boolean(i));
  const languages = Object.fromEntries([
    ...LOCALES.map((l) => [l, url]),
    ["x-default", url],
  ]) as Record<string, string>;

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      ...(title ? { title } : {}),
      description,
      ...(img.length ? { images: img } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      description,
      ...(img.length ? { images: img } : {}),
    },
  };
}
