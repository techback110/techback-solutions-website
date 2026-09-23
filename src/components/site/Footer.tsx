import Link from "next/link";
import { site } from "@/lib/site";
import { LocalTime } from "./LocalTime";
import { Reveal } from "./motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-20">
      <div className="container-x">
        <div className="grid gap-12 pb-20 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-5 text-mute">New business</p>
            <a href={`mailto:${site.email}`} className="display link-underline text-4xl sm:text-5xl">
              {site.email}
            </a>
            <p className="mt-6 max-w-sm text-bone/60">{site.description}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5 text-mute">Sitemap</p>
              <ul className="space-y-2.5">
                {[...site.nav, { label: "Contact", href: "/contact" }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-bone/80 hover:text-bone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-mute">Social</p>
              <ul className="space-y-2.5">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-bone/80 hover:text-bone">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="eyebrow mb-5 text-mute">Studio</p>
              <p className="text-bone/80">{site.location}</p>
              <p className="mt-2 text-bone/80">{site.phone}</p>
              <LocalTime className="eyebrow mt-4 block text-ember" />
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none">
        <p className="display translate-y-[18%] whitespace-nowrap text-center text-[25vw] leading-none text-bone/[0.06]">
          {site.shortName.toLowerCase()}
          <span className="italic text-ember/40">.</span>
        </p>
      </div>

      <div className="container-x relative flex flex-col gap-2 border-t border-line py-6 text-sm text-mute sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Designed & engineered in-house.</span>
      </div>
    </footer>
  );
}
