# Homepage CTA Photo Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage CTA's repeated custom arm drawings with a polished, locally hosted photograph of inward-facing open hands while preserving its copy, routes, reveal behavior, and accessibility.

**Architecture:** Keep `CallToAction` as the homepage-facing component and simplify it to a full-bleed `next/image`, two contrast overlays, and the existing centered content. Add a static-render contract and browser checks for the new image treatment, then remove the now-unused SVG component.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`, Node test runner, Playwright.

**Repository note:** This workspace has no Git metadata, so commit steps are not applicable.

---

## File Structure

- Create `public/images/homepage-teamwork-hands.jpg`: local production photograph used only by the homepage CTA.
- Create `public/images/README.md`: source, photographer, license, and representative-imagery disclosure.
- Modify `tests/homepage.test.tsx`: static contract for the CTA photograph, links, and removed drawing markup.
- Modify `tests/ui-qa.spec.ts`: responsive browser validation for CTA image loading, dimensions, controls, and overflow.
- Modify `components/call-to-action.tsx`: photo-led CTA implementation.
- Delete `components/helping-arm.tsx`: obsolete custom SVG drawing.

### Task 1: Define the CTA Rendering Contract

**Files:**
- Modify: `tests/homepage.test.tsx:25-27`

- [ ] **Step 1: Write the failing static assertions**

Add these assertions after the existing CTA heading assertion:

```tsx
assert.match(html, /data-homepage-cta-photo="true"/);
assert.match(html, /homepage-teamwork-hands\.jpg/);
assert.match(html, /href="\/workshops"[^>]*>Host a Workshop/);
assert.match(html, /href="\/get-involved"[^>]*>Get Involved/);
assert.doesNotMatch(html, /viewBox="0 0 160 320"/);
```

- [ ] **Step 2: Run the unit test and verify the expected failure**

Run: `npm test`

Expected: FAIL because the current CTA has no `data-homepage-cta-photo` marker or local teamwork photograph.

### Task 2: Add and Document the Licensed Photograph

**Files:**
- Create: `public/images/homepage-teamwork-hands.jpg`
- Create: `public/images/README.md`

- [ ] **Step 1: Download the production-sized local asset**

Run:

```bash
curl -L 'https://images.pexels.com/photos/4125007/pexels-photo-4125007.jpeg?auto=compress&cs=tinysrgb&w=2400' -o public/images/homepage-teamwork-hands.jpg
```

Expected: a landscape JPEG approximately 2400px wide, not an HTML response.

- [ ] **Step 2: Record the asset source and usage**

Create `public/images/README.md` with:

```md
# Image Sources

## homepage-teamwork-hands.jpg

- Title: Close-Up of People Hands Together
- Photographer: Shane
- Source: https://www.pexels.com/photo/close-up-of-people-hands-together-4125007/
- License: https://www.pexels.com/license/
- Usage: Homepage teamwork call-to-action background.

This photograph is representative community imagery. It does not depict D4V Bay Area staff, volunteers, participants, or a past D4V event.
```

- [ ] **Step 3: Verify image integrity and dimensions**

Run:

```bash
file public/images/homepage-teamwork-hands.jpg
sips -g pixelWidth -g pixelHeight public/images/homepage-teamwork-hands.jpg
```

Expected: `JPEG image data`; width at least 2000px and height at least 1200px.

### Task 3: Replace the Drawings With the Photo-Led CTA

**Files:**
- Modify: `components/call-to-action.tsx:1-121`
- Delete: `components/helping-arm.tsx`

- [ ] **Step 1: Replace the CTA implementation**

Replace `components/call-to-action.tsx` with:

```tsx
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const revealDelay = (delay: string) =>
  ({ "--reveal-delay": delay }) as CSSProperties;

