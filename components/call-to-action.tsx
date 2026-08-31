import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export function CallToAction() {
  return (
    <ScrollReveal>
      <section
        aria-labelledby="call-to-action-heading"
        className="relative isolate flex min-h-[22rem] overflow-hidden border-y border-white/10 bg-[var(--color-deep-navy)] sm:min-h-[19rem] lg:min-h-72"
      >
        <Image
          src="/images/homepage-teamwork-hands.jpg"
          alt=""
          fill
          sizes="100vw"
          data-homepage-cta-photo="true"
          className="-z-30 object-cover object-[50%_44%] sm:object-[50%_48%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[rgba(7,27,44,0.58)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,27,44,0.18)_0%,rgba(7,27,44,0.62)_50%,rgba(7,27,44,0.18)_100%)]"
        />

        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-center px-6 py-14 text-center sm:px-8 lg:px-10">
          <h2
            id="call-to-action-heading"
            data-reveal-item
            style={revealDelay("80ms")}
            className="editorial-serif max-w-[16ch] text-[clamp(2.5rem,5vw,3.65rem)] leading-[1.08] font-semibold tracking-[-0.018em] text-[var(--color-warm-white)] sm:max-w-none"
          >
            Together, we can stop scams.
          </h2>
          <div
            data-reveal-item
            style={revealDelay("150ms")}
            className="mt-8 flex w-full max-w-sm flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
          >
            <Link
              href="/workshops"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-orange)] px-7 text-base font-semibold text-[var(--color-warm-white)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#da6c17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-deep-navy)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Host a Workshop
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-warm-white)] px-7 text-base font-semibold text-[var(--color-warm-white)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-warm-white)] hover:text-[var(--color-deep-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm-white)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-deep-navy)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
