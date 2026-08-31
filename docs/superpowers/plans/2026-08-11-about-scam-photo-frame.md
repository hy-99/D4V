# About Scam Photo Frame Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained editorial frame around the About page's rotating scam photographs without altering carousel behavior.

**Architecture:** Wrap the existing stage in one presentational element and style it only beneath the `about-reference` page scope. Protect the structure and computed visual properties with the existing server-render and Playwright suites.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner, Playwright

---

### Task 1: Protect The Frame Structure

**Files:**
- Modify: `tests/pages.test.tsx`

- [ ] **Step 1: Write the failing structure assertion**

Add this assertion to the About page test:

```ts
assert.match(html, /data-scam-photo-frame="editorial"/);
```

- [ ] **Step 2: Run the unit suite and verify the assertion fails**

Run: `npm test`

Expected: FAIL because the carousel does not yet render `data-scam-photo-frame="editorial"`.

### Task 2: Add The Editorial Frame

**Files:**
- Modify: `components/about/scam-photo-deck.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Wrap the stage without changing slide behavior**

Wrap the existing `.scam-photo-deck__stage` in:

```tsx
<div className="scam-photo-deck__frame" data-scam-photo-frame="editorial">
  {/* existing stage */}
</div>
```

- [ ] **Step 2: Add the scoped frame treatment**

Style `.scam-photo-deck__frame` with a narrow warm-white mat, one fine navy outer line, regular rounded corners, and a restrained shadow. Do not add pseudo-element decorations. Keep selectors outside the frame and reduce frame spacing at the mobile breakpoint.

- [ ] **Step 3: Run the unit suite and verify it passes**

Run: `npm test`

Expected: all tests pass.

### Task 3: Protect Responsive Visual Properties

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Add computed-style checks**

Extend the About browser test to verify the frame has visible padding, a solid border, regular corner radii, and no viewport overflow.

- [ ] **Step 2: Run the focused About browser test**

Run: `npx playwright test tests/ui-qa.spec.ts --grep "about uses the approved scam photo deck"`

Expected: PASS at the existing desktop viewport.

- [ ] **Step 3: Run the focused carousel behavior tests**

Run: `npx playwright test tests/ui-qa.spec.ts --grep "about scam"`

Expected: frame checks pass and rotation remains continuous with the approved timing and reduced-motion exception.

### Task 4: Full Verification

**Files:**
- Verify: `components/about/scam-photo-deck.tsx`
- Verify: `app/globals.css`
- Verify: `tests/pages.test.tsx`
- Verify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Run all automated checks**

```bash
npm test
npm run lint
npm run typecheck
npx playwright test
npm run build
```

Expected: every command exits successfully with no failing tests or build errors.

- [ ] **Step 2: Inspect the About page at desktop and mobile widths**

Confirm the frame is balanced at `1440x1000` and `390x844`, controls remain outside it, captions remain readable, and no horizontal overflow appears.
