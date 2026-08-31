import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const safetyRhythm = [
  {
    title: "Pause",
    text: "Give yourself time before clicking, replying, or sending anything.",
  },
  {
    title: "Ask",
    text: "Bring another person into the moment when a request feels unusual or urgent.",
  },
  {
    title: "Verify",
    text: "Use a trusted app, website, or phone number instead of the details in the message.",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "SeniorSafe | D4V Bay Area",
  description:
    "Explore a calm, practical online-safety learning approach designed with older adults in mind.",
};

export default function SeniorSafePage() {
  return (
    <PageShell activeHref="/our-work" layout="seniorsafe-panorama">
      <EditorialSection replay variant="settle" className="senior-intro">
        <div className="inner-wrap senior-intro__grid">
          <div className="senior-intro__copy">
            <h1>Safer habits, practiced at a comfortable pace.</h1>
            <p data-readable-copy>
              Patient conversations and familiar steps can make online-safety
              guidance easier to use in everyday life.
            </p>
            <p className="senior-intro__note" data-senior-primary-guidance="true">
              Start with one suspicious call, message, or request. Pause long
              enough to check it through a familiar route.
            </p>
          </div>
          <StoryImage
            photo={pagePhotos.seniorsafe.primary}
            treatment="portrait-stack"
            eager
            sizes="(min-width: 1024px) 44vw, 92vw"
            className="senior-intro__photo"
            delay={80}
          />
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-left"
        labelledBy="senior-rhythm-heading"
        className="senior-rhythm"
      >
        <div className="inner-wrap">
          <header className="senior-rhythm__header">
            <h2 id="senior-rhythm-heading">One calm rhythm to return to.</h2>
            <p data-readable-copy>
              The goal is not to memorize every scam. It is to recognize
              pressure and come back to a familiar way of checking.
            </p>
          </header>
          <ol className="senior-conversation-band">
            {safetyRhythm.map((step, index) => (
              <li key={step.title} data-reveal-item style={delay(90 + index * 80)}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p data-readable-copy>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="scale"
        labelledBy="senior-practice-heading"
        className="senior-practice"
      >
        <div className="inner-wrap senior-practice__grid">
          <div className="senior-practice__visual">
            <StoryImage
              photo={pagePhotos.seniorsafe.practice}
              treatment="oval"
              sizes="(min-width: 1024px) 44vw, 92vw"
              caption="Learning is easier when there is room to ask."
              delay={80}
            />
            <StoryImage
              photo={pagePhotos.seniorsafe.phone}
              treatment="contact-sheet"
              sizes="(min-width: 1024px) 15vw, 42vw"
              className="senior-practice__inset"
              delay={150}
            />
          </div>
          <div className="senior-practice__copy">
            <h2 id="senior-practice-heading">
              Confidence can grow in one ordinary moment.
            </h2>
            <p data-readable-copy>
              Review a suspicious message together, practice finding an
              official contact, and choose one account to protect today.
            </p>
            <Link href="/resources" className="inner-action-button">
              Explore clear resources
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
