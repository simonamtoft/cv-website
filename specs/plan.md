# Test Plan: amtoft.dev Professional Hub

**Seed:** `tests/seed.spec.ts`
**Base URL:** `http://localhost:3000`

---

## 1. Page Load & Structure

### 1.1 Page loads without errors
**Steps:**
1. Navigate to `/`
2. Verify the page title contains "Simon Amtoft Pedersen"
3. Verify no console errors on load

**Success criteria:** Page renders, correct title present, no JS errors.

### 1.2 All main sections are present
**Steps:**
1. Navigate to `/`
2. Verify a section with id `about` is present
3. Verify a section with id `services` is present
4. Verify a section with id `timeline` is present
5. Verify a section with id `publications-events` is present
6. Verify a section with id `contact` is present

**Success criteria:** All 5 section anchors exist in the DOM.

---

## 2. Header & Navigation

### 2.1 Hero header renders correct name and title
**Steps:**
1. Navigate to `/`
2. Verify the header displays "Simon Amtoft Pedersen"
3. Verify the header displays "Senior Consultant, Data & AI"

**Success criteria:** Name and current title are visible in the hero.

### 2.2 Navigation contains correct labels
**Steps:**
1. Navigate to `/`
2. Verify nav contains link labelled "About"
3. Verify nav contains link labelled "Services"
4. Verify nav contains link labelled "Background"
5. Verify nav contains link labelled "Writing & Talks"
6. Verify nav contains link labelled "Contact"
7. Verify nav does NOT contain a link labelled "Resume"
8. Verify nav does NOT contain a link labelled "Publications & Events"

**Success criteria:** Nav reflects new professional hub labels; old CV labels absent.

### 2.3 Navigation links scroll to correct sections
**Steps:**
1. Navigate to `/`
2. Click the "About" nav link
3. Verify the `#about` section is in view
4. Click the "Services" nav link
5. Verify the `#services` section is in view

**Success criteria:** Anchor links navigate to the correct sections.

### 2.4 LinkedIn and GitHub links present in header
**Steps:**
1. Navigate to `/`
2. Verify a link to `linkedin.com/in/simonamtoft` is present in the header
3. Verify a link to `github.com/SimonAmtoft` is present in the header
4. Verify both links have `target="_blank"`

**Success criteria:** Social links present and open externally.

---

## 3. About Section

### 3.1 About section heading and key content
**Steps:**
1. Navigate to `/`
2. Scroll to `#about`
3. Verify heading reads "About" (not "About Me")
4. Verify the text contains "The Tech Collective"
5. Verify the text contains "Implement Consulting Group"
6. Verify the text does not contain "Senior AI Engineer" (old incorrect title)
7. Verify the text does not contain "Senior Data Scientist" (old incorrect title)

**Success criteria:** About section uses correct framing and current title.

### 3.2 Profile picture present
**Steps:**
1. Navigate to `/`
2. Scroll to `#about`
3. Verify an `img` with class `profile-picture` is present and has a non-empty `src`

**Success criteria:** Profile image renders.

---

## 4. Services Section

### 4.1 Services section heading and intro
**Steps:**
1. Navigate to `/`
2. Scroll to `#services`
3. Verify heading reads "Services"
4. Verify an intro paragraph is present

**Success criteria:** Services section renders with heading and intro text.

### 4.2 All five service cards are present
**Steps:**
1. Navigate to `/`
2. Scroll to `#services`
3. Verify a card with title "Machine Learning & Predictive Modelling" is present
4. Verify a card with title "Generative AI & Agentic Systems" is present
5. Verify a card with title "MLOps & AI Engineering" is present
6. Verify a card with title "AI Solution Design & Delivery" is present
7. Verify a card with title "Data Strategy & Advisory" is present

**Success criteria:** All 5 service cards render with correct titles.

### 4.3 Each service card has an icon, summary, and detail bullets
**Steps:**
1. Navigate to `/`
2. Scroll to `#services`
3. For the first service card, verify a FontAwesome icon (`i.fas`) is present
4. Verify the card has a summary paragraph
5. Verify the card has a `ul` with at least one `li`

**Success criteria:** Service card anatomy is complete.

