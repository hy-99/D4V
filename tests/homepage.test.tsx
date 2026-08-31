import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "@/app/page";

test("homepage renders the required D4V Bay Area hero and feature content", () => {
  const html = renderToStaticMarkup(<HomePage />);

  assert.match(html, /Join Us in/);
  assert.match(html, /data-page-entry="true"/);
  assert.match(html, /Preventing Online Fraud\./);
  assert.match(html, /EMPOWERING OUR COMMUNITY\./);
  assert.match(html, /PROTECTING WHAT MATTERS\./);
  assert.match(html, /Making Online/);
  assert.match(html, /Safety Easier/);
  assert.match(html, /to Understand/);
  assert.match(html, /href="\/workshops"/);
  assert.match(html, /href="\/seniorsafe"/);
  assert.match(html, /href="\/resources"/);
  assert.match(html, /Fraud thrives in/);
  assert.match(html, /Awareness creates choice\./);
  assert.match(html, /Confidence starts/);
  assert.match(html, /with a conversation\./);
  assert.match(html, /Explore our resources/);
  assert.match(html, /Together, we can stop scams\./);
  assert.match(html, /data-homepage-cta-photo="true"/);
  assert.match(html, /homepage-teamwork-hands\.jpg/);
  assert.match(html, /href="\/workshops"[^>]*>Host a Workshop/);
  assert.match(html, /href="\/get-involved"[^>]*>Get Involved/);
  assert.doesNotMatch(html, /viewBox="0 0 160 320"/);
  assert.match(html, /Host a Workshop/);
  assert.match(html, /© 2026 D4V Bay Area\./);
  assert.match(html, /loading="eager"/);
});

test("root layout declares its smooth-scroll behavior to Next.js", () => {
  const layoutSource = readFileSync(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(layoutSource, /data-scroll-behavior="smooth"/);
});
