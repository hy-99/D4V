"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import {
  startTransition,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

type ScamPhoto = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
  objectPosition: string;
};

const scamPhotos = [
  {
    src: "/images/inner-pages/scam-types/urgent-account-message.jpg",
    alt: "An older woman reading a message on her smartphone.",
    label: "Urgent account alert",
    caption: "“Act now” messages may also ask you to verify your identity.",
    width: 1600,
    height: 1067,
    objectPosition: "center 48%",
  },
  {
    src: "/images/inner-pages/scam-types/unknown-caller.jpg",
    alt: "An older man answering a phone call at home.",
    label: "Unknown caller",
    caption: "Impersonators may create urgency or tell you not to speak with anyone.",
    width: 1600,
    height: 1066,
    objectPosition: "center 44%",
  },
  {
    src: "/images/inner-pages/scam-types/package-message.jpg",
    alt: "A delivery worker using a smartphone while handing over a package.",
    label: "Package message",
    caption: "A delivery notice may claim that your package is on hold.",
    width: 1600,
    height: 1068,
    objectPosition: "center 48%",
  },
  {
    src: "/images/inner-pages/scam-types/payment-request.jpg",
    alt: "A person holding a payment card while using a smartphone.",
    label: "Unusual payment request",
    caption: "Requests for gift cards or immediate payment deserve a pause.",
    width: 1066,
    height: 1600,
    objectPosition: "center 64%",
  },
] as const satisfies readonly ScamPhoto[];

export const scamPhotoRotationInterval = 4000;
const rotationStyle = {
  "--scam-photo-interval": `${scamPhotoRotationInterval}ms`,
} as CSSProperties;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function ScamPhotoDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % scamPhotos.length);
      });
    }, scamPhotoRotationInterval);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const selectPhoto = (index: number) => {
    startTransition(() => setActiveIndex(index));
  };

  return (
    <div
      className="scam-photo-deck"
      style={rotationStyle}
      data-scam-photo-deck="true"
      data-scam-photo-rotation={prefersReducedMotion || isPaused ? "paused" : "running"}
      role="region"
      aria-label="Common scam warning patterns"
      aria-roledescription="carousel"
    >
      <div
        className="scam-photo-deck__frame"
        data-scam-photo-frame="editorial"
      >
        <div className="scam-photo-deck__stage">
          {scamPhotos.map((photo, index) => {
            const isActive = index === activeIndex;
            const imageStyle = {
              "--scam-photo-position": photo.objectPosition,
            } as CSSProperties;

            return (
              <figure
                key={photo.src}
                className="scam-photo-deck__slide"
                data-scam-photo-slide={isActive ? "active" : "inactive"}
                aria-hidden={isActive ? undefined : true}
              >
                <div className="scam-photo-deck__media">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(min-width: 1200px) 700px, (min-width: 768px) 82vw, 92vw"
                    style={imageStyle}
                  />
                  <span className="scam-photo-deck__shade" aria-hidden="true" />
                </div>
                <figcaption className="scam-photo-deck__caption">
                  <span className="scam-photo-deck__copy">
                    <strong>{photo.label}</strong>
                    <span>{photo.caption}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="scam-photo-deck__controls">
        <div className="scam-photo-deck__selectors" aria-label="Choose a warning pattern">
          {scamPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              data-scam-photo-selector={index}
              aria-label={`Show ${photo.label.toLowerCase()} photo`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => selectPhoto(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="scam-photo-deck__pause"
          aria-label={isPaused ? "Resume photo rotation" : "Pause photo rotation"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((current) => !current)}
        >
          {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>{isPaused ? "Resume" : "Pause"}</span>
        </button>
      </div>

      <p className="sr-only" aria-live="off">
        Showing {scamPhotos[activeIndex].label}.
      </p>
    </div>
  );
}
