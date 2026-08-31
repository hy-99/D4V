import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export function AwarenessSection() {
  return (
    <ScrollReveal>
      <section
        aria-labelledby="awareness-section-heading"
        className="relative isolate overflow-hidden bg-[var(--color-pale-blue)]"
      >
        <div className="absolute -left-28 top-24 h-64 w-64 rounded-full bg-white/35" />
        <div className="absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-white/35" />

        <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-10 lg:py-28">
          <div
            data-reveal-item
            style={revealDelay("80ms")}
            className="awareness-image relative aspect-[1.15] overflow-hidden border-2 border-[color:rgba(73,144,210,0.52)] bg-[var(--color-soft-cream)] shadow-[0_20px_50px_rgba(11,45,74,0.12)]"
          >
            <Image
              src="/images/seniorsafe-placeholder.png"
              alt="Older adults reviewing a tablet together at home."
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-[510px]">
            <div
              data-reveal-item
              style={revealDelay("140ms")}
              className="mb-7 h-1.5 w-14 rounded-full bg-[var(--color-orange)]"
            />
            <h2
              id="awareness-section-heading"
              className="editorial-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.025em] text-[var(--color-deep-navy)]"
            >
              <span
                data-reveal-item
                style={revealDelay("180ms")}
                className="block"
              >
                Fraud thrives in
              </span>
              <span
                data-reveal-item
                style={revealDelay("240ms")}
                className="block"
              >
                confusion.
              </span>
              <span
                data-reveal-item
                style={revealDelay("300ms")}
                className="block"
              >
                Awareness creates choice.
              </span>
            </h2>
            <p
              data-reveal-item
              style={revealDelay("380ms")}
              className="mt-7 max-w-[430px] text-lg leading-7 text-[color:rgba(21,42,64,0.78)]"
            >
              We equip Bay Area communities with the knowledge to stay one step
              ahead.
            </p>
            <Link
              href="/our-work"
              data-reveal-item
              style={revealDelay("440ms")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--color-deep-navy)] underline decoration-[var(--color-orange)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-pale-blue)]"
            >
              Learn more about our work
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
