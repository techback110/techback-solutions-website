import type { Metadata } from "next";
import { CTA } from "@/components/site/CTA";
import { PageHeader } from "@/components/site/PageHeader";
import { WorkIndex } from "@/components/site/WorkIndex";
import { getProjects } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Work",
  description: "Selected brand, web and product projects.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        eyebrow={`Index — ${projects.length} projects`}
        title="Proof, not *promises.*"
        intro="Brands, websites and products we've shaped with ambitious teams. Every project is a partnership — and every one is measured by what it changed."
      />
      <section className="container-x pb-32">
        <WorkIndex projects={projects} />
      </section>
      <CTA />
    </>
  );
}
