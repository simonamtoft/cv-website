# UX & Content Audit — amtoft.dev

**Audited:** 2026-03-01  
**Site:** [http://localhost:3000](http://localhost:3000) (amtoft.dev)  
**Subject:** Simon Amtoft Pedersen — Senior Consultant, Data & AI  
**Viewport tested:** 1280×720px  
**Page total height:** 9,178px (~12.7 viewport heights of scrolling)

---

## Overall First Impression

The site makes a competent, understated impression but does not immediately land a memorable value proposition. On arrival the visitor sees a full-viewport dark header with the name, the credential line "MSc Engineering | Senior Consultant, Data & AI", two social icons (LinkedIn and GitHub), and a floating nav bar. There is no tagline, no hero statement, and no call to action. The header occupies 100vh (720px) and is almost entirely empty space — a visual placeholder where a pitch should be.

Scrolling reveals a professionally written About section, a substantive Services grid, a long chronological timeline, a Writing & Talks section, and a lean Contact section. The writing is specific and credible — well above average for a personal professional site. But the architecture buries the most persuasive material below the fold, and several critical metadata issues actively harm credibility and searchability right now.

---

## Section-by-Section Observations

### Hero / Header

**First impression (3 seconds):** Name and credentials only. No value proposition. No reason to keep reading.

**Content quality:** The credential line "MSc Engineering | Senior Consultant, Data & AI" is factual but inert — it names *what* Simon is, not *what he does for clients*. Compare it to the About section's opening line: "helping organisations move from 'we have data' to 'AI that actually works in production.'" That sentence is the real pitch and belongs in the hero, not three scrolls down.

**Visual hierarchy:** The header is a full-screen dark block (position: relative, height: 720px, background: rgb(51,51,51)). The H1 name and credential paragraph are centered. The LinkedIn and GitHub icon links appear below with no visible label text — they are accessible by aria-label but sighted users must recognise the icons. The nav is `position: fixed` when scrolled, so it remains visible throughout the page — this works well.

**Nav behaviour:** Confirmed the nav floats correctly at the top of the viewport while scrolling. The nav label "Background" links to `#timeline`, but the timeline section renders no visible H2 heading (see Background section below) — a minor but real orientation gap.

**Alignment with purpose:** Poor. A potential client arriving via LinkedIn referral or conference encounter has roughly 5 seconds to decide whether to read further. A full-screen empty header wastes that window entirely. The GitHub link in the hero signals "developer portfolio" more than "trusted AI advisor" — it dilutes the positioning for the primary audience.

**Critical metadata bugs (live, harming SEO now):**

- `<title>` reads: *"Simon Amtoft Pedersen - Senior Data Scientist & ML Engineer"* — outdated, does not match current role.
- `<meta name="description">` reads: *"Senior Data Scientist at Stibo Systems specializing in machine learning, AI solutions, and data engineering. Building scalable ML systems for global enterprises."* — completely outdated, references the previous employer.
- Schema.org structured data: `jobTitle: "Senior Data Scientist"`, `worksFor: "Stibo Systems"` — also outdated.

These three issues will harm search discoverability and create an immediate credibility gap if anyone searches Simon's name or finds the site via Google.

---

### About

**First impression (3 seconds):** A circular profile photo (200×200px) on the left and four paragraphs of prose on the right. Reads immediately as a bio section.

**Content quality:** This is the strongest section on the site. The writing is direct, specific, and non-generic. Highlights:

- Opening line is a clear value framing: "helping organisations move from 'we have data' to 'AI that actually works in production.'"
- Names the employer, the parent company (Implement Consulting Group), and the scope of work.
- Quantifies community involvement: "all three editions so far", "IDA AI Steering Committee".
- Closes with a soft, human CTA: "feel free to reach out."

**Visual hierarchy:** The About H2 heading is only **24px**, versus **36px** for every other section heading (Services, Writing & Talks, Let's Talk). This is likely a CSS regression from the original CV layout. It makes "About" feel visually subordinate when it is arguably the most important section on the page.

**Readability:** Good. Four paragraphs, appropriate length. The tone is professional without being stiff.

**Alignment with purpose:** High. The About section earns its place — it establishes credibility, names real organisations, and invites engagement.

**Issues:**

- The closing CTA paragraph ("If you're working on a data or AI challenge... feel free to reach out") has no link or button — it's a missed conversion moment. At minimum, "reach out" should link to `#contact` or `mailto:simon@amtoft.dev`.
- No social proof in this section (no client names, no endorsement quotes, no "trusted by" signals).
- The H2 font-size inconsistency (24px vs 36px elsewhere) should be fixed.

---

### Services

**First impression (3 seconds):** Five service cards in a grid, each with a heading, a one-liner, and bullet items. Reads as a capability overview.

**Content quality:** Good, with reservations:

- Service names are well-chosen and map to real buyer queries: "Generative AI & Agentic Systems", "MLOps & AI Engineering".
- The one-line intros are sharp: "LLM integration that goes beyond the demo" and "The infrastructure that lets models move from notebook to production and stay there" are genuinely good copy.
- Bullet items are specific — SHAP, MLflow, Terraform, Azure, FastAPI — signalling real practitioner knowledge rather than buzzword collection.

**Visual hierarchy:** Five cards in a full grid. The section intro paragraph is appropriate framing. Section height is **1,733px** — a long scroll just for services.

**Alignment with purpose:** Strong for technically-literate buyers (peers, technical leads). For a decision-maker (CTO, CDO, Head of Analytics) who is less technical, all five service names blur together — they could plausibly describe the same practice area. There is no sense of which services are most commonly engaged, what kind of organisation typically needs them, or what an engagement looks like in practice.

**Issues:**

- No engagement model or scope signals — not even high-level guidance like "project-based" vs "advisory retainer". A potential client cannot self-qualify.
- No social proof or business outcomes visible at this level. The actual evidence (project outcomes) is buried three sections deeper in timeline modals.
- "Data Strategy & Advisory" is the weakest card — bullets like "Technology selection and architecture review" are generic. This is often a client's entry point but it reads as a bolt-on.
- Consider whether all five cards need to be fully expanded on this page, or whether a more compact format with fewer visible details would reduce scroll fatigue.

---

### Background (Timeline)

**First impression (3 seconds):** A vertical alternating timeline of career and education entries, each with a logo badge and date range. Reads as a career history.

**Content quality:** The timeline contains genuinely impressive specifics:

- The Stibo Systems modals (Data Scientist, Senior Data Scientist) are excellent — they include named project categories, technology stacks, client types (Fortune 500), and concrete detail: "production-integrated since January 2024", "SHAP-powered explanations", "reduced manual onboarding effort".
- The MSc entry distinguishes itself: honorary student under Ole Winther, three research-level courses (30 ECTS), top grades — distinctive academic credentialing that most Data Science CVs lack.

**CRITICAL CONTENT BUG — The Tech Collective entry is empty:** The most recent and most important timeline item (Mar 2026 – Now, Senior Consultant at The Tech Collective) has **zero description text**. The entry exists with dates, title, and company name, but the content area renders an empty paragraph. This is the current employer and the primary reason someone might engage Simon — it cannot be blank.

**Modal experience:** The modals are well-designed. Smooth animation, structured layout (header → description → project cards with technology tags), keyboard Escape to close. One inconsistency: the modal date format reads "2022 Nov – 2025 Apr" while the timeline card shows "Nov 2022 – Apr 2025" — reversed order, same data. Small but noticeable.

**Timeline clickability UX:** Only 5 of 9 items are clickable (BSc, Exchange Semester, MSc, Data Scientist/Stibo, Senior Data Scientist/Stibo). Non-clickable items (TERMA, ReDI School, IDA, The Tech Collective) present no visible affordance difference — visitors will attempt to click them and encounter no response. This is a UX dead end.

**Missing section heading:** The Background section has **no visible H2 heading** in the rendered page. Every other section (About, Services, Writing & Talks, Let's Talk) has a heading. The nav item "Background" correctly links to `#timeline`, but there is no matching heading in the document for orientation. This is a structural gap and an accessibility issue.

**Timeline ordering:** The timeline is chronological ascending — meaning the most relevant recent experience is at the **bottom** of a 3,466px section. For a consulting pitch site, reverse chronological (most recent first) is strongly preferred. Clients should see the current role immediately, not after scrolling past undergraduate coursework.

**Alignment with purpose:** Mixed. Excellent for due-diligence readers ("what exactly has this person built?") but overwhelming as a first exposure. The coursework tables in particular — 23 courses for the BSc, 17 for the MSc — are appropriate for an academic CV or LinkedIn profile, not for a senior consultant's pitch site.

---

### Writing & Talks

**First impression (3 seconds):** A vertical list of cards with type badges (Article, Conference), date, venue, and a short description. Reads as a portfolio of public work.

**Content quality:** 5 items total — 2 articles, 3 conference entries. The content is credible:

- Publishing in *Ingeniøren* (a respected Danish engineering publication) is a legitimate credibility signal for the Danish/Nordic professional audience.
- Conference entries cite specific contributions: "recruited 50% of the speaker lineup", "sourced nearly half of the speaker lineup", "brought in roughly 18% of speakers for this 600+ attendee conference".
- Articles have English titles with Danish subtitles — appropriate for a bilingual professional audience.

**Issues with framing:**

- The section title is "Writing & Talks" but **there are zero entries where Simon gave a talk**. All three conference entries describe organiser/chair roles. If Simon has spoken publicly, those entries are missing. If he hasn't, the title is misleading.
- Co-authorship position: Simon appears as the 4th–6th author in both articles (out of 5–6 named authors). This is honest but diminishes the individual thought-leadership signal — it reads as "participated in group writing" rather than "recognised expert voice".
- 5 items is a thin portfolio at this career stage. A visitor may conclude "that's all?" and leave with a lower impression than intended.
- The Danish Data Science Community (DDSC) is mentioned in the About section as a co-authorship context, but no DDSC links or articles appear in this section.
- No "see all" affordance — unclear if this is the full list.

**Alignment with purpose:** Moderate. Establishes community presence and subject-matter engagement but does not position Simon as a primary expert voice. A strong Writing & Talks section for a consultant targeting this audience should include solo-authored content and direct speaking appearances.

---

### Contact

**First impression (3 seconds):** Heading "Let's Talk", two short paragraphs, email link, LinkedIn link. Clean and direct.

**Content quality:** The copy is good — "Working on a data or AI challenge? I'm happy to have a direct conversation about what's feasible, what's not, and where to start." On-brand, non-generic, appropriately direct. The second paragraph ("Whether you're scoping a new initiative, evaluating technical approaches, or looking for a speaker or collaborator – reach out") correctly covers the range of inbound use cases.

**Alignment with purpose:** Moderate. The contact information is present, but there is no activation mechanism beyond a raw email address and a LinkedIn link. For a site whose explicit goal is generating inbound opportunities, this section should be the highest-converting element on the page — and currently it is the lightest.

**Issues:**

- No contact form. Composing a cold email from scratch creates more friction than filling in a simple three-field form (name / email / context of inquiry).
- No calendar booking link (Calendly, Cal.com, etc.). For a consultant, "book a 30-minute call" is often a more effective CTA than a bare email address.
- GitHub is linked in the hero but not in the Contact section — inconsistent treatment of social channels.
- The nav label is "Contact" but the section heading is "Let's Talk" — fine in practice but may cause a momentary scan-mismatch.
- The footer is a bare copyright line ("© 2026 Simon Amtoft Pedersen. All rights reserved.") with no secondary nav, no email, no domain name repeat. Missed opportunity to reinforce identity at the bottom of a long scroll.

---

## Navigation Model Assessment

### Current model

Single-page, anchor-link navigation. Total scroll distance: ~9,178px at 1280×720px (12.7 viewport heights). The nav is `position: fixed` when scrolled, so it stays accessible throughout — this is well-implemented.

### Arguments for keeping single-page

- For the primary audience (potential clients doing due diligence after a referral), the single page allows complete assessment without navigation decisions.
- The natural reading flow — hero → identity → capabilities → evidence → credibility → contact — maps well to how a consultant profile is evaluated.
- Simpler to maintain and deploy (no routing, no URL management, no React Router setup).
- At the current content volume, subpages would feel artificially thin.

### Arguments for introducing subpages

- The page is very long. The Background/Timeline section alone is 3,466px — this section would benefit from its own URL, allowing direct linking (e.g., a recruiter sent to `/background`, or sharing a specific project entry).
- Deep linking: a peer or collaborator could be pointed directly to `/writing` or `/services` instead of a long anchor scroll.
- The Writing & Talks section will grow. At 15–20 items, a scrollable list embedded in a single page becomes unwieldy.
- Subpage URLs are more shareable, more bookmarkable, and more distinctive in browser history.

### Recommendation

**Stay single-page for now**, but plan a hybrid model as content grows:

- Condense Background on the main page to the 4–5 most relevant entries, with a `/background` subpage for the full chronology including coursework modals.
- Add a `/writing` subpage once the Writing & Talks list exceeds 8–10 items, with a "See all" link from the home section.
- This hybrid model ("curated home + full-detail subpages") serves the primary audience (fast assessment on the home page) while enabling depth for secondary audiences (peers doing thorough background research, recruiters).

---

## Landing Page Recommendation

If the site moves toward a subpage model, the home page (`/`) should **not** be a pure hero splash — it should be a curated overview that front-loads the conversion funnel:

1. **Hero with an actual value proposition** — not just name and title, but 1–2 sentences that frame Simon's unique positioning. Candidate: *"I help organisations build AI that gets into production and stays there — from problem framing through deployment and scale."* Accompanied by a single CTA button (e.g., "Let's talk →" or "See my work →").
2. **Compressed About** — 2–3 sentences, with a "Read more →" link to `/about`.
3. **Services teaser** — 3 of the 5 service cards (the most commonly engaged), with a "See all services →" link.
4. **Selected project highlights** — 2–3 outcomes from the timeline (not the full timeline), presented as brief proof-of-work cards with a business result.
5. **1–2 Writing & Talks highlights** — the most recent or most impressive, with "See all →".
6. **Contact CTA** — styled as a prominent callout or button, not a footer-style afterthought.

This structure allows a first-time visitor to assess Simon's value proposition in under 60 seconds, without scrolling 9,000px, while providing clear pathways to depth for those who want it.

---

## Missing Elements

Content a potential client would look for and not find:

1. **Client outcomes / case studies.** The project modals contain good technical detail but no business outcomes — no percentage improvements, no time-to-market reductions, no adoption metrics. A client evaluating a consultant asks "what happened after you built this?" not "what technology did you use?" Even one anonymised outcome (e.g., "reduced manual categorisation effort by ~60%" or "onboarding time cut from 3 weeks to 4 days") would substantially increase persuasiveness.
2. **Testimonials or endorsements.** Zero social proof from clients, collaborators, or managers. Even 1–2 short quotes pulled from LinkedIn recommendations would meaningfully increase trust. This is the most common credibility signal a consulting client looks for and it is entirely absent.
3. **Engagement model clarity.** How does one engage Simon? Is he available for project-based delivery, strategic advisory, fractional engagements, speaking? What is the typical scope or duration? The site provides no guidance, and a potential client may disengage rather than send a cold enquiry to ask.
4. **Solo-authored content.** Every item in Writing & Talks is co-authored with 4–6 people. There is no single-authored piece, personal blog post, newsletter, or solo LinkedIn article linked anywhere. This weakens the thought-leadership positioning.
5. **Current employer context.** The Tech Collective and its parent Implement Consulting Group are mentioned once in the About section. The nature of the firm, what it means for a client engaging Simon through it (vs. directly), and the firm's positioning in the market are entirely absent. The Tech Collective timeline entry is also blank.
6. **Speaking / presenting record.** The section is titled "Writing & Talks" but no entry shows Simon as presenter. Only organiser and chair roles appear.
7. **Domain expertise vertical.** Simon's Stibo Systems background gives him deep, specific expertise in product data management / MDM — a narrow and valuable vertical. Clients in manufacturing, retail, and enterprise data will recognise this immediately, but it is not called out anywhere on the site.
8. **Calendar booking link.** No Calendly or equivalent link despite the explicit goal of generating inbound opportunities. This is among the simplest high-impact additions.
9. **Updated metadata.** Page title, meta description, and Schema.org structured data all reference the old role at Stibo Systems. This is a live issue.

---

## Excessive / Low-Value Elements

Content that adds noise without adding value for the primary audience:

1. **BSc coursework table (23 courses).** A full listing of undergraduate Electrical Engineering courses — Electric Circuits 1 & 2, Basic Chemistry, Electromagnetism, Digital Electronics 1 & 2, etc. — is irrelevant to a client evaluating a senior AI consultant. This content belongs on a LinkedIn profile or academic CV. It dominates the modal and reinforces a "CV dump" impression.
2. **MSc coursework table (17 courses).** The top 4 ML-specific courses (Advanced Machine Learning, Deep Learning in Computer Vision, the two honorary-student independent study courses) are relevant and distinctive. The remaining 13 (Introduction to Operations Research, Dynamical Systems, Social Graphs, Basic Chemistry equivalent, etc.) add length without credibility lift for this audience.
3. **Exchange semester entry (University of Maryland, Sep–Dec 2019).** Its substantive content is: "I took my first machine learning course." For a Senior Consultant with 5+ years of production ML experience, this entry dilutes the timeline. The "received academic honors" detail does not offset the thinness of the entry in this context.
4. **GitHub link in the hero.** The primary audience is clients and decision-makers, not open-source collaborators or recruiters assessing code. Prominently placing GitHub alongside LinkedIn in the hero sends a mixed signal about target audience. Move it to the Contact section or footer.
5. **ReDI School volunteer entry as a full timeline card.** A 9-month volunteer teaching role from 2–3 years ago warrants a one-line mention in an About section or a "Community" footnote — not a full alternating timeline card that takes up equivalent visual weight to a senior role at a Fortune 500-serving enterprise software company.
6. **Two separate Stibo Systems entries** (Data Scientist Nov 2022–Apr 2025; Senior Data Scientist May 2025–Feb 2026). Splitting one employer's tenure into two cards with separate modals creates visual noise and makes the former employer appear to dominate the timeline. These could be presented as a single entry with a promotion note, or combined into one modal with a clear timeline of progression.

---

## Priority Recommendations (top 5, ranked)

### #1 — Fix all outdated metadata immediately

**Impact: HIGH | Effort: LOW (15 minutes)**

Update the page `<title>`, `<meta name="description">`, and Schema.org `jobTitle`/`worksFor` to reflect the current role at The Tech Collective / Implement Consulting Group. This is actively harming search discoverability right now and creates an immediate credibility gap for anyone who finds the site via Google and sees "Senior Data Scientist at Stibo Systems."

Suggested title: *"Simon Amtoft Pedersen — Senior Consultant, Data & AI | amtoft.dev"*  
Suggested description: *"Senior Consultant in Data & AI at The Tech Collective (Implement Consulting Group). I help organisations move from data ambition to AI in production — from problem framing through delivery and scale."*

---

### #2 — Add a hero tagline and a single CTA button

**Impact: HIGH | Effort: MEDIUM**

The hero currently wastes a full viewport. Replace the static credential line with a 1–2 sentence value proposition that speaks directly to a potential client. Add one CTA button. The copy already exists — it's the first line of the About section. Move it up.

Draft:  

> *"I help organisations move from 'we have data' to AI that actually works in production."*  
> **[Let's talk →]** (scrolls to Contact)

This is the single highest-leverage change for converting a first-time visitor.

---

### #3 — Write the Tech Collective timeline entry

**Impact: HIGH | Effort: LOW (30 minutes)**

The most recent and most important career entry is completely blank. Write 3–5 sentences describing the current role: the type of work, the kind of clients, the scope of delivery, and what makes The Tech Collective / Implement Consulting Group a distinctive context for AI work. This is the entry a client or recruiter will read most carefully.

---

### #4 — Add at least one anonymised client outcome

**Impact: HIGH | Effort: MEDIUM**

Pick the strongest project from the existing modals — the Taxonomy Classification project at Stibo Systems is a strong candidate (Fortune 500 client, production-integrated since January 2024, measurable workflow improvement) — and rewrite it as a brief case study with a business result. Even a single outcome metric ("reduced manual categorisation effort by ~60%", or "time-to-onboard a new product supplier reduced from 3 weeks to 4 days") transforms a technical description into a credibility proof. Surface this prominently — either as a dedicated "Case Study" section between Services and Background, or as a highlighted card within Services.

---

### #5 — Restructure the Background section

**Impact: MEDIUM | Effort: MEDIUM**

Four specific changes:

1. **Add a visible H2 heading** — "Background" currently has no rendered heading. Every other section has one. Add it.
2. **Reverse chronological order** — Most recent role should appear first. Clients should see The Tech Collective immediately, not after scrolling past undergraduate coursework.
3. **Collapse or remove the BSc and Exchange Semester entries' coursework tables** — Remove the 23-course BSc table and the 17-course MSc table from the modals, or replace them with a 4–5 item highlight list of the most relevant courses only.
4. **Fix the "Click to view details" discoverability** — Either give all timeline items a clickable modal (so the affordance is consistent), or visually differentiate clickable vs non-clickable items so visitors aren't confused by dead clicks on non-interactive entries.