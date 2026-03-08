# Design & Content Overhaul — Current Status

## Status
**All major phases complete. Remaining work is content gaps only.**

---

## Completed Phases (summary)

| Phase | Description | Status |
|---|---|---|
| 0 | UX & Content Audit (`specs/ux-audit.md`, 275 lines) | ✓ Done |
| 1 | Design token overhaul — warm fall theme (see below) | ✓ Done |
| 2 | React Router v6 — multi-page routing, GitHub Pages deep-link | ✓ Done |
| 3 | Landing page / hero redesign — tagline + CTA added | ✓ Done |
| 4 | Section-by-section visual polish (all pages) | ✓ Done |
| 5 | Content & structure revisions (partial — see remaining below) | Partial |
| 6 | Playwright test regeneration — 24 tests passing | ✓ Done |

### Live design system (Phase 1)
Warm fall theme — NOT the dark/amber system described in earlier versions of this file:
- `--color-bg`: #fdf6ec
- `--color-surface`: #f5e6d0
- `--color-surface-raised`: #eedcc0
- `--color-border`: #d4b896
- `--color-text`: #3d2b1a
- `--color-text-muted`: #7a5c40
- **Accent**: terracotta #c85a1a
- **Body font**: Inter (replaced Open Sans)
- **Headings**: Poppins

---

## Remaining Work

### 1. Taxonomy Classification — PERMANENTLY CLOSED
No metric available and none will be added. Closed.

### 2. Writing & Talks retitle — DONE
Renamed to "Writing & Events" across nav, page heading, PageNav links, and tests.

### 3. Contact — work email added — DONE
Added siap@thetechcollective.eu to Contact page and workEmail to config.js.

### 4. About opening line — DONE
Removed "and data scientist" — now reads "ML engineer" only.

### 5. Contact — no calendar booking link
**File:** `src/components/Contact.js`
Currently email + LinkedIn only. Add a Calendly or Cal.com link for easy booking.

### 6. About section — ML/MLOps framing revision
**File:** `src/components/About.js`
Needs revision to lead with ML/MLOps as primary identity, GenAI as secondary,
consulting as context. See PROGRESS.md for framing guidance.

### 5. Metadata update
**File:** `public/index.html`
Title, meta description, and Schema.org jobTitle should reflect current role
and technical practitioner framing.

---

## Current Test Status
- 24/24 Playwright tests passing on system Chrome
- Test files: `tests/` directory
- Config: `playwright.config.js` (system Chrome: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`)
- Run with: `npx playwright test --project=chromium`
