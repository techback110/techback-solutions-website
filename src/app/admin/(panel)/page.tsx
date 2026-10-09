import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge, Card, PageTitle } from "@/components/admin/shell";
import { ButtonLink } from "@/components/admin/ui";
import { contentGaps } from "@/lib/content-health";
import { getInquiries, getProjects, getReviews, getServices, getSettings, getTeam } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const [projects, services, reviews, inquiries, settings, team] = await Promise.all([
    getProjects({ includeDrafts: true }),
    getServices({ includeDrafts: true }),
    getReviews({ includePending: true }),
    getInquiries(),
    getSettings(),
    getTeam({ includeDrafts: true }),
  ]);

  const gaps = contentGaps({ settings, services, projects, reviews, team });
  const blocking = gaps.filter((g) => g.severity === "blocking");

  const approved = reviews.filter((r) => r.approved);
  const avg = approved.length ? approved.reduce((s, r) => s + r.rating, 0) / approved.length : 0;
  const unread = inquiries.filter((i) => !i.read).length;
  const pending = reviews.filter((r) => !r.approved);

  const stats = [
    { label: "Projects", value: projects.length, sub: `${projects.filter((p) => p.featured).length} featured`, href: "/admin/projects" },
    { label: "Services", value: services.length, sub: `${services.filter((s) => s.published).length} published`, href: "/admin/services" },
    { label: "Avg. rating", value: avg ? avg.toFixed(1) : "—", sub: `${approved.length} approved reviews`, href: "/admin/reviews" },
    { label: "New inquiries", value: unread, sub: `${inquiries.length} total`, href: "/admin/inquiries" },
  ];

  return (
    <>
      <PageTitle
        title="Overview"
        description="Everything happening across the studio website."
        actions={<ButtonLink href="/admin/projects/new">+ New project</ButtonLink>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <Card className="p-5 transition-colors group-hover:border-bone/25">
              <div className="flex items-center justify-between text-sm text-mute">
                {s.label}
                <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="display mt-3 text-5xl">{s.value}</p>
              <p className="mt-1 text-xs text-mute">{s.sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      {gaps.length > 0 && (
        <Card className="mt-6">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="font-medium">Before launch</h2>
              <p className="mt-0.5 text-xs text-mute">
                What is still missing, and what each one switches on.
              </p>
            </div>
            <Badge tone={blocking.length ? "warn" : "neutral"}>{blocking.length} blocking</Badge>
          </div>
          <ul className="divide-y divide-line">
            {gaps.map((g) => (
              <li key={g.label} className="flex items-start gap-4 px-5 py-4">
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${
                    g.severity === "blocking" ? "bg-ember" : "bg-ink-3"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{g.label}</p>
                  <p className="mt-1 text-xs text-mute">{g.unlocks}</p>
                </div>
                <Link
                  href={g.href}
                  className="shrink-0 text-xs text-mute transition-colors hover:text-bone"
                >
                  Fix →
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-medium">Latest inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-mute hover:text-bone">
              View all →
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-mute">No inquiries yet. They&apos;ll appear here when someone uses the contact form.</p>
          ) : (
            <ul className="divide-y divide-line">
              {inquiries.slice(0, 5).map((i) => (
                <li key={i.id} className="flex items-start gap-4 px-5 py-4">
                  <span className={`mt-2 size-2 shrink-0 rounded-full ${i.read ? "bg-ink-3" : "bg-ember"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {i.name} <span className="font-normal text-mute">· {i.email}</span>
                    </p>
                    <p className="mt-1 truncate text-sm text-bone/60">{i.message}</p>
                  </div>
                  <span className="shrink-0 text-xs text-mute">{formatDate(i.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-medium">Awaiting approval</h2>
            <Badge tone={pending.length ? "warn" : "neutral"}>{pending.length}</Badge>
          </div>
          {pending.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-mute">All caught up — no reviews to moderate.</p>
          ) : (
            <ul className="divide-y divide-line">
              {pending.slice(0, 4).map((r) => (
                <li key={r.id} className="px-5 py-4">
                  <Link href={`/admin/reviews/${r.id}`} className="block hover:opacity-80">
                    <p className="text-sm font-medium">
                      {r.author} <span className="text-ember">{"★".repeat(r.rating)}</span>
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-bone/60">{r.content}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
