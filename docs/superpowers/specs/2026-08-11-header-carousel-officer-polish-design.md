# Header, Scam Carousel, and Officer Stage Polish

## Scope

Apply three focused visual and interaction refinements without changing homepage section layouts or About page content.

## Header Wordmark

- Keep the existing logo asset, crop, and dimensions unchanged.
- Render "Bay Area" in the same condensed display family as "D4V."
- Match their visual height while keeping "Bay Area" in title case.
- Preserve the existing orange treatment for "D4V" and navy/off-white treatment for "Bay Area."
- Keep the shared header behavior consistent across every route.

## About Scam Photo Deck

- Remove the visible pause/play button and its user-controlled pause state.
- Keep timed automatic image rotation.
- Keep the existing image selectors and captions.
- Retain document-visibility, pointer, focus, and reduced-motion safeguards.

## Officer Stage

- Replace the asymmetric corner treatment with the same moderate radius on all four corners.
- Preserve the empty stage, disabled previous/next controls, dimensions, colors, and future officer-data structure.

## Validation

- Confirm the wordmark remains balanced on desktop and mobile, in both light and dark headers.
- Confirm no pause/play control is rendered and the photo deck still rotates automatically.
- Confirm reduced-motion mode still prevents automatic movement.
- Confirm all officer-stage corners use the same radius.
- Run unit tests, lint, TypeScript checks, focused browser tests, and the production build.
