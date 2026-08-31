import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteFooter } from "@/components/site-footer";
import AboutPage from "@/app/about/page";
import GetHelpPage from "@/app/get-help/page";
import GetInvolvedPage from "@/app/get-involved/page";
import OurWorkPage from "@/app/our-work/page";
import ResourcesPage from "@/app/resources/page";
import SeniorSafePage from "@/app/seniorsafe/page";
import WorkshopsPage from "@/app/workshops/page";
import { getAdjacentOfficerIndex } from "@/components/about/officer-carousel";
import { ScamPhotoDeck } from "@/components/about/scam-photo-deck";

const pages = [
  {
    name: "About",
    element: <AboutPage />,
    requiredText: "Who we are",
    layout: "about-reference",
    minimumPhotos: 1,
  },
  {
    name: "Our Work",
    element: <OurWorkPage />,
    requiredText: "Three paths into",
    layout: "work-triptych",
    minimumPhotos: 7,
  },
  {
    name: "Resources",
    element: <ResourcesPage />,
    requiredText: "Find the next safe step",
    layout: "resource-field-guide",
    minimumPhotos: 2,
  },
  {
    name: "Scam Workshops",
    element: <WorkshopsPage />,
    requiredText: "Practical conversations for local groups",
    layout: "workshop-table",
    minimumPhotos: 2,
  },
  {
    name: "SeniorSafe",
    element: <SeniorSafePage />,
    requiredText: "Safer habits, practiced at a comfortable pace",
    layout: "seniorsafe-panorama",
    minimumPhotos: 3,
  },
  {
    name: "Get Involved",
    element: <GetInvolvedPage />,
    requiredText: "Help safer conversations travel",
    layout: "involvement-collage",
    minimumPhotos: 3,
  },
  {
    name: "Get Help",
    element: <GetHelpPage />,
    requiredText: "Pause first.",
    layout: "help-action-board",
    minimumPhotos: 2,
  },
] as const;

test("each primary route has distinct production content and shared navigation", () => {
  for (const page of pages) {
    const html = renderToStaticMarkup(page.element);

    assert.match(html, new RegExp(page.requiredText));
    assert.match(html, new RegExp(`data-page-layout="${page.layout}"`));
    assert.ok(
      (html.match(/data-story-photo=/g) ?? []).length >= page.minimumPhotos,
      `${page.name} should render at least ${page.minimumPhotos} story photographs`,
    );
    assert.match(html, /data-readable-copy/);
    assert.doesNotMatch(html, /data-page-title/);
    assert.doesNotMatch(html, /data-section-kicker/);
    assert.doesNotMatch(html, /data-photo-frame/);
    assert.doesNotMatch(html, /data-page-art/);
    assert.doesNotMatch(html, /data-page-doodle/);
    assert.doesNotMatch(html, /data-team-section/);
    assert.match(html, /data-page-entry="true"/);
    assert.match(html, /D4V Bay Area/);
    assert.match(html, /About/);
    assert.match(html, /Get Help/);
    assert.ok(
      (html.match(/loading="eager"/g) ?? []).length >= 2,
      `${page.name} should eagerly load its header badge and primary story image`,
    );
    assert.doesNotMatch(html, /This route is intentionally minimal/);
  }
});

test("each inner route marks the matching primary navigation item as current", () => {
  const activePages = [
    { name: "About", element: <AboutPage />, href: "/about" },
    { name: "Our Work", element: <OurWorkPage />, href: "/our-work" },
    { name: "Resources", element: <ResourcesPage />, href: "/resources" },
    { name: "Workshops", element: <WorkshopsPage />, href: "/our-work" },
    { name: "SeniorSafe", element: <SeniorSafePage />, href: "/our-work" },
    { name: "Get Involved", element: <GetInvolvedPage />, href: "/get-involved" },
    { name: "Get Help", element: <GetHelpPage />, href: "/get-help" },
  ] as const;

  for (const page of activePages) {
    const html = renderToStaticMarkup(page.element);
    const currentLinkPattern = new RegExp(
      `<a[^>]*href="${page.href.replaceAll("/", "\\/")}"[^>]*aria-current="page"|<a[^>]*aria-current="page"[^>]*href="${page.href.replaceAll("/", "\\/")}"`,
    );

    assert.match(html, currentLinkPattern, `${page.name} should identify its primary navigation route`);
  }
});

