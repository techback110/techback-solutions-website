import { cn } from "@/lib/utils";

export function PageTitle({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="display text-5xl">{title}</h1>
        {description && <p className="mt-2 text-sm text-mute">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-line bg-ink-2", className)}>{children}</div>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warn" | "accent" }) {
  const tones = {
    neutral: "bg-ink-3 text-bone/70",
    success: "bg-emerald-500/12 text-emerald-400",
    warn: "bg-amber-500/12 text-amber-400",
    accent: "bg-ember/15 text-ember",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function Empty({ title, body, action }: { title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <p className="display text-3xl">{title}</p>
      {body && <p className="max-w-sm text-sm text-mute">{body}</p>}
      {action}
    </div>
  );
}

export const th = "px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-mute";
export const td = "px-5 py-4 align-middle";
