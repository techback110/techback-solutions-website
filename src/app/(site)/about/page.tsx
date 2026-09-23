import type { Metadata } from "next";
import { CTA } from "@/components/site/CTA";
import { Marquee } from "@/components/site/Marquee";
import { Counter, Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { ScrollText } from "@/components/site/ScrollText";
import { SectionHeading } from "@/components/site/SectionHeading";
import { site } from "@/lib/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Studio",
  description: `About ${site.name} — who we are and how we think.`,
};

const PRINCIPLES = [
  { title: "Craft is a strategy", body: "Details compound. The last 10% of polish is what people remember and what competitors can't copy." },
  { title: "Senior hands only", body: "The people you meet in the pitch are the people doing the work. No juniors hidden behind a deck." },
  { title: "Measure what matters", body: "Beautiful is the baseline. We agree on the numbers that define success before we start." },
  { title: "Small on purpose", body: "We take on a handful of projects at a time so each one gets our full attention." },
];

const TEAM = [
  { name: "Arman Noyada", role: "Founder, Engineering", hue: "#ff4d1c" },
  { name: "Isha Kapoor", role: "Design Director", hue: "#c08552" },
  { name: "Leo Fernandes", role: "Brand & Motion", hue: "#6e8b74" },
  { name: "Nina Das", role: "Product Strategy", hue: "#3f5e8c" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title="Small team. *Serious* craft."
        intro={`${site.name} is an independent design and engineering studio. We partner with founders and marketing teams who want work that looks considered and performs in the real world.`}
      />

      <section className="border-y border-line py-10">
        <Marquee items={["Strategy", "Identity", "Websites", "Products", "Commerce", "Motion", "Growth"]} />
      </section>

      <section className="container-x py-28 sm:py-40">
        <ScrollText
          text="We started as two people who were tired of beautiful websites that didn't work and functional products nobody loved. Nine years later we're still small, still hands-on, and still obsessed with getting both right at the same time."
          className="display max-w-6xl text-[clamp(2rem,4.4vw,4.3rem)] leading-[1.05]"
        />
      </section>

      <section className="container-x pb-28 sm:pb-40">
        <SectionHeading eyebrow="Principles" title="What we *believe.*" />
        <div className="mt-20 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-12">
              <span className="eyebrow text-ember">{pad(i + 1)}</span>
              <h3 className="display mt-8 text-4xl sm:text-5xl">{p.title}</h3>
              <p className="mt-4 max-w-md text-bone/60">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-28 sm:pb-40">
        <SectionHeading eyebrow="People" title="The *team.*" />
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="group">
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-[6px]"
                style={{ background: `color-mix(in oklab, ${m.hue} 22%, var(--color-ink))` }}
              >
                <div
                  className="absolute bottom-0 left-1/2 aspect-square w-[70%] -translate-x-1/2 translate-y-1/3 rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-1/4 group-hover:scale-110"
                  style={{ background: m.hue }}
                />
                <div
                  className="absolute left-1/2 top-[30%] aspect-square w-[34%] -translate-x-1/2 rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2"
                  style={{ background: m.hue }}
                />
              </div>
              <p className="mt-4 font-medium">{m.name}</p>
              <p className="text-sm text-mute">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-2 rounded-[2rem] bg-bone py-24 text-ink sm:mx-4 sm:rounded-[3rem] sm:py-32">
        <div className="container-x grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <Counter value={s.value} suffix={s.suffix} className="display block text-7xl sm:text-8xl" />
              <p className="mt-2 text-ink/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="h-28 sm:h-40" />
      <CTA />
    </>
  );
}
