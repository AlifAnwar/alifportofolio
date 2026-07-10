"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const lines = [
  ["simple,", "reliable,", "and", "useful", "web"],
  ["and", "mobile", "applications", "through", "clean"],
  ["development", "and", "user-centered"],
  ["thinking."],
];

const allWords = lines.flat();
const totalAnimatedWords = allWords.length;
const accentWordIndexes = new Set([4, 5, 6]);

function WordReveal({
  index,
  progress,
  targetColor = "#111111",
  children,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  targetColor?: string;
  children: string;
}) {
  const start = index / totalAnimatedWords;
  const end = (index + 1) / totalAnimatedWords;
  const color = useTransform(progress, [start, end], ["#CCCCCC", targetColor]);

  return <motion.span style={{ color }}>{children}</motion.span>;
}

export function ScrollStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Craft statement"
      className="relative h-[180vh] bg-background px-6"
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-[clamp(2.1rem,3.8vw,4.35rem)] font-body leading-[1.16] tracking-[-0.04em] text-balance">
            <span className="mr-[0.18em] inline-block text-foreground">
              I craft
            </span>
            {lines.map((line, lineIndex) => (
              <span
                key={`line-${lineIndex}`}
                className={lineIndex === 0 ? "inline" : "mt-2 block sm:mt-3"}
              >
                {line.map((word, localIndex) => {
                  const currentIndex = wordIndex++;

                  return (
                    <span
                      key={`${lineIndex}-${word}`}
                      className={localIndex < line.length - 1 ? "mr-[0.18em] inline-block" : "inline-block"}
                    >
                      <WordReveal
                        index={currentIndex}
                        progress={scrollYProgress}
                        targetColor={accentWordIndexes.has(currentIndex) ? "#859243" : "#111111"}
                      >
                        {word}
                      </WordReveal>
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
