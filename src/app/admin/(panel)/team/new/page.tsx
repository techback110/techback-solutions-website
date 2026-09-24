import { TeamForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";

export default function NewTeamMemberPage() {
  return (
    <>
      <PageTitle title="New team member" description="Add someone to the Studio page." />
      <TeamForm />
    </>
  );
}
