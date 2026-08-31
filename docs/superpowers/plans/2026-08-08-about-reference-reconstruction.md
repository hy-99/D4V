# About Reference Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/about` to match the supplied reference with the requested photo and officer carousels and homepage-style replaying landing animation.

**Architecture:** Keep `/about` as a server-composed route, isolate client state in the two existing carousel components, add an About-only dark footer variant through `PageShell`, and scope all visual rules beneath `data-page-layout="about-reference"`. No homepage selector or homepage component changes.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, CSS, `next/image`, Lucide React, Playwright.

---

### Task 1: Lock the reference contract in tests

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Assert that About renders exactly four content sections, the dark About footer, the photo carousel, four blank officer slots, and the compact student invitation.
- [ ] Assert that About sections use replaying reveal state and expose staggered reveal items.
- [ ] Assert both carousels rotate by buttons and keyboard while no officer identity data is rendered.
- [ ] Run `npm test` and the focused Playwright About tests and confirm the new assertions fail before implementation.

### Task 2: Rebuild the About route composition

**Files:**
- Modify: `app/about/page.tsx`

- [ ] Remove the extra program links and principles list that are absent from the reference.
- [ ] Mark hero, mission, officer, and invitation content groups with `data-reveal-item` and controlled delays.
- [ ] Use replaying `EditorialSection` wrappers so revisiting each section triggers the same landing behavior as the homepage.
- [ ] Replace the oversized closing approach panel with the compact student invitation composition shown in the reference.

### Task 3: Make the officer preview genuinely rotatable without fake data

**Files:**
- Modify: `components/about/officer-carousel.tsx`

- [ ] Add a typed `placeholderCount` prop used only when profiles are empty.
- [ ] Allow controls and ArrowLeft/ArrowRight to rotate through blank slots.
- [ ] Keep the visible stage neutral and show only an unobtrusive position status; do not render names, roles, bios, portraits, or silhouettes.
- [ ] Preserve the existing profile rendering path for later real data.

### Task 4: Add the compact About-only footer

**Files:**
- Modify: `components/page-shell.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/about/page.tsx`

- [ ] Add a typed `footerTone` prop with `light` as the default and `dark` for About.
- [ ] Render the same truthful navigation and D4V message in a compact dark layout without unsupported contact details or social links.
- [ ] Keep the homepage footer output unchanged when the prop is omitted.

### Task 5: Match the supplied proportions and responsive behavior

**Files:**
- Modify: `app/globals.css`

- [ ] Rework only `about-reference` selectors to match the reference's desktop heights, title measures, image crops, section density, caption placement, officer stage, and invitation panel.
- [ ] Add About-footer dark styles through a footer data attribute rather than broad selectors.
- [ ] Add tablet and mobile rules that preserve reading order, touch targets, and no overflow.
- [ ] Ensure reduced-motion rules remove carousel and reveal motion while retaining opacity and content.

### Task 6: Validate behavior and regressions

**Files:**
- Verify: all modified files

- [ ] Run `npm test`, `npm run lint`, and `npm run typecheck`.
- [ ] Run the complete Playwright UI suite against `localhost`.
- [ ] Capture `/about` at 1440x1000, 1024x768, 768x1024, and 390x844 and inspect composition against the reference.
- [ ] Compare homepage desktop and mobile hashes against the saved baselines.
- [ ] Run `npm run build` and production-smoke `/about`.

