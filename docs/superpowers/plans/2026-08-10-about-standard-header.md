# About Standard Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the About-only header design and use an upright shared place wordmark.

**Architecture:** Remove the About-specific rendering branch from the shared Header while leaving its light/hero tone interface intact. Stop passing About as an active special case from the route.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Playwright

---

### Task 1: Add the header regression

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [x] Compare About with a standard light inner-page header.
- [x] Require identical navigation labels, sizes, and Get Help treatment.
- [x] Require upright “Bay Area” typography.
- [ ] Run the focused test and confirm the current About-only mode fails.

### Task 2: Remove the About-only header mode

**Files:**
- Modify: `components/header.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/globals.css`

- [ ] Remove special About navigation and button branches.
- [ ] Remove obsolete About-only header spacing rules.
- [ ] Remove italic styling from the shared place wordmark.
- [ ] Run focused desktop and mobile checks.

### Task 3: Validate

**Files:**
- Test: `tests/pages.test.tsx`
- Test: `tests/ui-qa.spec.ts`

- [ ] Run unit tests, lint, type-check, full Playwright, and production build.

