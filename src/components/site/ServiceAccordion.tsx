"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Service } from "@/lib/types";
import { cn, pad } from "@/lib/utils";
import { EASE } from "./motion";

/** Numbered service rows that expand to reveal the detail. Designed for light sections. */
export function ServiceAccordion({ services, defaultOpen = 0 }: { services: Service[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="border-t border-line-ink">
      {services.map((s, i) => {
        const active = open === i;
        return (
          <motion.li
            key={s.id}
            id={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
            className="scroll-mt-28 border-b border-line-ink"
          >
            <button
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className="group relative grid w-full grid-cols-12 items-center gap-4 py-7 text-left sm:py-9"
            >
              <span
                className={cn(
                  "absolute inset-x-[-1rem] inset-y-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100",
                  active && "scale-y-0 group-hover:scale-y-0"
                )}
              />
              <span className="eyebrow relative col-span-2 text-ink/50 transition-colors group-hover:text-ember sm:col-span-1">
                {pad(i + 1)}
              </span>
              <span
                className={cn(
                  "display relative col-span-8 text-[clamp(2rem,5vw,4.5rem)] transition-colors duration-500 sm:col-span-6",
                  active ? "text-ink" : "text-ink group-hover:text-bone"
                )}
              >
                {s.title}
              </span>
              <span className="relative col-span-4 hidden text-ink/60 transition-colors group-hover:text-bone/70 sm:block">
                {s.summary}
              </span>
              <span className="relative col-span-2 flex justify-end sm:col-span-1">
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-full border border-line-ink text-xl transition-all duration-500 group-hover:border-bone/30 group-hover:text-bone",
                    active && "rotate-45 bg-ember text-night group-hover:text-night"
                  )}
                >
                  +
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-4 pb-10">
                    <div className="col-span-12 sm:col-span-6 sm:col-start-2">
                      <p className="max-w-xl text-lg leading-relaxed text-ink/75">{s.description}</p>
                    </div>
                    <ul className="col-span-12 flex flex-wrap content-start gap-2 sm:col-span-5">
                      {s.deliverables.map((d) => (
                        <li key={d} className="rounded-full border border-line-ink px-4 py-1.5 text-sm text-ink/80">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
