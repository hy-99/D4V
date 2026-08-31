# About Middle-Section Atmosphere Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the About page's two middle sections distinct, restrained background atmosphere without changing page content or layout.

**Architecture:** Extend the existing About-scoped CSS with non-interactive pseudo-elements and layered gradients. Keep content wrappers above decorative layers and reduce the treatment at mobile breakpoints.

**Tech Stack:** Next.js, CSS, Playwright

---

### Task 1: Add the visual contract

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [x] Add desktop and mobile assertions for distinct mission and officer background layers.
- [x] Assert decorative layers are non-interactive and do not cause overflow.
- [x] Run the focused test and confirm it fails before decoration exists.

### Task 2: Add scoped background atmosphere

**Files:**
- Modify: `app/globals.css`

- [x] Add a cream paper plane and restrained dot field to the mission section.
- [x] Add a cooler blue vignette and diffused edge lighting to the officer section.
- [x] Keep content above decoration and reduce decorative intensity on mobile.
- [x] Run focused visual and browser checks.

### Task 3: Validate

**Files:**
- Test: `tests/pages.test.tsx`
- Test: `tests/ui-qa.spec.ts`

- [x] Run unit tests, lint, type-check, the complete Playwright suite, and the production build.
