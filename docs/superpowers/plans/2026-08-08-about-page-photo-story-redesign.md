# About Page Photo-Story Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the About page as a photo-led editorial story with a manually controlled symbolic-image carousel and a functional empty officer-carousel preview.

**Architecture:** Keep `app/about/page.tsx` as a server component responsible for content and composition. Add two focused client carousel components under `components/about`, both driven by readonly typed arrays. Scope all new presentation rules under `data-page-layout="about-photo-story"` so the homepage and other routes cannot inherit the redesign.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind-compatible global CSS, `next/image`, Lucide React, Node test runner, Playwright.

---

### Task 1: Define the Required Markup and Interaction Tests

**Files:**
- Modify: `tests/pages.test.tsx`
- Modify: `tests/ui-qa.spec.ts`

- [ ] **Step 1: Change the About layout signature and static requirements**

Require `about-photo-story`, the photo-story carousel, community-focus composition, officer preview, approved empty-state text, and approach closing. Reject fake officer names and the old separate audience/offering structures.

```tsx
assert.match(html, /data-page-layout="about-photo-story"/);
assert.match(html, /data-photo-story-carousel="true"/);
assert.match(html, /data-officer-carousel="empty"/);
assert.match(html, /Officer profiles will appear here\./);
assert.doesNotMatch(html, /data-officer-profile=/);
```

- [ ] **Step 2: Add Playwright interaction coverage**

Test manual next-button rotation, `ArrowLeft`/`ArrowRight` rotation while the carousel is focused, slide-position announcements, disabled officer controls, and no About-page overflow at all four target viewports.

```ts
test("about photo story rotates manually and officer preview stays truthful", async ({ page }) => {
  await page.goto(`${baseUrl}/about`);
  const carousel = page.locator('[data-photo-story-carousel="true"]');
  const caption = carousel.locator('[data-carousel-caption="true"]');
  await expect(caption).toContainText("Questions become easier");
  await carousel.getByRole("button", { name: "Next photo" }).click();
  await expect(caption).toContainText("Confidence grows");
  await carousel.press("ArrowRight");
  await expect(caption).toContainText("A pause creates space");
  await carousel.press("ArrowLeft");
  await expect(caption).toContainText("Confidence grows");
  await expect(page.locator('[data-officer-carousel="empty"] button')).toBeDisabled();
});
```

- [ ] **Step 3: Run focused tests and confirm the expected failure**

Run: `node --import tsx --test --test-name-pattern="about page" tests/pages.test.tsx`

Expected: FAIL because `about-photo-story` and both carousel signatures do not exist.

### Task 2: Build the Carousel Components

**Files:**
- Create: `components/about/photo-story-carousel.tsx`
- Create: `components/about/officer-carousel.tsx`

- [ ] **Step 1: Implement `PhotoStoryCarousel`**

Create a client component with a typed `PhotoStorySlide` interface, controlled index state, wraparound previous/next helpers, visible chevron buttons, `tabIndex={0}`, keyboard-arrow handling, live slide announcements, `next/image`, and no autoplay.

```tsx
export type PhotoStorySlide = {
  photo: PagePhoto;
  caption: string;
};

export function PhotoStoryCarousel({ slides }: { slides: readonly PhotoStorySlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showPrevious = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % slides.length);
  // Render the active image, caption, status, and 44px controls.
}
```

- [ ] **Step 2: Implement `OfficerCarousel`**

Create a client component with a typed `OfficerProfile` interface and `profiles` prop. Render an accessible empty state with disabled controls when the array is empty. Keep functional wraparound rotation and keyboard handling in the same component for future profile data.

```tsx
export type OfficerProfile = {
  name: string;
  role: string;
  image: PagePhoto;
  biography?: string;
  linkedInUrl?: string;
};

export function OfficerCarousel({ profiles }: { profiles: readonly OfficerProfile[] }) {
  const isEmpty = profiles.length === 0;
  // Render empty or active profile stage with the same controls.
}
```

