# About Spacing And Team Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all current officer data and give the About page clean, generous spacing while preserving a future-ready team implementation.

**Architecture:** Keep the page composition and animations, but make `OfficerGrid` data-driven with an empty exported collection. Consolidate spacing in About-scoped CSS so no homepage or other-route styles change.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind/CSS, `next/image`, Playwright.

---

### Task 1: Lock The Empty Team And Spacing Requirements

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Assert zero officer cards, absence of previous names, and presence of the empty officer stage.
- [ ] Assert normal mission text color, lining numerals, and increased desktop section heights.
- [ ] Run the focused tests and confirm they fail before implementation.

### Task 2: Remove Officer Data And Prepare The Future Interface

**Files:**
- Modify: `components/about/officer-grid.tsx`
- Modify: `app/about/page.tsx`

- [ ] Define an exported `Officer` type with `name`, `role`, `summary`, `imageSrc`, and `imageAlt`.
- [ ] Export an empty `officers` array and render no visible card when it is empty.
- [ ] Keep a semantic officer-stage container so future records can be added only through the typed array.
- [ ] Wrap `D4V` in the people heading for reliable numeral styling.

### Task 3: Open The About Layout

**Files:**
- Modify: `app/globals.css`

- [ ] Replace compact desktop heights with larger minimum heights and vertical padding.
- [ ] Increase text and component gaps in the hero, mission, people, and invitation sections.
- [ ] Style the empty team stage without cards or placeholder copy.
- [ ] Change mission emphasis to standard navy body text and apply lining numerals to `D4V`.
- [ ] Preserve mobile stacking without horizontal clipping.

### Task 4: Verify The Result

**Files:**
- Test: `tests/pages.test.tsx`
- Test: `tests/ui-qa.spec.ts`

- [ ] Run `npm test`, `npm run lint`, and `npm run typecheck`.
- [ ] Run the Playwright UI suite at all target viewports.
- [ ] Confirm homepage regression hashes remain unchanged.
- [ ] Run `npm run build` and production smoke tests.
