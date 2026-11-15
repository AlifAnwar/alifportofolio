"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState, type MouseEvent } from "react";

const experiences = [
  {
    company: "Onebyone Logistical",
    role: "Frontend Engineer",
    period: "Nov 2025 - Now",
    logoSrc: "/assets/images/logo/logoobo.png",
    hoverImg: "/assets/images/experience/obo-hover.png",
  },
  {
    company: "Apple Developer Academy",
    role: "iOS developer",
    period: "Feb 2025 - Jan 2026",
    logoSrc: "/assets/images/logo/logoacad.png",
    hoverImg: "/assets/images/experience/acad-hover.png",
  },
  {
    company: "Bengkel Koding",
    role: "Frontend Developer",
    period: "Feb 2025 - Jan 2026",
    logoSrc: "/assets/images/logo/logobengkod.png",
    hoverImg: "/assets/images/experience/bengkod-hover.png",
  },
];

export function Experience() {
  const [activeHoverImage, setActiveHoverImage] = useState<string | null>(null);
  const hoverX = useMotionValue(-240);
  const hoverY = useMotionValue(-240);
  const springX = useSpring(hoverX, { stiffness: 240, damping: 24 });
  const springY = useSpring(hoverY, { stiffness: 240, damping: 24 });

  const handleHoverMove = (event: MouseEvent<HTMLElement>) => {
    hoverX.set(event.clientX + 24);
    hoverY.set(event.clientY - 140);
  };

  return (
    <section id="experience" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[0.95fr_1.45fr] lg:gap-16"
        >
          <div className="flex flex-col justify-between">
            <h2 className="max-w-sm font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl">
              Experience That Builds Trust
            </h2>

            <a
              href="/assets/docs/Muhamad%20Alif%20Anwar%20-%20Resume%202026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 mb-8 w-fit inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary px-6 h-10 text-left text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            >
              <span>See my resume</span>
              <span className="grid size-8 place-items-center rounded-full bg-white/20">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </div>

          <div className="border-t border-border/80 ">
            {experiences.map((item, index) => (
              <motion.article
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActiveHoverImage(item.hoverImg)}
                onMouseLeave={() => setActiveHoverImage(null)}
                onMouseMove={handleHoverMove}
                className="grid gap-6 border-b border-border/80 px-4 py-8 transition-colors duration-300 hover:bg-primary/5 sm:grid-cols-[112px_1fr] sm:items-center lg:grid-cols-[132px_1fr_auto]"
              >
                <div className="relative h-14 w-28 sm:h-16 sm:w-24 lg:h-20 lg:w-32">
                  <Image
                    src={item.logoSrc}
                    alt={`${item.company} logo`}
                    fill
                    className="object-contain object-left"
                    sizes="(min-width: 1024px) 8rem, (min-width: 640px) 6rem, 7rem"
                  />
                </div>

                <div>
                  <h3 className="text-base font-medium tracking-tight text-foreground sm:text-xl">
                    {item.company}
                  </h3>
                  <p className="text-xl text-foreground/90 sm:text-lg">
                    {item.role}
                  </p>
                </div>

                <p className="text-lg text-foreground/85 sm:text-xl lg:text-right">
                  {item.period}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeHoverImage ? (
          <motion.div
            key={activeHoverImage}
            initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            exit={{ opacity: 0, scale: 0.96, rotate: -3 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
            style={{ x: springX, y: springY }}
          >
            <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-[1.75rem] border border-white/65 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <Image
                src={activeHoverImage}
                alt="Experience preview"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
