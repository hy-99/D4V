import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) =>
  new URL(`../${path}`, import.meta.url);

test("Next.js is configured for a configurable static GitHub Pages export", () => {
  const config = readFileSync(projectFile("next.config.ts"), "utf8");

  assert.match(config, /output:\s*["']export["']/);
  assert.match(config, /trailingSlash:\s*true/);
  assert.match(config, /unoptimized:\s*true/);
  assert.match(config, /NEXT_PUBLIC_BASE_PATH|siteBasePath/);
});

test("GitHub Pages workflow validates, exports, uploads, and deploys the site", () => {
  const workflowPath = projectFile(".github/workflows/deploy-pages.yml");

  assert.ok(existsSync(workflowPath), "the GitHub Pages workflow should exist");

  const workflow = readFileSync(workflowPath, "utf8");

  for (const command of [
    "npm ci",
    "npm test",
    "npm run lint",
    "npm run typecheck",
    "npm run build",
  ]) {
    assert.match(workflow, new RegExp(command.replaceAll(" ", "\\s+")));
  }

  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*\/D4V/);
  assert.match(workflow, /actions\/configure-pages@v\d+/);
  assert.match(workflow, /actions\/upload-pages-artifact@v\d+/);
  assert.match(workflow, /path:\s*\.\/out/);
  assert.match(workflow, /actions\/deploy-pages@v\d+/);
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
});

test("public image sources are passed through the configurable base-path helper", () => {
  const imageFiles = [
    "components/about/about-footer.tsx",
    "components/about/officer-carousel.tsx",
    "components/about/scam-photo-deck.tsx",
    "components/awareness-section.tsx",
    "components/call-to-action.tsx",
    "components/confidence-section.tsx",
    "components/feature-tile.tsx",
    "components/header.tsx",
    "components/hero.tsx",
    "components/photo-frame.tsx",
    "components/site-footer.tsx",
    "components/story-image.tsx",
    "app/about/page.tsx",
  ];

  for (const file of imageFiles) {
    const source = readFileSync(projectFile(file), "utf8");

    assert.match(source, /withBasePath\(/, `${file} should prefix public images`);
    assert.doesNotMatch(
      source,
      /<Image[\s\S]{0,240}?\bsrc=["']\/(?:images|illustrations)\//,
      `${file} should not render an unprefixed public image`,
    );
  }
});

test("the exported site includes a no-Jekyll marker", () => {
  assert.ok(
    existsSync(projectFile("public/.nojekyll")),
    "public/.nojekyll should be copied into the static export",
  );
});
