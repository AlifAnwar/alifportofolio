import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Poppins } from "next/font/google";
import { MotionConfig } from "motion/react";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alif — Web & Mobile Developer",
  description:
    "Freelance web and mobile developer creating scalable digital products with clean design and smooth user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${poppins.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className={`${dmSans.className} flex min-h-full flex-col cursor-none`}>
        <MotionConfig reducedMotion="user">
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg transition-transform duration-150 ease-out focus:translate-y-0 motion-reduce:transition-none"
          >
            Skip to main content
          </a>
          <CustomCursor />
          {children}
          <Analytics />
        </MotionConfig>
      </body>
    </html>
  );
}
