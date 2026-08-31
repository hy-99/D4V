# About Spacing And Team Scaffold Design

## Scope

Update only the About route and its About-specific tests. The homepage and other inner-page compositions remain unchanged.

## Content

- Remove every officer name, role, biography, avatar, and visible placeholder.
- Keep the people section visible as a finished empty scaffold.
- Store officer records in an exported typed array that is empty for now and supports a real image, image alt text, name, role, and biography later.
- Render officer cards only when records exist.
- Keep the heading “The people behind D4V Bay Area.” and force lining numerals so `D4V` does not use an old-style serif numeral.
- Change “D4V exists to turn confusing tactics into clear warning signs.” from blue emphasis styling to ordinary navy body styling.

## Layout

- Replace the desktop-only compressed fixed section heights with generous minimum heights and section padding.
- Increase spacing between headings, rules, paragraphs, diagrams, and the student invitation.
- Keep the empty people section intentionally quiet, with enough reserved vertical room for the future grid but no fake content.
- Preserve responsive stacking, accessible text sizes, landing animations, and the dark About footer.

## Validation

- Assert zero officer cards and no previous officer text in rendered HTML.
- Assert the empty officer stage remains present.
- Assert section two uses normal text styling and `D4V` uses lining numerals.
- Check all target viewports for clipping, overflow, broken images, and adequate section separation.
- Run unit tests, lint, TypeScript, Playwright, and the production build.
