"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveProject, saveReview, saveService } from "@/app/admin/actions";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import type { ActionState, Project, Review, Service } from "@/lib/types";
import { Card } from "./shell";
import { Field, FormError, inputCls, SubmitButton, Toggle } from "./ui";

function Actions({ cancel, label }: { cancel: string; label: string }) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-line pt-6">
      <Link href={cancel} className="rounded-lg px-4 py-2.5 text-sm text-bone/70 hover:text-bone">
        Cancel
      </Link>
      <SubmitButton>{label}</SubmitButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ServiceForm({ service }: { service?: Service }) {
  const [state, action] = useActionState<ActionState, FormData>(saveService, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {service && <input type="hidden" name="id" value={service.id} />}
      <Card className="space-y-5 p-6 lg:col-span-2">
        <Field label="Title" error={fe.title}>
          <input name="title" required defaultValue={service?.title} className={inputCls} placeholder="Brand Identity" />
        </Field>
        <Field label="Summary" hint="One line shown in the services list." error={fe.summary}>
          <input name="summary" required defaultValue={service?.summary} className={inputCls} />
        </Field>
        <Field label="Description" error={fe.description}>
          <textarea name="description" rows={6} defaultValue={service?.description} className={inputCls} />
        </Field>
        <Field label="Deliverables" hint="One per line." error={fe.deliverables}>
          <textarea name="deliverables" rows={6} defaultValue={service?.deliverables.join("\n")} className={inputCls} />
        </Field>
        <FormError message={state.error} />
        <Actions cancel="/admin/services" label={service ? "Save changes" : "Create service"} />
      </Card>
      <Card className="h-fit space-y-5 p-6">
        <Field label="Slug" hint="Leave blank to generate from the title." error={fe.slug}>
          <input name="slug" defaultValue={service?.slug} className={inputCls} placeholder="brand-identity" />
        </Field>
        <Field label="Sort order" hint="Lower numbers appear first." error={fe.sort_order}>
          <input name="sort_order" type="number" min={0} defaultValue={service?.sort_order ?? 10} className={inputCls} />
        </Field>
        <Toggle name="published" label="Published" hint="Visible on the website." defaultChecked={service?.published ?? true} />
      </Card>
    </form>
  );
}

