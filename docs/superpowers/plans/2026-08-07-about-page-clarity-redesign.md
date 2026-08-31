# D4V About Page Clarity Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/about` as a clean, factual, five-section page without changing the homepage or other routes.

**Architecture:** Keep the existing `PageShell`, `EditorialSection`, `StoryImage`, photo registry, and motion system. Replace only the About route markup and About-specific CSS, then strengthen route tests around the approved content and non-overlapping structure.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, scoped global CSS, `next/image`, Node test runner, Playwright.

---

### Task 1: Lock the About content contract

**Files:**
- Modify: `tests/pages.test.tsx`

- [ ] Replace the old About required text with `Making online safety easier to understand`.
- [ ] Assert the five approved section headings and all three audience labels are rendered.
- [ ] Assert legacy `about-manifesto`, `about-belief`, and `about-principles` structures are absent.
- [ ] Run `npm test` and confirm the About assertions fail before implementation.

### Task 2: Replace the About route composition

**Files:**
- Modify: `app/about/page.tsx`

- [ ] Remove the abstract manifesto, belief, and indented-principles content.
- [ ] Add the approved identity hero with one primary photo.
- [ ] Add the purpose section with the conversation photo.
- [ ] Add the three-label audience band.
- [ ] Add the three-item offering section using typed local arrays and truthful future-facing copy.
- [ ] Add the four-principle approach section using a typed local array.
- [ ] Keep one `h1`, semantic section headings, meaningful links, and no Team placeholder.

### Task 3: Build the responsive About visual system

**Files:**
- Modify: `app/globals.css`

- [ ] Remove the old About-specific overlap, negative-margin, and staggered-row rules.
- [ ] Add About-only desktop grids, typography, image treatments, section colors, and separators.
- [ ] Add tablet stacking at `63.999rem` without content collisions.
- [ ] Add mobile flow at `47.999rem` with readable type, no negative margins, and no horizontal overflow.
- [ ] Preserve existing shared page, footer, focus, and reduced-motion rules.

### Task 4: Validate behavior and visual output

**Files:**
- Modify: `tests/ui-qa.spec.ts` only if About-specific assertions need updating.

- [ ] Run `npm test`; expect all unit tests to pass.
- [ ] Run `npm run lint`; expect no lint errors.
- [ ] Run `npm run typecheck`; expect no TypeScript errors.
- [ ] Run the Playwright UI suite against a clean local server; expect all tests to pass.
- [ ] Inspect `/about` at 1440x1000, 1024x768, 768x1024, and 390x844.
- [ ] Compare homepage screenshots at 1440x1000 and 390x844 against the existing byte-level baselines.
- [ ] Run `npm run build`; expect all static routes to generate successfully.
