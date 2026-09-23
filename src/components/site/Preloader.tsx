"use client";

import { animate, AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { EASE } from "./motion";

import { INTRO_DURATION, INTRO_KEY as KEY } from "@/lib/intro";

let introPlayed = false;

/** Seconds to wait before hero animations so they play after the intro. */
export function introDelay() {
  return introPlayed || document.documentElement.classList.contains("intro-seen") ? 0.1 : INTRO_DURATION;
}

/** First-visit intro: a counter and a curtain. Skipped on repeat visits. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    // Returning visitors are hidden by the pre-paint script + CSS; nothing to animate.
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        introPlayed = true;
        setTimeout(() => setShow(false), 150);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-preloader
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-ember p-5 text-night sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex justify-between">
            <span className="eyebrow">{site.name}</span>
            <span className="eyebrow">Loading experience</span>
          </div>
          <div className="flex items-end justify-between">
            <motion.p
              className="display max-w-lg text-4xl sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Design that <em>moves</em> people.
            </motion.p>
            <span className="display text-[22vw] leading-[0.75] tabular-nums sm:text-[14vw]">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
