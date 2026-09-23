"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

/**
 * A soft follower cursor. Elements with `data-cursor="Label"` expand it
 * into a labelled disc; links and buttons make it grow slightly.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHovering(Boolean(target?.closest("a, button, [role=button], input, textarea, select, label")));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hovering ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[70] flex items-center justify-center rounded-full border-bone transition-colors duration-300",
        label ? "bg-ember" : hovering ? "border bg-transparent" : "bg-bone"
      )}
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="eyebrow text-night"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <style>{`@media (pointer: fine) { html, a, button { cursor: none; } input, textarea, select { cursor: text; } }`}</style>
    </motion.div>
  );
}