test("every inner route exports route-specific metadata", () => {
  const routeFiles = [
    "about",
    "our-work",
    "resources",
    "workshops",
    "seniorsafe",
    "get-involved",
    "get-help",
  ];

  for (const route of routeFiles) {
    const source = readFileSync(new URL(`../app/${route}/page.tsx`, import.meta.url), "utf8");
    assert.match(source, /export const metadata(?:\s*:\s*Metadata)?\s*=/, `${route} should export metadata`);
  }
});

test("footer reporting action opens the official FTC reporting service", () => {
  const html = renderToStaticMarkup(<SiteFooter />);

  assert.match(html, /href="https:\/\/reportfraud\.ftc\.gov\/"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noreferrer"/);
});

test("our work uses a photo-backed hero and integrated path band", () => {
  const html = renderToStaticMarkup(<OurWorkPage />);

  assert.doesNotMatch(html, /D4V \/ Our Work/);
  assert.match(html, /data-work-hero="true"/);
  assert.match(html, /data-work-hero-photo="true"/);
  assert.match(html, /data-work-path-band="true"/);
  assert.match(html, /data-work-path-lead="true"/);
  assert.match(html, /data-work-connection="true"/);
  assert.match(html, /data-work-next-step="true"/);
  assert.match(html, /From a warning sign to a clearer next step\./);
  assert.match(html, /What do you need right now\?/);
  assert.doesNotMatch(html, /Clear information should feel usable\./);
  assert.doesNotMatch(html, /data-work-principles="true"/);
  assert.equal(
    (html.match(/data-work-path="true"/g) ?? []).length,
    3,
    "Our Work should expose three complete linked paths",
  );
  assert.equal(
    (html.match(/data-work-connection-step="true"/g) ?? []).length,
    3,
    "Our Work should explain how its three paths connect",
  );
  assert.equal(
    (html.match(/data-work-next-choice="true"/g) ?? []).length,
    2,
    "Our Work should provide two clear next-step choices",
  );
  assert.match(html, /href="#work-paths"/);
  assert.match(html, /href="\/get-help"/);
  assert.match(html, /d4v-first-lecture-presenters\.jpg/);
  assert.ok(
    html.indexOf('data-work-next-content="true"') <
      html.indexOf('data-work-next-visual="true"'),
    "Our Work next-step text should precede its supporting photograph",
  );
});

test("workshops page uses truthful photography from D4V's first lecture", () => {
  const html = renderToStaticMarkup(<WorkshopsPage />);

  assert.match(html, /d4v-first-lecture-presenters\.jpg/);
  assert.match(html, /d4v-first-lecture-audience\.jpg/);
  assert.match(html, /Photographs from D4V Bay Area’s first community lecture\./);
  assert.doesNotMatch(
    html,
    /This page describes a possible learning format, not a record of completed D4V events\./,
  );
});

test("unfinished inner pages do not use standalone eyebrow subtitles", () => {
  const pagesWithoutEyebrows = [
    {
      name: "Resources",
      html: renderToStaticMarkup(<ResourcesPage />),
      labels: ["D4V field guide", "Keep this close"],
    },
    {
      name: "Workshops",
      html: renderToStaticMarkup(<WorkshopsPage />),
      labels: [
        "Community learning / Bay Area",
        "A possible session rhythm",
        "Make room for questions",
      ],
    },
    {
      name: "SeniorSafe",
      html: renderToStaticMarkup(<SeniorSafePage />),
      labels: ["SeniorSafe", "Practice without pressure"],
    },
    {
      name: "Get Involved",
      html: renderToStaticMarkup(<GetInvolvedPage />),
      labels: ["D4V / Get involved", "Community starts small"],
    },
    {
      name: "Get Help",
      html: renderToStaticMarkup(<GetHelpPage />),
      labels: ["When something feels wrong", "After the pressure stops"],
    },
  ];

  for (const page of pagesWithoutEyebrows) {
    for (const label of page.labels) {
      assert.doesNotMatch(
        page.html,
        new RegExp(
          `<p(?:\\s[^>]*)?>${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</p>`,
          "i",
        ),
        `${page.name} should not render the eyebrow label “${label}”`,
      );
    }
  }
});

test("about page follows the supplied reference composition without exceptions", () => {
  const html = renderToStaticMarkup(<AboutPage />);
  const pageText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  for (const text of [
    "Who we are and why we exist.",
    "Scams change. Our mission doesn’t.",
    "The people behind D4V Bay Area.",
    "High school students, make an impact.",
    "Get Involved",
    "Urgent account alert",
    "Unknown caller",
    "Package message",
    "Unusual payment request",
  ]) {
    assert.match(
      pageText,
      new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.match(html, /data-page-layout="about-reference"/);
  assert.match(html, /data-footer-tone="light"/);
  assert.match(html, /data-footer-variant="about"/);
  assert.doesNotMatch(html, /about-reference-footer/);
  assert.doesNotMatch(html, /about-reference-header__/);
  assert.match(html, /condensed-display/);
  assert.match(
    html,
    /data-header-brand-place="true" class="condensed-display/,
  );
  assert.match(html, /data-about-student-invitation="true"/);
  assert.match(html, /about-students-cutout\.png/);
  assert.doesNotMatch(html, /about-students-reference\.png/);
  assert.match(html, /class="[^"]*about-reference-hero/);
  assert.match(html, /class="[^"]*about-reference-mission/);
  assert.match(html, /class="[^"]*about-reference-officers/);
  assert.match(html, /class="[^"]*about-reference-invitation/);
  assert.ok(
    (html.match(/data-reveal-item/g) ?? []).length >= 12,
    "About should stagger its reference-matched content groups",
  );
  assert.match(html, /data-scam-photo-deck="true"/);
  assert.match(html, /data-scam-photo-frame="editorial"/);
  assert.equal(
    (html.match(/data-scam-photo-slide=/g) ?? []).length,
    4,
    "About should render four representative scam photographs",
  );
  assert.equal(
    (html.match(/data-scam-photo-selector=/g) ?? []).length,
    4,
    "About should render one selector for every scam photograph",
  );
  assert.match(html, /aria-label="Pause photo rotation"/);
  assert.doesNotMatch(html, /data-scam-signal="true"|scam-signal-map/);
  assert.doesNotMatch(html, /scam-photo-deck__number/);
  assert.equal(
    (html.match(/data-officer-card="true"/g) ?? []).length,
    0,
    "About should not render officer cards before real data is supplied",
  );
  assert.match(html, /data-officer-stage="empty"/);
  assert.match(html, /data-officer-carousel="true"/);
  assert.match(html, /data-officer-control="previous"/);
  assert.match(html, /data-officer-control="next"/);
  assert.doesNotMatch(html, /Officer profiles will appear here\.|00 \/ 00/);
  assert.doesNotMatch(html, /about-officer-carousel__empty-(?:media|copy)/);
  assert.match(html, /data-about-student-layout="open"/);
  assert.equal(
    (html.match(/data-about-color-morph="true"/g) ?? []).length,
    2,
    "About should only morph between sections with different colors",
  );
  assert.doesNotMatch(html, /data-about-wave|about-section-wave/);
  assert.doesNotMatch(
    html,
    /data-about-transition-cloud|about-section-wave__clouds/,
  );
  assert.doesNotMatch(html, /about-section-wave__soft-edge/);
  assert.doesNotMatch(html, /data-officer-slot="empty"/);
  assert.doesNotMatch(html, /Hank Yang|Nathan Yin|Jun Rui Yin|Zachary Labit/);
  assert.doesNotMatch(html, /data-photo-story-carousel=/);
  assert.doesNotMatch(html, /about-reference-programs/);
  assert.doesNotMatch(html, /about-reference-callout/);
  assert.doesNotMatch(html, /Plain Language|Realistic Examples|Trusted Information/);
  assert.doesNotMatch(html, /about-community-focus/);
  assert.doesNotMatch(html, /about-story-opening/);
  assert.doesNotMatch(html, /about-story-purpose/);
  assert.doesNotMatch(html, /about-story-approach/);
  assert.doesNotMatch(html, /about-manifesto/);
  assert.doesNotMatch(html, /about-belief/);
  assert.doesNotMatch(html, /about-principles/);
  assert.doesNotMatch(html, /data-team-section/);
});

