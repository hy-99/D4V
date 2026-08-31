# D4V About Exact Reference Design

## Objective

Rebuild `/about` to reproduce the supplied 1024 by 1536 reference as closely as responsive HTML, React, CSS, local images, and icons allow. Previous carousel, photographic officer-band, and alternate invitation treatments are removed. The homepage remains visually unchanged.

## Composition

1. A white 488px desktop hero with the About-specific header, a left editorial statement, pale blue dot decoration, blue accent text, and a large irregular oval photograph of two older Asian adults reviewing a smartphone.
2. A 350px pale-blue mission band with copy on the left and six connected warning cards on the right. The warning cards use line icons, short scam phrases, small blue nodes, and thin curved connectors.
3. A 288px white officer section with centered heading and four equal profile cards containing the exact reference names, roles, and summaries. Cards use neutral avatar icons until real officer photography is supplied.
4. A compact pale-blue student invitation panel with a four-student line illustration on the left, copy and blue button on the right.
5. A deep-navy footer matching the reference columns, contact information, social icon treatment, legal row, and subtle skyline line art.

## Visual System

- Background: cool white with a restrained pale-blue radial wash.
- Headings: Cormorant Garamond in deep navy, with blue emphasis where shown.
- Body: Source Sans 3 in dark navy.
- Actions and active navigation: royal blue `#2866DD`.
- Brand accent: supplied D4V orange and exact circular logo.
- Shadows: soft blue-gray card shadows only.
- Borders: one-pixel pale blue.
- Motion: existing short replaying section reveal, with reduced-motion support.

## Responsive Behavior

- Desktop at 1024px follows the reference proportions and column placement.
- Tablet stacks hero copy above the image, converts the mission diagram to a readable two-column card grid, and keeps officer cards in two columns.
- Mobile keeps all text at readable sizes, uses single-column warning and officer cards, and stacks the invitation artwork above its copy.
- No horizontal overflow, hidden essential content, or hover-only behavior.

## Assets

- Preserve `/images/d4v-logo-exact.png` unchanged.
- Use a dedicated local About hero photo that matches the reference subject and crop.
- Use a dedicated local blue line illustration for the student invitation.
- Build warning connectors and skyline decoration with CSS/SVG because they are deterministic interface decoration.

## Acceptance Criteria

- No photo or officer carousel remains on `/about`.
- All six warning cards, four officer cards, invitation panel, footer columns, and visible reference copy are present.
- The reference section boundaries and overall page height are closely matched at 1024px.
- The homepage viewport screenshot hashes remain unchanged.
- Static tests, Playwright tests, lint, typecheck, and production build pass.
