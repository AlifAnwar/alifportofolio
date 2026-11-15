"use client";

import { Database, Globe, Smartphone } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { SectionLabel } from "@/components/shared/SectionLabel";

const skillGroups = [
  {
    title: "Web development",
    description:
      "Responsive interfaces and reusable components that stay clear as products evolve.",
    technologies: ["React", "Tailwind CSS", "Laravel"],
    icon: Globe,
  },
  {
    title: "Mobile development",
    description:
      "Native iOS and cross-platform experiences designed around practical user flows.",
    technologies: ["SwiftUI", "Flutter"],
    icon: Smartphone,
  },
  {
    title: "Integration and delivery",
    description:
      "APIs, backend services, and version-controlled workflows that connect development to release.",
    technologies: ["Firebase", "App Store Connect", "Google Play","REST APIs", "Git"],
    icon: Database,
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="px-6 py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl lg:pt-2"
        >
          <SectionLabel>Skills</SectionLabel>
          <h2
            id="skills-heading"
            className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl"
          >
            A focused stack for reliable <span className="text-brand-text">web and mobile</span> products.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-[1.6] text-muted-foreground">
            My work centers on interface engineering, mobile development, and
            the integrations needed to move a product from idea to release.
          </p>
        </motion.div>

        <motion.ul
          aria-label="Core capabilities and technologies"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="border-t border-border"
        >
          {skillGroups.map(({ title, description, technologies, icon: Icon }) => (
            <motion.li
              key={title}
              variants={item}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-b border-border py-8 sm:gap-6 sm:py-10"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-6" strokeWidth={2} />
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">
                  {title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-[1.6] text-muted-foreground sm:text-lg">
                  {description}
                </p>
                <ul
                  aria-label={`${title} technologies`}
                  className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
                >
                  {technologies.map((technology) => (
                    <li
                      key={technology}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-primary"
                      />
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
