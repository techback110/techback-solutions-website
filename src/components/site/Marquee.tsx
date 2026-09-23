import { cn } from "@/lib/utils";

export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="display px-8 text-5xl text-bone/85 sm:text-7xl">{item}</span>
            <span className="text-2xl text-ember">✳</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
