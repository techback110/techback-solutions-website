import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";
import { getProjectById } from "@/lib/data";

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <>
      <PageTitle title={project.client} description={`Editing “${project.title}”`} />
      <ProjectForm project={project} />
    </>
  );
}
