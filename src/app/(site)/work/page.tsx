import type { Metadata } from "next";
import { CTA } from "@/components/site/CTA";
import { PageHeader } from "@/components/site/PageHeader";
import { WorkIndex } from "@/components/site/WorkIndex";
import { getProjects } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Work",
  description: "Websites, SaaS platforms, booking portals, operations panels and CRMs we have built.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        eyebrow={`Index — ${projects.length} projects`}
        title="Proof, not *promises.*"
        intro="Live websites and SaaS products, plus confidential platforms — booking portals, operations panels, CRMs, quiz and HR systems — that run our clients' businesses every day."
      />
      <section className="container-x pb-32">
        <WorkIndex projects={projects} />
      </section>
      <CTA />
    </>
  );
}
