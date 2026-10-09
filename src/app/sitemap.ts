import type { MetadataRoute } from "next";
import { getProjects, getServices } from "@/lib/data";
import { serviceIsIndexable } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

const STATIC: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  const now = new Date();

  return [
    ...STATIC.map((s) => ({
      url: `${base}${s.path}`,
      lastModified: now,
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    })),
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "monthly" as const,
      // Featured work is what we most want crawled and ranked.
      priority: p.featured ? 0.9 : 0.7,
      images: [p.cover_image, ...p.gallery].filter((i): i is string => Boolean(i)),
    })),
    // Only services with real copy. A thin page listed here invites a crawl that
    // finds nothing and drags the whole section's quality signal down.
    ...services.filter(serviceIsIndexable).map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
