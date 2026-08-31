# Deliberate Section Reveals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Start shared section reveals only after content enters the active viewport and slow the existing landing motion without changing page layouts.

**Architecture:** Keep `ScrollReveal` as the single observer boundary and restore its original intersection configuration and initial visibility check. Keep CSS as the single source of the slower reveal duration across homepage and inner-page variants.

**Tech Stack:** Next.js, React, TypeScript, CSS, Playwright

---

### Task 1: Lock the timing behavior into a browser regression

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [x] Add a Playwright test that expects a reveal section to remain ready below the viewport and become visible after entering it.
- [x] Assert that an active reveal item's computed animation or transition duration is at least 1400ms.
- [x] Run the focused test and confirm it fails against the current early timing.

### Task 2: Adjust the observer and reveal duration

**Files:**
- Modify: `components/scroll-reveal.tsx`
- Modify: `app/globals.css`

- [x] Restore the observer threshold to `0.08` and root margin to `-12% 0px -24% 0px`.
- [x] Restore initial visibility eligibility to `92%` of viewport height.
- [x] Set shared reveal item and inner-page animation durations to `1400ms`.
- [x] Preserve easing, delays, variants, replay, and reduced-motion behavior.
- [x] Run the focused test and confirm it passes.

### Task 3: Verify the full site

**Files:**
- Test: `tests/pages.test.tsx`
- Test: `tests/ui-qa.spec.ts`

- [x] Run `npm test`.
- [x] Run `npm run lint` and `npm run typecheck`.
- [x] Run `npx playwright test --reporter=line`.
- [x] Run `npm run build`.

### Task 4: Prevent visible sections from disappearing on exit

**Files:**
- Modify: `components/scroll-reveal.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [x] Add a regression that keeps a revealed section partly inside the viewport beyond the entrance observer boundary.
- [x] Run the focused test and confirm the current implementation resets the section too early.
- [x] Separate entrance observation from full-viewport replay reset observation.
- [x] Confirm the section remains visible at the viewport edge and resets only after it is completely off-screen.
- [x] Re-run all validation commands.
