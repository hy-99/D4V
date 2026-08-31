# Header, Carousel, and Officer Stage Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Balance the shared D4V wordmark, remove the About scam carousel pause control, and give the officer stage four matching corners.

**Architecture:** Keep the changes inside the existing shared header, About scam deck, and About-scoped CSS. Update the existing unit and Playwright assertions before implementation so the requested behavior is protected without restructuring unrelated components.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, CSS, Node test runner, Playwright

---

### Task 1: Protect the requested behavior with regression tests

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Change the About static-markup assertion**

Replace the pause-control requirement with:

```ts
assert.doesNotMatch(html, /aria-label="(?:Pause|Resume) photo rotation"/);
```

- [ ] **Step 2: Change the browser test for the scam deck**

Assert that no pause/resume button exists, wait longer than the rotation interval, and verify that the active slide changes.

- [ ] **Step 3: Add visual-style assertions**

Read the computed styles for `[data-header-brand-d4v]`, `[data-header-brand-place]`, and `[data-officer-carousel="true"]`. Assert matching wordmark font families and font sizes, plus four equal officer-stage border radii.

- [ ] **Step 4: Run focused tests and confirm they fail**

Run:

```bash
npm test
npx playwright test tests/ui-qa.spec.ts --grep "about uses the approved scam photo deck|about scam photos rotate|standard inner-page header" --reporter=line
```

Expected: failures for the existing pause button, mismatched wordmark typography, and asymmetric officer radius.

### Task 2: Implement the three focused changes

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/about/scam-photo-deck.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Match the shared wordmark typography**

Apply `condensed-display` and the same responsive font sizes and weight to both wordmark spans. Keep `D4V` uppercase/orange and keep `Bay Area` title case in its existing route-dependent color.

- [ ] **Step 2: Remove user-controlled pausing**

Delete the Lucide pause/play imports, `userPaused` state, pause button, and pressed-state announcement logic. Keep automatic timing, pointer/focus safety, document visibility, selectors, and reduced-motion handling.

- [ ] **Step 3: Normalize the officer-stage corners**

Replace the asymmetric carousel radius with `border-radius: 2rem` so every corner is identical.

- [ ] **Step 4: Run focused tests and confirm they pass**

Run the Task 1 commands again. Expected: all focused checks pass.

### Task 3: Validate the production result

**Files:**
- No additional source files expected.

- [ ] **Step 1: Run code-quality checks**

```bash
npm test
npm run lint
npm run typecheck
```

Expected: zero failures and zero errors.

- [ ] **Step 2: Run the complete browser suite**

```bash
npx playwright test --reporter=line
```

Expected: every browser test passes at the configured responsive viewports.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: successful compilation and static generation of every route.
