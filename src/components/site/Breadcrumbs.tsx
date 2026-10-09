import Link from "next/link";
import { Reveal } from "./motion";

/* Eyebrow type, ember separator, no border or background — a crumb trail should
   sit in the page's existing rhythm, not add a band of its own. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const last = trail.length - 1;
  return (
    <Reveal>
      <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-2 text-mute">
        {trail.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-2">
            {i > 0 && <span className="text-ember">/</span>}
            {i === last ? (
              <span aria-current="page" className="text-bone/70">
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.path} className="transition-colors hover:text-bone">
                {crumb.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </Reveal>
  );
}
