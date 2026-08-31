# Our Work Opening Redesign

## Scope

Redesign only the first two sections of `/our-work`. Do not alter the homepage, About page, shared logo treatment, shared footer, or other inner pages.

## Hero

- Remove the `D4V / Our Work` label.
- Use the existing real community photograph as a full-section background.
- Place the existing heading and supporting copy directly over the photograph.
- Use layered navy gradients for contrast while keeping people visible.
- Render the heading as two deliberate lines at a readable editorial scale.
- Use the shared hero-tone header and mark Our Work as the active route.
- Keep a minimum visual height of 540px at every supported viewport.

## Path Band

- Replace the detached heading and three chapter columns with one continuous visual band.
- Make `Follow what feels useful now.` the first panel in the band.
- Follow it with three complete linked photographic paths: Scam Workshops, SeniorSafe, and Resources.
- Keep the existing truthful descriptions and routes.
- Use full-photo tiles with restrained tone-specific overlays, permanent titles, descriptions, and actions.
- Use four columns on large desktop, two on tablet, and one on mobile.
- Keep all essential content visible without hover and preserve one-tap mobile navigation.

## Motion And Accessibility

- Preserve the existing section landing-animation system.
- Limit tile motion to image scale and arrow movement.
- Disable transform motion under reduced motion through the existing global behavior.
- Preserve meaningful image alt text, visible focus states, minimum touch targets, and no horizontal overflow.

## Validation

- Protect the structure with server-render tests.
- Check hero image coverage, heading placement and scale, responsive band columns, and overflow in Playwright.
- Inspect `1440x1000`, `1024x768`, `768x1024`, and `390x844`.
- Run unit tests, lint, TypeScript, the full Playwright suite, and the production build.
