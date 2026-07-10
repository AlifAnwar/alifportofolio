"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = ["Home", "Services", "Projects", "Experience", "Contact"];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          (c) 2026 Alif. Crafted with modern design and clean development.
        </p>
        <nav className="flex gap-6">
          {footerLinks.map((link) => {
            const href = isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`;

            return (
              <Link
                key={link}
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