- [ ] **Step 3: Run TypeScript checking**

Run: `npm run typecheck`

Expected: PASS with no client/server boundary or readonly-array errors.

### Task 3: Recompose the About Route

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Add typed symbolic slides and empty officer data**

Use `pagePhotos.about.conversation`, `pagePhotos.seniorsafe.primary`, and `pagePhotos.help.primary` with the three approved symbolic captions. Define `const officerProfiles: readonly OfficerProfile[] = []` without fake content.

- [ ] **Step 2: Replace the five old bands with the approved photo-story sequence**

Use this order and class signatures:

```tsx
<PageShell headerTone="light" layout="about-photo-story">
  <EditorialSection className="about-story-opening">...</EditorialSection>
  <EditorialSection className="about-story-purpose">...</EditorialSection>
  <EditorialSection className="about-community-focus">...</EditorialSection>
  <EditorialSection className="about-officers">...</EditorialSection>
  <EditorialSection className="about-story-approach">...</EditorialSection>
</PageShell>
```

The officer section uses `/images/homepage-teamwork-hands.jpg` as a symbolic background and clearly labels it as decorative with empty alt text.

- [ ] **Step 3: Run the focused static test**

Run: `node --import tsx --test --test-name-pattern="about page" tests/pages.test.tsx`

Expected: PASS.

### Task 4: Replace the Scoped About Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Remove the existing `about-documentary` presentation block**

Delete selectors for `about-identity`, `about-purpose`, `about-audience`, `about-offerings`, and `about-approach`, including their responsive overrides.

- [ ] **Step 2: Add desktop photo-story composition**

Scope every new selector beneath `[data-page-layout="about-photo-story"]`. Implement the asymmetric opening photo, tactile photo deck, attached caption tab, right-side purpose copy, combined audience/offering sequence, full-width officer background with centered stage, and light approach closing.

- [ ] **Step 3: Add tablet and mobile composition**

At 1024 pixels and below, stack the purpose copy before the carousel. At 768 pixels and below, use one-column offering rows and a single-column approach sequence. Keep 17-pixel minimum readable copy, 44-pixel controls, no negative margins, and no horizontal overflow.

- [ ] **Step 4: Add carousel and reduced-motion states**

Use only opacity and transform for active slide changes. Under `prefers-reduced-motion`, remove slide translation and control transforms while retaining image and caption updates.

- [ ] **Step 5: Run lint and TypeScript checks**

Run: `npm run lint`

Expected: PASS.

Run: `npm run typecheck`

Expected: PASS.

### Task 5: Browser Validation and Regression Protection

**Files:**
- Modify only if validation finds an About-specific defect: `app/about/page.tsx`, `components/about/photo-story-carousel.tsx`, `components/about/officer-carousel.tsx`, `app/globals.css`, `tests/ui-qa.spec.ts`

- [ ] **Step 1: Run the full static suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 2: Run the Playwright UI suite**

Run: `npx playwright test tests/ui-qa.spec.ts --reporter=line`

Expected: all tests pass, including manual carousel rotation, disabled officer controls, focus behavior, reduced motion, and overflow checks.

- [ ] **Step 3: Inspect four About screenshots**

Capture and inspect 1440 by 1000, 1024 by 768, 768 by 1024, and 390 by 844. Correct only objective issues: clipping, overlap, poor crop, crowded title wrapping, weak contrast, inaccessible controls, or excess blank space.

- [ ] **Step 4: Verify exact homepage equality**

Capture viewport-only homepage screenshots at 1440 by 1000 and 390 by 844 with reduced motion. Compare SHA-256 hashes against:

```text
3974af75e92c2f40877348657e026befdd468c38060d11998527fb92b8a4063e
a26b01382232e327c6753ff2f0babb931986e06667282c4feceb65ce07c493b8
```

Expected: exact matches.

- [ ] **Step 5: Run the production build**

Run: `npm run build`

Expected: optimized build succeeds and all routes prerender.
