# About Scam Rotation Speed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the About scam-photo carousel advance every four seconds.

**Architecture:** Keep one exported TypeScript timing constant and expose it to CSS through a custom property on the existing deck root. Reuse the current interval and progress animation rather than adding new timers or dependencies.

**Tech Stack:** React, TypeScript, CSS, Node test runner, Playwright

---

### Task 1: Add failing timing regressions

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Assert the static deck markup exposes a 4000ms timing custom property.
- [ ] Reduce the browser rotation poll timeout so the existing 5500ms behavior fails.
- [ ] Run the focused tests and confirm the timing assertions fail.

### Task 2: Synchronize the faster timer and progress animation

**Files:**
- Modify: `components/about/scam-photo-deck.tsx`
- Modify: `app/globals.css`

- [ ] Change the interval to 4000ms and set `--scam-photo-interval` on the deck root.
- [ ] Read the same custom property from the selector progress animation.
- [ ] Run unit, focused browser, lint, TypeScript, full browser, and production-build checks.

### Task 3: Keep normal-motion rotation continuous

**Files:**
- Modify: `components/about/scam-photo-deck.tsx`
- Modify: `app/globals.css`
- Modify: `tests/ui-qa.spec.ts`

- [ ] Add a browser regression proving pointer hover and keyboard focus do not pause rotation.
- [ ] Remove pointer, focus, and document-visibility pause state while preserving reduced motion.
- [ ] Increase the slide opacity and transform transition to 950ms.
- [ ] Verify continuous timing, transition duration, reduced motion, and the complete site suite.
