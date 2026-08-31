# Our Work Page Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a photo-led connected-path section and a dark editorial principles section after the approved Our Work path band.

**Architecture:** Extend the existing typed photo registry with two already-documented assets, then add two route-local sections to `app/our-work/page.tsx`. Keep all visual rules scoped to `work-triptych` and protect structure and responsive behavior in the existing test suites.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner, Playwright

---

### Task 1: Protect The Expanded Page

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Require six Our Work photographs, both new section hooks, three connected steps, and three principles.
- [ ] Require the connection composition to resolve to two columns on desktop and one below 1024px.
- [ ] Run the tests and confirm they fail because the sections do not exist.

### Task 2: Expose Existing Photography

**Files:**
- Modify: `lib/page-photos.ts`

- [ ] Add the existing workshop-audience and senior-phone entries to `pagePhotos.work` without duplicating metadata.

### Task 3: Add The Sections

**Files:**
- Modify: `app/our-work/page.tsx`

- [ ] Add the connected-path section with two `StoryImage` instances and a semantic three-item list.
- [ ] Add the principles section with a semantic three-item list and truthful concise copy.
- [ ] Preserve the approved hero and path band markup.

### Task 4: Add Responsive Styling

**Files:**
- Modify: `app/globals.css`

- [ ] Add a pale-blue two-column connection composition with an editorial overlapping photo pair.
- [ ] Add a deep-navy principles ledger with three separated rows.
- [ ] Stack both compositions cleanly at tablet and mobile widths.

### Task 5: Verify

**Files:**
- Verify: `app/our-work/page.tsx`
- Verify: `lib/page-photos.ts`
- Verify: `app/globals.css`
- Verify: `tests/pages.test.tsx`
- Verify: `tests/ui-qa.spec.ts`

- [ ] Run the focused tests and inspect all target viewports.
- [ ] Run `npm test`, `npm run lint`, `npm run typecheck`, `npx playwright test`, and `npm run build`.
