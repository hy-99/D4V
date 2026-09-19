import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { AboutFooter } from "@/components/about/about-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { navigationItems } from "@/lib/navigation";
import { withBasePath } from "@/lib/site-paths";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

type SiteFooterProps = {
  tone?: "light" | "dark";
  variant?: "default" | "about";
};

export function SiteFooter({ tone = "light", variant = "default" }: SiteFooterProps) {
  if (tone === "dark") {
    return <AboutFooter />;
  }

  return (
    <ScrollReveal replay={false}>
      <footer
        data-site-footer
        data-footer-tone="light"
        data-footer-variant={variant}
        className="bg-[var(--color-pale-blue)] text-[var(--color-deep-navy)]"
      >
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.45fr_repeat(3,1fr)] lg:gap-10 lg:px-10 lg:py-16">
          <div data-reveal-item style={revealDelay("60ms")}>
            <Link
              href="/"
              className="inline-flex items-center gap-4 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-pale-blue)]"
            >
              <span
                data-footer-brand-logo
                className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full"
              >
                <Image
                  src={withBasePath("/images/d4v-logo-exact.png")}
                  alt="D4V Bay Area logo"
                  fill
                  loading="eager"
                  sizes={variant === "about" ? "80px" : "64px"}
                  className="scale-[1.08] object-cover"
                />
              </span>
              <span>
                <span data-footer-brand-name className="block font-semibold">D4V Bay Area</span>
                <span className="mt-1 block max-w-[220px] text-sm leading-5 text-[color:rgba(21,42,64,0.72)]">
                  Empowering our community.
                  <br />
                  Protecting what matters.
                </span>
              </span>
            </Link>
          </div>

          <nav data-reveal-item style={revealDelay("120ms")} aria-label="Footer quick links">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em]">Quick Links</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:rgba(21,42,64,0.78)]">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-reveal-item style={revealDelay("180ms")} aria-label="Footer help links">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em]">Get Help</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:rgba(21,42,64,0.78)]">
              <li>
                <a
                  href="https://reportfraud.ftc.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                >
                  Report a Scam
                </a>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="transition-colors hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                >
                  Find Resources
                </Link>
              </li>
            </ul>
          </nav>

          <div data-reveal-item style={revealDelay("240ms")}>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em]">Stay Connected</h2>
            <Link
              href="/get-help"
              aria-label="Contact D4V Bay Area through Get Help"
              className="mt-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color:rgba(11,45,74,0.24)] text-[var(--color-deep-navy)] transition-colors hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
            >
              <Mail aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[color:rgba(11,45,74,0.12)]">
          <div className="mx-auto max-w-[1320px] px-6 py-5 text-sm text-[color:rgba(21,42,64,0.65)] sm:px-8 lg:px-10">
            © 2026 D4V Bay Area.
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}
