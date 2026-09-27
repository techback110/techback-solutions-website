"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useState } from "react";
import { submitInquiry, submitReview } from "@/app/actions";
import { site } from "@/lib/site";
import type { ActionState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EASE } from "./motion";

const inputCls =
  "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-7 text-xl text-bone outline-none transition-colors placeholder:text-transparent focus:border-ember focus:outline-none focus-visible:outline-none";

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
  errors,
  minLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  errors?: string[];
  minLength?: number;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="relative block">
      <Tag
        name={name}
        type={textarea ? undefined : type}
        required={required}
        minLength={minLength}
        placeholder={label}
        rows={textarea ? 4 : undefined}
        aria-invalid={Boolean(errors?.length)}
        className={cn(inputCls, textarea && "resize-none", errors?.length && "border-ember")}
      />
      <span className="pointer-events-none absolute left-0 top-7 text-xl text-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-widest peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest">
        {label}
        {required && <span className="text-ember"> *</span>}
      </span>
      {errors?.[0] && <span className="mt-2 block text-sm text-ember">{errors[0]}</span>}
    </label>
  );
}

function Chips({ name, options, label }: { name: string; options: readonly string[]; label: string }) {
  const [value, setValue] = useState<string>("");
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-mute">{label}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => setValue(value === o ? "" : o)}
            aria-pressed={value === o}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all duration-300",
              value === o ? "border-ember bg-ember text-night" : "border-line text-bone/80 hover:border-bone/50"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Honeypot() {
  return (
    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
  );
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-8 py-4 text-base font-medium text-ink transition-colors disabled:opacity-60"
    >
      <span className="absolute inset-0 translate-y-full bg-ember transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0" />
      <span className="relative">{pending ? "Sending…" : children}</span>
      <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
    </button>
  );
}

function Success({ message }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="rounded-md border border-line p-10"
    >
      <div className="mb-6 grid size-14 place-items-center rounded-full bg-ember text-2xl text-night">✓</div>
      <p className="display text-5xl">Thank you.</p>
      <p className="mt-4 max-w-md text-lg text-bone/70">{message}</p>
    </motion.div>
  );
}

export function ContactForm({ services }: { services: string[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(submitInquiry, {});
  const fe = state.fieldErrors ?? {};

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <Success key="ok" message={state.message} />
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0 }} className="relative space-y-10">
          <Honeypot />
          {services.length > 0 && <Chips name="service" label="I'm interested in" options={services} />}
          <div className="grid gap-8 sm:grid-cols-2">
            <Field name="name" label="Your name" required minLength={2} errors={fe.name} />
            <Field name="email" label="Email" type="email" required errors={fe.email} />
          </div>
          <Field name="company" label="Company (optional)" errors={fe.company} />
          <Chips name="budget" label="How would you like to work?" options={site.engagements} />
          <Field name="message" label="Tell us about your project" textarea required minLength={10} errors={fe.message} />
          {state.error && <p className="text-ember">{state.error}</p>}
          <Submit pending={pending}>Send message</Submit>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function ReviewForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(submitReview, {});
  const [rating, setRating] = useState(5);
  const fe = state.fieldErrors ?? {};

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <Success key="ok" message={state.message} />
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0 }} className="relative space-y-8">
          <Honeypot />
          <div className="grid gap-8 sm:grid-cols-2">
            <Field name="author" label="Your name" required minLength={2} errors={fe.author} />
            <Field name="company" label="Company" errors={fe.company} />
          </div>
          <Field name="role" label="Your role" errors={fe.role} />
          <fieldset>
            <legend className="eyebrow mb-3 text-mute">Rating</legend>
            <input type="hidden" name="rating" value={rating} />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <svg viewBox="0 0 20 20" className={cn("size-7", n <= rating ? "fill-ember" : "fill-bone/15")}>
                    <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
                  </svg>
                </button>
              ))}
            </div>
          </fieldset>
          <Field name="content" label="How was working with us?" textarea required minLength={20} errors={fe.content} />
          {state.error && <p className="text-ember">{state.error}</p>}
          <Submit pending={pending}>Submit review</Submit>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
