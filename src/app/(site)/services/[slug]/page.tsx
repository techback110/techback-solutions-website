import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTA } from "@/components/site/CTA";
import { Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getProjects, getServices } from "@/lib/data";
import { breadcrumbLd, graph, serviceLd } from "@/lib/jsonLd";
import { pageMeta, serviceIsIndexable } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

async function findService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await findService(slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: false } };

  const meta = pageMeta({
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.summary || service.description.slice(0, 160),
    images: ["/opengraph-image.png"],
    keywords: service.deliverables.slice(0, 8),
  });
  // Thin pages render for preview but stay out of the index until they earn it.
  return serviceIsIndexable(service) ? meta : { ...meta, robots: { index: false, follow: true } };
}

function Facts({ items }: { items: [string, string][] }) {
  if (items.length === 0) return null;
  return (
    <Reveal className="mt-14 grid gap-px overflow-hidden border-y border-line sm:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="py-6 sm:px-6 sm:first:pl-0">
          <p className="eyebrow text-mute">{label}</p>
          <p className="mt-2 text-lg">{value}</p>
        </div>
      ))}
    </Reveal>
  );
}

function List({ title, items, marker }: { title: string; items: string[]; marker: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="eyebrow text-mute">{title}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-bone/75">
            <span className="text-ember">{marker}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, projects] = await Promise.all([findService(slug), getProjects()]);
  if (!service) notFound();

  const samples = (service.sample_project_slugs ?? [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const facts: [string, string][] = [
    ...(service.timeline_weeks ? ([["Typical timeline", service.timeline_weeks]] as [string, string][]) : []),
    ...(service.starting_from ? ([["Starting from", service.starting_from]] as [string, string][]) : []),
    ...((service.engagement_types?.length ?? 0) > 0
      ? ([["Engagement", service.engagement_types!.join(", ")]] as [string, string][])
      : []),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          serviceLd(service),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ])
        )}
      />

      <div className="container-x pt-32 sm:pt-44">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]}
        />
      </div>

      <PageHeader eyebrow="Service" title={service.title} intro={service.summary || undefined} />

      <section className="container-x pb-24 sm:pb-32">
        {service.outcome && (
          <Reveal>
            <p className="display max-w-[22ch] text-[clamp(2rem,4vw,3.6rem)] leading-[1.1]">{service.outcome}</p>
          </Reveal>
        )}

        {service.description && (
          <Reveal delay={0.1} className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-bone/70">
            {service.description.split(/\n{2,}/).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>
        )}

        <Facts items={facts} />

        <div className="mt-20 grid gap-14 md:grid-cols-2">
          <List title="What you get" items={service.deliverables} marker="✳" />
          <List title="In scope" items={service.in_scope ?? []} marker="✳" />
        </div>

        {(service.out_of_scope?.length ?? 0) > 0 && (
          <div className="mt-14 max-w-xl">
            <List title="Not included" items={service.out_of_scope!} marker="·" />
          </div>
        )}
      </section>

      {samples.length > 0 && (
        <section className="container-x pb-28 sm:pb-40">
          <SectionHeading eyebrow="Proof" title="Work this *produced.*" />
          <div className="mt-20 grid gap-8 md:grid-cols-2">
            {samples.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} aspect="aspect-[4/3]" />
            ))}
          </div>
        </section>
      )}

      <section className="container-x pb-28 sm:pb-40">
        <SectionHeading eyebrow="Process" title="How it *unfolds.*" />
        <div className="mt-24">
          <Process />
        </div>
      </section>

      <CTA />
    </>
  );
}
