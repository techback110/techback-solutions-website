import { ProjectForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";

export default function NewProjectPage() {
  return (
    <>
      <PageTitle title="New project" description="Add a case study to your portfolio." />
      <ProjectForm />
    </>
  );
}
