# D4V Photo-First Inner Pages Design

## Summary

Rebuild the seven D4V Bay Area inner pages so they reach the visual quality of the homepage without copying its exact layout. Real people and recognizable community situations will carry the visual story. Icons, lines, circles, paper edges, and other graphic marks will remain secondary.

The homepage, header behavior, logo treatment, navigation, footer, routes, and truthful existing copy remain stable unless a shared compatibility fix is required.

## Goals

- Make photography the primary visual element in every inner-page hero.
- Give About, Our Work, Resources, Workshops, SeniorSafe, Get Involved, and Get Help distinct compositions.
- Remove the repeated illustration-window hero pattern.
- Improve heading measures, line breaks, section rhythm, visual density, and mobile composition.
- Keep page-entry and scroll reveals noticeable, smooth, and replayable without slowing navigation.
- Preserve accessibility, reduced-motion behavior, semantic structure, and truthful organizational claims.
- Store all production images locally and document their source and permitted use.

## Non-Goals

- Do not redesign the homepage.
- Do not add officer names, portraits, biographies, LinkedIn links, or an empty team section.
- Do not add statistics, testimonials, past events, fabricated D4V materials, or unsupported claims.
- Do not imply that licensed community photographs show completed D4V programs.
- Do not add animation libraries or a content-management system.
- Do not introduce filters, downloads, forms, or other functionality without real content behind them.

## Visual Hierarchy

Photography must occupy the most important visual space on each page. On desktop, a primary hero photograph should generally occupy 42–58% of the hero composition or run full bleed. On mobile, it should remain prominent and appear within the first viewport or immediately after the hero title.

Secondary graphics may include:

- Lucide line icons used for scanning and navigation.
- Short orange rules and restrained navy linework.
- Pale circles, offset paper edges, small tabs, and subtle dot patterns.
- The existing homepage helping-hands treatment, which remains homepage-only.

The current unDraw scenes will not appear as hero artwork. The `IllustrationPanel` browser-window treatment, its overlapping caption and pill, and the requirement for one illustration on every page will be removed.

## Photography Rules

- Use local image files with `next/image`.
- Use licensed photographs with an identifiable source and license record.
- Prefer warm, candid, respectful situations involving older adults, families, small groups, phones, tablets, printed guidance, or conversation.
- Avoid branded clothing, institutional logos, staged cybersecurity imagery, fear-based expressions, and exaggerated distress.
- Avoid photographs that could be read as documentation of a past D4V event.
- Give each route a distinct primary photograph. Do not repeat the same photograph twice on one page.
- Use meaningful alt text describing the visible situation without claiming a D4V relationship.
- Store focal-position metadata so important faces and devices remain visible across responsive crops.

## Shared Architecture

### Photo Registry

Replace `lib/page-art.ts` with a typed `lib/page-photos.ts` registry.

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

The registry centralizes source information and cropping behavior but does not force every page into the same layout.

### Photo Frame

Create `components/photo-frame.tsx` as a focused image primitive with these variants:

- `full`: wide or full-bleed photographic field.
- `arch`: large rounded editorial crop.
- `oval`: the homepage-inspired oval treatment.
- `offset`: photograph with one restrained paper-edge offset.
- `strip`: shallow horizontal crop for transitions or guide shelves.

The component handles `next/image`, responsive sizes, focal position, optional representative-image labeling, and reveal hooks. It does not render headings, page copy, or route-specific layout.

### Page Titles

Keep `PageTitle`, but replace its single fixed heading measure with explicit props:

```ts
type PageTitleProps = {
  size?: "hero" | "section" | "compact";
  measure?: "narrow" | "medium" | "wide";
  align?: "left" | "center";
};
```

Each route chooses its title measure and intentional line breaks. Hero titles use responsive line-height between `1.02` and `1.08`; section headings use slightly more breathing room.

### Section Components

Retain `EditorialSection`, `ScrollReveal`, `PageShell`, `Header`, and `SiteFooter`. Route pages own their compositions. Shared components provide spacing, image treatment, typography, and motion primitives without prescribing a universal hero or card grid.

## Route Designs

### About

- Use a navy editorial hero with a large representative community photograph breaking the right edge of the composition.
- Keep “A steadier way through a noisy internet” as the primary title with a wider measure.
- Follow with a cream manifesto section combining concise copy and one smaller candid conversation photograph.
- Present the three principles as an asymmetric editorial sequence rather than equal cards.
- Do not render a team area or reserve visible space for future officers.

### Our Work

- Open with a three-image photographic montage representing workshops, SeniorSafe, and resources.
- Place the title over a quiet pale-blue field with one image overlapping the section boundary.
- Build the three work areas as connected horizontal chapters on desktop and stacked chapters on mobile.
- Give every chapter its own image crop, icon, short description, and route link.
- Remove the current generic three-card row and large unexplained blank region.

### Resources

