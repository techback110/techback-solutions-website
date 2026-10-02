import { ArrowUpRight, CalendarCheck, Layers, LayoutDashboard, ListChecks, Users, Workflow } from "lucide-react";
import Link from "next/link";
import { pad } from "@/lib/utils";
import { Reveal } from "./motion";
import { SectionHeading } from "./SectionHeading";

const PLATFORMS = [
  {
    icon: Layers,
    title: "SaaS & multi-tenant platforms",
    body: "Subscription products where every customer gets an isolated workspace, their own branding and their own data — on one codebase that scales from the first tenant to the thousandth.",
    proof: { slug: "arenaos", label: "See ArenaOS" },
  },
  {
    icon: CalendarCheck,
    title: "Booking portals",
    body: "Seats, slots, site visits and shipments — live availability, online payments and instant confirmations your customers can use without calling you.",
    proof: { slug: "cargo-operations", label: "See a cargo booking portal" },
  },
  {
    icon: LayoutDashboard,
    title: "Operations panels & CRM",
    body: "The back office your team lives in: live dashboards, workflows, roles and permissions, and every customer and lead in one place.",
    proof: { slug: "aaran-homes", label: "See AARAN HOMES" },
  },
  {
    icon: ListChecks,
    title: "Quiz & assessment platforms",
    body: "Question banks, timed tests, live leaderboards and results analytics — on web and mobile, built to hold when everyone joins at once.",
    proof: { slug: "quiz-platform", label: "See the quiz platform" },
  },
  {
    icon: Users,
    title: "HR & workforce systems",
    body: "Attendance, leave, payroll reports and shift-by-shift productivity tracking for office teams and on-ground crews alike.",
    proof: { slug: "hr-platform", label: "See the HR platform" },
  },
  {
    icon: Workflow,
    title: "Organising unorganised industries",
    body: "We map how the work really happens — in cargo, real estate, gaming venues — and turn calls, registers and spreadsheets into software the whole team runs on.",
    proof: { slug: "cargo-operations", label: "See how" },
  },
];

const BUILT_IN = [
  "Multi-tenancy",
  "Role-based access",
  "Payments & UPI",
  "GST invoicing",
  "Live dashboards",
  "APIs & integrations",
  "Web & mobile",
  "Cloud or your own servers",
];

/** The "what we build" pitch. Proof links only render for case studies that exist. */
export function Platforms({ index, projectSlugs }: { index?: string; projectSlugs: string[] }) {
  const existing = new Set(projectSlugs);

  return (
    <section className="container-x pb-28 sm:pb-40">
      <SectionHeading
        index={index}
        eyebrow="What we build"
        title="Software that *scales* with you."
        aside={
          <p className="max-w-xs text-bone/60 md:ml-auto md:text-right">
            From a single website to a SaaS serving hundreds of businesses — we design it, build it and run it in the cloud or on your own servers.
          </p>
        }
      />

      <div className="mt-20 grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map(({ icon: Icon, title, body, proof }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.08} className="group flex flex-col bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-full border border-line text-ember transition-colors duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="eyebrow text-mute">{pad(i + 1)}</span>
            </div>
            <h3 className="display mt-10 text-3xl sm:text-4xl">{title}</h3>
            <p className="mt-4 flex-1 leading-relaxed text-bone/60">{body}</p>
            {existing.has(proof.slug) && (
              <Link
                href={`/work/${proof.slug}`}
                className="mt-8 inline-flex items-center gap-1.5 self-start text-sm text-bone/80 transition-colors hover:text-ember"
              >
                <span className="link-underline">{proof.label}</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-2 text-mute">Built in</span>
        {BUILT_IN.map((t) => (
          <span key={t} className="rounded-full border border-line px-4 py-1.5 text-sm text-bone/75">
            {t}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
