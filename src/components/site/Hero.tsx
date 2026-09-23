"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { introDelay } from "./Preloader";
import { EASE, SplitText } from "./motion";

const WORDS = ["Identity", "Websites", "Products", "Commerce", "Motion"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Only read on the client; animation targets are not part of the SSR markup.
  const [delay] = useState<number | null>(() => (typeof document === "undefined" ? null : introDelay()));
  const [word, setWord] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Glow position in px, driven through transforms (GPU) rather than left/top (layout + repaint).
  const mx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });

  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      mx.jump(r.width * 0.5);
      my.jump(r.height * 0.3);
    }
  }, [mx, my]);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const d = delay ?? 0;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      {/* Ambient light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 size-[70vmax] rounded-full opacity-40 blur-[120px] will-change-transform [[data-theme=light]_&]:opacity-25"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, #ff4d1c 0%, rgba(255,77,28,0.25) 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
        }}
      />

      <motion.div style={{ y, opacity, scale }} className="container-x relative flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={delay !== null ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: d }}
          className="flex items-center justify-between border-b border-line pb-4"
        >
          <span className="eyebrow text-mute">{site.tagline}</span>
          <span className="eyebrow flex items-center gap-2 text-bone/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-ember" />
            </span>
            Booking Q4 2026
          </span>
        </motion.div>

        <div className="flex flex-1 items-center py-12">
          <SplitText
            as="h1"
            immediate={delay !== null}
            delay={d + 0.1}
            stagger={0.07}
            text="Digital craft for brands with a *point* of *view.*"
            className="display max-w-[14ch] text-[clamp(3.4rem,10.5vw,11.5rem)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={delay !== null ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: d + 0.8 }}
          className="grid items-end gap-8 pb-10 md:grid-cols-12"
        >
          <p className="max-w-md text-lg leading-relaxed text-bone/70 md:col-span-5">
            We&apos;re an independent studio of designers and engineers building brands, websites and products that
            people remember — and businesses measure.
          </p>

          <div className="md:col-span-4">
            <p className="eyebrow mb-2 text-mute">What we make</p>
            <div className="relative h-[1.15em] overflow-hidden text-4xl font-medium tracking-tight">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={WORDS[word]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute left-0 top-0"
                >
                  {WORDS[word]}
                  <span className="text-ember">.</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex md:col-span-3 md:justify-end">
            <a href="#work" className="relative grid size-28 place-items-center" aria-label="Scroll to selected work">
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
                <defs>
                  <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-bone/70 font-mono text-[9.5px] uppercase tracking-[0.28em]">
                  <textPath href="#circle">Scroll to explore · Selected work ·</textPath>
                </text>
              </svg>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl text-ember"
              >
                ↓
              </motion.span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
