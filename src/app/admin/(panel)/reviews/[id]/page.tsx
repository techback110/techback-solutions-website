import { notFound } from "next/navigation";
import { ReviewEditForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";
import { getReviewById } from "@/lib/data";

export default async function EditReviewPage({ params }: PageProps<"/admin/reviews/[id]">) {
  const { id } = await params;
  const review = await getReviewById(id);
  if (!review) notFound();

  return (
    <>
      <PageTitle title={review.author} description="Edit review" />
      <ReviewEditForm review={review} />
    </>
  );
}
