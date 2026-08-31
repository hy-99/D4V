import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { EditorialSection } from "@/components/editorial-section";
import { PageShell } from "@/components/page-shell";
import { StoryImage } from "@/components/story-image";
import { pagePhotos } from "@/lib/page-photos";

const chapters = [
  {
    title: "Scam Workshops",
    description:
      "Discussion-first learning that makes common scam patterns easier to recognize and talk about.",
    href: "/workshops",
    action: "Enter the workshop room",
    photo: pagePhotos.work.workshop,
    tone: "blue",
  },
  {
    title: "SeniorSafe",
    description:
      "A calmer way to practice small online-safety habits with people you trust.",
    href: "/seniorsafe",
    action: "Explore SeniorSafe",
    photo: pagePhotos.work.seniorsafe,
    tone: "peach",
  },
  {
    title: "Resources",
    description:
      "Clear starting points for pausing, checking, protecting accounts, and finding the right help.",
    href: "/resources",
    action: "Open the field guide",
    photo: pagePhotos.work.resources,
    tone: "sage",
  },
] as const;

const connectionSteps = [
  {
    title: "Recognize the pattern.",
    description:
      "Workshops are designed to make common tactics and warning signs easier to name.",
  },
  {
    title: "Practice the pause.",
    description:
      "SeniorSafe turns caution into familiar questions and repeatable everyday habits.",
  },
  {
    title: "Keep the next step close.",
    description:
      "Resources make practical guidance easier to revisit when something feels uncertain.",
  },
] as const;

const nextChoices = [
  {
    title: "Plan ahead",
    description:
      "Compare the three education paths and choose what fits your group, family, or question.",
    href: "#work-paths",
    action: "Review the three paths",
  },
  {
    title: "Something feels wrong now",
    description:
      "Stop contact, verify through a separate trusted channel, and protect anything already shared.",
    href: "/get-help",
    action: "Go to Get Help",
  },
] as const;

const delay = (milliseconds: number) =>
  ({ "--reveal-delay": `${milliseconds}ms` }) as CSSProperties;

export const metadata: Metadata = {
  title: "Our Work | D4V Bay Area",
  description:
    "Explore D4V Bay Area's workshops, SeniorSafe education, and practical online-safety resources.",
};

export default function OurWorkPage() {
  return (
    <PageShell
      activeHref="/our-work"
      headerTone="hero"
      layout="work-triptych"
    >
      <EditorialSection replay variant="settle" className="work-intro">
        <div className="work-intro__hero" data-work-hero="true">
          <div className="work-intro__backdrop" data-work-hero-photo="true">
            <StoryImage
              photo={pagePhotos.work.primary}
              treatment="full-bleed"
              eager
              sizes="100vw"
              reveal={false}
            />
          </div>
          <div className="work-intro__veil" aria-hidden="true" />

          <div className="inner-wrap work-intro__content">
            <h1>
              <span data-reveal-item style={delay(80)}>Three paths into</span>
              <span data-reveal-item style={delay(150)}>safer online habits.</span>
            </h1>
            <span
              data-reveal-item
              style={delay(220)}
              className="work-intro__rule"
              aria-hidden="true"
            />
            <p data-reveal-item style={delay(290)} data-readable-copy>
              Choose the path that matches the question in front of you. Each
              begins with plain language, a little more time, and a practical
              next step.
            </p>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        id="work-paths"
        replay
        variant="rise"
        labelledBy="work-chapters-heading"
        className="work-chapters"
      >
        <div className="work-path-band" data-work-path-band="true">
          <div
            data-reveal-item
            style={delay(70)}
            className="work-path-band__lead"
            data-work-path-lead="true"
          >
            <h2 id="work-chapters-heading">Follow what feels useful now.</h2>
            <span className="work-path-band__rule" aria-hidden="true" />
            <p data-readable-copy>
              These paths support one another, but there is no required place
              to begin.
            </p>
          </div>

          {chapters.map((chapter, index) => (
            <Link
              href={chapter.href}
              key={chapter.href}
              data-work-tone={chapter.tone}
              data-work-path="true"
              data-reveal-item
              style={delay(130 + index * 80)}
              className="work-path"
            >
              <StoryImage
                photo={chapter.photo}
                treatment="full-bleed"
                sizes="(min-width: 1152px) 25vw, (min-width: 640px) 50vw, 100vw"
                reveal={false}
              />
              <span className="work-path__overlay" aria-hidden="true" />
              <div className="work-path__copy">
                <h3>{chapter.title}</h3>
                <p data-readable-copy>{chapter.description}</p>
                <span className="work-path__action">
                  {chapter.action}
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-left"
        labelledBy="work-connection-heading"
        className="work-connection"
      >
        <div
          className="inner-wrap work-connection__grid"
          data-work-connection="true"
        >
          <div className="work-connection__copy">
            <h2
              id="work-connection-heading"
              data-reveal-item
              style={delay(70)}
            >
              From a warning sign to a clearer next step.
            </h2>
            <p data-reveal-item style={delay(140)} data-readable-copy>
              The three paths are designed to support different parts of the
              same moment: noticing something unusual, talking it through, and
              knowing what to do next.
            </p>

            <ol className="work-connection__steps">
              {connectionSteps.map((step, index) => (
                <li
                  key={step.title}
                  data-work-connection-step="true"
                  data-reveal-item
                  style={delay(210 + index * 80)}
                >
                  <span className="work-connection__marker" aria-hidden="true" />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="work-connection__visual">
            <div
              data-reveal-item
              style={delay(120)}
              className="work-connection__photo work-connection__photo--wide"
            >
              <StoryImage
                photo={pagePhotos.work.learning}
                treatment="full-bleed"
                sizes="(min-width: 1024px) 46vw, 92vw"
                reveal={false}
              />
            </div>
            <div
              data-reveal-item
              style={delay(220)}
              className="work-connection__photo work-connection__photo--portrait"
            >
              <StoryImage
                photo={pagePhotos.work.checking}
                treatment="portrait-stack"
                imageClassName="work-connection__phone-photo"
                sizes="(min-width: 1024px) 20vw, 46vw"
                reveal={false}
              />
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        replay
        variant="from-right"
        labelledBy="work-next-step-heading"
        className="work-next-step"
      >
        <div className="work-next-step__grid" data-work-next-step="true">
          <div
            className="work-next-step__content"
            data-work-next-content="true"
          >
            <h2
              id="work-next-step-heading"
              data-reveal-item
              style={delay(130)}
            >
              What do you need right now?
            </h2>
            <p data-reveal-item style={delay(190)} data-readable-copy>
              If you are planning ahead, choose an education path. If a
              suspicious call, message, or payment request is active, step
              away from it before doing anything else.
            </p>

            <nav className="work-next-step__choices" aria-label="Choose a next step">
              {nextChoices.map((choice, index) => (
                <Link
                  key={choice.title}
                  href={choice.href}
                  data-work-next-choice="true"
                  data-reveal-item
                  style={delay(250 + index * 80)}
                  className="work-next-step__choice"
                >
                  <h3>{choice.title}</h3>
                  <span className="work-next-step__choice-copy">
                    <span>{choice.description}</span>
                    <span className="work-next-step__action">
                      {choice.action}
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div
            className="work-next-step__visual"
            data-work-next-visual="true"
            data-reveal-item
            style={delay(70)}
          >
            <StoryImage
              photo={pagePhotos.work.conversation}
              treatment="full-bleed"
              sizes="(min-width: 1152px) 46vw, 100vw"
              reveal={false}
            />
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
