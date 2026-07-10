"use client";

import { ArrowUpRight, GitBranch } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/lib/projects";

const featuredProjects = projects.slice(0, 3);

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2 className="max-w-xl font-display text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl">
            Latest Featured Projects
          </h2>

          <Link
            href="/projects"
            className="inline-flex items-center gap-4 pb-2 text-lg font-medium text-foreground transition-opacity duration-200 hover:opacity-70"
          >
            View All Projects
            <ArrowUpRight className="size-5" />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="glass-card group flex min-h-72 flex-col gap-5 rounded-3xl p-7"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/40 bg-white/40"
              >
                <Image
                  src={project.imageSrc}
                  alt={`${project.name} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 32rem, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  {project.category}
                </div>
              </Link>

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

              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-display text-xl font-bold text-foreground transition-colors hover:text-primary"
                  >
                    {project.name}
                  </Link>
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View Case Study <ArrowUpRight className="size-4" />
                </Link>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitBranch className="size-4" /> Source Code
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
