# D4V Photo-First Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all seven D4V inner pages around licensed real-person photography while preserving the homepage, routes, navigation, accessibility, and truthful content.

**Architecture:** Replace the universal illustration registry and panel with a typed photo registry and a focused `PhotoFrame` image primitive. Keep shared shell, reveal, header, footer, and editorial section components, while each route owns a distinct composition. Tests assert photographic hierarchy, route structure, responsive safety, and reduced-motion behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`, Lucide React, Node test runner, Playwright.

**Repository note:** This workspace has no Git metadata, so commit steps are not applicable.

---

### Task 1: Replace Illustration-Based Acceptance Tests

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Change static route expectations**

Replace the illustration assertions with:

```tsx
assert.match(html, /data-primary-photo="true"/);
assert.doesNotMatch(html, /data-page-art/);
assert.doesNotMatch(html, /data-team-section/);
```

- [ ] **Step 2: Change browser route checks**

For each inner route at desktop and mobile widths, assert:

```ts
await expect(page.locator("[data-primary-photo=\"true\"]")).toHaveCount(1);
await expect(page.locator("[data-page-art]")).toHaveCount(0);
await expect(page.locator("h1")).toHaveCount(1);
```

Collect image sources and verify the primary source occurs once:

```ts
const primarySource = await page
  .locator("[data-primary-photo=\"true\"] img")
  .getAttribute("src");
