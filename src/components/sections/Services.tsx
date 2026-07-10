"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

type ServiceItem = {
  body: string;
  header: string;
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlightPhrases = ["Flutter and native iOS", "HealthKit, Apple Watch, and iOS native", "web applications", "secure authentication" ,"API integrations", ];

function renderBody(body: string) {
  let remaining = body;
  const nodes: React.ReactNode[] = [];

  highlightPhrases.forEach((phrase) => {
    const index = remaining.indexOf(phrase);

    if (index === -1) {
      return;
    }

    const before = remaining.slice(0, index);
    const after = remaining.slice(index + phrase.length);

    if (before) {
      nodes.push(before);
    }

    nodes.push(
      <span key={phrase} className="text-[#859243]">
        {phrase}
      </span>,
    );

    remaining = after;
  });

  if (remaining) {
    nodes.push(remaining);
  }

  return nodes.length > 0 ? nodes : body;
}

function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex size-7 shrink-0 items-center justify-center text-foreground">
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-[2px] w-7 rounded-full bg-current"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-7 w-[2px] rounded-full bg-current"
      />
    </span>
  );
}

export function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadServices() {
      const response = await fetch("/assets/content/service.json");

      if (!response.ok) {
        throw new Error("Failed to load service data");
      }

      const data = (await response.json()) as ServiceItem[];

      if (active) {
        setServices(data);
        setOpenIndex(0);
      }
    }

    loadServices().catch(() => {
      if (active) {
        setServices([]);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="services" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <h2 className="font-display text-5xl font-bold tracking-[-0.06em] text-foreground sm:text-6xl">
            Services
          </h2>
          <p className="pb-2 text-xl tracking-[-0.05em] text-foreground sm:text-2xl">
            What i do
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="space-y-5"
        >
          {services.map((service, index) => {
            const open = openIndex === index;

            return (
              <motion.article
                key={service.header}
                variants={fadeUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative isolate overflow-hidden rounded-[12px] border-t-2 border-black/16 bg-white"
              >
                <motion.div
                  aria-hidden="true"
                  variants={{
                    rest: {
                      clipPath: "circle(0% at 50% 100%)",
                      opacity: 0.92,
                      transition: {
                        duration: 0.78,
                        ease: [0.32, 0, 0.2, 1],
                      },
                    },
                    hover: {
                      clipPath: "circle(145% at 50% 100%)",
                      opacity: 1,
                      transition: {
                        duration: 1.05,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="pointer-events-none absolute inset-0 -z-10 bg-[#f4f5ea]"
                />
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-panel-${index}`}
                  onClick={() =>
                    setOpenIndex((current) => (current === index ? -1 : index))
                  }
                  className="relative z-10 flex w-full items-start justify-between gap-5 px-6 py-6 text-left sm:px-8 sm:py-7"
                >
                  <span className="font-body text-[clamp(1.7rem,2.8vw,3rem)] font-medium tracking-[-0.06em] text-foreground">
                    {service.header}
                  </span>
                  <AccordionIcon open={open} />
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`service-panel-${index}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.28,
                            delay: 0.08,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          opacity: {
                            duration: 0.16,
                          },
                          height: {
                            duration: 0.42,
                            ease: [0.4, 0, 0.2, 1],
                          },
                        },
                      }}
                      className="relative z-10 overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="px-6 pb-7 text-[clamp(1.2rem,2vw,2rem)] leading-[1.18] tracking-[-0.05em] text-foreground sm:px-8 sm:pb-8"
                      >
                        {renderBody(service.body)}
                      </motion.p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
