import { notFound } from "next/navigation";
import { TeamForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";
import { getTeamMemberById } from "@/lib/data";

export default async function EditTeamMemberPage({ params }: PageProps<"/admin/team/[id]">) {
  const { id } = await params;
  const member = await getTeamMemberById(id);
  if (!member) notFound();

  return (
    <>
      <PageTitle title={member.name} description="Edit team member" />
      <TeamForm member={member} />
    </>
  );
}
