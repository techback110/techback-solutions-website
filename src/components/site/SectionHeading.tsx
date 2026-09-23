import { cn } from "@/lib/utils";
import { Reveal, SplitText } from "./motion";

export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
  className,
  dark = true,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <Reveal>
          <p className={cn("eyebrow mb-6 flex items-center gap-3", dark ? "text-mute" : "text-ink/55")}>
            {index && <span className="text-ember">({index})</span>}
            {eyebrow}
          </p>
        </Reveal>
        <SplitText text={title} className="display text-[clamp(2.6rem,6.4vw,6.5rem)]" />
      </div>
      {aside && <Reveal delay={0.2} className="md:col-span-4">{aside}</Reveal>}
    </div>
  );
}
