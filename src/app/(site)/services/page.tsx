import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CTA } from "@/components/site/CTA";
import { Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceAccordion } from "@/components/site/ServiceAccordion";
import { getServices } from "@/lib/data";
import { pad } from "@/lib/utils";
import { breadcrumbLd, graph, serviceListLd } from "@/lib/jsonLd";
import { pageMeta } from "@/lib/seo";

export const revalidate = 60;
export const metadata: Metadata = pageMeta({
  path: "/services",
  title: "Services",
  description:
    "Brand identity, websites, product design, e-commerce, operations panels, CRMs and growth. Design and engineering under one roof, out of Mumbai.",
  images: ["/opengraph-image.png"],
});

const ENGAGEMENTS = [
  {
    name: "Project",
    body: "A defined scope with a clear timeline. Ideal for a new brand, a website or an MVP.",
    points: ["Fixed scope & timeline", "Weekly progress reviews", "Launch support included"],
  },
  {
    name: "Partnership",
    body: "A dedicated squad embedded with your team, shipping continuously month after month.",
    points: ["Design + engineering squad", "Shared roadmap & updates", "Scale up or down anytime"],
    highlight: true,
  },
  {
    name: "SaaS",
    body: "We design, build and run your software product, from first version to paying customers.",
    points: ["Multi-tenant platform", "Subscriptions & user accounts", "Hosting & ongoing support"],
  },
  {
    name: "Consultancy",
    body: "Expert guidance on product, technology and operations when you need a clear direction.",
    points: ["Technical & UX audits", "Architecture & roadmaps", "Clear written recommendations"],
  },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <JsonLd
        data={graph(
          serviceListLd(services),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <PageHeader
        eyebrow="Capabilities"
        title="Six disciplines, *one* team."
        intro="Strategy, design and engineering under one roof, so ideas survive the journey from workshop to production intact."
      />

      <section className="mx-2 rounded-[2rem] bg-bone py-24 text-ink sm:mx-4 sm:rounded-[3rem] sm:py-32">
        <div className="container-x">
          <ServiceAccordion services={services} defaultOpen={null} />
        </div>
      </section>

      <section className="container-x py-28 sm:py-40">
        <SectionHeading eyebrow="Ways to work together" title="Pick the *shape* that fits." />
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              <p className="eyebrow opacity-60">{pad(i + 1)}</p>
              <h3 className="display mt-6 text-5xl xl:text-[2.75rem]">{e.name}</h3>
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