/* ------------------------------------------------------------------ */

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action] = useActionState<ActionState, FormData>(saveProject, {});
  const fe = state.fieldErrors ?? {};
  const [preview, setPreview] = useState({
    client: project?.client ?? "Client",
    title: project?.title ?? "",
    accent: project?.accent ?? "#FF4D1C",
    cover_image: project?.cover_image ?? "",
    year: project?.year ?? new Date().getFullYear(),
    category: project?.category ?? "",
    slug: project?.slug ?? "new-project",
  });
  const set = (k: keyof typeof preview) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPreview((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {project && <input type="hidden" name="id" value={project.id} />}
      <Card className="space-y-5 p-6 lg:col-span-2">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Client" error={fe.client}>
            <input name="client" required defaultValue={project?.client} onChange={set("client")} className={inputCls} placeholder="Halden Coffee" />
          </Field>
          <Field label="Headline" error={fe.title}>
            <input name="title" required defaultValue={project?.title} onChange={set("title")} className={inputCls} placeholder="Roasted slow, sold fast" />
          </Field>
          <Field label="Category" error={fe.category}>
            <input name="category" required list="categories" defaultValue={project?.category} className={inputCls} placeholder="E-commerce" />
            <datalist id="categories">
              {["Brand Identity", "Website", "Web Platform", "Product Design", "E-commerce", "Motion"].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Year" error={fe.year}>
            <input name="year" type="number" required defaultValue={project?.year ?? new Date().getFullYear()} onChange={set("year")} className={inputCls} />
          </Field>
        </div>
        <Field label="Summary" hint="One or two sentences for cards." error={fe.summary}>
          <textarea name="summary" rows={2} required defaultValue={project?.summary} className={inputCls} />
        </Field>
        <Field label="Case study" hint="Separate paragraphs with a blank line. The first paragraph is set large." error={fe.description}>
          <textarea name="description" rows={10} defaultValue={project?.description} className={inputCls} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Results" hint="One per line: value | label  (e.g. +212% | Sign-ups)" error={fe.metrics}>
            <textarea
              name="metrics"
              rows={4}
              defaultValue={project?.metrics.map((m) => `${m.value} | ${m.label}`).join("\n")}
              className={inputCls}
            />
          </Field>
          <Field label="Gallery images" hint="One image URL per line." error={fe.gallery}>
            <textarea name="gallery" rows={4} defaultValue={project?.gallery.join("\n")} className={inputCls} />
          </Field>
        </div>
        <Field label="Tags" hint="Comma separated." error={fe.tags}>
          <input name="tags" defaultValue={project?.tags.join(", ")} className={inputCls} placeholder="Identity, Shopify, Next.js" />
        </Field>
        <FormError message={state.error} />
        <Actions cancel="/admin/projects" label={project ? "Save changes" : "Create project"} />
      </Card>

      <div className="space-y-6">
        <Card className="overflow-hidden">
          <ProjectVisual
            project={{ ...preview, year: Number(preview.year) || 0, cover_image: preview.cover_image || null }}
            className="aspect-[4/3]"
          />
          <p className="px-4 py-3 text-xs text-mute">Live cover preview</p>
        </Card>
        <Card className="h-fit space-y-5 p-6">
          <Field label="Accent colour" error={fe.accent}>
            <div className="flex gap-2">
              <input
                type="color"
                value={preview.accent}
                onChange={set("accent")}
                className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line bg-ink p-1"
                aria-label="Pick accent colour"
              />
              <input name="accent" value={preview.accent} onChange={set("accent")} className={inputCls} />
            </div>
          </Field>
          <Field label="Cover image URL" hint="Optional — without one, a poster is generated." error={fe.cover_image}>
            <input name="cover_image" type="url" defaultValue={project?.cover_image ?? ""} onChange={set("cover_image")} className={inputCls} placeholder="https://…" />
          </Field>
          <Field label="Live URL" error={fe.live_url}>
            <input name="live_url" type="url" defaultValue={project?.live_url ?? ""} className={inputCls} placeholder="https://…" />
          </Field>
          <Field label="Slug" hint="Leave blank to generate." error={fe.slug}>
            <input name="slug" defaultValue={project?.slug} className={inputCls} />
          </Field>
          <Field label="Sort order" error={fe.sort_order}>
            <input name="sort_order" type="number" min={0} defaultValue={project?.sort_order ?? 10} className={inputCls} />
          </Field>
          <Toggle name="featured" label="Featured" hint="Shown on the homepage." defaultChecked={project?.featured ?? false} />
          <Toggle name="published" label="Published" hint="Visible on the website." defaultChecked={project?.published ?? true} />
        </Card>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

export function ReviewEditForm({ review }: { review?: Review }) {
  const [state, action] = useActionState<ActionState, FormData>(saveReview, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {review && <input type="hidden" name="id" value={review.id} />}
      <Card className="space-y-5 p-6 lg:col-span-2">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Name" error={fe.author}>
            <input name="author" required defaultValue={review?.author} className={inputCls} />
          </Field>
          <Field label="Role" error={fe.role}>
            <input name="role" defaultValue={review?.role} className={inputCls} />
          </Field>
          <Field label="Company" error={fe.company}>
            <input name="company" defaultValue={review?.company} className={inputCls} />
          </Field>
        </div>
        <Field label="Review" error={fe.content}>
          <textarea name="content" rows={6} required defaultValue={review?.content} className={inputCls} />
        </Field>
        <FormError message={state.error} />
        <Actions cancel="/admin/reviews" label={review ? "Save changes" : "Add review"} />
      </Card>
      <Card className="h-fit space-y-5 p-6">
        <Field label="Rating" error={fe.rating}>
          <select name="rating" defaultValue={review?.rating ?? 5} className={inputCls}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"★".repeat(n)} ({n})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Avatar URL" hint="Optional — initials are used otherwise." error={fe.avatar_url}>
          <input name="avatar_url" type="url" defaultValue={review?.avatar_url ?? ""} className={inputCls} />
        </Field>
        <Toggle name="approved" label="Approved" hint="Visible on the website." defaultChecked={review?.approved ?? true} />
        <Toggle name="featured" label="Featured" hint="Shown in the homepage carousel." defaultChecked={review?.featured ?? false} />
      </Card>
    </form>
  );
}
