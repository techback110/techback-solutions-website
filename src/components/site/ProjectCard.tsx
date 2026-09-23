"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EASE } from "./motion";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  index,
  aspect = "aspect-[4/5]",
  className,
}: {
  project: Project;
  index: number;
  aspect?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, ease: EASE, delay: (index % 2) * 0.12 }}
      className={className}
    >
      <Link ref={ref} href={`/work/${project.slug}`} className="group block" data-cursor="View">
        <div className={cn("relative overflow-hidden rounded-[6px]", aspect)}>
          <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
            <ProjectVisual project={project} className="size-full" />
          </motion.div>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 opacity-0 transition-all duration-500 group-hover:opacity-100">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-ink/70 px-3 py-1 text-xs text-bone backdrop-blur">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
              {project.client}
              <span className="text-mute"> — {project.title}</span>
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-bone/55">{project.summary}</p>
          </div>
          <span className="eyebrow shrink-0 pt-1.5 text-mute">
            {project.category} · {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
