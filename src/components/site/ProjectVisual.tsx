import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Props = {
  project: Pick<Project, "slug" | "client" | "title" | "year" | "accent" | "cover_image" | "category">;
  className?: string;
  large?: boolean;
};

/**
 * Shows the project's cover image, or — when none is set — an art-directed
 * poster composed from the project's accent colour so the grid never looks empty.
 */
export function ProjectVisual({ project, className, large }: Props) {
  const accent = project.accent || "#ff4d1c";
  const base = `color-mix(in oklab, ${accent} 26%, #0d0d0c)`;
  const variant = hash(project.slug) % 4;

  if (project.cover_image) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-3", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- admin-provided remote URLs */}
        <img
          src={project.cover_image}
          alt={`${project.client} — ${project.title}`}
          className="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ background: base }}
      role="img"
      aria-label={`${project.client} — ${project.title}`}
    >
      <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-[1.06]">
        {variant === 0 && (
          <>
            <div
              className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: accent }}
            />
            <div
              className="absolute left-[58%] top-[40%] aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
              style={{ background: base }}
            />
          </>
        )}
        {variant === 1 && (
          <div className="absolute inset-x-[12%] inset-y-[18%] flex flex-col gap-[3%]">
            {[1, 0.75, 0.5, 0.3, 0.16].map((o, i) => (
              <div key={i} className="flex-1 rounded-full" style={{ background: accent, opacity: o, marginLeft: `${i * 6}%` }} />
            ))}
          </div>
        )}
        {variant === 2 && (
          <>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(${accent}55 1px, transparent 1px), linear-gradient(90deg, ${accent}55 1px, transparent 1px)`,
                backgroundSize: "12.5% 12.5%",
              }}
            />
            <div
              className="absolute -bottom-[10%] -right-[5%] aspect-square w-[70%] rotate-12 rounded-[28%]"
              style={{ background: accent }}
            />
          </>
        )}
        {variant === 3 && (
          <>
            <div
              className="absolute bottom-0 left-1/2 h-[78%] w-[46%] -translate-x-1/2 rounded-t-full"
              style={{ background: accent }}
            />
            <div
              className="absolute bottom-0 left-1/2 h-[46%] w-[22%] -translate-x-1/2 rounded-t-full"
              style={{ background: base }}
            />
          </>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(0,0,0,0.45))" }}
      />
      <div className="absolute inset-x-0 top-[10%] flex justify-between px-[5%] text-paper/80">
        <span className="eyebrow">{project.client}</span>
        <span className="eyebrow">{project.year}</span>
      </div>
      <p
        className={cn(
          "display absolute bottom-[11%] left-[5%] right-[5%] text-paper mix-blend-difference",
          large ? "text-[clamp(2.5rem,7vw,7rem)]" : "text-[clamp(1.8rem,3.4vw,3.4rem)]"
        )}
      >
        {project.client}
        <span className="italic">.</span>
      </p>
    </div>
  );
}
