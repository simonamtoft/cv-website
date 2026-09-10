---
id: CV-8
title: Add selectable slide sets to presentations
status: Done
assignee: []
created_date: '2026-09-10 09:03'
updated_date: '2026-09-10 10:29'
labels: []
dependencies: []
references:
  - src/presentations/claude-code-workshop/App.jsx
  - src/presentations/claude-code-workshop/components/deck.tsx
  - tests/claude-code-workshop.spec.ts
priority: medium
type: feature
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Presenters need to tailor a hosted presentation to a specific audience before entering presentation mode. The Claude Code workshop is the first deck; future decks using the same React slide-deck format should be able to opt into the same selector without changing the Talks listing or affecting non-presentation items.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Opening the Claude Code workshop first shows a thumbnail selector with an include control for every authored slide
- [x] #2 The presenter can launch the live deck with any non-empty subset of slides in authored order
- [x] #3 The live deck renumbers and navigates only the selected slides
- [x] #4 The existing in-deck overview and print/PDF route continue to show the complete authored deck
- [x] #5 The selector is reusable by future presentations that use the established slide-deck format
- [x] #6 Automated browser coverage verifies selection, launch, and unchanged full-deck print or overview behavior
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Keep the existing Talk card and workshop route, but start the workshop deck in a selector state whenever it is opened outside print mode. 2. Add a selector component beside the reusable slide-deck primitives. It receives the authored slides, renders static thumbnail previews with slide number, title, and a checked-by-default include control, provides select-all and clear-all actions, prevents launch with an empty set, and launches selected entries in authored order. 3. Refactor the deck runtime to accept a slide collection rather than always reading the full authored list. Navigation, progress, keyboard movement, fullscreen mode, slide-number query updates, and visible page numbers operate on that collection and renumber selected slides consecutively. 4. Keep print mode and the existing G-key overview bound to the complete authored slides list because selected sets apply only to the newly launched live deck. 5. Define the selector and runtime contract around the existing Slide type and shared presentation components so a future React slide deck can supply its own array and receive the selector without changes to Talks routing or card data. 6. Update focused Playwright coverage for selector first load, thumbnail controls, non-empty launch guard, subset deck ordering and renumbered navigation, and unchanged full-deck overview and print behavior. Run the focused suite and production build, then inspect desktop and mobile selector screenshots.

7. Make the in-deck G overview edit the shared exclusion set, protect the final included slide, and move an excluded active slide to the next included slide or the previous slide when needed. Extend focused browser coverage for live overview edits.

8. Keep the logical active slide stable by ID when overview edits change its array position, snap the scroller to that slide before/after an edit, and reattach observers to the new sections. Add a regression scenario covering removal and reinclusion before the active slide.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented an opening thumbnail selector backed by an in-memory Set of excluded stable slide IDs. The shared deck entry now accepts a presentationSlides prop so another deck using the Slide contract can reuse the selector. The selected array drives live navigation and consecutive page numbers; print and the authored-slide overview remain complete. Validation passed: PLAYWRIGHT_PORT=4319 npx playwright test tests/claude-code-workshop.spec.ts (6 passed); npm run build (passed). Visually inspected selector screenshots at 1280x900 and 390x844.

Verifier repair: its initial full-suite run had one unrelated, transient article LeveragePyramid interaction failure. The owning test passed 5 repeated focused runs, and the full suite passed on rerun with PLAYWRIGHT_PORT=4319 (24 passed). No selector code change was warranted.

Extended the G overview into the same live selector: checkboxes edit the shared excluded-ID set, the final included slide cannot be removed, and removing the active slide advances to the next included slide or falls back to the previous one. Validation passed: PLAYWRIGHT_PORT=4319 npx playwright test tests/claude-code-workshop.spec.ts (6 passed); npm run build (passed). Visually inspected editable overview screenshots at 1280x900 and 390x844.

Fixed live-deck transition desynchronization after overview edits: preserve the active slide by stable ID, synchronously snap the scroller after the selected array changes, and reconnect observers to the replaced slide sections. Added a regression scenario that removes and reincludes a slide before the active one, confirming the active slide stays selected at its new position. The first attempt at a direct partial-scroll assertion did not reproduce the intermittent boundary, so it was removed rather than retained as a non-regression test. Validation passed: PLAYWRIGHT_PORT=4319 npx playwright test tests/claude-code-workshop.spec.ts (7 passed); npm run build (passed).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added a first-view thumbnail selector and editable G overview for the Claude Code workshop. Both use stable slide IDs, keep at least one live slide, and renumber the live deck consecutively; active slides remain correctly aligned when overview edits change the slide list. The complete authored deck remains available for overview and print. Verified with focused Playwright coverage and production build.
<!-- SECTION:FINAL_SUMMARY:END -->
