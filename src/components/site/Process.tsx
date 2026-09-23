"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { pad } from "@/lib/utils";
import { EASE } from "./motion";

const STEPS = [
  {
    title: "Discover",
    body: "Workshops, interviews and audits. We learn your business, your customers and the gap between where you are and where you want to be.",
    time: "1–2 weeks",
  },
  {
    title: "Define",
    body: "Strategy, positioning and a clear creative direction — agreed before a single pixel is polished, so there are no surprises later.",
    time: "1–2 weeks",
  },
  {
    title: "Design",
    body: "Iterative design in tight weekly loops. You see real work every Friday, and we prototype in code early to test what matters.",
    time: "3–6 weeks",
  },
  {
    title: "Deliver",
    body: "Engineering, QA and a calm launch. Then we measure, learn and keep improving with you — most clients stay with us for years.",
    time: "Ongoing",
  },
];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative">
      <div className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-line md:left-1/2">
        <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-ember" />
      </div>
      {STEPS.map((step, i) => (
        <li key={step.title} className="relative grid gap-4 pb-16 pl-12 last:pb-0 md:grid-cols-2 md:gap-24 md:pl-0">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute left-[1.1rem] top-3 size-3 -translate-x-1/2 rounded-full bg-ember ring-8 ring-ink md:left-1/2"
          />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="md:text-right"
          >
            <p className="eyebrow text-mute">
              Step {pad(i + 1)} · {step.time}
            </p>
            <h3 className="display mt-3 text-6xl sm:text-7xl">{step.title}</h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="max-w-md text-lg leading-relaxed text-bone/65 md:pt-8"
          >
            {step.body}
          </motion.p>
        </li>
      ))}
    </ol>
  );
}
