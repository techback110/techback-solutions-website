import Link from "next/link";
import { getSettings } from "@/lib/data";
import { safeHref } from "@/lib/utils";
import { Magnetic, Reveal, SplitText } from "./motion";

export async function CTA() {
  const { email, reply_time_promise, booking_url } = await getSettings();
  return (
    <section className="relative overflow-hidden bg-ember py-28 text-night sm:py-36">
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-8 text-night/80">Have a project in mind?</p>
        </Reveal>
        <div className="grid items-end gap-12 md:grid-cols-12">
          <SplitText
            text="Let's make something worth *remembering.*"
            className="display text-[clamp(3rem,9vw,9.5rem)] md:col-span-9 [&_.text-ember]:text-paper"
          />
          <div className="md:col-span-3 md:flex md:justify-end">
            <Magnetic strength={0.45}>
              <Link
                href="/contact"
                className="group relative grid size-40 place-items-center overflow-hidden rounded-full bg-ink text-bone sm:size-48"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
                <span className="relative text-center text-lg font-medium transition-colors duration-500 group-hover:text-ink">
                  Start a<br />
                  project ↗
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
        <Reveal delay={0.2} className="mt-16 flex flex-col gap-2 border-t border-night/20 pt-6 sm:flex-row sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${email}`} className="link-underline text-lg">
              {email}
            </a>
            {safeHref(booking_url) && (
              <a href={safeHref(booking_url)} target="_blank" rel="noreferrer" className="link-underline text-lg">
                Book a call ↗
              </a>
            )}
          </span>
          <span className="text-night/80">
            {reply_time_promise || "Typical reply time: under 24 hours"}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
