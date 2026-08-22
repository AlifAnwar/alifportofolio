"use client";

import { Briefcase, GitBranch, Link, Mail } from "lucide-react";
import { motion } from "motion/react";

import { SectionLabel } from "@/components/shared/SectionLabel";

const contactLinks = [
  { label: "Email", href: "mailto:hello@alif.dev", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Link },
  { label: "GitHub", href: "https://github.com", icon: GitBranch },
  { label: "Upwork", href: "https://www.upwork.com/freelancers", icon: Briefcase },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-64 w-[min(600px,90vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-extrabold  text-foreground sm:text-6xl lg:text-7xl">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl">
            I&apos;m available for freelance projects, collaborations, and
            opportunities related to web and mobile development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="mailto:muhamadalifanwar@gmail.com"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-primary px-8 flex items-center justify-center h-10 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
          >
            Contact Me
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/muhamad-alif-anwar/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="glass-card rounded-full px-8 flex items-center justify-center h-10 text-lg font-semibold text-foreground transition-colors hover:border-primary/30"
          >
            Hire Me
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-12 flex justify-center gap-5"
        >
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ y: -4, scale: 1.1 }}
              title={label}
              aria-label={label}
              className="glass-card rounded-2xl p-4 text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="size-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