test("officer carousel navigation wraps cleanly", () => {
  assert.equal(getAdjacentOfficerIndex(0, -1, 4), 3);
  assert.equal(getAdjacentOfficerIndex(3, 1, 4), 0);
  assert.equal(getAdjacentOfficerIndex(1, 1, 4), 2);
  assert.equal(getAdjacentOfficerIndex(0, 1, 0), 0);
});

test("scam photo deck eagerly loads only its first frame", () => {
  const html = renderToStaticMarkup(<ScamPhotoDeck />);
  const images = [...html.matchAll(/<img[^>]+>/g)].map(([image]) => image);

  assert.equal(images.length, 4);
  assert.match(images[0], /urgent-account-message\.jpg/);
  assert.match(images[0], /loading="eager"/);
  assert.ok(images.slice(1).every((image) => /loading="lazy"/.test(image)));
});

test("scam photo deck rotates on a four-second rhythm", () => {
  const html = renderToStaticMarkup(<ScamPhotoDeck />);

  assert.match(html, /style="--scam-photo-interval:4000ms"/);
});

test("resources lead to authoritative next-step services", () => {
  const html = renderToStaticMarkup(<ResourcesPage />);

  assert.match(html, /data-synchronized-section="resources-response"/);
  assert.equal(
    (html.match(/data-resource-response-step="true"/g) ?? []).length,
    3,
    "Resources should present one visible three-step response sequence",
  );
  assert.doesNotMatch(html, /class="[^"]*resource-step(?:\s|\")/);
  assert.match(html, /Trusted places to continue\./);
  assert.match(html, /https:\/\/consumer\.ftc\.gov\/articles\/what-do-if-you-were-scammed/);
  assert.match(html, /https:\/\/www\.identitytheft\.gov\//);
  assert.match(html, /https:\/\/www\.cisa\.gov\/secure-our-world/);
});

test("get help places urgent guidance before photography and links to official actions", () => {
  const html = renderToStaticMarkup(<GetHelpPage />);

  assert.match(html, /data-help-hero="true"/);
  assert.match(html, /data-synchronized-section="help-response"/);
  assert.ok(
    html.indexOf('data-help-emergency="true"') < html.indexOf('data-help-photo="true"'),
    "The emergency notice should precede the supporting photograph in reading order",
  );
  assert.match(html, /Choose the route that matches what happened\./);
  assert.match(html, /https:\/\/reportfraud\.ftc\.gov\//);
  assert.match(html, /https:\/\/www\.identitytheft\.gov\//);
});

test("SeniorSafe uses each primary photograph once and keeps guidance concise", () => {
  const html = renderToStaticMarkup(<SeniorSafePage />);

  assert.equal(
    (html.match(/alt="Two older adults calmly reviewing a tablet together\."/g) ?? []).length,
    1,
    "SeniorSafe should not repeat its hero photograph later on the page",
  );
  assert.match(html, /data-senior-primary-guidance="true"/);
});

test("get involved keeps its participation path synchronized and focused", () => {
  const html = renderToStaticMarkup(<GetInvolvedPage />);

  assert.match(html, /data-synchronized-section="involve-paths"/);
  assert.doesNotMatch(html, /Ways your skills can help\./);
  assert.doesNotMatch(html, /Public speaking|Community outreach/);
  assert.match(html, /d4v-first-lecture-presenters\.jpg/);
});
