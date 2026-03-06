# Design & Content Overhaul — Status & Plan

## Status
**Phase 0 complete. Phase 1 not started.**

- `specs/ux-audit.md` produced (audited 2026-03-01, 275 lines)
- Key decision outstanding: navigation model (see Open Questions)
- Quick-win content fixes should be done before or alongside Phase 1

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

### Phase 0 — UX & Content Audit ✓ COMPLETE
**Output:** `specs/ux-audit.md` (audited 2026-03-01, 275 lines)
**Key findings:** See Audit Summary section below.

### Phase 1 — Design token overhaul (`src/styles/App.css`)
New CSS custom properties:
- Dark colour system (backgrounds, surfaces, borders, text hierarchy)
- Amber accent replacing orange
- Add Inter to Google Fonts import
- Spacing/radius minor adjustments

### Phase 2 — Add React Router v6
~~DEFERRED — decision in PROGRESS.md. Single-page scroll retained; React Router
not needed at current content volume.~~

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

## Audit Summary (from specs/ux-audit.md)

### Top 5 priorities (ranked by impact)

1. **Fix outdated metadata — HIGH impact / 15 min**
   `public/index.html`: `<title>`, `<meta name="description">`, and Schema.org
   `jobTitle`/`worksFor` all reference "Senior Data Scientist at Stibo Systems".
   Live issue harming SEO and credibility.
   Suggested title: "Simon Amtoft Pedersen — ML Engineer & Data Scientist | amtoft.dev"
   Suggested description: "ML Engineer and Data Scientist at The Tech Collective
   (Implement Consulting Group). Helping organisations move from data ambition to
   AI in production."

2. **Add hero tagline + CTA — HIGH impact / medium effort**
   Hero wastes a full viewport with name + credential line only. No value prop,
   no hook, no CTA. The first line of About is the real pitch — move it up.
   Draft: "I help organisations move from 'we have data' to AI that actually
   works in production." + single CTA button.

3. **Write the Tech Collective timeline entry — HIGH impact / 30 min**
   Current employer entry (Mar 2026 – Now) is completely blank. The `text` field
   renders an empty paragraph. This is the most important entry and cannot be
   blank.

4. **Add at least one anonymised client outcome — HIGH impact / medium effort**
   Project modals have technical detail but zero business outcomes. Even one
   metric (e.g. "reduced manual categorisation effort by ~60%") transforms
   a tech list into proof of value. Taxonomy Classification at Stibo Systems is
   the best candidate.

5. **Restructure Background section — MEDIUM impact / medium effort**
   (a) Add missing H2 "Background" heading (currently no visible heading)
   (b) Reverse chronological order (most recent role first)
   (c) Trim or collapse BSc (23 courses) and MSc (17 courses) coursework tables
   (d) Fix clickability UX — non-clickable items look the same as clickable ones

### Additional findings
- About H2 is 24px vs 36px for all other section headings — CSS regression
- About closing CTA has no link ("feel free to reach out" should link to #contact)
- Writing & Talks: section titled "Talks" but no talk entries exist — only organiser roles
- Modal date format inconsistency: "2022 Nov – 2025 Apr" vs timeline "Nov 2022 – Apr 2025"
- GitHub in hero signals developer portfolio, not trusted AI advisor — move to Contact
- Contact has no form, no calendar booking link (Calendly/Cal.com)
- Footer is a bare copyright line — missed opportunity to reinforce identity

### Navigation model — audit recommendation
The audit recommends **staying single-page for now** (see Open Questions #4).

---

## Open Questions (to resolve at start of next session)

1. **Does About live on `/` (landing page) or get its own `/about` route?**
   **Recommendation (audit-backed):** Keep About on `/` as part of a curated
   home page. The audit's landing page structure puts a compressed About (2–3
   sentences) on the home page, with depth accessible via subpage if needed.

2. **What exactly does the landing page show?**
   **Recommendation (audit-backed):** If moving to subpages, the home page
   should be a curated conversion funnel:
   1. Hero with value proposition + single CTA
   2. Compressed About (2–3 sentences)
   3. Services teaser (3 of 5 cards)
   4. 2–3 selected project highlights (business outcomes, not tech lists)
   5. 1–2 Writing & Talks highlights
   6. Contact CTA styled as a prominent callout
   This structure only makes sense once the navigation model decision (Q4) is made.

3. ~~**Planner audit needs to be retried.**~~ **RESOLVED** — `specs/ux-audit.md`
   complete (2026-03-01).

4. ~~**NEW — Navigation model: stay single-page or add React Router?**~~
   **RESOLVED — Single-page retained. Decision in PROGRESS.md.**

---

## Current Test Status
- 26/26 Playwright tests passing on Chromium
- Test files in `tests/` directory
- Config: `playwright.config.js` has baseURL and webServer enabled
- Run with: `npx playwright test --project=chromium`

## How to Resume
1. Run `npm start` to verify dev server works
2. Resolve Open Question #4 (navigation model: single-page vs React Router)
3. Do Quick Wins first (metadata fix + Tech Collective entry) — 45 min, HIGH impact
4. Begin Phase 1 (design token overhaul: dark theme, amber accent, Inter font)
