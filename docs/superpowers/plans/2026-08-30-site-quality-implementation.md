# D4V Site Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the audited cross-site defects and bring unfinished routes closer to the quality of Home, About, and Our Work without redesigning Home.

**Architecture:** Keep the existing PageShell, Header, MobileMenu, EditorialSection, and StoryImage boundaries. Add behavior at those shared boundaries, then revise route composition and scoped CSS under each `data-page-layout` value.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, CSS, next/image, Lucide React, Playwright, Node test runner.

---

### Task 1: Navigation and focus behavior

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/mobile-menu.tsx`
- Modify: `components/page-shell.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Add failing Playwright coverage for the visible tablet menu, focus containment, and background inertness.
- [ ] Run the focused tests and confirm the current breakpoint and focus failures.
- [ ] Align the menu breakpoint with the header, add dialog focus containment and an explicit close control, and mark background content inert while open.
- [ ] Re-run the focused tests.

### Task 2: Current route, footer targets, and metadata

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/mobile-menu.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/our-work/page.tsx`
- Modify: `app/resources/page.tsx`
- Modify: `app/workshops/page.tsx`
- Modify: `app/seniorsafe/page.tsx`
- Modify: `app/get-involved/page.tsx`
- Modify: `app/get-help/page.tsx`
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Add failing tests for active navigation, route metadata, the official report link, and 44px mobile footer targets.
- [ ] Run the focused tests and confirm failure.
- [ ] Pass the correct active route from every page, expose it in both navigation modes, enlarge footer hit areas, and export per-route metadata.
- [ ] Re-run the focused tests.

### Task 3: Accessible and consistent motion

**Files:**
- Modify: `components/about/scam-photo-deck.tsx`
- Modify: `app/globals.css`
- Modify: all unfinished route pages
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Replace the obsolete no-pause assertion with failing pause/resume behavior coverage.
- [ ] Add replay coverage for an unfinished route and confirm it fails.
- [ ] Add the carousel control, switch route sections to replay, and tune the reveal duration without changing reduced-motion behavior.
- [ ] Re-run focused motion tests.

### Task 4: Route utility and composition

**Files:**
- Modify: `app/resources/page.tsx`
- Modify: `app/seniorsafe/page.tsx`
- Modify: `app/get-involved/page.tsx`
- Modify: `app/get-help/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Add failing content and responsive-geometry tests for trusted resources, Get Help action order, SeniorSafe hero height/photo uniqueness, and Get Involved’s practical participation content.
- [ ] Run the focused tests and confirm failure.
- [ ] Implement the route-specific content and responsive compositions using existing local photography and official external links.
- [ ] Re-run focused tests and inspect all four target viewports.

### Task 5: Full verification

**Files:**
- Verify all modified files.

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npx playwright test tests/ui-qa.spec.ts`.
- [ ] Run `npm run build`.
- [ ] Capture all routes at 1440x1000, 1024x768, 768x1024, and 390x844 and verify no overflow, broken images, inaccessible menu states, or homepage visual regression.

