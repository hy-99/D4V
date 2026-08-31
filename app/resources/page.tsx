import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const guides = [
  {
    id: "pause",
    title: "Pause",
    prompt: "When a message feels urgent",
    text: "Do not click, reply, or send money while someone is rushing you. Step away from the request and give yourself room to think.",
    aside: "Urgency is a reason to slow down.",
    tone: "blue",
  },
  {
    id: "check",
    title: "Check",
    prompt: "Before you trust the request",
    text: "Use a phone number, app, or website you already know. Verify who is contacting you through a separate, familiar route.",
    aside: "A separate channel breaks the pressure.",
    tone: "peach",
  },
  {
    id: "protect",
    title: "Protect",
    prompt: "When information may be exposed",
    text: "Change affected passwords from a trusted device, turn on multi-factor authentication, and contact the relevant provider directly.",
    aside: "Protect the account before returning to the message.",
    tone: "sage",
  },
] as const;

const trustedResources = [
  {
    source: "Federal Trade Commission",
    title: "What to do if you were scammed",
    description:
      "A practical response guide for payments, accounts, personal information, and other scam situations.",
    href: "https://consumer.ftc.gov/articles/what-do-if-you-were-scammed",
  },
  {
    source: "IdentityTheft.gov",
    title: "Make an identity-theft recovery plan",
    description:
      "A guided federal service for reporting identity theft and creating situation-specific recovery steps.",
    href: "https://www.identitytheft.gov/",
  },
  {
    source: "Cybersecurity and Infrastructure Security Agency",
    title: "Build safer account habits",
    description:
      "Clear guidance on strong passwords, multi-factor authentication, phishing, and software updates.",
    href: "https://www.cisa.gov/secure-our-world",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "Online Safety Resources | D4V Bay Area",
  description:
    "Use clear online-safety steps and find authoritative services for scams, identity theft, and account protection.",
};

export default function ResourcesPage() {
  return (
    <PageShell activeHref="/resources" headerTone="hero" layout="resource-field-guide">
      <EditorialSection replay variant="settle" className="resource-cover">
        <StoryImage
          photo={pagePhotos.resources.primary}
          treatment="full-bleed"
          eager
          sizes="100vw"
          className="resource-cover__photo"
          reveal={false}
        />
        <span className="resource-cover__shade" aria-hidden="true" />
        <div className="inner-wrap resource-cover__content">
          <div data-reveal-item style={delay(80)}>
            <h1>Find the next safe step.</h1>
            <p data-readable-copy>
              Online-safety advice is easier to use when it follows one calm,
              repeatable order. Give yourself room, verify through a separate
              route, and protect only what may be exposed.
            </p>
            <p className="resource-cover__cue">Pause. Check. Protect.</p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-left"
        labelledBy="resource-response-heading"
        className="resource-response"
      >
        <div
          className="inner-wrap resource-response__grid"
          data-synchronized-section="resources-response"
          data-reveal-item
          style={delay(70)}
        >
          <div className="resource-response__visual">
            <StoryImage
              photo={pagePhotos.resources.support}
              treatment="oval"
              eager
              sizes="(min-width: 1024px) 48vw, 92vw"
              reveal={false}
            />
            <p>Slow the moment down before deciding what belongs next.</p>
          </div>
          <div className="resource-response__copy">
            <header>
              <h2 id="resource-response-heading">A safer response starts with room to think.</h2>
            </header>
            <p data-readable-copy>
              You do not need to decide everything at once. Each move creates
              more distance from the pressure and a clearer next choice.
            </p>
            <ol className="resource-response__steps">
            {guides.map((guide, index) => (
              <li
                id={guide.id}
                key={guide.id}
                data-guide-tone={guide.tone}
                data-resource-response-step="true"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="resource-response__step-heading">
                    <h3>{guide.title}</h3>
                    <p>{guide.prompt}</p>
                  </div>
                  <p data-readable-copy>{guide.text}</p>
                  <strong>{guide.aside}</strong>
                </div>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-left"
        labelledBy="trusted-resources-heading"
        className="resource-trusted"
      >
        <div
          className="inner-wrap resource-trusted__grid"
          data-synchronized-section="resources-trusted"
          data-reveal-item
          style={delay(70)}
        >
          <header className="resource-trusted__intro">
            <h2 id="trusted-resources-heading">Trusted places to continue.</h2>
            <p data-readable-copy>
              These public services provide the detailed reporting and recovery
              steps that a short guide cannot replace.
            </p>
          </header>
          <div className="resource-trusted__links">
            {trustedResources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{resource.source}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="rise"
        labelledBy="resource-ready-heading"
        className="resource-ready"
      >
        <div className="inner-wrap resource-ready__content" data-reveal-item style={delay(60)}>
          <div>
            <h2 id="resource-ready-heading">Unsure what belongs next?</h2>
            <p data-readable-copy>
              Step away from the message and use a separate, trusted channel
              before taking another action.
            </p>
          </div>
          <Link href="/get-help" className="inner-action-button inner-action-button--light">
            Help with a current concern
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
