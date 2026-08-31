import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const invitations = [
  {
    verb: "Open",
    title: "Open a conversation",
    text: "Bring a practical online-safety conversation to a community group, gathering, or shared learning space.",
    href: "/workshops",
    action: "Explore workshops",
  },
  {
    verb: "Share",
    title: "Share a clear resource",
    text: "Pass along a simple reminder when someone is facing pressure, uncertainty, or an unfamiliar request.",
    href: "/resources",
    action: "View resources",
  },
  {
    verb: "Practice",
    title: "Practice the pause",
    text: "Help make it normal to slow down, ask another person, and verify through a separate channel.",
    href: "/seniorsafe",
    action: "See SeniorSafe",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "Get Involved | D4V Bay Area",
  description:
    "Find practical ways to support clearer online-safety conversations in Bay Area communities.",
};

export default function GetInvolvedPage() {
  return (
    <PageShell
      activeHref="/get-involved"
      headerTone="hero"
      layout="involvement-collage"
    >
      <EditorialSection replay variant="settle" className="involve-hero">
        <StoryImage
          photo={pagePhotos.work.learning}
          treatment="full-bleed"
          eager
          sizes="100vw"
          className="involve-hero__photo"
          reveal={false}
        />
        <span className="involve-hero__shade" aria-hidden="true" />
        <div className="inner-wrap involve-hero__content">
          <div data-reveal-item style={delay(90)}>
            <h1>Help safer conversations travel.</h1>
            <p data-readable-copy>
              You do not need to be a technical expert to help someone slow
              down, ask, and choose a safer next step.
            </p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="rise"
        labelledBy="involve-invitations-heading"
        className="involve-paths"
      >
        <div
          className="inner-wrap involve-paths__grid"
          data-synchronized-section="involve-paths"
          data-reveal-item
          style={delay(80)}
        >
          <div className="involve-paths__visual">
            <StoryImage
              photo={pagePhotos.work.workshop}
              treatment="full-bleed"
              eager
              sizes="(min-width: 1024px) 48vw, 92vw"
              reveal={false}
            />
            <p>D4V Bay Area’s first community lecture.</p>
          </div>
          <div className="involve-paths__content">
            <header>
              <h2 id="involve-invitations-heading">Choose one useful place to begin.</h2>
              <p data-readable-copy>
                Community support often begins with one practical action
                between people who already trust each other.
              </p>
            </header>
            <nav aria-label="Ways to get involved" className="involve-path-list">
              {invitations.map((invitation, index) => (
                <Link
                  href={invitation.href}
                  key={invitation.verb}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{invitation.title}</h3>
                    <p>{invitation.text}</p>
                    <strong>{invitation.action}</strong>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="scale"
        labelledBy="involve-close-heading"
        className="involve-close"
      >
        <StoryImage
          photo={pagePhotos.involvement.conversation}
          treatment="action-strip"
          sizes="100vw"
          className="involve-close__photo"
          delay={70}
        />
        <div className="involve-close__overlay">
          <h2 id="involve-close-heading">One clear conversation can travel.</h2>
          <Link href="/our-work" className="inner-action-button inner-action-button--light">
            See how the work connects
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
