# About Scam Photo Frame Design

## Goal

Give the rotating scam photographs on the About page a deliberate visual frame without changing the carousel's content, dimensions, rotation timing, controls, or accessibility behavior.

## Visual Treatment

- Add a narrow warm-white mat immediately around the rotating stage.
- Use one fine translucent navy outer border.
- Do not add corner marks, inset outlines, or other decorative frame elements.
- Keep the existing regular rounded rectangle and soft shadow.
- Keep the caption integrated with each photograph and the progress selectors below the frame.
- Reduce the mat and accent size on mobile so the photograph retains visual priority.

The treatment should read as an editorial photograph mounted for display, not as a dashboard card, browser window, filmstrip, or decorative illustration.

## Implementation

- Add one presentational frame wrapper around the existing carousel stage.
- Keep the slides, image transitions, captions, selectors, timer, and reduced-motion behavior unchanged.
- Scope all styling to the About page's existing `about-reference` layout.
- Build the frame with a single CSS border and restrained shadow; add no image assets or dependencies.

## Accessibility And Responsive Behavior

- Mark decorative frame accents as non-semantic through CSS only.
- Preserve the carousel's region label, slide semantics, keyboard controls, focus indicators, and readable caption contrast.
- Ensure the frame does not create horizontal overflow at desktop, tablet, or mobile widths.

## Validation

- Add a structure assertion for the frame wrapper before implementation.
- Check computed frame border, padding, and overflow behavior in Playwright.
- Verify the carousel still advances continuously and keeps the approved 950ms image transition.
- Run unit tests, lint, TypeScript checking, Playwright, and the production build.
