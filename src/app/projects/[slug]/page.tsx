import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  GitBranch,
  Layers3,
  UserRound,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectImageGallery } from "@/components/projects/ProjectImageGallery";
import { getProjectBySlug, getRelatedProjects, projects } from "@/lib/projects";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Alif",
    };
  }

  return {
    title: `${project.name} | Alif Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);
  const projectMeta = [
    {
      label: "Role",
      value: project.role,
      icon: UserRound,
    },
    {
      label: "Timeline",
      value: project.timeline,
      icon: CalendarDays,
    },
    {
      label: "Category",
      value: project.category,
      icon: Layers3,
    },
    {
      label: "Year",
      value: project.year,
      icon: CheckCircle2,
    },
  ];
  const caseStudySections = [
    {
      title: "Challenge",
      points: project.challenge,
    },
    {
      title: "Solution",
      points: project.solution,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-background px-6 pb-20 pt-32 sm:pb-24">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-[8%] top-32 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
          <div className="absolute right-[10%] top-[32rem] h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              Discuss Similar Project
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Project Detail
              </p>
              <h1 className="mt-5 max-w-5xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                {project.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.stack.map((stackItem) => (
                  <span
                    key={stackItem}
                    className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                  >
                    {stackItem}
                  </span>
                ))}
              </div>
            </div>

            <aside className="glass-card rounded-3xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Project Scope
              </p>
              <div className="mt-5 grid gap-4">
                {projectMeta.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <ProjectImageGallery
            images={project.imageSrc}
            projectName={project.name}
          />

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card rounded-3xl p-7 lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Overview
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground">
                What this project is about
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                {project.overview}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href={project.liveUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  Live Preview
                  <ArrowUpRight className="size-4" />
                </Link>
               
              </div>
            </div>

            <div className="grid gap-5">
              {caseStudySections.map(({ title, points }) => (
                <article
                  key={title}
                  className="rounded-3xl border border-black/6 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.045)]"
                >
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="rounded-3xl border border-black/6 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.045)]">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((stackItem) => (
                    <span
                      key={stackItem}
                      className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      {stackItem}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Key Features
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
                  Project highlights
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="glass-card rounded-3xl p-5"
                >
                  <CheckCircle2 className="size-5 text-primary" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-foreground">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Related Projects
                </p>
                <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-foreground">
                  More work with a similar technical direction.
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                View all projects
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <article
                  key={relatedProject.slug}
                  className="group flex min-h-80 flex-col gap-5 rounded-3xl bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.045)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/6 bg-[#f6f7ef]"
                  >
                    <Image
                      src={relatedProject.imageSrc[0]}
                      alt={`${relatedProject.name} preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </Link>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {relatedProject.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-foreground">
                      {relatedProject.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {relatedProject.description}
                    </p>
                  </div>

                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    View Case Study
                    <ArrowUpRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
