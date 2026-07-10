"use client";

import Image from "next/image";
import { motion } from "motion/react";

import aboutContent from "../../../public/assets/contents/about.json";

const HIGHLIGHTED_ROLE = "Frontend Developer";

export function About() {
  const [beforeRole, afterRole] = aboutContent.body.split(HIGHLIGHTED_ROLE);

  return (
    <section id="about" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16"
        >
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5.8] overflow-hidden rounded-[3rem] bg-muted">
              <Image
                src="/assets/images/itsme.png"
                alt="Portrait of Alif"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 30rem, (min-width: 640px) 24rem, 90vw"
              />
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              About me.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-[1.28] text-foreground sm:text-2xl lg:text-[2.05rem]">
              {beforeRole}
              <span className="font-bold text-lime-700">{HIGHLIGHTED_ROLE}</span>
              {afterRole}
            </p>

            <button
              type="button"
              onClick={() => console.log("Resume button clicked")}
              className="mt-10 inline-flex items-center rounded-2xl bg-lime-800 px-6 py-4 text-lg font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Wanna see my Resume 👀
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
