"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-background px-6 pb-16 pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(133,146,67,0.12),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(72,86,0,0.08),_transparent_35%)]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.14,
              delayChildren: 0.1,
            },
          },
        }}
        className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        <motion.div variants={fadeUp} className="max-w-6xl">
          <h1 className="font-display text-[clamp(3.2rem,11vw,7.8rem)] font-bold leading-[0.95] tracking-[-0.06em] text-foreground">
            <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-5 sm:gap-x-6">
              <motion.span
                initial={{ opacity: 0, y: 72 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
              >
                Hello
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 88 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38, duration: 0.8, ease: easeOut }}
                className="relative h-24 w-44 overflow-hidden rounded-full sm:h-28 sm:w-52 lg:h-32 lg:w-60"
              >
                <Image
                  src="/assets/images/photohero.png"
                  alt="Portrait of Alif in the hero section"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 15rem, (min-width: 640px) 13rem, 11rem"
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 112 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.52, duration: 0.82, ease: easeOut }}
              >
                I&apos;m Alif
              </motion.span>
            </span>

            <span className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-5 sm:mt-5 sm:gap-x-6">
              <span>I</span>
              <span className="text-[#859243]">develop</span>
              <span className="relative h-12 w-12 overflow-hidden rounded-full sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <Image
                  src="/assets/images/photohero2.png"
                  alt="Small decorative hero portrait"
                  fill
                  className="object-cover"
                  sizes="4rem"
                />
              </span>
              <span>stuff&apos;s.</span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-3xl text-balance text-[clamp(1.45rem,3vw,2.45rem)] font-light leading-[1.15] tracking-[-0.04em] text-[#9a9a9a]"
        >
          I create scalable <span className="text-[#859243]">Web | Mobile</span>{" "}
          products with clean design and smooth user experiences.
        </motion.p>

        <motion.div variants={fadeUp} className="">


          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-20 grid w-full max-w-5xl gap-10 border-t border-black/6 pt-5 grid-cols-2 sm:grid-cols-3 sm:gap-6 "
          >
            <div className="flex flex-col items-center">
              <p className="font-display text-3xl sm:text-6xl font-bold tracking-[-0.08em] text-foreground">
                +2
              </p>
              <p className="mt-1 text-base sm:text-[clamp(1.35rem,2vw,2rem)] tracking-[-0.05em] text-foreground">
                Years Experience
              </p>
            </div>

            <div className="hidden flex-col items-center sm:flex">
              <p className="text-xl font-semibold  tracking-[-0.04em] text-foreground sm:text-2xl">
                Get in touch with
              </p>
              <p className="text-[clamp(1.35rem,2vw,2rem)] font-medium tracking-[-0.05em] text-[#859243]">
                me?
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-display text-3xl sm:text-6xl font-bold tracking-[-0.08em] text-foreground">
                +10
              </p>
              <p className="mt-1 text-base sm:text-[clamp(1.35rem,2vw,2rem)] tracking-[-0.05em] text-foreground">
                Project Client
              </p>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-col items-center sm:hidden">
            <p className="text-xl font-semibold tracking-[-0.04em] text-foreground">
              Get in touch with
            </p>
            <p className="text-[1.35rem] font-medium tracking-[-0.05em] text-[#859243]">
              me?
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-[#485600] px-7 py-3 text-lg font-medium text-white shadow-[0_18px_40px_rgba(72,86,0,0.24)] transition-shadow hover:shadow-[0_24px_52px_rgba(72,86,0,0.32)] sm:mt-0"
          >
            <span>Contact Me</span>
            <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#485600]">
              <ArrowRight size={18} />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
