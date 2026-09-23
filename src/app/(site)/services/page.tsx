import type { Metadata } from "next";
import { CTA } from "@/components/site/CTA";
import { Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceAccordion } from "@/components/site/ServiceAccordion";
import { getServices } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Services",
  description: "Brand identity, websites, product design, e-commerce, motion and growth.",
};

const ENGAGEMENTS = [
  {
    name: "Project",
    price: "From $8k",
    body: "A defined scope with a fixed timeline and fee. Ideal for a new brand, a website or an MVP.",
    points: ["Fixed scope & fee", "Weekly Friday reviews", "Launch support included"],
  },
  {
    name: "Partnership",
    price: "From $6k / mo",
    body: "A dedicated senior squad embedded with your team, shipping continuously month after month.",
    points: ["Design + engineering squad", "Shared Slack & roadmap", "Pause or scale anytime"],
    highlight: true,
  },
  {
    name: "Sprint",
    price: "From $3k",
    body: "One or two focused weeks to unblock a decision: an audit, a prototype, or a strategy workshop.",
    points: ["5–10 working days", "Clear written output", "Credited toward a project"],
  },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Six disciplines, *one* team."
        intro="Strategy, design and engineering under one roof — so ideas survive the journey from workshop to production intact."
      />

      <section className="mx-2 rounded-[2rem] bg-bone py-24 text-ink sm:mx-4 sm:rounded-[3rem] sm:py-32">
        <div className="container-x">
          <ServiceAccordion services={services} defaultOpen={null} />
        </div>
      </section>

      <section className="container-x py-28 sm:py-40">
        <SectionHeading eyebrow="Ways to work together" title="Pick the *shape* that fits." />
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <Reveal
              key={e.name}
              delay={i * 0.1}
              className={
                e.highlight
                  ? "relative flex flex-col rounded-[1.25rem] bg-ember p-8 text-night sm:p-10"
                  : "flex flex-col rounded-[1.25rem] border border-line p-8 sm:p-10"
              }
            >
              {e.highlight && (
                <span className="eyebrow absolute right-6 top-6 rounded-full bg-ink px-3 py-1 text-bone">Most chosen</span>
              )}
              <p className="eyebrow opacity-60">{e.name}</p>
              <p className="display mt-6 text-5xl">{e.price}</p>
              <p className="mt-6 leading-relaxed opacity-75">{e.body}</p>
              <ul className="mt-8 space-y-3 border-t border-current/15 pt-8">
                {e.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className={e.highlight ? "text-night" : "text-ember"}>✳</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-28 sm:pb-40">
        <SectionHeading eyebrow="Process" title="How a project *unfolds.*" />
        <div className="mt-24">
          <Process />
        </div>
      </section>

      <CTA />
    </>
  );
}
