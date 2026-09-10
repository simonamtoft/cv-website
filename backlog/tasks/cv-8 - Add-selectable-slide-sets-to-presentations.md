---
id: CV-8
title: Add selectable slide sets to presentations
status: In Progress
assignee: []
created_date: '2026-09-10 09:03'
updated_date: '2026-09-10 09:03'
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
- [ ] #1 Opening the Claude Code workshop first shows a thumbnail selector with an include control for every authored slide
- [ ] #2 The presenter can launch the live deck with any non-empty subset of slides in authored order
- [ ] #3 The live deck renumbers and navigates only the selected slides
- [ ] #4 The existing in-deck overview and print/PDF route continue to show the complete authored deck
- [ ] #5 The selector is reusable by future presentations that use the established slide-deck format
- [ ] #6 Automated browser coverage verifies selection, launch, and unchanged full-deck print or overview behavior
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Keep the existing Talk card and workshop route, but start the workshop deck in a selector state whenever it is opened outside print mode. 2. Add a selector component beside the reusable slide-deck primitives. It receives the authored slides, renders static thumbnail previews with slide number, title, and a checked-by-default include control, provides select-all and clear-all actions, prevents launch with an empty set, and launches selected entries in authored order. 3. Refactor the deck runtime to accept a slide collection rather than always reading the full authored list. Navigation, progress, keyboard movement, fullscreen mode, slide-number query updates, and visible page numbers operate on that collection and renumber selected slides consecutively. 4. Keep print mode and the existing G-key overview bound to the complete authored slides list because selected sets apply only to the newly launched live deck. 5. Define the selector and runtime contract around the existing Slide type and shared presentation components so a future React slide deck can supply its own array and receive the selector without changes to Talks routing or card data. 6. Update focused Playwright coverage for selector first load, thumbnail controls, non-empty launch guard, subset deck ordering and renumbered navigation, and unchanged full-deck overview and print behavior. Run the focused suite and production build, then inspect desktop and mobile selector screenshots.
<!-- SECTION:PLAN:END -->
