"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  changePassword,
  createUser,
  saveProject,
  saveReview,
  saveService,
  saveSettings,
  saveTeamMember,
} from "@/app/admin/actions";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { TeamPortrait } from "@/components/site/TeamPortrait";
import type { ActionState, Project, Review, Service, SiteSettings, TeamMember } from "@/lib/types";
import { Card } from "./shell";
import { Field, FormError, FormSuccess, inputCls, SubmitButton, Toggle } from "./ui";

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

/* ------------------------------------------------------------------ */

export function TeamForm({ member }: { member?: TeamMember }) {
  const [state, action] = useActionState<ActionState, FormData>(saveTeamMember, {});
  const fe = state.fieldErrors ?? {};
  const [preview, setPreview] = useState({
    name: member?.name ?? "",
    color: member?.color ?? "#FF4D1C",
    photo_url: member?.photo_url ?? "",
  });
  const set = (k: keyof typeof preview) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPreview((p) => ({ ...p, [k]: e.target.value }));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-3">
      {member && <input type="hidden" name="id" value={member.id} />}
      <Card className="space-y-5 p-6 lg:col-span-2">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" error={fe.name}>
            <input name="name" required defaultValue={member?.name} onChange={set("name")} className={inputCls} placeholder="Isha Kapoor" />
          </Field>
          <Field label="Role" error={fe.role}>
            <input name="role" defaultValue={member?.role} className={inputCls} placeholder="Design Director" />
          </Field>
        </div>
        <Field label="Photo URL" hint="Optional — without one, an illustrated portrait in the colour below is used." error={fe.photo_url}>
          <input name="photo_url" type="url" defaultValue={member?.photo_url ?? ""} onChange={set("photo_url")} className={inputCls} placeholder="https://…" />
        </Field>
        <FormError message={state.error} />
        <Actions cancel="/admin/team" label={member ? "Save changes" : "Add team member"} />
      </Card>
      <div className="space-y-6">
        <Card className="overflow-hidden p-4">
          <TeamPortrait member={{ ...preview, photo_url: preview.photo_url || null }} />
          <p className="pt-3 text-xs text-mute">Live preview</p>
        </Card>
        <Card className="h-fit space-y-5 p-6">
          <Field label="Colour" error={fe.color}>
            <div className="flex gap-2">
              <input
                type="color"
                value={preview.color}
                onChange={set("color")}
                className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line bg-ink p-1"
                aria-label="Pick colour"
              />
              <input name="color" value={preview.color} onChange={set("color")} className={inputCls} />
            </div>
          </Field>
          <Field label="Sort order" hint="Lower numbers appear first." error={fe.sort_order}>
            <input name="sort_order" type="number" min={0} defaultValue={member?.sort_order ?? 10} className={inputCls} />
          </Field>
          <Toggle name="published" label="Published" hint="Visible on the Studio page." defaultChecked={member?.published ?? true} />
        </Card>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <Card className="grid gap-6 p-6 lg:grid-cols-3">
      <div>
        <h2 className="font-medium">{title}</h2>
        {hint && <p className="mt-1 text-sm text-mute">{hint}</p>}
      </div>
      <div className="space-y-5 lg:col-span-2">{children}</div>
    </Card>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action] = useActionState<ActionState, FormData>(saveSettings, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-6">
      <Section title="Contact" hint="Shown in the footer, contact page and menu. Leave phone or address empty to hide it.">
        <Field label="Email" error={fe.email}>
          <input name="email" type="email" required defaultValue={settings.email} className={inputCls} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" error={fe.phone}>
            <input name="phone" defaultValue={settings.phone} className={inputCls} placeholder="+91 …" />
          </Field>
          <Field label="Address / location" error={fe.address}>
            <input name="address" defaultValue={settings.address} className={inputCls} placeholder="City, Country" />
          </Field>
        </div>
        <Field label="Social links" hint="One per line: Label | https://…  Empty = hidden." error={fe.socials}>
          <textarea
            name="socials"
            rows={4}
            defaultValue={settings.socials.map((s) => `${s.label} | ${s.href}`).join("\n")}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Homepage">
        <Field label="Studio intro" hint="The large scrolling paragraph under the client list." error={fe.home_intro}>
          <textarea name="home_intro" rows={4} defaultValue={settings.home_intro} className={inputCls} />
        </Field>
        <Field label="Clients" hint="One per line — shown in the scrolling marquee. Empty = hidden." error={fe.clients}>
          <textarea name="clients" rows={5} defaultValue={settings.clients.join("\n")} className={inputCls} />
        </Field>
        <Field
          label="Stats"
          hint="Up to 4, one per line: number+suffix | label  (e.g. 120+ | Projects shipped). Empty = hidden."
          error={fe.stats}
        >
          <textarea
            name="stats"
            rows={4}
            defaultValue={settings.stats.map((s) => `${s.value}${s.suffix} | ${s.label}`).join("\n")}
            className={inputCls}
          />
        </Field>
        <Field label="Footer description" error={fe.description}>
          <textarea name="description" rows={3} defaultValue={settings.description} className={inputCls} />
        </Field>
      </Section>

      <Section title="Studio page" hint="Team members are managed under Team.">
        <Field label="Intro" hint="Shown under the page title." error={fe.about_intro}>
          <textarea name="about_intro" rows={3} defaultValue={settings.about_intro} className={inputCls} />
        </Field>
        <Field label="Story" hint="The large scrolling paragraph." error={fe.about_story}>
          <textarea name="about_story" rows={5} defaultValue={settings.about_story} className={inputCls} />
        </Field>
        <Field label="Principles" hint="One per line: Title | Description. Empty = hidden." error={fe.principles}>
          <textarea
            name="principles"
            rows={5}
            defaultValue={settings.principles.map((p) => `${p.title} | ${p.body}`).join("\n")}
            className={inputCls}
          />
        </Field>
      </Section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="mr-auto">
          <FormError message={state.error} />
          <FormSuccess message={state.message} />
        </div>
        <SubmitButton>Save settings</SubmitButton>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

export function ChangePasswordForm() {
  const [state, action] = useActionState<ActionState, FormData>(changePassword, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-4">
      <Field label="Current password" error={fe.current}>
        <input name="current" type="password" required autoComplete="current-password" className={inputCls} />
      </Field>
      <Field label="New password" hint="At least 8 characters." error={fe.next}>
        <input name="next" type="password" required minLength={8} autoComplete="new-password" className={inputCls} />
      </Field>
      <Field label="Confirm new password" error={fe.confirm}>
        <input name="confirm" type="password" required autoComplete="new-password" className={inputCls} />
      </Field>
      <FormError message={state.error} />
      <FormSuccess message={state.message} />
      <SubmitButton>Update password</SubmitButton>
    </form>
  );
}

export function CreateUserForm() {
  const [state, action] = useActionState<ActionState, FormData>(createUser, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-4">
      <Field label="Name" error={fe.name}>
        <input name="name" className={inputCls} />
      </Field>
      <Field label="Email" error={fe.email}>
        <input name="email" type="email" required autoComplete="off" className={inputCls} />
      </Field>
      <Field label="Password" hint="At least 8 characters. Share it with them privately." error={fe.password}>
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={inputCls} />
      </Field>
      <FormError message={state.error} />
      <FormSuccess message={state.message} />
      <SubmitButton>Add user</SubmitButton>
    </form>
  );
}
