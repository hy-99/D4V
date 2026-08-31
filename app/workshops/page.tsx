import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const workshopRhythm = [
  {
    title: "Prepare",
    text: "Start with the questions people already have and make the room comfortable for discussion.",
  },
  {
    title: "Practice",
    text: "Look at familiar scam patterns and slow down long enough to notice the pressure inside them.",
  },
  {
    title: "Discuss",
    text: "Compare safer ways to verify without asking anyone to share more than they want to.",
  },
  {
    title: "Take home",
    text: "Leave with one clear reminder and a next step that works outside the room.",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "Scam Workshops | D4V Bay Area",
  description:
    "See how D4V Bay Area structures practical, discussion-first scam-prevention workshops for local groups.",
};

export default function WorkshopsPage() {
  return (
    <PageShell activeHref="/our-work" layout="workshop-table">
      <EditorialSection replay variant="settle" className="workshop-poster">
        <div className="inner-wrap workshop-poster__title">
          <div>
            <h1>
              Scam
              <span>Workshops</span>
            </h1>
          </div>
          <p data-readable-copy data-reveal-item style={delay(120)}>
            Practical conversations for local groups, built around examples,
            questions, and the confidence to pause.
          </p>
        </div>
        <StoryImage
          photo={pagePhotos.workshops.primary}
          treatment="panorama"
          eager
          sizes="100vw"
          className="workshop-poster__photo"
          delay={160}
        />
        <div className="inner-wrap">
          <p className="workshop-disclosure" data-readable-copy>
            Photographs from D4V Bay Area’s first community lecture.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="rise"
        labelledBy="workshop-rhythm-heading"
        className="workshop-rhythm"
      >
        <div className="inner-wrap">
          <header className="workshop-rhythm__header">
            <h2 id="workshop-rhythm-heading">Pull up a chair. Work through it together.</h2>
            <p data-readable-copy>
              The goal is not to memorize every scam. It is to make noticing
              pressure and checking separately feel familiar.
            </p>
          </header>
          <ol className="workshop-table">
            {workshopRhythm.map((step, index) => (
              <li key={step.title} data-reveal-item style={delay(100 + index * 70)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p data-readable-copy>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-left"
        labelledBy="workshop-room-heading"
        className="workshop-room"
      >
        <div className="inner-wrap workshop-room__grid">
          <StoryImage
            photo={pagePhotos.workshops.audience}
            treatment="full-bleed"
            sizes="(min-width: 1024px) 58vw, 100vw"
            delay={80}
          />
          <div className="workshop-room__card" data-reveal-item style={delay(150)}>
            <h2 id="workshop-room-heading">The useful part is the pause.</h2>
            <p data-readable-copy>
              A workshop can offer a low-pressure place to examine a
              suspicious message, practice a verification step, and decide
              who to ask next.
            </p>
            <Link href="/get-involved" className="inner-text-link">
              Bring a conversation closer
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
