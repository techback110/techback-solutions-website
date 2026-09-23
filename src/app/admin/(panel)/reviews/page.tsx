import Link from "next/link";
import { Badge, Card, Empty, PageTitle } from "@/components/admin/shell";
import { ButtonLink, DeleteButton, ToggleAction } from "@/components/admin/ui";
import { Avatar, Stars } from "@/components/site/Stars";
import { getReviews } from "@/lib/data";
import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { removeReview, toggleReviewApproval } from "../../actions";

function ReviewSection({ title, items }: { title: string; items: Review[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-sm font-medium text-mute">
        {title} ({items.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((r) => (
          <Card key={r.id} className="flex flex-col p-5">
            <div className="flex items-start gap-3">
              <Avatar name={r.author} src={r.avatar_url} className="size-10 text-base" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{r.author}</p>
                <p className="truncate text-xs text-mute">{[r.role, r.company].filter(Boolean).join(", ") || "—"}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Stars rating={r.rating} className="[&_svg]:size-3.5" />
                <div className="flex gap-1">
                  {!r.approved && <Badge tone="warn">Pending</Badge>}
                  {r.featured && <Badge tone="accent">Featured</Badge>}
                </div>
              </div>
            </div>
            <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-bone/75">{r.content}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-xs text-mute">{formatDate(r.created_at)}</span>
              <div className="flex gap-1">
                <ToggleAction action={toggleReviewApproval} id={r.id} field="approved" value={r.approved} on="Unpublish" off="Approve ✓" />
                <Link href={`/admin/reviews/${r.id}`} className="rounded-md px-2.5 py-1.5 text-xs text-bone/80 hover:bg-ink-3">
                  Edit
                </Link>
                <DeleteButton action={removeReview} id={r.id} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default async function ReviewsAdminPage() {
  const reviews = await getReviews({ includePending: true });
  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <>
      <PageTitle
        title="Reviews"
        description="Client testimonials. Reviews submitted on the website wait here for approval."
        actions={<ButtonLink href="/admin/reviews/new">+ Add review</ButtonLink>}
      />
      {reviews.length === 0 ? (
        <Card>
          <Empty title="No reviews yet" body="Add one manually or share the /reviews page with clients." />
        </Card>
      ) : (
        <>
          {pending.length > 0 && <ReviewSection title="Awaiting approval" items={pending} />}
          <ReviewSection title="Published" items={approved} />
        </>
      )}
    </>
  );
}
