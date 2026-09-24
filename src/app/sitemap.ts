import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const projects = await getProjects();
  return [
    ...["", "/work", "/services", "/about", "/reviews", "/contact"].map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
  ];
}
