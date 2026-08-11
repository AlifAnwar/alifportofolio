"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navLinks = ["Home", "Services", "Experience", "Skills", "Projects", "Contact"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
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
      layout
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 rounded-full border border-white/70 bg-white/72 shadow-[0_20px_60px_rgba(133,146,67,0.12)] backdrop-blur-2xl transition-shadow duration-500 supports-[backdrop-filter]:bg-white/62 md:w-auto ${
        scrolled
          ? "px-3 py-1.5 shadow-[0_24px_70px_rgba(133,146,67,0.16)] md:px-6 md:py-3"
          : "px-3 py-1.5 shadow-[0_16px_48px_rgba(133,146,67,0.10)] md:px-8 md:py-4"
      }`}
    >
      <nav className="relative flex w-full items-center justify-between gap-5 md:w-auto md:justify-start md:gap-8">
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

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:block"
        >
          <Link
            href={contactHref}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-shadow duration-300 hover:shadow-primary/40"
          >
            Hire Me
          </Link>
        </motion.div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex size-9 items-center justify-center rounded-full border border-primary/10 bg-white/35 text-foreground transition-colors hover:bg-primary/10 hover:text-primary md:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -14, scaleY: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, scaleY: 0.94, filter: "blur(5px)" }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="absolute top-full right-0 left-0 mt-3 origin-top overflow-hidden rounded-[1.75rem] border border-white bg-white p-3 shadow-[0_24px_70px_rgba(133,146,67,0.18)] md:hidden"
            >
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const href = isHome
                    ? `#${link.toLowerCase()}`
                    : `/#${link.toLowerCase()}`;

                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="relative block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={contactHref}
                onClick={() => setIsMenuOpen(false)}
                className="relative mt-3 block rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-colors hover:bg-primary/90 active:scale-[0.98]"
              >
                Hire Me
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
