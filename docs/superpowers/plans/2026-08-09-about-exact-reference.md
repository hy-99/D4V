# D4V About Exact Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current About exceptions with a responsive React reconstruction of the supplied reference.

**Architecture:** Keep `/about` as a server page composed from focused About-only data and components. Use semantic arrays for warning and officer content, local optimized image assets, Lucide icons for interface line work, and CSS scoped beneath `data-page-layout="about-reference"` so the homepage cannot inherit the redesign.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, scoped CSS, next/image, next/font, Lucide React, Node test runner, Playwright.

---

### Task 1: Reference Contract Tests

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Replace carousel expectations with assertions for six warning cards, four named officer cards, the student invitation, and reference footer.
- [ ] Run `npm test` and verify the About test fails because the old carousel implementation remains.

### Task 2: About Content Components

**Files:**
- Create: `components/about/scam-signal-map.tsx`
- Create: `components/about/officer-grid.tsx`
- Modify: `app/about/page.tsx`

- [ ] Add typed arrays for the six scam warnings and four officer profiles.
- [ ] Render the exact four-section reference hierarchy with semantic headings and links.
- [ ] Remove all About carousel imports and usage.
- [ ] Run `npm test` and verify the new structural contract passes.

### Task 3: Reference Visual Assets

**Files:**
- Create: `public/images/inner-pages/about-hero-reference.png`
- Create: `public/illustrations/about-students-reference.png`
- Modify: `public/images/inner-pages/README.md`

- [ ] Generate and inspect a natural older-Asian-couple smartphone photograph matching the oval hero crop.
- [ ] Generate and inspect a restrained blue line illustration of four high-school students around a laptop.
- [ ] Store final assets locally and document that they are representative generated artwork rather than D4V event photography.

### Task 4: Reference-Matched Styling

**Files:**
- Modify: `app/globals.css`
- Modify: `components/header.tsx`
- Modify: `components/site-footer.tsx`

- [ ] Replace old About carousel and officer-carousel rules with deterministic hero, signal map, card grid, invitation, and footer rules.
- [ ] Match the 1024px reference section boundaries, spacing, typography, blue wash, shadows, and card proportions.
- [ ] Add tablet and mobile layouts without altering homepage selectors.

### Task 5: Verification and Refinement

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [ ] Run visual captures at `1024x1536`, `1440x1000`, `768x1024`, and `390x844`.
- [ ] Correct overflow, collisions, wrapping, and obvious proportion differences.
- [ ] Run `npm test`, `npm run lint`, `npm run typecheck`, and the complete Playwright suite.
- [ ] Verify the saved homepage hashes at `1440x1000` and `390x844` are unchanged.
- [ ] Run `npm run build` and smoke-test `/about` from the production server.
