import Link from "next/link";
import { Badge, Card, Empty, PageTitle, td, th } from "@/components/admin/shell";
import { ButtonLink, DeleteButton } from "@/components/admin/ui";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getProjects } from "@/lib/data";
import { removeProject } from "../../actions";

export default async function ProjectsAdminPage() {
  const projects = await getProjects({ includeDrafts: true });

  return (
    <>
      <PageTitle
        title="Projects"
        description="Case studies shown on the Work page. Featured projects appear on the homepage."
        actions={<ButtonLink href="/admin/projects/new">+ New project</ButtonLink>}
      />
      <Card className="overflow-x-auto">
        {projects.length === 0 ? (
          <Empty title="No projects yet" body="Add your first case study to show it off." action={<ButtonLink href="/admin/projects/new">Add project</ButtonLink>} />
        ) : (
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>Project</th>
                <th className={th}>Category</th>
                <th className={th}>Year</th>
                <th className={th}>Status</th>
                <th className={th}>Order</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-ink-3/40">
                  <td className={td}>
                    <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-3">
                      <ProjectVisual project={p} className="aspect-[4/3] w-16 shrink-0 rounded-md [&_.display]:hidden [&_.eyebrow]:hidden" />
                      <span>
                        <span className="block font-medium">{p.client}</span>
                        <span className="block text-xs text-mute">{p.title}</span>
                      </span>
                    </Link>
                  </td>
                  <td className={td}>{p.category}</td>
                  <td className={td}>{p.year}</td>
                  <td className={td}>
                    <div className="flex gap-1.5">
                      <Badge tone={p.published ? "success" : "neutral"}>{p.published ? "Live" : "Draft"}</Badge>
                      {p.featured && <Badge tone="accent">Featured</Badge>}
                    </div>
                  </td>
                  <td className={`${td} text-mute`}>{p.sort_order}</td>
                  <td className={td}>
                    <div className="flex justify-end gap-1">
                      {p.published && (
                        <Link href={`/work/${p.slug}`} target="_blank" className="rounded-md px-2.5 py-1.5 text-xs text-mute hover:bg-ink-3 hover:text-bone">
                          View
                        </Link>
                      )}
                      <Link href={`/admin/projects/${p.id}`} className="rounded-md px-2.5 py-1.5 text-xs text-bone/80 hover:bg-ink-3">
                        Edit
                      </Link>
                      <DeleteButton action={removeProject} id={p.id} />
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
