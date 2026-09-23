import { Reveal, SplitText } from "./motion";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="container-x pb-20 pt-40 sm:pb-28 sm:pt-52">
      <Reveal>
        <p className="eyebrow mb-8 flex items-center gap-3 text-mute">
          <span className="h-px w-10 bg-ember" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitText as="h1" immediate text={title} className="display max-w-[16ch] text-[clamp(3.2rem,9vw,9.5rem)]" />
      {intro && (
        <Reveal delay={0.5} className="mt-10 max-w-xl text-lg leading-relaxed text-bone/65 md:ml-[42%]">
          <p>{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