const sourceCount = await page.locator(`img[src="${primarySource}"]`).count();
expect(sourceCount).toBe(1);
```

- [ ] **Step 3: Run tests and verify the expected failure**

Run: `npm test`

Expected: FAIL because current routes still render `data-page-art` and do not render `data-primary-photo`.

### Task 2: Add and Document the Real-Photo Asset Set

**Files:**
- Create: `public/images/inner-pages/about-community.jpg`
- Create: `public/images/inner-pages/about-conversation.jpg`
- Create: `public/images/inner-pages/work-community.jpg`
- Create: `public/images/inner-pages/workshop-speaker.jpg`
- Create: `public/images/inner-pages/workshop-audience.jpg`
- Create: `public/images/inner-pages/senior-tablet.jpg`
- Create: `public/images/inner-pages/senior-tablet-solo.jpg`
- Create: `public/images/inner-pages/senior-phone.jpg`
- Create: `public/images/inner-pages/involvement-community.jpg`
- Create: `public/images/inner-pages/resources-reading.jpg`
- Create: `public/images/inner-pages/README.md`

- [ ] **Step 1: Download local production-sized files**

Use Pexels image delivery URLs with a 1800px width and `auto=compress&cs=tinysrgb`:

```bash
curl -L "https://images.pexels.com/photos/6684498/pexels-photo-6684498.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/about-community.jpg
curl -L "https://images.pexels.com/photos/5710984/pexels-photo-5710984.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/about-conversation.jpg
curl -L "https://images.pexels.com/photos/2962135/pexels-photo-2962135.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/work-community.jpg
curl -L "https://images.pexels.com/photos/29284269/pexels-photo-29284269.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/workshop-speaker.jpg
curl -L "https://images.pexels.com/photos/7234414/pexels-photo-7234414.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/workshop-audience.jpg
curl -L "https://images.pexels.com/photos/8972292/pexels-photo-8972292.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/senior-tablet.jpg
curl -L "https://images.pexels.com/photos/6248436/pexels-photo-6248436.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/senior-tablet-solo.jpg
curl -L "https://images.pexels.com/photos/7545051/pexels-photo-7545051.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/senior-phone.jpg
curl -L "https://images.pexels.com/photos/9061560/pexels-photo-9061560.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/involvement-community.jpg
curl -L "https://images.pexels.com/photos/3867186/pexels-photo-3867186.jpeg?auto=compress&cs=tinysrgb&w=1800" -o public/images/inner-pages/resources-reading.jpg
```

- [ ] **Step 2: Record source pages and usage**

The README must list each local filename, photographer, Pexels page URL, Pexels license URL, and the statement:

```md
These photographs are representative community imagery. They do not depict D4V Bay Area staff, volunteers, participants, or past events.
```

- [ ] **Step 3: Inspect file integrity**

Run: `file public/images/inner-pages/*.jpg`

Expected: every entry reports a JPEG image and no HTML response files.

### Task 3: Build the Photo Registry and Frame Primitive

**Files:**
- Create: `lib/page-photos.ts`
- Create: `components/photo-frame.tsx`
- Modify: `app/globals.css`
- Delete after migration: `lib/page-art.ts`
- Delete after migration: `components/illustration-panel.tsx`

- [ ] **Step 1: Create the typed registry**

Use this public interface:

```ts
export type PhotoFocalPoint =
  | "center"
  | "left"
  | "right"
  | "top"
  | "top-left"
  | "top-right";

export type PagePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: PhotoFocalPoint;
  sourceName: string;
  sourceUrl: string;
  usage: "representative" | "still-life";
};
```

Export a `pagePhotos` object grouped by `about`, `work`, `resources`, `workshops`, `seniorsafe`, `involvement`, and `help`. Every route must have a unique `primary` entry.

- [ ] **Step 2: Create `PhotoFrame`**

Use this interface:

```tsx
type PhotoFrameProps = {
  photo: PagePhoto;
  variant: "full" | "arch" | "oval" | "offset" | "strip";
  priority?: boolean;
  primary?: boolean;
  decorative?: boolean;
  label?: string;
  className?: string;
  imageClassName?: string;
};
```

The figure must set `data-photo-frame={variant}` and set `data-primary-photo="true"` only when `primary` is true. Render `next/image` with explicit responsive `sizes`, focal-point classes, and `alt=""` for decorative crops.

- [ ] **Step 3: Add photographic frame CSS**

Add scoped classes for the five variants. Animate only `.photo-frame-media` using opacity, transform, and optional clipping. Add a reduced-motion rule that sets `animation: none`, `clip-path: none`, and `transform: none`.

- [ ] **Step 4: Run type checking**

Run: `npm run typecheck`

Expected: PASS for the new registry and primitive while old routes still compile against the illustration files.

### Task 4: Make Page Titles Route-Aware

**Files:**
- Modify: `components/page-title.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add title controls**

Extend props with:

```ts
size?: "hero" | "section" | "compact";
measure?: "narrow" | "medium" | "wide";
align?: "left" | "center";
```

Map the values to explicit classes instead of the current universal `max-w-[16ch]`.

- [ ] **Step 2: Define measured typography**

Use these responsive measures:

```css
.page-title-heading[data-measure="narrow"] { max-width: 11ch; }
.page-title-heading[data-measure="medium"] { max-width: 15ch; }
.page-title-heading[data-measure="wide"] { max-width: 20ch; }
.page-title-heading[data-size="hero"] { font-size: clamp(3.25rem, 6.1vw, 6.25rem); line-height: 1.045; }
.page-title-heading[data-size="section"] { font-size: clamp(2.7rem, 4.8vw, 5rem); line-height: 1.06; }
.page-title-heading[data-size="compact"] { font-size: clamp(2.25rem, 3.5vw, 3.6rem); line-height: 1.08; }
```

- [ ] **Step 3: Verify the homepage is unaffected**

Run: `npm test`

Expected: homepage test remains green; inner-page test remains red until route migration.

### Task 5: Rebuild Workshops, SeniorSafe, and Resources

**Files:**
- Modify: `app/workshops/page.tsx`
- Modify: `app/seniorsafe/page.tsx`
- Modify: `app/resources/page.tsx`

- [ ] **Step 1: Rebuild Workshops**

Use a full-bleed `workshops.primary` hero with the heading and copy over a left navy gradient. Add a visible “Representative community learning scene” label. Retain the three learning stages in a cream section and insert `workshops.audience` as an offset supporting photograph. Remove every `IllustrationPanel` import and render.

- [ ] **Step 2: Rebuild SeniorSafe**

Use `seniorsafe.primary` in a large arch hero and overlap a cream title panel over its lower-left edge on desktop. Keep the habits sequence with small Lucide checks. Use `seniorsafe.support` once in the final pale-blue section. Do not repeat the primary source.

- [ ] **Step 3: Rebuild Resources**

Use `resources.primary` beside a wide title. Build three guide themes with different image details and small line icons. Preserve the navy four-question reset band. Remove the current synthetic guide spread from primary placement.

- [ ] **Step 4: Run focused route tests**

Run: `npm test`

Expected: the migrated routes satisfy the photo assertion; the remaining four routes still fail.

### Task 6: Rebuild About, Our Work, Get Involved, and Get Help

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/our-work/page.tsx`
- Modify: `app/get-involved/page.tsx`
- Modify: `app/get-help/page.tsx`

- [ ] **Step 1: Rebuild About**

Use `about.primary` in an edge-breaking offset frame in the navy hero. Add `about.conversation` to the manifesto section. Render the principles as an asymmetric `01 / 02 / 03` sequence with varied widths. Do not render any team container or team data.

- [ ] **Step 2: Rebuild Our Work**

Create a hero montage using `work.primary` as the marked primary photograph plus two smaller crops. Build three connected chapters with alternating photo/text placement and links to Workshops, SeniorSafe, and Resources. Remove the equal three-card row.

- [ ] **Step 3: Rebuild Get Involved**

Use `involvement.primary` as a wide community photograph with a title block overlapping one edge. Make the three participation pathways visually distinct: horizontal conversation strip, resource-sharing split, and compact helping band. Do not add people-specific organizational claims.

- [ ] **Step 4: Rebuild Get Help**

Use `help.primary` as the human hero. Keep the three immediate actions within the first two sections, tighten the timeline, and use one distinct supporting crop. Remove the reused Resources still life.

- [ ] **Step 5: Remove the illustration architecture**

After no imports remain, remove `components/illustration-panel.tsx`, `lib/page-art.ts`, and the obsolete illustration-panel CSS. Keep the source SVG files only if another route still references them; otherwise remove `public/illustrations` and its license note.

- [ ] **Step 6: Run static and route tests**

Run: `npm test`

Expected: PASS for homepage and all primary routes.

### Task 7: Refine Motion, Accessibility, and Responsive Composition

**Files:**
- Modify: `app/globals.css`
- Modify: `components/scroll-reveal.tsx` only if the existing reveal hook cannot support photo classes
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Scope entry timing**

Keep inner-page entry between `650ms` and `760ms`. Stagger eyebrow, title, copy, photo, and actions in increments no larger than `100ms`.

- [ ] **Step 2: Add geometry checks to Playwright**

At desktop width, assert the primary hero photo is at least 40% of viewport width unless it is full bleed:

```ts
const photoBox = await page.locator("[data-primary-photo=\"true\"]").boundingBox();
expect(photoBox).not.toBeNull();
expect(photoBox?.width ?? 0).toBeGreaterThanOrEqual(1440 * 0.4);
```

At mobile width, assert its top edge appears before the second `.page-section` begins.

- [ ] **Step 3: Confirm reduced motion**

Emulate reduced motion and assert computed `animationName` is `none`, computed transform is `none`, and clip path is `none` for `.photo-frame-media`.

- [ ] **Step 4: Run lint and type checking**

Run: `npm run lint`

Expected: PASS with no warnings affecting the build.

Run: `npm run typecheck`

Expected: PASS.

### Task 8: Production and Browser Validation

**Files:**
- Modify only files implicated by validation failures

- [ ] **Step 1: Run the full static suite**

Run: `npm test`

Expected: PASS.

Run: `npm run lint`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 2: Build production output**

Run: `npm run build`

Expected: all routes compile and prerender successfully.

- [ ] **Step 3: Run Playwright**

Run: `PLAYWRIGHT_BASE_URL=http://localhost:3024 npx playwright test tests/ui-qa.spec.ts --reporter=line`

Expected: all UI tests pass.

- [ ] **Step 4: Capture and inspect screenshots**

Capture each route at `1440x1000`, `1024x768`, `768x1024`, and `390x844`. Compare against the homepage for photo prominence, heading breathing room, section density, visual variety, and color balance.

- [ ] **Step 5: Run the final browser audit**

For all routes and target viewports, assert:

```ts
{
  h1Count: 1,
  primaryPhotoCount: 1,
  pageArtCount: 0,
  brokenImageCount: 0,
  horizontalOverflow: false,
  consoleErrors: [],
  pageErrors: []
}
```
