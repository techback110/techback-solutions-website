"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Review } from "@/lib/types";
import { pad } from "@/lib/utils";
import { EASE } from "./motion";
import { Avatar, Stars } from "./Stars";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = reviews.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), 7000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (!count) return null;
  const r = reviews[i];

  return (
    <div
      className="grid gap-10 md:grid-cols-12"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="flex flex-row items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-start md:justify-between">
        <div className="display text-8xl leading-none text-ember sm:text-9xl">&ldquo;</div>
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums text-mute">
            {pad(i + 1)} / {pad(count)}
          </span>
          <div className="flex gap-2">
            {(["Previous", "Next"] as const).map((label, k) => (
              <button
                key={label}
                aria-label={`${label} review`}
                onClick={() => setI((v) => (v + (k ? 1 : -1) + count) % count)}
                className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-ember hover:bg-ember hover:text-night"
              >
                {k ? "→" : "←"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-[22rem] md:col-span-9 md:min-h-[20rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={r.id}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <blockquote className="display text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.08]">{r.content}</blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <Avatar name={r.author} src={r.avatar_url} />
              <div>
                <p className="font-medium">{r.author}</p>
                <p className="text-sm text-mute">
                  {[r.role, r.company].filter(Boolean).join(", ")}
                </p>
              </div>
              <Stars rating={r.rating} className="ml-auto" />
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="absolute inset-x-0 -bottom-4 h-px bg-line">
          <motion.div
            key={`${r.id}-${paused}`}
            className="h-full origin-left bg-ember"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0.3 : 7, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
