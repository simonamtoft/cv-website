# Design & Content Overhaul — Status & Plan

## Status
**Not started.** This document captures the agreed plan so work can resume
from any machine.

## Context

The site has already completed an initial migration from CV to professional hub
(see PROGRESS.md). This overhaul goes further: full visual redesign + content
structure rethink + navigation model change.

## Agreed Decisions

### Visual direction
- **Softer dark theme throughout** — dark grey backgrounds (~#1a1d27 range),
  off-white body text (#e8e8e0), muted secondary text (#9a9aaa)
- **Accent colour:** amber (#f59e0b) replacing current orange (#ea850b) —
  more refined on dark surfaces
- **Body font:** Inter (replaces Open Sans) — more modern, better legibility
- **Headings:** Poppins stays
- **Readability is the priority** — not a harsh high-contrast dark site

### Navigation model
- Move from **single-page scroll** to **true multi-page app with separate URLs**
- Requires adding React Router v6
- Each section becomes its own route:
  - `/` — landing page (TBD what this shows — see open questions)
  - `/about` or kept on `/` — TBD
  - `/services`
  - `/background` (timeline)
  - `/writing`
  - `/contact`
- GitHub Pages requires a small redirect workaround for deep links (standard,
  well-documented)

### Content structure
- Current 5 sections (About, Services, Background, Writing & Talks, Contact)
  are the right set — but content and layout within each needs overhaul
- Specific content issues to be surfaced by the planner audit (see Phase 0)

### Test strategy
- Playwright healer agent runs after each implementation phase to fix breakage
- Full test regeneration via generator agent at the very end
- Existing 26 tests remain as regression baseline during the build

---

## Phases

### Phase 0 — UX & Content Audit (not started)
**Tool:** Playwright planner agent browsing live site at localhost:3000
**Output:** `specs/ux-audit.md`
**Goal:** Surface content gaps, structural issues, and confirm/adjust section
structure before any code is written. Also evaluate navigation model tradeoffs
for this specific site and audience.

Note: The planner agent invocation failed (tool execution aborted) on first
attempt — needs to be retried on resume. Ensure `npm start` is running before
invoking the planner agent.

### Phase 1 — Design token overhaul (`src/styles/App.css`)
New CSS custom properties:
- Dark colour system (backgrounds, surfaces, borders, text hierarchy)
- Amber accent replacing orange
- Add Inter to Google Fonts import
- Spacing/radius minor adjustments

### Phase 2 — Add React Router v6
- `npm install react-router-dom`
- Wrap app in `BrowserRouter`
- Define routes for each section/page
- Add a 404/redirect fallback for GitHub Pages (`public/404.html` trick)
- Update `Header.js` to use `<Link>` instead of `<a href="#...">` for nav items
- Persistent top navbar on all pages (no longer tied to scroll position)

### Phase 3 — Landing page (`/`)
Design and build the home/landing page. Content TBD pending audit, but likely:
- Hero with name, title, positioning tagline
- Brief About teaser
- Services overview (linked to /services)
- Recent writing/talks (1-2 items, linked to /writing)
- Contact CTA

### Phase 4 — Hero redesign
- New deep background treatment
- Stronger positioning tagline (one line: what Simon does and for whom)
- Refined typography scale (larger name, clearer hierarchy)
- Social links refined

### Phase 5 — Content & structure revisions (post-audit)
Address specific issues from the Phase 0 audit output.

### Phase 6 — Section-by-section visual polish
Each page/section styled for the dark system:
- About
- Services (dark cards, amber accents)
- Background/Timeline (dark surface, amber accent on dots/line, improved
  scannability)
- Modal (full dark treatment)
- Writing & Talks (card redesign)
- Contact (strong CTA visual weight)
- Footer

### Phase 7 — Test regeneration
Generator agent replaces hand-written tests with browser-observed ones from
the live redesigned site.

---

## Open Questions (to resolve at start of next session)

1. **Does About live on `/` (landing page) or get its own `/about` route?**
   Recommendation: keep About on `/` as part of the landing page — it is the
   first thing a new visitor needs.

2. **What exactly does the landing page show?** Full About section, or just a
   teaser + links to subpages? Needs the audit to inform this.

3. **Planner audit needs to be retried.** Start next session by running the
   planner agent against localhost:3000 to generate `specs/ux-audit.md`.

---

## Current Test Status
- 26/26 Playwright tests passing on Chromium
- Test files in `tests/` directory
- Config: `playwright.config.js` has baseURL and webServer enabled
- Run with: `npx playwright test --project=chromium`

## How to Resume
1. Open project in OpenCode on the other machine
2. Run `npm start` to verify dev server works
3. Retry the planner agent audit (Phase 0) — dev server must be running first
4. Read `specs/ux-audit.md` output
5. Resolve open questions above
6. Begin Phase 1 implementation
