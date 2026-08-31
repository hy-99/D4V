# About Scam Photo Deck Design

## Scope

Replace only the About page's "Scams change. Our mission doesn't." signal-map composition. Keep the section's pale-blue atmosphere, existing copy, surrounding transitions, officer section, homepage, header, and footer unchanged.

## Composition

- Desktop uses a two-column editorial split: a photographic deck on the left and the existing mission copy on the right.
- The photo deck displays one dominant 3:2 image with a restrained offset layer behind it, not a boxed dashboard carousel.
- Mobile places the photo deck before the copy and removes the offset that could cause horizontal overflow.
- Four representative photographs cover urgent messages, unknown callers, package messages, and unusual payment requests.
- A small caption strip identifies the warning pattern. It does not claim that a photographed person experienced fraud.

## Behavior

- The active photo advances every 5.5 seconds with a refined opacity and short directional transition.
- Four progress buttons allow direct selection and expose the active slide with `aria-current`.
- A pause/play control is always available. Rotation pauses while the deck is hovered, keyboard-focused, or the document is hidden.
- `prefers-reduced-motion` disables automatic advancement and image translation while preserving direct slide selection.
- All images are rendered with `next/image`, local paths, fixed dimensions, meaningful alt text, and centralized typed metadata.

## Assets

Store optimized local JPEG files under `public/images/inner-pages/scam-types/`. Record each photographer, Pexels source page, and license in the inner-page image README.

## Validation

Test semantic controls, automatic advancement, pause behavior, reduced motion, responsive layout, image loading, and horizontal overflow. Run unit tests, ESLint, TypeScript, Playwright, and the production build.

## Mission Copy Scale Revision

- Keep the carousel dimensions and grid proportions unchanged.
- Let the mission copy use the full width already available in its grid column.
- Increase the desktop mission heading to a 56–60px editorial scale and body copy to 20px.
- Increase mobile mission copy slightly while preserving the two intentional heading lines and preventing horizontal overflow.
- Use spacing, rather than image resizing, to balance the text vertically against the existing carousel.
