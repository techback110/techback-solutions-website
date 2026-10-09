import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CTA } from "@/components/site/CTA";
import { Marquee } from "@/components/site/Marquee";
import { Counter, Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { ScrollText } from "@/components/site/ScrollText";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TeamPortrait } from "@/components/site/TeamPortrait";
import { getSettings, getTeam } from "@/lib/data";
import { pad } from "@/lib/utils";
import { breadcrumbLd, graph, personLd } from "@/lib/jsonLd";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;
export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "Studio",
  description:
    "The studio behind the software: who we are, how we work, and the senior people who stay on your project after launch. Independent, based in Mumbai.",
  images: ["/opengraph-image.png"],
});

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);

  return (
    <>
      <JsonLd
        data={graph(
          ...team.map(personLd),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Studio", path: "/about" },
          ])
        )}
      />
      <PageHeader eyebrow="The studio" title="Small team. *Serious* craft." intro={settings.about_intro || undefined} />

      <section className="border-y border-line py-10">
        <Marquee items={["Strategy", "Identity", "Websites", "Products", "Commerce", "Operations", "Growth"]} />
      </section>

      {settings.about_story && (
        <section className="container-x py-28 sm:py-40">
          <ScrollText
            text={settings.about_story}
            className="display max-w-6xl text-[clamp(2rem,4.4vw,4.3rem)] leading-[1.05]"
          />
        </section>
      )}

      {settings.principles.length > 0 && (
        <section className="container-x pb-28 sm:pb-40">
          <SectionHeading eyebrow="Principles" title="What we *believe.*" />
          <div className="mt-20 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-2">
            {settings.principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-12">
                <span className="eyebrow text-ember">{pad(i + 1)}</span>
                <h3 className="display mt-8 text-4xl sm:text-5xl">{p.title}</h3>
                <p className="mt-4 max-w-md text-bone/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="container-x pb-28 sm:pb-40">
          <SectionHeading eyebrow="People" title="The *team.*" />
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 0.08} className="group">
                <TeamPortrait member={m} />
                <p className="mt-4 font-medium">{m.name}</p>
                <p className="text-sm text-mute">{m.role}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {settings.stats.length > 0 && (
        <section className="mx-2 rounded-[2rem] bg-bone py-24 text-ink sm:mx-4 sm:rounded-[3rem] sm:py-32">
          <div className="container-x grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {settings.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Counter value={s.value} suffix={s.suffix} className="display block text-7xl sm:text-8xl" />
                <p className="mt-2 text-ink/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {settings.founder_letter && (
        <section className="container-x py-28 sm:py-40">
          <SectionHeading eyebrow="From the founder" title="Why we *work* this way." />
          <div className="mt-20 grid gap-12 md:grid-cols-12">
            <div className="space-y-6 md:col-span-7 md:col-start-2">
              {settings.founder_letter.split(/\n{2,}/).map((para) => (
                <Reveal key={para.slice(0, 40)}>
                  <p className="text-lg leading-relaxed text-bone/75">{para}</p>
                </Reveal>
              ))}
              {settings.founder_signature && (
                <Reveal>
                  <p className="eyebrow pt-4 text-mute">{settings.founder_signature}</p>
                </Reveal>
              )}
            </div>
            {settings.continuity_statement && (
              <Reveal delay={0.15} className="md:col-span-3">
                <p className="eyebrow mb-4 text-mute">If I am unavailable</p>
                <p className="leading-relaxed text-bone/60">{settings.continuity_statement}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <div className="h-28 sm:h-40" />
      <CTA />
    </>
  );
}
