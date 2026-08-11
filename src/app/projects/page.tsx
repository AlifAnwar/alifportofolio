import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-6 pb-20 pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
              >
                Let&apos;s Work Together
              </Link>
            </div>

            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Project Archive
              </p>
              <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                View all selected projects in one place.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A broader look at recent web, mobile, and product work focused on
                clean interfaces, maintainable systems, and production-ready
                delivery.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
