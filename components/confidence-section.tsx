import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { withBasePath } from "@/lib/site-paths";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export function ConfidenceSection() {
  return (
    <ScrollReveal>
      <section
        aria-labelledby="confidence-section-heading"
        data-confidence-section
        className="relative isolate overflow-hidden bg-[var(--color-pale-blue)]"
      >
        <div className="absolute -left-24 bottom-16 h-64 w-64 rounded-full bg-white/35" />
        <div className="absolute -right-28 top-24 h-64 w-64 rounded-full bg-white/35" />

        <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-10 lg:py-28">
          <div className="max-w-[510px]">
            <div
              data-reveal-item
              style={revealDelay("80ms")}
              className="mb-7 h-1.5 w-14 rounded-full bg-[var(--color-orange)]"
            />
            <h2
              id="confidence-section-heading"
              className="editorial-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.025em] text-[var(--color-deep-navy)]"
            >
              <span
                data-reveal-item
                style={revealDelay("140ms")}
                className="block"
              >
                Confidence starts
              </span>
              <span
                data-reveal-item
                style={revealDelay("200ms")}
                className="block"
              >
                with a conversation.
              </span>
            </h2>
            <p
              data-reveal-item
              style={revealDelay("280ms")}
              className="mt-7 max-w-[430px] text-lg leading-7 text-[color:rgba(21,42,64,0.78)]"
            >
              Simple, practical guidance can help us pause, ask questions, and
              make safer choices online.
            </p>
            <Link
              href="/resources"
              data-reveal-item
              style={revealDelay("360ms")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--color-deep-navy)] underline decoration-[var(--color-orange)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--color-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-pale-blue)]"
            >
              Explore our resources
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>

          <div
            data-reveal-item
            style={revealDelay("80ms")}
            className="awareness-image relative aspect-[1.15] overflow-hidden border-2 border-[color:rgba(73,144,210,0.52)] bg-[var(--color-soft-cream)] shadow-[0_20px_50px_rgba(11,45,74,0.12)]"
          >
            <Image
              src={withBasePath("/images/workshops-placeholder.png")}
              alt="An educational online-safety presentation with older adults attending."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
