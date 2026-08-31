import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { AboutSectionTransition } from "@/components/about/about-section-transition";
import { OfficerCarousel } from "@/components/about/officer-carousel";
import { ScamPhotoDeck } from "@/components/about/scam-photo-deck";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export const metadata: Metadata = {
  title: "About | D4V Bay Area",
  description:
    "Learn why D4V Bay Area makes online-safety guidance clearer and more approachable for older adults and local communities.",
};

export default function AboutPage() {
  return (
    <PageShell
      activeHref="/about"
      footerVariant="about"
      headerTone="light"
      layout="about-reference"
    >
      <EditorialSection replay variant="settle" className="about-reference-hero">
        <div className="inner-wrap about-reference-hero__grid">
          <div className="about-reference-hero__copy">
            <span className="about-reference-hero__dots" aria-hidden="true" />
            <h1>
              <span data-reveal-item style={revealDelay("60ms")}>Who we are{" "}</span>
              <span data-reveal-item style={revealDelay("120ms")}>
                and <strong>why we exist.</strong>
              </span>
            </h1>
            <span data-reveal-item style={revealDelay("180ms")} className="about-reference-rule about-reference-rule--blue" aria-hidden="true" />
            <p data-reveal-item style={revealDelay("240ms")} data-readable-copy>
              D4V Bay Area is a student-led initiative dedicated to helping older
              adults recognize, avoid, and report online fraud. Through education
              and practical resources, we make digital safety clear, approachable,
              and actionable. We exist because scams are evolving—and everyone
              deserves the knowledge to stay one step ahead.
            </p>
          </div>

          <div data-reveal-item style={revealDelay("100ms")} className="about-reference-hero__visual">
            <div className="about-reference-hero__photo" data-story-photo="hero">
              <Image
                src="/images/inner-pages/about-hero-reference.png"
                alt="An older Asian couple smiling as they review a smartphone together."
                fill
                preload
                sizes="(min-width: 1024px) 54vw, 92vw"
              />
            </div>
          </div>
        </div>
      </EditorialSection>

      <AboutSectionTransition variant="warm-to-blue" />

      <EditorialSection
        replay
        variant="settle"
        labelledBy="about-reference-mission-heading"
        className="about-reference-mission"
      >
        <div className="about-reference-mission__wash" aria-hidden="true" />
        <div className="inner-wrap about-reference-mission__grid">
          <div data-reveal-item style={revealDelay("100ms")} className="about-reference-mission__photos">
            <ScamPhotoDeck />
          </div>

          <div className="about-reference-mission__copy">
            <h2 id="about-reference-mission-heading">
              <span data-reveal-item style={revealDelay("80ms")}>Scams change.{" "}</span>
              <span data-reveal-item style={revealDelay("140ms")}>Our mission doesn’t.</span>
            </h2>
            <span data-reveal-item style={revealDelay("200ms")} className="about-reference-rule about-reference-rule--blue" aria-hidden="true" />
            <p data-reveal-item style={revealDelay("260ms")} data-readable-copy>
              Every day, scammers use new tricks—urgency, impersonation, and
              technology—to take advantage of confusion and trust.
            </p>
            <p data-reveal-item style={revealDelay("320ms")} className="about-reference-mission__emphasis">
              D4V exists to turn confusing tactics into clear warning signs.
            </p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="settle"
        labelledBy="about-reference-officers-heading"
        className="about-reference-officers"
      >
        <div className="inner-wrap about-reference-officers__content">
          <header className="about-reference-officers__heading">
            <h2 data-reveal-item style={revealDelay("80ms")} id="about-reference-officers-heading">
              The people behind <span className="about-reference-org-mark">D4V</span> Bay Area.
            </h2>
            <span data-reveal-item style={revealDelay("140ms")} className="about-reference-rule about-reference-rule--blue" aria-hidden="true" />
          </header>
          <div data-reveal-item style={revealDelay("200ms")}>
            <OfficerCarousel />
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="settle"
        labelledBy="about-reference-invitation-heading"
        className="about-reference-invitation"
      >
        <div className="inner-wrap">
          <div
            className="about-reference-invitation__panel"
            data-about-student-invitation="true"
            data-about-student-layout="open"
          >
            <div data-reveal-item style={revealDelay("80ms")} className="about-reference-invitation__art">
              <Image
                src="/illustrations/about-students-cutout.png"
                alt="Four high school students collaborating around a laptop."
                fill
                sizes="(min-width: 1024px) 48vw, (min-width: 768px) 92vw, 100vw"
              />
            </div>

            <div className="about-reference-invitation__copy">
              <h2 id="about-reference-invitation-heading">
                <span data-reveal-item style={revealDelay("140ms")}>High school students,{" "}</span>
                <span data-reveal-item style={revealDelay("200ms")}>make an impact.</span>
              </h2>
              <span data-reveal-item style={revealDelay("260ms")} className="about-reference-rule about-reference-rule--blue" aria-hidden="true" />
              <p data-reveal-item style={revealDelay("320ms")} data-readable-copy>
                We welcome high school students who want to make a difference.
                Whether you enjoy public speaking, design, technology, research,
                or community outreach—there’s a place for you on our team.
              </p>
              <Link data-reveal-item style={revealDelay("380ms")} href="/get-involved" className="about-reference-invitation__action">
                Get Involved
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </EditorialSection>

      <AboutSectionTransition variant="warm-to-footer" />
    </PageShell>
  );
}
