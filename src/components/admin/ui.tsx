"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none transition-colors placeholder:text-mute focus:border-ember focus-visible:outline-none";

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-bone/85">{label}</span>
      {children}
      {hint && !error?.length && <span className="mt-1.5 block text-xs text-mute">{hint}</span>}
      {error?.[0] && <span className="mt-1.5 block text-xs text-ember">{error[0]}</span>}
    </label>
  );
}

export function Toggle({ name, label, defaultChecked, hint }: { name: string; label: string; defaultChecked?: boolean; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-3.5 transition-colors hover:border-bone/25">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full bg-ink-3 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-mute after:transition-all peer-checked:bg-ember peer-checked:after:translate-x-4 peer-checked:after:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ember" />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-xs text-mute">{hint}</span>}
      </span>
    </label>
  );
}

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-ember-2 disabled:opacity-60",
        className
      )}
    >
      {pending && <span className="size-3.5 animate-spin rounded-full border-2 border-night/30 border-t-night" />}
      {children}
    </button>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
        variant === "primary" ? "bg-ember text-night hover:bg-ember-2" : "border border-line text-bone hover:border-bone/30"
      )}
    >
      {children}
    </Link>
  );
}

/** Two-step delete: first click arms, second click submits. No browser dialogs. */
export function DeleteButton({ action, id, label = "Delete" }: { action: (fd: FormData) => Promise<void>; id: string; label?: string }) {
  const [armed, setArmed] = useState(false);
  return (
    <form action={action} onMouseLeave={() => setArmed(false)}>
      <input type="hidden" name="id" value={id} />
      {armed ? (
        <button type="submit" className="rounded-md bg-red-500/15 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/25">
          Confirm?
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="rounded-md px-2.5 py-1.5 text-xs text-mute transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          {label}
        </button>
      )}
    </form>
  );
}

/** A tiny form that flips a boolean field via a server action. */
export function ToggleAction({
  action,
  id,
  field,
  value,
  on,
  off,
}: {
  action: (fd: FormData) => Promise<void>;
  id: string;
  field: string;
  value: boolean;
  on: string;
  off: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name={field} value={String(!value)} />
      <PendingText>{value ? on : off}</PendingText>
    </form>
  );
}

function PendingText({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-md px-2.5 py-1.5 text-xs text-bone/80 transition-colors hover:bg-ink-3 disabled:opacity-50">
      {pending ? "…" : children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="rounded-lg border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">{message}</p>;
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{message}</p>
  );
}
