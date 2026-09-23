"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** The active smooth-scroll instance (null before mount). */
export const getLenis = () => instance;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Smooth wheel scrolling stays on for everyone; with reduced motion it's just snappier.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    instance = new Lenis({
      // Interpolated scrolling: each frame closes a fraction of the gap, which feels
      // like weighted inertia and never "stalls" at the end like a fixed duration can.
      lerp: reduce ? 0.16 : 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      // Touch devices keep native momentum scrolling — it's already smooth there.
      syncTouch: false,
      anchors: { offset: -80, lerp: 0.07 },
      stopInertiaOnNavigate: true,
      allowNestedScroll: true,
      autoRaf: true,
    });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);

  useEffect(() => {
    instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
