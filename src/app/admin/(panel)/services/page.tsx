import Link from "next/link";
import { Badge, Card, Empty, PageTitle, td, th } from "@/components/admin/shell";
import { ButtonLink, DeleteButton } from "@/components/admin/ui";
import { getServices } from "@/lib/data";
import { pad } from "@/lib/utils";
import { removeService } from "../../actions";

export default async function ServicesAdminPage() {
  const services = await getServices({ includeDrafts: true });

  return (
    <>
      <PageTitle
        title="Services"
        description="What the studio offers. Shown on the homepage, Services page and contact form."
        actions={<ButtonLink href="/admin/services/new">+ New service</ButtonLink>}
      />
      <Card className="overflow-x-auto">
        {services.length === 0 ? (
          <Empty title="No services yet" action={<ButtonLink href="/admin/services/new">Add service</ButtonLink>} />
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>#</th>
                <th className={th}>Service</th>
                <th className={th}>Deliverables</th>
                <th className={th}>Status</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {services.map((s, i) => (
                <tr key={s.id} className="transition-colors hover:bg-ink-3/40">
                  <td className={`${td} font-mono text-xs text-mute`}>{pad(i + 1)}</td>
                  <td className={td}>
                    <Link href={`/admin/services/${s.id}`} className="block">
                      <span className="block font-medium">{s.title}</span>
                      <span className="block max-w-md truncate text-xs text-mute">{s.summary}</span>
                    </Link>
                  </td>
                  <td className={`${td} text-mute`}>{s.deliverables.length}</td>
                  <td className={td}>
                    <Badge tone={s.published ? "success" : "neutral"}>{s.published ? "Live" : "Draft"}</Badge>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/services/${s.id}`} className="rounded-md px-2.5 py-1.5 text-xs text-bone/80 hover:bg-ink-3">
                        Edit
                      </Link>
                      <DeleteButton action={removeService} id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
