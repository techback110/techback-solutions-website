"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked reveal. Wrap words in *asterisks* to set them
 * in italic serif — the studio's signature emphasis.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const show = immediate || inView;
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text.replaceAll("*", "")}>
      {words.map((raw, i) => {
        const italic = raw.startsWith("*") && raw.endsWith("*");
        const word = raw.replaceAll("*", "");
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className={cn("inline-block will-change-transform", italic && "font-serif italic text-ember")}
              initial={{ y: "110%", rotate: 4 }}
              animate={show ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Pulls its child toward the pointer for a tactile hover. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.2 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 2.2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce && inView ? value : n}
      {suffix}
    </span>
  );
}

/** Text that rolls to a duplicate of itself on hover (used in nav + buttons). */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("group/roll relative inline-flex overflow-hidden", className)}>
      <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
