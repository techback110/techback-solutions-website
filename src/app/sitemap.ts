import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const projects = await getProjects();
  return [
    ...["", "/work", "/services", "/about", "/reviews", "/contact"].map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
  ];
}
