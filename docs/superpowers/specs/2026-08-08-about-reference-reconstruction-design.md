# About Reference Reconstruction

## Goal

Reconstruct the supplied About-page reference as closely as possible while preserving D4V's existing assets, truthful claims, accessibility, and the two requested interaction exceptions.

## Composition

The page uses the reference's compact sequence and proportions:

1. A light header and split hero with a two-line serif title on the left and a large irregular oval photograph on the right.
2. A shallow pale-blue mission band with a user-controlled real-photo carousel on the left and concise mission copy on the right.
3. A shallow team band using a real photographic background with one centered, rotatable officer profile stage. Until real officer data is supplied, four neutral blank slots demonstrate rotation without inventing names, biographies, or portraits.
4. A short rounded pale-blue student invitation panel with a real group photograph, concise copy, and one Get Involved action.
5. A compact dark-navy About footer matching the reference's ending. The homepage keeps its existing pale footer.

## Interaction

- Both carousels use visible previous/next controls and ArrowLeft/ArrowRight keyboard input.
- Photo captions remain visually attached to the image and explain the photograph's symbolism in small editorial italic text.
- Officer placeholders expose position status without fake identity information.
- Each content section uses the homepage's replaying `ScrollReveal` behavior. Child elements receive short staggered delays so text and images land in sequence whenever the section re-enters view.
- Reduced-motion mode keeps all content visible and removes transforms and animation.

## Responsive Behavior

- Desktop follows the reference's horizontal proportions and compact section heights.
- Tablet retains horizontal layouts where they remain readable and stacks the hero only below the existing breakpoint.
- Mobile stacks content in reading order, retains one-tap controls, keeps captions attached, and prevents horizontal overflow.

## Constraints

- Do not modify homepage components or homepage styling.
- Do not add officer names, bios, portraits, impact claims, contact details, partner information, or workshop history.
- Use only local real-person photography already present in `public/images`.
- Preserve semantic headings, focus states, 44px controls, meaningful alt text, and no-JavaScript content visibility.

