# D4V About Page Photo-Story Redesign

## Scope

Redesign only the About page. Preserve the homepage and every other route without visual or behavioral changes. Retain the approved About-page facts while replacing the current restrained five-band layout with a warmer, photo-led editorial story.

## Design Direction

The page should borrow the reference image's clarity and friendly rhythm without copying its blue corporate styling, card system, or fabricated team content. It will use the existing D4V cream, pale blue, warm white, navy, and orange palette; Cormorant Garamond for major editorial statements; Source Sans for readable body copy; and Oswald only for restrained utility labels.

Real photography remains primary. Decorative treatments are limited to purposeful photo frames, thin rules, paper-like caption tabs, and controlled color fields. No doodles, generic icon collections, floating notification cards, gradients, fake officer profiles, or unsupported claims will be introduced.

## Page Structure

### 1. Opening: Who We Are

- Keep the approved heading: “Making online safety easier to understand.”
- Keep the approved factual paragraph describing D4V Bay Area as a student-led community initiative.
- Place text on the left and a large real community photograph on the right.
- Use an asymmetric organic photo frame with one rounded upper corner and a quiet offset pale-blue backing plane.
- Keep the header light and preserve generous clearance below it.
- On mobile, show the text first and the image second in normal document flow.

### 2. Why D4V Exists: Rotating Photo Story

- Place the interactive photo deck on the left and the approved “Online fraud keeps changing. Clear guidance should keep up.” content on the right.
- Use three existing real photographs as symbolic, representative moments rather than past D4V events:
  - A community conversation: “Questions become easier when there is room to ask.”
  - Older adults reviewing a tablet: “Confidence grows when technology is explored together.”
  - An older adult considering a phone: “A pause creates space for a safer next step.”
- Render the caption as a small editorial annotation attached to the image edge, using a restrained italic serif rather than a simulated handwritten font.
- Include visible previous and next buttons displaying left and right chevrons.
- Support `ArrowLeft` and `ArrowRight` while focus is within the carousel.
- Use `aria-live="polite"` for the current slide description and announce the slide position.
- Do not autoplay. Do not make the carousel drag-dependent. One control activation changes exactly one slide.
- Transition with a short opacity and horizontal-shift animation. Reduced-motion mode keeps the image swap but removes movement.
- On mobile, text appears before the photo deck so the reason for the section is understood before the interaction.

### 3. Community Focus: Who We Serve and What We Plan to Provide

- Combine the approved audience and offering information into one connected editorial sequence.
- Begin with the heading “Designed with older adults and community organizations in mind.”
- Present the three audience labels as a single horizontal typographic rail on desktop and a clean vertical list on mobile:
  - Older adults
  - Senior-serving organizations
  - Bay Area communities
- Follow with the three planned offerings as linked editorial rows rather than cards:
  - Scam-Prevention Workshops
  - SeniorSafe
  - Practical Resources
- Preserve wording that describes planned or designed work without implying completed programs or prior impact.
- Use thin separators, permanent descriptions, and obvious text links. Do not use icons or hover-only information.

### 4. Officer Carousel Preview

- Add a full-width section titled “The people behind D4V Bay Area.”
- Use the existing teamwork-hands photograph as a symbolic background. Apply a restrained navy overlay so text and controls meet WCAG AA contrast.
- Do not imply that people in the background are D4V officers.
- Place a centered officer-stage frame over the background. It remains intentionally empty while officer data is unavailable.
- Show concise empty-state copy: “Officer profiles will appear here.”
- Display previous and next chevron controls in their final positions, disabled while the typed officer array is empty.
- Build the component so adding officer objects later enables rotation without changing its public interface or layout.
- Future officer data supports name, role, image, image alt text, optional biography, and optional LinkedIn URL.
- When data exists, the carousel supports visible chevron buttons, `ArrowLeft`, `ArrowRight`, focus management, slide-position announcements, and reduced motion.
- Do not render fake silhouettes, stock officer portraits, placeholder names, or fabricated roles.

### 5. Our Approach

- Close with “Clear enough to understand. Practical enough to use.”
- Preserve the four approved principles and concise descriptions:
  - Plain Language
  - Realistic Examples
  - Respect, Not Fear
  - Trusted Information
- Replace the current dark boxed grid with a light, warm editorial composition.
- Use a broad serif statement beside a flowing sequence of four principles separated by fine navy rules and orange markers.
- Stack the content naturally on mobile with comfortable reading sizes and no decorative overlap.

## Components and Data

Create focused client components rather than moving the whole page to the client:

- `PhotoStoryCarousel`: receives a readonly typed slide array and handles manual rotation, keyboard controls, announcements, and reduced-motion-safe transitions.
- `OfficerCarousel`: receives a readonly typed officer array and renders either the empty preview or functional officer rotation.
- Keep About-page content arrays near the route unless they become shared.
- Continue using `next/image`, existing local image metadata, `EditorialSection`, and `PageShell`.

Suggested data interfaces:

```ts
type PhotoStorySlide = {
  photo: PagePhoto;
  caption: string;
};

type OfficerProfile = {
  name: string;
  role: string;
  image: PagePhoto;
  biography?: string;
  linkedInUrl?: string;
};
```

## Motion and Interaction

- Page-entry and scroll reveals remain transform/opacity-based and complete within roughly 700 milliseconds.
- Carousel changes complete within roughly 420 milliseconds using `cubic-bezier(.2,.8,.2,1)`.
- Controls have at least 44 by 44 pixel targets and visible focus states.
- Carousels do not autoplay, trap focus, hijack page scrolling, or require two taps.
- `prefers-reduced-motion` removes carousel translation and section movement without hiding content.

## Responsive Behavior

- Desktop: split opening, split photo-story section, horizontal audience rail, editorial offering rows, full-width officer background, split approach closing.
- Tablet: preserve split layouts where measures remain readable; otherwise stack before title wrapping becomes crowded.
- Mobile: one-column document flow, text before interactive media, full-width controls below each carousel, no negative margins, no horizontal overflow, and at least 17-pixel body text.

## Validation

- Add unit tests for approved content, section order, and absence of fake officer content.
- Add component tests for carousel wraparound, button state, keyboard arrows, empty officer behavior, and accessible announcements.
- Inspect the About page at 1440 by 1000, 1024 by 768, 768 by 1024, and 390 by 844.
- Verify no overlap, clipped text, awkward headline fragments, blank reveal states, broken images, or horizontal overflow.
- Verify keyboard controls, visible focus, disabled empty-state controls, no autoplay, and reduced-motion behavior.
- Run `npm test`, `npm run lint`, `npm run typecheck`, the Playwright UI suite, and `npm run build`.
- Recapture homepage desktop and mobile regression screenshots and require exact equality with the existing baselines.

## Truthfulness Constraints

- Existing photographs are representative imagery and must not be presented as completed D4V events or actual officers.
- No officer names, roles, portraits, biographies, LinkedIn links, impact claims, partnerships, statistics, testimonials, or workshop history will be invented.
- The officer section remains a visibly intentional preview until real data is supplied.