- Lead with a real person calmly checking information on a phone, tablet, or printed guide.
- Use a wide editorial title area rather than the illustration panel.
- Present the three resource themes as a guide shelf with photographic thumbnails or detail crops.
- Keep the four-question pause checklist as a strong navy band because it is useful and visually distinct.
- Replace the current fabricated-looking guide spread as the dominant image; still-life guide photography may remain only when it contains no misleading D4V branding or unsupported claims.

### Workshops

- Promote the workshop photograph to the hero and use a layered navy gradient for readable text.
- Describe the photograph as representative imagery, not a completed D4V event.
- Keep the three-stage learning sequence, but integrate one or two photographic detail crops between the stages.
- Use a warm cream inquiry section with a direct route to Get Involved or Get Help, based on existing navigation.
- Remove the unDraw scene entirely.

### SeniorSafe

- Make the older-adult tablet photograph the sole hero image.
- Use an overlapping cream copy panel to create intimacy and preserve readable contrast.
- Keep the three practical habits as a calm vertical progression with small icons.
- Use a second, distinct licensed photograph for the final togetherness section.
- Never repeat the hero photograph elsewhere on the page.

### Get Involved

- Use a photo collage showing ordinary community participation: conversation, sharing a guide, or helping someone check information.
- Avoid officer portraits and organization-specific event imagery.
- Present “Host a conversation,” “Share a resource,” and “Lend a hand” as visually different pathways rather than three identical cards.
- End with a compact photographic invitation band instead of a mostly empty call-to-action field.

### Get Help

- Use a calm, human hero showing someone pausing with a phone or checking with a trusted person.
- Keep the first safety actions visible early and prioritize clarity over decoration.
- Retain the numbered decision path, but tighten its vertical rhythm and add one supportive photographic crop.
- Replace the reused Resources image with route-specific human photography.
- Keep the final Resources link compact and direct.

## Motion

- Page entry completes in approximately `700ms`.
- Reveal order: eyebrow, title, supporting copy, primary photograph, actions.
- Primary photographs use opacity, `translateY`, and a subtle `scale(1.025)` to `scale(1)` settle.
- Wide images may use a simple `clip-path` reveal when it does not obscure content or delay interaction.
- Scroll reveals replay when a section leaves and re-enters the viewport, matching the existing homepage behavior.
- Hover and focus movement stays within `2–4px` and never changes layout size.
- No looping ambient illustration movement.
- Under `prefers-reduced-motion`, all translation, scaling, and clipping are removed while opacity changes may remain.

## Responsive Behavior

- Preserve natural document scrolling; do not add snapping or viewport locks.
- At `1024px`, maintain meaningful two-column layouts where the image still has enough width.
- At `768px` and below, stack text and photography in the order that best supports each route rather than using one global rule.
- At `390px`, keep hero titles readable, avoid one-word lines unless intentional, and keep primary people visible in the crop.
- Use minimum 44px interactive targets and prevent horizontal overflow.

## Accessibility and Content Integrity

- Keep one `h1` per route and logical section-heading order.
- Preserve the skip link, keyboard navigation, visible focus, mobile-menu Escape handling, and focus restoration.
- Mark decorative graphics as hidden from assistive technology.
- Use alt text for informative photographs and empty alt text for decorative crops.
- Maintain WCAG AA contrast over all photographic overlays.
- Keep all information available without hover or animation.
- Do not describe representative photographs as D4V staff, volunteers, participants, or events.

## Testing and Acceptance Criteria

Update tests so they verify the intended visual hierarchy instead of requiring illustrations.

- Every inner page contains one primary photographic element marked with `data-primary-photo="true"`.
- No inner page renders `data-page-art` or `IllustrationPanel`.
- Every route contains exactly one `h1` and no broken local images.
- The same primary photo is not rendered twice on one page.
- Desktop hero photography occupies at least 40% of the hero width or is full bleed.
- Mobile hero photography is visible before the second major section begins.
- No title, image label, caption, action, or card overlaps at `1440x1000`, `1024x768`, `768x1024`, or `390x844`.
- No horizontal overflow occurs at any target viewport.
- Mobile navigation, keyboard focus, Escape behavior, and focus restoration continue to pass.
- Reduced-motion mode reports no transform, scale, looping animation, or clip reveal.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and the Playwright UI suite pass.
- Final screenshots are compared directly with the homepage for image prominence, spacing, type hierarchy, section rhythm, and color balance.

## Delivery Order

1. Replace the illustration architecture and revise its tests.
2. Add and document the approved real-photo asset set.
3. Rebuild Workshops, SeniorSafe, and Resources around their strongest subject-specific photography.
4. Rebuild About, Our Work, Get Involved, and Get Help with distinct photo-led compositions.
5. Refine shared typography and motion while confirming homepage compatibility.
6. Run static checks, production build, browser tests, responsive screenshots, and reduced-motion verification.
