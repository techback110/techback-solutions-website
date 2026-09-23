import { ReviewEditForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";

export default function NewReviewPage() {
  return (
    <>
      <PageTitle title="Add review" description="Add a testimonial you received elsewhere." />
      <ReviewEditForm />
    </>
  );
}
