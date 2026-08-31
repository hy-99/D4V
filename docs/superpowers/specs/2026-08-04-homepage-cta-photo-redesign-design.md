# Homepage CTA Photo Redesign

## Objective

Replace the repeated custom arm drawings in the homepage call-to-action section with a polished, photo-led teamwork composition. The section must feel consistent with the homepage's warm, trustworthy visual language while remaining compact and immediately understandable.

## Scope

This change applies only to the homepage section headed **“Together, we can stop scams.”** It does not alter the sections above it, the footer below it, the CTA wording, or the destination routes.

## Visual Direction

Use the Pexels photograph **“Close-Up of People Hands Together”** by Shane as a full-bleed background image. The image shows multiple open palms directed inward and communicates collective support without relying on decorative line art.

- Source page: <https://www.pexels.com/photo/close-up-of-people-hands-together-4125007/>
- License: Pexels free-use license
- Store the production asset locally at `public/images/homepage-teamwork-hands.jpg`.
- Record the source and photographer in `public/images/README.md`.
- Render the image with `next/image`, `fill`, responsive `sizes`, and `object-fit: cover`.
- Treat the photograph as decorative because the visible CTA copy communicates the section's meaning; use an empty alt attribute.

The photograph will fill the section edge to edge. A deep-navy overlay will control contrast while allowing the open hands to remain visible around the text. Use a uniform navy layer near 58% opacity plus a center-weighted horizontal navy gradient that is strongest behind the copy and fades toward both edges. The combined treatment must preserve detail in the outer hands while keeping the central text area consistently dark.

## Composition

The section remains a horizontal band joined directly to the neighboring homepage sections. It will not become a floating card or introduce rounded outer corners.

- Desktop minimum height: 288px.
- Tablet minimum height: 304px.
- Mobile minimum height: 352px to accommodate stacked controls comfortably.
- Desktop image position: `50% 48%`, centered on the inward-facing palms.
- Mobile image position: `50% 44%` so the strongest cluster of palms stays visible behind and around the copy.
- Content remains centered in a constrained inner column so it does not collide with the hands at the frame edges.

The heading uses the existing editorial serif in warm white with more breathing room than the current line-height. The primary button stays orange. The secondary button becomes a warm-white outline with warm-white text, switching to a light filled treatment on hover. Both buttons retain minimum 44px targets and visible keyboard focus.

No supporting paragraph, statistic, claim, icon, illustration, or additional call to action will be added.

## Components and Cleanup

`CallToAction` remains the public component used by the homepage. Its implementation will be simplified to four layers:

1. Full-bleed `next/image` photograph.
2. Contrast overlays.
3. Existing centered heading.
4. Existing CTA links.

The `ArmField`, `MobileArmField`, placement arrays, and `HelpingArm` import will be removed. `components/helping-arm.tsx` will be deleted after confirming that no other component references it.

The existing `ScrollReveal` wrapper will remain. Its current heading and action stagger will be kept short and purposeful. The background itself will not parallax, drift, or animate. Under `prefers-reduced-motion`, the shared reveal system will continue to remove movement.

## Responsive and Accessibility Behavior

- The photograph must remain legible as a teamwork image at desktop, tablet, and mobile widths.
- Text contrast must meet WCAG AA over every tested crop.
- Buttons stack only when horizontal space is insufficient; one tap activates each link immediately.
- Keyboard focus rings remain clearly visible against the navy treatment.
- The decorative image uses `alt=""` and does not create duplicate screen-reader content.
- The section must not create horizontal overflow or layout shifts.
- The existing semantic `section`, `h2`, and labelled relationship remain intact.

## Testing and Validation

Update the homepage component test to confirm that the CTA heading, both destination links, and the local background image marker render. Confirm that no `HelpingArm` reference remains.

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Inspect the homepage at:

- `1440x1000`
- `1024x768`
- `768x1024`
- `390x844`

The visual review must confirm:

- Open palms remain recognizable at every viewport.
- Copy and controls stay visually centered and readable.
- The CTA no longer contains custom arm doodles.
- The image does not imply a real D4V event or show D4V branding.
- The section flows directly into the footer without an unexplained gap.
- Reveal motion is smooth, restrained, and absent when reduced motion is enabled.
- There is no horizontal scrolling, broken image, console error, or layout shift.

## Intentional Differences From the Current Section

The warm-white empty background and navy arm outlines are replaced by a real photograph with a dark editorial treatment. The section is slightly taller to preserve the photographic gesture and button spacing, but it remains subordinate to the larger storytelling sections above it.
