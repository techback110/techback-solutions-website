import type { Metadata } from "next";
import { ReviewForm } from "@/components/site/forms";
import { Reveal } from "@/components/site/motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Avatar, Stars } from "@/components/site/Stars";
import { getReviews } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Reviews",
  description: "What our clients say about working with us.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <>
      <PageHeader
        eyebrow="Client reviews"
        title="In their *own* words."
        intro={
          reviews.length
            ? "We measure our work by the relationships it builds. Here's what the teams we've partnered with have to say."
            : "We measure our work by the relationships it builds. Reviews from the teams we've partnered with will appear here."
        }
      />

      {reviews.length === 0 && (
        <section className="container-x pb-16">
          <Reveal className="flex flex-col gap-6 rounded-[1.25rem] border border-dashed border-line p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="max-w-xl text-lg text-bone/70">
              We&apos;re collecting reviews from recent clients. Worked with us? Yours could be the first one here.
            </p>
            <a
              href="#write"
              className="shrink-0 self-start rounded-full bg-ember px-6 py-3 text-sm font-medium text-night transition-colors hover:bg-ember-2 sm:self-auto"
            >
              Write a review ↓
            </a>
          </Reveal>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="container-x pb-10">
          <Reveal className="flex flex-wrap items-end gap-x-10 gap-y-4 border-b border-line pb-10">
            <p className="display text-8xl">{avg.toFixed(1)}</p>
            <div className="pb-3">
              <Stars rating={Math.round(avg)} />
              <p className="mt-2 text-mute">Average from {reviews.length} verified reviews</p>
            </div>
          </Reveal>
        </section>
      )}

      <section className="container-x columns-1 gap-6 py-16 md:columns-2 lg:columns-3">
        {reviews.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
            <figure className="rounded-[1.25rem] border border-line bg-ink-2 p-8 transition-colors duration-500 hover:border-bone/25">
              <Stars rating={r.rating} />
              <blockquote className="mt-6 text-lg leading-relaxed text-bone/85">&ldquo;{r.content}&rdquo;</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <Avatar name={r.author} src={r.avatar_url} className="size-11" />
                <div>
                  <p className="font-medium">{r.author}</p>
                  <p className="text-sm text-mute">{[r.role, r.company].filter(Boolean).join(", ")}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </section>

      <section id="write" className="container-x grid scroll-mt-24 gap-16 border-t border-line py-28 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 text-mute">Worked with us?</p>
            <h2 className="display text-[clamp(2.6rem,5vw,5rem)]">
              Leave a <em className="text-ember">review.</em>
            </h2>
            <p className="mt-6 max-w-sm text-bone/60">
              Your feedback helps future clients — and keeps us honest. Reviews are published after a quick check by our
              team.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
