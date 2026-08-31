# Our Work Opening Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first two Our Work sections with a photo-backed hero and integrated four-panel path band.

**Architecture:** Keep the existing page data and `StoryImage` component, but restructure the route markup around explicit hero and path-band hooks. Replace only the `work-triptych` scoped CSS so no homepage or other route inherits the design.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner, Playwright

---

### Task 1: Protect The New Structure

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Assert the old route label is absent and the new hero, hero photo, lead panel, and three path links exist.
- [ ] Assert the hero photo covers its section, the title is inside it, the title remains readable, and the path band resolves to four, two, or one columns by viewport.
- [ ] Run `npm test` and the focused Playwright test; confirm both fail against the old layout.

### Task 2: Rebuild The Route Markup

**Files:**
- Modify: `app/our-work/page.tsx`

- [ ] Set `activeHref="/our-work"` and `headerTone="hero"` on `PageShell`.
- [ ] Place the primary `StoryImage` as a non-revealing background layer inside the hero.
- [ ] Add deliberate heading spans, an orange rule, and the existing supporting copy over the image.
- [ ] Move the path heading into the first band panel.
- [ ] Render each path as a full linked tile with photo, overlay, title, description, and action.

### Task 3: Replace The Scoped Styling

**Files:**
- Modify: `app/globals.css`

- [ ] Replace the old intro grid and panorama styles with a 540px-plus layered photographic hero.
- [ ] Replace the detached chapter heading and bordered columns with a gapless responsive band.
- [ ] Add tone-specific overlays and restrained hover/focus transitions.
- [ ] Add tablet and mobile layouts without changing global or homepage selectors.

### Task 4: Refine And Verify

**Files:**
- Verify: `app/our-work/page.tsx`
- Verify: `app/globals.css`
- Verify: `tests/pages.test.tsx`
- Verify: `tests/ui-qa.spec.ts`

- [ ] Run the focused unit and browser tests until green.
- [ ] Capture and inspect all four target viewports.
- [ ] Run `npm test`, `npm run lint`, `npm run typecheck`, `npx playwright test`, and `npm run build`.
