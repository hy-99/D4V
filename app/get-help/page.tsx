import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const nextSteps = [
  {
    title: "Stop the conversation",
    text: "Do not click, reply, share a code, send money, or install anything while the request is active.",
  },
  {
    title: "Verify separately",
    text: "Use an official app, statement, or phone number you already trust, never the details in the unexpected message.",
  },
  {
    title: "Protect what was shared",
    text: "Change exposed passwords from a trusted device and contact the relevant provider directly.",
  },
  {
    title: "Contact the institution",
    text: "If money or financial information is involved, contact the bank, payment service, or company through official support.",
  },
] as const;

const officialActions = [
  {
    title: "Money or account access was involved",
    description: "Review the FTC's response steps and contact the financial provider directly.",
    href: "https://consumer.ftc.gov/articles/what-do-if-you-were-scammed",
    action: "Review FTC recovery steps",
  },
  {
    title: "Personal information may be exposed",
    description: "Build a recovery plan based on the information that may have been shared.",
    href: "https://www.identitytheft.gov/",
    action: "Start at IdentityTheft.gov",
  },
  {
    title: "You are ready to report the scam",
    description: "Send a report to the Federal Trade Commission through its official service.",
    href: "https://reportfraud.ftc.gov/",
    action: "Open ReportFraud.ftc.gov",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "Get Help | D4V Bay Area",
  description:
    "Take calm, immediate steps after a suspicious call, message, payment request, or possible identity theft.",
};

export default function GetHelpPage() {
  return (
    <PageShell activeHref="/get-help" headerTone="hero" layout="help-action-board">
      <EditorialSection replay variant="settle" className="help-hero">
        <div
          className="inner-wrap help-hero__content"
          data-help-hero="true"
          data-reveal-item
          style={delay(70)}
        >
          <div className="help-hero__copy">
            <h1>Pause first.</h1>
            <p data-readable-copy>
              You do not have to resolve a call, message, or request while
              someone is pressuring you. Step away and verify through a route
              you trust.
            </p>
          </div>
          <aside
            className="help-hero__emergency"
            data-help-emergency="true"
          >
            <strong>Immediate danger?</strong>
            <p>If someone may be in immediate danger, contact local emergency services.</p>
          </aside>
        </div>
        <div className="help-hero__photo" data-help-photo="true">
          <StoryImage
            photo={pagePhotos.help.primary}
            treatment="full-bleed"
            eager
            sizes="100vw"
            reveal={false}
          />
        </div>
        <span className="help-hero__shade" aria-hidden="true" />
      </EditorialSection>

      <EditorialSection
        replay
        variant="rise"
        labelledBy="help-steps-heading"
        className="help-response"
      >
        <div
          className="inner-wrap help-response__grid"
          data-synchronized-section="help-response"
          data-reveal-item
          style={delay(70)}
        >
          <header>
            <h2 id="help-steps-heading">Take these steps in order.</h2>
            <p data-readable-copy>
              Start with the first step that applies. A calm, separate route
              is more useful than trying to answer the pressure immediately.
            </p>
          </header>
          <ol className="help-response__steps">
            {nextSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p data-readable-copy>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="rise"
        labelledBy="help-actions-heading"
        className="help-actions"
      >
        <div
          className="inner-wrap help-actions__grid"
          data-synchronized-section="help-actions"
          data-reveal-item
          style={delay(70)}
        >
          <header>
            <h2 id="help-actions-heading">Choose the route that matches what happened.</h2>
            <p data-readable-copy>
              These links open official federal services in a new tab. Use the
              one that is closest to your situation.
            </p>
          </header>
          <div className="help-actions__links">
            {officialActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noreferrer"
              >
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <span>
                  {action.action}
                  <ExternalLink aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-right"
        labelledBy="help-after-heading"
        className="help-after"
      >
        <div
          className="inner-wrap help-after__grid"
          data-synchronized-section="help-after"
          data-reveal-item
          style={delay(60)}
        >
          <StoryImage
            photo={pagePhotos.help.support}
            treatment="action-strip"
            sizes="(min-width: 1024px) 52vw, 92vw"
            reveal={false}
          />
          <div className="help-after__copy">
            <h2 id="help-after-heading">Save what helps. Leave the rest behind.</h2>
            <p data-readable-copy>
              Keep the message or take a screenshot if it is safe to do so,
              then use a separate channel to decide what belongs next.
            </p>
            <Link href="/resources" className="inner-action-button">
              Review the field guide
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
