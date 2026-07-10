"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const navLinks = ["Home", "Services", "Experience", "Skills", "Projects", "Contact"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = useMemo(
    () => (isHome ? "#home" : "/#home"),
    [isHome],
  );

  const contactHref = useMemo(
    () => (isHome ? "#contact" : "/#contact"),
    [isHome],
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/70 bg-white/78 shadow-[0_20px_60px_rgba(133,146,67,0.12)] backdrop-blur-xl transition-all duration-500 supports-[backdrop-filter]:bg-white/72 ${
        scrolled
          ? "px-4 py-3 shadow-[0_24px_70px_rgba(133,146,67,0.16)] sm:px-6"
          : "px-4 py-4 shadow-[0_16px_48px_rgba(133,146,67,0.10)] sm:px-8"
      }`}
    >
      <nav className="flex items-center gap-5 sm:gap-8">
        <Link
          href={homeHref}
          className="font-display text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          Alif.
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const href = isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`;

            return (
              <li key={link}>
                <Link
                  href={href}
                  className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link}
                </Link>
              </li>
            );
          })}
        </ul>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={contactHref}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-shadow duration-300 hover:shadow-primary/40"
          >
            Hire Me
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
}
