# About Scam Photo Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the About mission signal drawings with a clean, automatically rotating real-photo deck on the left and mission copy on the right.

**Architecture:** A focused client component owns carousel state, timers, visibility handling, hover/focus pausing, and accessible controls. Typed static slide metadata and local optimized photo assets keep content and licensing centralized; route markup and scoped About CSS own composition.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind/CSS, `next/image`, Lucide React, Playwright, Node test runner

---

### Task 1: Add the behavior contract

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Add a unit assertion that the About page renders `ScamPhotoDeck` and no longer renders `ScamSignalMap`.
- [ ] Add Playwright checks for four local real photos, accessible slide selectors, automatic advancement, pause behavior, reduced-motion behavior, copy-right desktop order, mobile stacking, loaded images, and no horizontal overflow.
- [ ] Run the focused tests and confirm they fail because the photo deck does not exist.

### Task 2: Add and document the photographs

**Files:**
- Create: `public/images/inner-pages/scam-types/urgent-message.jpg`
- Create: `public/images/inner-pages/scam-types/unknown-caller.jpg`
- Create: `public/images/inner-pages/scam-types/package-message.jpg`
- Create: `public/images/inner-pages/scam-types/payment-request.jpg`
- Modify: `public/images/inner-pages/README.md`

- [ ] Copy the four reviewed Pexels files into the local asset directory.
- [ ] Optimize each to an appropriate web size without changing its content.
- [ ] Record photographer, source URL, and Pexels license for every file.

### Task 3: Build the photo deck

**Files:**
- Create: `components/about/scam-photo-deck.tsx`
- Modify: `app/about/page.tsx`

- [ ] Define typed slide metadata with source, alt text, caption, warning label, dimensions, and focal position.
- [ ] Implement a 5.5-second rotating client carousel with direct selectors and pause/play control.
- [ ] Pause on hover, focus-within, and hidden document state; reset the timer after manual selection.
- [ ] Respect reduced motion by disabling automatic advancement.
- [ ] Replace `ScamSignalMap` and move the existing copy to the second grid column.

### Task 4: Style and verify the composition

**Files:**
- Modify: `app/globals.css`

- [ ] Replace signal-map styles with scoped photo-deck framing, transitions, caption treatment, controls, and progress indicators.
- [ ] Use a balanced desktop grid with imagery left and copy right; stack imagery before copy below 1024px.
- [ ] Remove obsolete signal-map responsive rules.
- [ ] Run focused tests until green, inspect desktop/tablet/mobile screenshots, then run `npm test`, `npm run lint`, `npm run typecheck`, `npx playwright test --reporter=line`, and `npm run build`.

### Task 5: Fill the mission copy column

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/ui-qa.spec.ts`

- [x] Add a browser regression for desktop copy width and responsive typography scale.
- [x] Confirm the current constrained typography fails the regression.
- [x] Expand the copy width and increase heading, body, and emphasis sizing without resizing the carousel.
- [x] Confirm desktop and mobile remain overflow-free.
- [x] Re-run the full validation suite and production build.
