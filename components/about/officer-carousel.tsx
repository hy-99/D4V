"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  startTransition,
  useState,
  type KeyboardEvent,
} from "react";

export type Officer = {
  name: string;
  role: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
};

export const officers: readonly Officer[] = [];

export function getAdjacentOfficerIndex(
  currentIndex: number,
  direction: -1 | 1,
  profileCount: number,
) {
  if (profileCount <= 0) return 0;
  const normalizedIndex = ((currentIndex % profileCount) + profileCount) % profileCount;
  return (normalizedIndex + direction + profileCount) % profileCount;
}

type OfficerCarouselProps = {
  profiles?: readonly Officer[];
};

export function OfficerCarousel({ profiles = officers }: OfficerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"previous" | "next">("next");
  const visibleIndex = profiles.length > 0 ? activeIndex % profiles.length : 0;
  const activeOfficer = profiles[visibleIndex];
  const canRotate = profiles.length > 1;

  const rotate = (step: -1 | 1) => {
    if (!canRotate) return;
    setDirection(step === 1 ? "next" : "previous");
    startTransition(() => {
      setActiveIndex((current) =>
        getAdjacentOfficerIndex(current, step, profiles.length),
      );
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotate(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      rotate(1);
    }
  };

  return (
    <div
      className="about-officer-stage"
      data-officer-stage={profiles.length > 0 ? "populated" : "empty"}
    >
      <button
        type="button"
        className="about-officer-control about-officer-control--previous"
        data-officer-control="previous"
        aria-label="Previous officer"
        disabled={!canRotate}
        onClick={() => rotate(-1)}
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <div
        className="about-officer-carousel"
        data-officer-carousel="true"
        role="region"
        aria-label="D4V Bay Area officer profiles"
        aria-roledescription="carousel"
        tabIndex={canRotate ? 0 : undefined}
        onKeyDown={onKeyDown}
      >
        <div className="about-officer-carousel__viewport" aria-live="polite">
          {activeOfficer ? (
            <article
              key={`${activeOfficer.name}-${direction}`}
              className="about-officer-carousel__slide"
              data-officer-card="true"
              data-officer-direction={direction}
            >
              <Image
                src={activeOfficer.imageSrc}
                alt={activeOfficer.imageAlt}
                fill
                sizes="(min-width: 1280px) 1240px, 94vw"
                style={{ objectPosition: activeOfficer.imagePosition ?? "center" }}
              />
              <div className="about-officer-carousel__shade" aria-hidden="true" />
              <div className="about-officer-carousel__copy">
                <p className="about-officer-carousel__role">{activeOfficer.role}</p>
                <h3>{activeOfficer.name}</h3>
                <span className="about-officer-carousel__rule" aria-hidden="true" />
                <p className="about-officer-carousel__summary">{activeOfficer.summary}</p>
              </div>
            </article>
          ) : (
            <div className="about-officer-carousel__empty" aria-hidden="true" />
          )}
        </div>
      </div>

      <button
        type="button"
        className="about-officer-control about-officer-control--next"
        data-officer-control="next"
        aria-label="Next officer"
        disabled={!canRotate}
        onClick={() => rotate(1)}
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
