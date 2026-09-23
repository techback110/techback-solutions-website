"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn, pad } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import { EASE, Magnetic, RollText } from "./motion";
import { getLenis } from "./SmoothScroll";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setScrolled(y > 40);
  });

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between py-5 transition-[padding,background-color] duration-500",
            scrolled && !open && "py-3.5"
          )}
        >
          <Link href="/" className="relative z-10 flex items-center gap-2.5 text-bone" aria-label={`${site.name} home`}>
            <span className="grid size-8 place-items-center rounded-full bg-ember font-serif text-xl italic leading-none text-night">
              n
            </span>
            <span className="text-[15px] font-medium tracking-tight">{site.shortName}</span>
            <span className="eyebrow hidden text-mute sm:inline">®</span>
          </Link>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full border border-line px-2 py-1.5 backdrop-blur-xl transition-colors duration-500 md:flex",
              scrolled ? "bg-ink/70" : "bg-transparent"
            )}
          >
            {site.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                    active ? "text-ink" : "text-bone/80 hover:text-bone"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    <RollText>{item.label}</RollText>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden md:inline-block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember hover:text-night"
              >
                <span className="size-1.5 rounded-full bg-ember transition-colors group-hover:bg-ink" />
                <RollText>Start a project</RollText>
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-line bg-ink/60 backdrop-blur md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "top-1/2 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "bottom-auto top-1/2 -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav className="flex flex-col">
              {[...site.nav, { label: "Contact", href: "/contact" }].map((item, i) => (
                <div key={item.href} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link href={item.href} className="flex items-baseline justify-between py-4">
                      <span className="display text-6xl">{item.label}</span>
                      <span className="eyebrow text-mute">{pad(i + 1)}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-1 text-sm text-mute"
            >
              <a href={`mailto:${site.email}`} className="text-bone">
                {site.email}
              </a>
              <span>{site.location}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
