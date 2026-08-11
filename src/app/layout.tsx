import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      className={`${poppins.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className={`${poppins.className} flex min-h-full flex-col cursor-none`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
