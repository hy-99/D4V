import type { Metadata } from "next";
import { Cormorant_Garamond, Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "D4V Bay Area",
  description: "Community-focused online fraud prevention for the Bay Area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sourceSans.variable} ${cormorant.variable} ${oswald.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[var(--color-soft-cream)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-deep-navy)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
