"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EASE } from "./motion";
import { ProjectCard } from "./ProjectCard";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-16 flex flex-wrap items-center gap-2 border-b border-line pb-8">
        {categories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm transition-colors",
                filter === c ? "text-ink" : "text-bone/70 hover:text-bone"
              )}
            >
              {filter === c && (
                <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">
                {c} <sup className="text-[0.65em] opacity-60">{count}</sup>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-x-10 gap-y-20 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={cn(i % 2 === 1 && "md:mt-32")}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && <p className="py-20 text-center text-mute">No projects in this category yet.</p>}
    </>
  );
}
