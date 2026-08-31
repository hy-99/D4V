# Deliberate Section Reveals

## Goal

Keep section landing animations hidden until a section visibly enters the viewport, then let the existing motion complete at a slower, more deliberate pace.

## Design

- Restore the original observer margins so incoming sections do not reveal before entering the active viewport area.
- Restore the 8% intersection threshold and original initial-visibility bounds.
- Use a shared 1400ms duration for homepage and inner-page reveal items.
- Use separate entry and reset observers: the active-zone observer starts entrances, while a full-viewport observer resets replayable sections only after they are completely off-screen.
- Never change visible content back to `ready` while any portion remains in the viewport.
- Preserve the existing cubic-bezier easing, per-item stagger delays, reveal variants, replay behavior, and reduced-motion behavior.
- Do not alter section dimensions, spacing, backgrounds, content, or page-specific layouts.

## Validation

- Confirm a section remains `ready` while positioned just below the viewport and becomes `visible` after entering it.
- Confirm the computed reveal duration is at least 1.4 seconds.
- Confirm a revealed section stays `visible` at the viewport edge and resets only after fully leaving the viewport.
- Re-run unit, browser, lint, type-check, and production-build checks.