export function CallToAction() {
  return (
    <ScrollReveal>
      <section
        aria-labelledby="call-to-action-heading"
        className="relative isolate flex min-h-[22rem] overflow-hidden border-y border-white/10 bg-[var(--color-deep-navy)] sm:min-h-[19rem] lg:min-h-72"
      >
        <Image
          src="/images/homepage-teamwork-hands.jpg"
          alt=""
          fill
          sizes="100vw"
          data-homepage-cta-photo="true"
          className="-z-30 object-cover object-[50%_44%] sm:object-[50%_48%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[rgba(7,27,44,0.58)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,27,44,0.18)_0%,rgba(7,27,44,0.62)_50%,rgba(7,27,44,0.18)_100%)]"
        />

        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center justify-center px-6 py-14 text-center sm:px-8 lg:px-10">
          <h2
            id="call-to-action-heading"
            data-reveal-item
            style={revealDelay("80ms")}
            className="editorial-serif max-w-[16ch] text-[clamp(2.5rem,5vw,3.65rem)] leading-[1.08] font-semibold tracking-[-0.018em] text-[var(--color-warm-white)] sm:max-w-none"
          >
            Together, we can stop scams.
          </h2>
          <div
            data-reveal-item
            style={revealDelay("150ms")}
            className="mt-8 flex w-full max-w-sm flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
          >
            <Link
              href="/workshops"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-orange)] px-7 text-base font-semibold text-[var(--color-warm-white)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#da6c17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-deep-navy)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Host a Workshop
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-warm-white)] px-7 text-base font-semibold text-[var(--color-warm-white)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-warm-white)] hover:text-[var(--color-deep-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm-white)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-deep-navy)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
```

- [ ] **Step 2: Confirm the SVG helper is unused**

Run: `rg -n "HelpingArm|helping-arm" app components tests`

Expected: no matches after the CTA replacement.

- [ ] **Step 3: Delete the obsolete helper**

Delete `components/helping-arm.tsx` with `apply_patch`.

- [ ] **Step 4: Run the static suite**

Run: `npm test`

Expected: PASS, including the new CTA image and route assertions.

### Task 4: Add Responsive Browser Coverage

**Files:**
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Add the CTA browser test**

Add this test after the homepage overflow test:

```ts
test("homepage CTA keeps its teamwork photo and controls clear at every viewport", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  for (const viewport of targetViewports) {
    await page.setViewportSize(viewport);
    await page.goto(baseUrl);

    const section = page
      .getByRole("heading", { name: "Together, we can stop scams." })
      .locator("xpath=ancestor::section");
    const photo = section.locator('[data-homepage-cta-photo="true"]');

    await section.scrollIntoViewIfNeeded();
    await expect(photo).toBeVisible();
    await expect(section.getByRole("link", { name: "Host a Workshop" })).toBeVisible();
    await expect(section.getByRole("link", { name: "Get Involved" })).toBeVisible();
    await expect
      .poll(() =>
        photo.evaluate((image) =>
          image instanceof HTMLImageElement ? image.naturalWidth : 0,
        ),
      )
      .toBeGreaterThan(0);

    const metrics = await section.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      imageLoaded: [...element.querySelectorAll("img")].every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    }));

    const minimumHeight = viewport.width < 640 ? 352 : viewport.width < 1024 ? 304 : 288;
    expect(metrics.height).toBeGreaterThanOrEqual(minimumHeight);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.imageLoaded).toBeTruthy();
  }

  expect(runtimeErrors).toEqual([]);
});
```

- [ ] **Step 2: Run static quality checks**

Run:

```bash
npm test
npm run lint
npm run typecheck
```

Expected: all commands exit with code 0 and report no errors.

### Task 5: Production Build and Visual Validation

**Files:**
- Verify only; no planned source edits.

- [ ] **Step 1: Build the production application**

Run: `npm run build`

Expected: Next.js completes successfully and lists the homepage plus existing inner routes.

- [ ] **Step 2: Start the production server**

Run: `npm run start -- -p 3024`

Expected: server reports ready at `http://localhost:3024`.

- [ ] **Step 3: Run the full browser suite**

Run:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3024 npx playwright test tests/ui-qa.spec.ts --reporter=line
```

Expected: every Playwright test passes at all encoded viewports.

- [ ] **Step 4: Capture and inspect the CTA at four viewport sizes**

Capture the homepage at `1440x1000`, `1024x768`, `768x1024`, and `390x844`, scrolling the CTA into the center before each screenshot. Inspect each result for recognizable open palms, centered copy, readable contrast, intact buttons, direct footer connection, and no horizontal overflow.

- [ ] **Step 5: Verify reduced motion and console cleanliness**

Repeat the CTA inspection with `prefers-reduced-motion: reduce`. Confirm the photo stays static, CTA content remains visible, focus rings are clear, and the browser console contains no errors.

- [ ] **Step 6: Stop the production server**

Stop the process started in Step 2 after validation completes.

If a crop, contrast, or spacing issue is visible, adjust only the responsive object position, overlay opacity, or CTA spacing in `components/call-to-action.tsx`, then repeat Tasks 4 and 5.
