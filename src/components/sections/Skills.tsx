"use client";

import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Layers,
  Smartphone,
} from "lucide-react";
import { motion, type Variants } from "motion/react";

import { SectionLabel } from "@/components/shared/SectionLabel";

const skillChips = [
  "Frontend Engineering",
  "Mobile Development",
  "Ios Libraries",
  "API Integration",
  "Git Workflow",
];

const techStack = [
  { name: "React", icon: Braces },
   { name: "SwiftUI", icon: Code2                                                                                                                                                                                                                                                                                                                                    },
  { name: "Flutter", icon: Smartphone },
  { name: "Tailwind", icon: Layers },
  { name: "Firebase", icon: Database },
  { name: "Git", icon: GitBranch },
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
    <section id="skills" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <SectionLabel>Skills</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.08] text-foreground sm:text-6xl">
            Modern technologies for scalable digital products.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl">
            I combine practical engineering with clean interface work to ship
            web and mobile products that stay maintainable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 flex max-w-7xl flex-wrap justify-center gap-4"
        >
          {skillChips.map((chip) => (
            <motion.span
              key={chip}
              variants={item}
              whileHover={{ y: -2 }}
              className="rounded-full bg-white px-7 py-4 text-lg font-semibold text-foreground shadow-[0_16px_50px_rgba(0,0,0,0.05)]"
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
        >
          {techStack.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex min-h-36 flex-col items-center justify-center gap-5 rounded-3xl bg-white p-6 text-center shadow-[0_18px_60px_rgba(0,0,0,0.045)]"
            >
              <Icon className="size-8 text-primary" strokeWidth={1.8} />
              <span className="text-lg font-bold text-muted-foreground">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
