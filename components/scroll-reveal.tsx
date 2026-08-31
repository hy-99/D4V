"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  replay?: boolean;
  variant?: RevealVariant;
};

export type RevealVariant =
  | "rise"
  | "from-left"
  | "from-right"
  | "scale"
  | "settle";

export function ScrollReveal({
  children,
  className = "",
  replay = true,
  variant = "rise",
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = revealRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.revealState = "visible";
      return;
    }

    const bounds = element.getBoundingClientRect();
    const isInitiallyVisible =
      bounds.top < window.innerHeight * 0.92 &&
      bounds.bottom > window.innerHeight * 0.08;

    element.dataset.revealState = isInitiallyVisible ? "visible" : "ready";

    const entryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.revealState = "visible";

          if (!replay) {
            entryObserver.unobserve(element);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "-12% 0px -24% 0px",
      },
    );

    const resetObserver = replay
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              return;
            }

            const isFullyOutsideViewport =
              entry.boundingClientRect.bottom <= 0 ||
              entry.boundingClientRect.top >= window.innerHeight;

            if (isFullyOutsideViewport) {
              element.dataset.revealState = "ready";
            }
          },
          { threshold: 0 },
        )
      : null;

    entryObserver.observe(element);
    resetObserver?.observe(element);

    return () => {
      entryObserver.disconnect();
      resetObserver?.disconnect();
    };
  }, [replay]);

  return (
    <div
      ref={revealRef}
      className={`page-section ${className}`.trim()}
      data-reveal-root
      data-reveal-state="pending"
      data-reveal-variant={variant}
    >
      {children}
    </div>
  );
}
