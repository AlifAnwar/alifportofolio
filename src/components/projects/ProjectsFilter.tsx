"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FolderSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { getProjectPlatform, type ProjectItem } from "@/lib/projects";

type ProjectFilter = "all" | NonNullable<ProjectItem["platform"]>;

const filters: { label: string; value: ProjectFilter }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
];

type ProjectsFilterProps = {
  projects: ProjectItem[];
};

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "all" || getProjectPlatform(project) === activeFilter,
  );

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-3"
        role="group"
        aria-label="Filter projects by platform"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          const projectCount =
            filter.value === "all"
              ? projects.length
              : projects.filter(
                  (project) => getProjectPlatform(project) === filter.value,
                ).length;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border-black/10 bg-white text-muted-foreground shadow-[0_10px_30px_rgba(0,0,0,0.035)] hover:-translate-y-0.5 hover:border-primary/25 hover:text-primary"
              }`}
            >
              {filter.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] leading-none ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-primary/8 text-primary"
                }`}
              >
                {projectCount}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.name}
                className="group flex min-h-80 flex-col gap-5 rounded-[2rem] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.045)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-black/6 bg-[#f6f7ef]"
                >
                  <Image
                    src={project.imageSrc[0]}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 28rem, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                    {project.category}
                  </div>
                </Link>

                <div className="flex items-center justify-between gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-display text-2xl font-bold leading-tight text-foreground transition-colors hover:text-primary"
                  >
                    {project.name}
                  </Link>
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                <p className="text-base leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((stackItem) => (
                    <span
                      key={stackItem}
                      className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {stackItem}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-4 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Detail Project <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`${activeFilter}-empty`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-72 flex-col items-center justify-center rounded-[2rem] border border-dashed border-primary/20 bg-white/70 px-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.03)]"
          >
            <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
              <FolderSearch className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              No {activeFilter === "all" ? "projects" : `${activeFilter} projects`} yet
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Projects for this platform will appear here as soon as they are
              added to the archive.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
