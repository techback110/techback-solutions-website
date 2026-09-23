import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/site/CTA";
import { Reveal, SplitText } from "@/components/site/motion";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getProjectBySlug, getProjects } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.client} — ${project.title}`, description: project.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProjectBySlug(slug), getProjects()]);
  if (!project) notFound();

  const idx = all.findIndex((p) => p.id === project.id);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <header className="container-x pb-16 pt-40 sm:pt-52">
        <Reveal>
          <Link href="/work" className="eyebrow mb-10 inline-flex items-center gap-2 text-mute hover:text-bone">
            ← All work
          </Link>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p className="eyebrow mb-6" style={{ color: project.accent }}>
                {project.client}
              </p>
            </Reveal>
            <SplitText as="h1" immediate text={project.title} className="display text-[clamp(3rem,8vw,8.5rem)]" />
          </div>
          <Reveal delay={0.4} className="md:col-span-4">
            <p className="text-lg leading-relaxed text-bone/70">{project.summary}</p>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
            {[
              ["Client", project.client],
              ["Discipline", project.category],
              ["Year", String(project.year)],
              ["Scope", project.tags.join(", ") || "—"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow text-mute">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <Reveal y={60} className="container-x">
        <ProjectVisual project={project} large className="aspect-[16/9] w-full rounded-[6px]" />
      </Reveal>

      <section className="container-x grid gap-12 py-28 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-mute">
            <span className="text-ember">(01)</span> The story
          </p>
        </Reveal>
        <div className="space-y-6 md:col-span-8">
          {project.description.split(/\n\s*\n/).map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12]" : "text-lg leading-relaxed text-bone/70"}>
                {para}
              </p>
            </Reveal>
          ))}
          {project.live_url && (
            <Reveal>
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-ember hover:bg-ember hover:text-night"
              >
                Visit live site ↗
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {project.metrics.length > 0 && (
        <section className="container-x pb-28">
          <div className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-ink p-10">
                <p className="display text-7xl" style={{ color: project.accent }}>
                  {m.value}
                </p>
                <p className="mt-3 text-bone/60">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="container-x grid gap-6 pb-28 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 0.1} className={i % 3 === 0 ? "md:col-span-2" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-provided remote URLs */}
              <img src={src} alt={`${project.client} gallery image ${i + 1}`} className="w-full rounded-[6px] object-cover" loading="lazy" />
            </Reveal>
          ))}
        </section>
      )}

      {next && next.id !== project.id && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line" data-cursor="Next">
          <div className="container-x grid items-center gap-10 py-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-mute">Next project</p>
              <p className="display mt-4 text-[clamp(3rem,8vw,8rem)] transition-colors duration-500 group-hover:text-ember">
                {next.client}
              </p>
            </div>
            <div className="overflow-hidden rounded-[6px] md:col-span-5">
              <ProjectVisual project={next} className="aspect-[16/10]" />
            </div>
          </div>
        </Link>
      )}

      <CTA />
    </>
  );
}
