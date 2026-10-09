import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="grain relative grid min-h-svh place-items-center overflow-hidden px-6 text-center">
      <div>
        <p className="eyebrow mb-6 text-mute">Error 404</p>
        <h1 className="display text-[clamp(6rem,24vw,22rem)] leading-[0.8]">
          Lo<em className="text-ember">st.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-sm text-bone/65">
          The page you&apos;re looking for has moved, been archived, or never existed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ember hover:text-night"
          >
            Back to home →
          </Link>
          {[
            ["Work", "/work"],
            ["Services", "/services"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="inline-flex rounded-full border border-line px-7 py-3.5 text-sm transition-colors hover:border-ember hover:bg-ember hover:text-night"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
