import Link from "next/link";
import { Badge, Card, Empty, PageTitle, td, th } from "@/components/admin/shell";
import { ButtonLink, DeleteButton } from "@/components/admin/ui";
import { getTeam } from "@/lib/data";
import { removeTeamMember } from "../../actions";

export default async function TeamAdminPage() {
  const team = await getTeam({ includeDrafts: true });

  return (
    <>
      <PageTitle
        title="Team"
        description="The people shown on the Studio page."
        actions={<ButtonLink href="/admin/team/new">+ New member</ButtonLink>}
      />
      <Card className="overflow-x-auto">
        {team.length === 0 ? (
          <Empty
            title="No team members yet"
            body="The team section is hidden on the website until you add someone."
            action={<ButtonLink href="/admin/team/new">Add member</ButtonLink>}
          />
        ) : (
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>Member</th>
                <th className={th}>Role</th>
                <th className={th}>Status</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {team.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-ink-3/40">
                  <td className={td}>
                    <Link href={`/admin/team/${m.id}`} className="flex items-center gap-3">
                      {m.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-supplied hosts
                        <img src={m.photo_url} alt="" className="size-9 rounded-full object-cover" />
                      ) : (
                        <span className="size-9 rounded-full" style={{ background: m.color }} />
                      )}
                      <span className="font-medium">{m.name}</span>
                    </Link>
                  </td>
                  <td className={`${td} text-mute`}>{m.role}</td>
                  <td className={td}>
                    <Badge tone={m.published ? "success" : "neutral"}>{m.published ? "Live" : "Hidden"}</Badge>
                  </td>
                  <td className={td}>
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/team/${m.id}`} className="rounded-md px-2.5 py-1.5 text-xs text-bone/80 hover:bg-ink-3">
                        Edit
                      </Link>
                      <DeleteButton action={removeTeamMember} id={m.id} />
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
