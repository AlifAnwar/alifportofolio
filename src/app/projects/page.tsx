import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
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
                href="https://www.linkedin.com/in/muhamad-alif-anwar/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
              >
                Let&apos;s Work Together
              </Link>
            </div>

            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Project Archive
              </p>
              <h1 className="mt-5 font-display text-5xl font-extrabold  text-foreground sm:text-6xl lg:text-7xl">
                View all selected projects in one place.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A broader look at recent web, mobile, and product work focused on
                clean interfaces, maintainable systems, and production-ready
                delivery.
              </p>
            </div>
          </div>

          <ProjectsFilter projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
