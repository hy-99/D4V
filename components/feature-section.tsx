import { FeatureTile } from "@/components/feature-tile";
import { featureTiles } from "@/lib/feature-tiles";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export function FeatureSection() {
  return (
    <ScrollReveal>
      <section aria-labelledby="feature-section-heading" className="bg-[var(--color-warm-white)]">
        <div className="grid gap-px overflow-hidden bg-[color:rgba(11,45,74,0.12)] md:grid-cols-2 xl:grid-cols-[1.9fr_repeat(3,1fr)]">
          <div className="relative isolate min-h-[320px] overflow-hidden bg-[var(--color-soft-cream)] px-7 py-12 sm:px-10 sm:py-14 md:col-span-2 md:min-h-[370px] xl:col-span-1 xl:min-h-[410px] xl:px-12 xl:py-14">
            <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-[color:rgba(11,45,74,0.08)]" />
            <div className="dot-pattern absolute bottom-8 left-8 h-20 w-20 opacity-70" />

            <div className="relative z-10 w-fit max-w-full">
              <h2
                id="feature-section-heading"
                className="editorial-serif text-[clamp(2.4rem,5.4vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-[var(--color-deep-navy)] xl:text-[4.15rem]"
              >
                <span data-reveal-item style={revealDelay("60ms")} className="block whitespace-nowrap">
                  Making Online
                </span>
                <span data-reveal-item style={revealDelay("120ms")} className="block whitespace-nowrap">
                  Safety Easier
                </span>
                <span data-reveal-item style={revealDelay("180ms")} className="block whitespace-nowrap">
                  to Understand
                </span>
              </h2>
              <div data-reveal-item style={revealDelay("240ms")} className="mt-9 h-1.5 w-16 rounded-full bg-[var(--color-orange)]" />
            </div>
          </div>

          {featureTiles.map((tile) => (
            <FeatureTile key={tile.href} tile={tile} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
