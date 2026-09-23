"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { THEME_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

/** Sun/moon switch. The new theme is revealed by a circle growing from the button. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }
    const x = e.clientX || innerWidth / 2;
    const y = e.clientY || innerHeight / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(() => apply(next)));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-full border border-line bg-ink/60 text-bone backdrop-blur transition-colors hover:border-ember hover:text-ember",
        className
      )}
    >
      <Sun
        className={cn(
          "absolute size-[18px] transition-all duration-500 ease-[var(--ease-expo)]",
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute size-[18px] transition-all duration-500 ease-[var(--ease-expo)]",
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        )}
      />
    </button>
  );
}
