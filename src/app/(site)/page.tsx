import Link from "next/link";
import { CTA } from "@/components/site/CTA";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Counter, Reveal } from "@/components/site/motion";
import { Process } from "@/components/site/Process";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ScrollText } from "@/components/site/ScrollText";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceAccordion } from "@/components/site/ServiceAccordion";
import { Testimonials } from "@/components/site/Testimonials";
import { getProjects, getReviews, getServices, getSettings } from "@/lib/data";

export const revalidate = 60;

/* Asymmetric editorial grid: wide / narrow alternating rows. */
const LAYOUT = [
  { className: "md:col-span-7", aspect: "aspect-[4/3]" },
  { className: "md:col-span-5 md:mt-40", aspect: "aspect-[4/5]" },
  { className: "md:col-span-5", aspect: "aspect-[4/5]" },
  { className: "md:col-span-7 md:mt-40", aspect: "aspect-[4/3]" },
];

export default async function HomePage() {
  const [allProjects, services, featuredReviews, allReviews, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getReviews({ featuredOnly: true }),
    getReviews(),
    getSettings(),
  ]);
  const featured = allProjects.filter((p) => p.featured);
  const projects = featured.length ? featured : allProjects;
  const reviews = featuredReviews.length ? featuredReviews : allReviews;

  return (
    <>
      <Hero />

      {settings.clients.length > 0 && (
        <section className="border-y border-line py-10">
          <p className="eyebrow container-x mb-6 text-mute">Trusted by teams who care about craft</p>
          <Marquee items={settings.clients} />
        </section>
      )}

      <section className="container-x py-28 sm:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-mute">
              <span className="text-ember">(01)</span> The studio
            </p>
          </Reveal>
          <div className="md:col-span-9">
            {settings.home_intro && (
              <ScrollText text={settings.home_intro} className="display text-[clamp(2rem,4.4vw,4.3rem)] leading-[1.05]" />
            )}
            <Reveal delay={0.1} className="mt-12">
              <Link href="/about" className="group inline-flex items-center gap-3 text-lg">
                <span className="link-underline">More about the studio</span>
                <span className="grid size-10 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-night">
                  ↗
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="work" className="container-x scroll-mt-20 pb-28 sm:pb-40">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Work that *earns* its place."
          aside={
            <div className="flex flex-col gap-6 md:items-end md:text-right">
              <p className="max-w-xs text-bone/60">
                A few recent collaborations across brand, web and product — each measured by what it changed.
              </p>
              <Link
                href="/work"
                className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-ember hover:bg-ember hover:text-night"
              >
                View all projects ({allProjects.length})
              </Link>
            </div>
          }
        />
        <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-12">
          {projects.slice(0, 4).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} {...LAYOUT[i % LAYOUT.length]} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-bone py-28 text-ink sm:rounded-[3rem] sm:py-40">
        <div className="container-x">
          <SectionHeading
            dark={false}
            index="03"
            eyebrow="Capabilities"
            title="Everything a brand needs to *show up.*"
            aside={
              <p className="max-w-xs text-ink/60 md:ml-auto">
                One team from first workshop to final deploy. Engage us for a single discipline or the whole journey.
              </p>
            }
          />
          <div className="mt-20">
            <ServiceAccordion services={services} />
          </div>

          {settings.stats.length > 0 && (
            <div className="mt-28 grid grid-cols-2 gap-y-12 border-t border-line-ink pt-12 md:grid-cols-4">
              {settings.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <Counter value={s.value} suffix={s.suffix} className="display block text-7xl sm:text-8xl" />
                  <p className="mt-2 text-ink/60">{s.label}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-28 sm:py-40">
        <div className="container-x">
          <SectionHeading index="04" eyebrow="How we work" title="A process built on *clarity.*" />
          <div className="mt-24">
            <Process />
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="container-x py-28 sm:py-40">
          <div className="mb-16 flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-mute">
                <span className="text-ember">(05)</span> Kind words
              </p>
            </Reveal>
            <Reveal>
              <Link href="/reviews" className="link-underline text-sm text-bone/70 hover:text-bone">
                All reviews →
              </Link>
            </Reveal>
          </div>
          <Testimonials reviews={reviews} />
        </section>
      )}

      <CTA />
    </>
  );
}