---

## 5. Background (Timeline) Section

### 5.1 Timeline renders with job titles inline
**Steps:**
1. Navigate to `/`
2. Scroll to `#timeline`
3. Verify a `.timeline-job-title` element containing "Senior Consultant, Data & AI" is present
4. Verify a `.timeline-job-title` element containing "Senior Data Scientist" is present
5. Verify a `.timeline-org-name` element containing "Stibo Systems" is present

**Success criteria:** Job titles and org names are visible inline on timeline cards (not only in modal).

### 5.2 Category badges are present
**Steps:**
1. Navigate to `/`
2. Scroll to `#timeline`
3. Verify at least one `.category-work` badge is present
4. Verify at least one `.category-education` badge is present
5. Verify at least one `.category-community` badge is present

**Success criteria:** All three category types are represented with badges.

### 5.3 Clickable timeline items open modal
**Steps:**
1. Navigate to `/`
2. Scroll to `#timeline`
3. Find a `.timeline-item.has-details` element
4. Click it
5. Verify a `.modal-backdrop` appears
6. Verify the modal contains a heading
7. Press Escape
8. Verify the modal is no longer visible

**Success criteria:** Modal opens on click and closes on Escape.

### 5.4 Modal close button works
**Steps:**
1. Navigate to `/`
2. Scroll to `#timeline`
3. Click a `.timeline-item.has-details`
4. Verify `.modal-backdrop` is visible
5. Click the `.modal-close` button
6. Verify `.modal-backdrop` is no longer visible

**Success criteria:** Modal closes via the close button.

### 5.5 Project tech tags use orange colour system (not blue)
**Steps:**
1. Navigate to `/`
2. Click a work experience timeline item with projects
3. Verify `.tech-tag` elements are present in the modal
4. Verify `.tech-tag` does not have `color: rgb(25, 118, 210)` (the old blue `#1976d2`)

**Success criteria:** Tech tags use the orange design system, not the legacy blue.

---

## 6. Writing & Talks Section

### 6.1 Section heading reads "Writing & Talks"
**Steps:**
1. Navigate to `/`
2. Scroll to `#publications-events`
3. Verify the `h2` reads "Writing & Talks"
4. Verify it does NOT read "Publications & Events"

**Success criteria:** Section has been correctly renamed.

### 6.2 Article and conference cards are present
**Steps:**
1. Navigate to `/`
2. Scroll to `#publications-events`
3. Verify at least one `.work-card-article` is present
4. Verify at least one `.work-card-conference` is present

**Success criteria:** Both content types render.

### 6.3 Cards link to external URLs
**Steps:**
1. Navigate to `/`
2. Scroll to `#publications-events`
3. For each `.work-card`, verify the `href` attribute starts with "https://"
4. Verify each card has `target="_blank"`

**Success criteria:** All cards are correctly linked externally.

---

## 7. Contact Section

### 7.1 Contact section heading reads "Let's Talk"
**Steps:**
1. Navigate to `/`
2. Scroll to `#contact`
3. Verify the `h2` reads "Let's Talk"
4. Verify it does NOT read "Reach Out!"

**Success criteria:** Contact section uses new CTA heading.

### 7.2 Contact links are present and correct
**Steps:**
1. Navigate to `/`
2. Scroll to `#contact`
3. Verify a `mailto:simon@amtoft.dev` link is present
4. Verify a link to `linkedin.com/in/simonamtoft` is present

**Success criteria:** Both contact methods are accessible.

---

## 8. Responsive Design

### 8.1 Mobile viewport renders without horizontal overflow
**Steps:**
1. Set viewport to 375x812 (iPhone)
2. Navigate to `/`
3. Verify `document.body.scrollWidth` equals `window.innerWidth` (no horizontal scroll)
4. Verify the nav links are visible

**Success criteria:** No horizontal overflow on mobile.

### 8.2 Services grid collapses to single column on mobile
**Steps:**
1. Set viewport to 375x812
2. Navigate to `/`
3. Scroll to `#services`
4. Verify `.services-grid` has `grid-template-columns` resolving to a single column

**Success criteria:** Services grid is responsive.
