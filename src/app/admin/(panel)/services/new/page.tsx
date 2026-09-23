import { ServiceForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";

export default function NewServicePage() {
  return (
    <>
      <PageTitle title="New service" description="Describe a new offering." />
      <ServiceForm />
    </>
  );
}
