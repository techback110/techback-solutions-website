import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("size-4", i < rating ? "fill-ember" : "fill-current opacity-20")}>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

export function Avatar({ name, src, className }: { name: string; src?: string | null; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^dr\.?$/i.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- admin-provided remote URLs
    return <img src={src} alt={name} className={cn("size-12 rounded-full object-cover", className)} />;
  }
  return (
    <span className={cn("grid size-12 place-items-center rounded-full bg-ember font-serif text-lg italic text-night", className)}>
      {initials}
    </span>
  );
}
