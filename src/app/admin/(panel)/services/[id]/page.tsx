import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";
import { getServiceById } from "@/lib/data";

export default async function EditServicePage({ params }: PageProps<"/admin/services/[id]">) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <>
      <PageTitle title={service.title} description="Edit service" />
      <ServiceForm service={service} />
    </>
  );
}
