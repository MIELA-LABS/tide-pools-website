# Tide Pools: Landing Page (Preview Build)

## Goal (work backward from this)
A single-page, responsive, modern landing site for **Tide Pools**, a residential pool cleaning company.
A visitor should be able to answer these three questions within 10 seconds:
1. **Who are they, and can I trust them?**
2. **Do they serve my area?**
3. **How do I get a quote?** (call, or submit the form)

This is a **preview build** for the owner (Jack) to review. Company facts, contact info, services, certifications and
service areas are **REAL** (see "Real business facts"). Only **reviews, prices, photos and the rating** are mock; Jack is
sending real pricing and photos. Every mock item must be easy to find and replace (see "Mock content rules").

Deployment path:
- **Preview:** GitHub repo → GitHub Pages link sent to Jack
- **Production:** domain `tidepoolsllc.com` stays with Jack's existing **Bluehost** account (no registrar or credential change).
  The current site is a Google Sites page. Two production options, decided later:
  (a) Bluehost has an active web hosting plan → upload files to `public_html/`, use `contact.php`;
  (b) Bluehost holds only the domain → point DNS at GitHub Pages (custom domain + HTTPS), keep Web3Forms.
  The site must work unchanged in both cases.

## Real business facts (confirmed by owner, NOT mock, do not tag `// MOCK`)
- **Business name:** Tide Pools Texas (legal: Tide Pools LLC). Brand/logo wordmark: "Tide Pools". Domain `tidepoolsllc.com`. Owner: Jack.
- **Phone:** (214) 538-9993 → `tel:+12145389993`
- **Email:** Swim@tidepoolsllc.com (form submissions go here)
- **About:** Formed in **2020**, **family owned and operated**.
- **Credentials:** Fully insured · **CPO®** certified · **RAIL** certified · **Jandy Service Pro** · **Pentair Partner**.
  Show these as text badges with simple inline-SVG icons. Do NOT use the Jandy or Pentair logos/trademarks
  (no permission yet); plain text only. MOCK_CONTENT.md: "ask Jack for official partner badge files".
- **Service areas:** University Park, North Dallas, Garland, Richardson, Plano, Allen, McKinney.
- **Services offered (11):** Weekly Pool Service, Leak Detection, Pool Remodels, Equipment Repairs, Chem-only Service,
  Green-to-Cleans, Pool School, Polaris Rebuilds, Mastic Replacement, Filter Cleaning, Automation Upgrades.
- **From the old Google Sites page (reuse in copy):** "Servicing the North DFW metroplex", "Full Service Cleanings",
  "Honest Repairs", "E-Reports with every visit", and the heading **"The Tide Pools Difference"**.

## Tech constraints
- **Pure static site: HTML + CSS + vanilla JS. No framework, no build step, no npm.**
  The folder must work when opened via GitHub Pages AND when uploaded as-is to Bluehost `public_html/`.
- Use only relative paths (`./css/styles.css`, not `/css/styles.css`) so it works under the GitHub Pages sub-path.
- One external dependency is allowed: the Google Font **Inter** (or self-host it in `assets/fonts/`).
- No jQuery, no Bootstrap, no Tailwind CDN. Use modern CSS (custom properties, grid, flex, `clamp()`, `:has()` only where safe).
- Target Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO (mobile).

## File structure
```
tide-pools/
├── index.html
├── css/
│   └── styles.css          # tokens at the top, then layout, then components
├── js/
│   ├── site-data.js        # ALL business content lives here (single source of truth)
│   └── main.js             # renders sections from site-data.js + interactions
├── assets/
│   ├── logo.svg            # for light backgrounds
│   ├── logo-dark.svg       # for dark backgrounds
│   ├── favicon.svg         # the circular wave mark only (crop from logo)
│   └── img/                # mock photos (downloaded locally, not hotlinked)
├── contact.php             # Bluehost mailer (production only, see Contact form)
├── MOCK_CONTENT.md         # checklist of every mock item to replace before launch
└── README.md
```

### Separation of concerns
- `site-data.js` exports one plain object `SITE` with sections: `company`, `hero`, `trustBadges`, `services`,
  `howItWorks`, `weeklyChecklist`, `pricing`, `gallery`, `reviews`, `serviceAreas`, `faq`, `contact`, `seo`.
- `main.js` only reads `SITE` and renders it; **no business copy hard-coded in `main.js`**.
- `index.html` contains the semantic skeleton (section landmarks, IDs, and critical above-the-fold hero markup for SEO/LCP),
  and the renderer fills lists and cards. Hero headline, company name, and phone must also exist in static HTML so the site
  is usable and indexable without JS.
- Every mock value in `site-data.js` gets a `// MOCK` comment on the same line.

## Brand
- **Name:** Tide Pools
- **Tagline:** "Crystal-clear pools, zero hassle."
- **Voice:** confident, friendly, local, no jargon.
- **Logo:** provided in `assets/logo.svg` / `assets/logo-dark.svg` (circular gradient mark + three waves + "TIDE POOLS" wordmark).

### Color tokens (blue / white / black and shades)
```css
:root {
  --ink-950: #060D1F;   /* near-black navy: dark sections, footer */
  --ink-900: #0A1A33;   /* headings on light */
  --ink-700: #33415C;   /* body text on light */
  --ink-400: #8A94A8;   /* muted text */
  --blue-700: #0B4FB8;  /* primary dark */
  --blue-600: #0B6BDE;  /* primary: buttons, links */
  --blue-400: #38BDF8;  /* accent: highlights, focus rings on dark */
  --blue-100: #E0F2FE;  /* tinted section background */
  --white:    #FFFFFF;
  --surface:  #F7FAFC;  /* off-white section background */
  --radius: 16px;
  --shadow: 0 10px 30px rgba(6, 13, 31, .10);
}
```
- Alternate section backgrounds: dark (`--ink-950`) → white → `--surface` → `--blue-100`, and so on. Hero and footer are dark.
- Primary gradient (use sparingly: hero glow, primary CTA hover): `linear-gradient(135deg, var(--blue-400), var(--blue-700))`.
- All text must meet WCAG AA contrast.

### Design direction
- Modern and premium, inspired by the dark-navy feel of poolpatrolservicesllc.com (Jack likes it), but cleaner.
- Big, confident type (Inter 800 for headings, `clamp()` fluid sizes), generous whitespace, rounded cards, soft shadows.
- Subtle motion only: fade/slide-up on scroll via `IntersectionObserver`, a slow animated SVG wave divider between hero and
  the next section. Respect `prefers-reduced-motion`.
- Mobile-first. Breakpoints: 640 / 960 / 1200px. No horizontal scroll at 360px width.

## Page sections (in order)

1. **Sticky header**: logo, nav anchors (Services, Pricing, Gallery, Reviews, Areas, FAQ, Contact), phone link,
   "Free Quote" button. Collapses to a hamburger menu under 960px (accessible: `aria-expanded`, focus trap, Esc closes).
2. **Hero** (dark): headline "Crystal-clear pools, zero hassle.", subline naming the service area, two CTAs
   (**Get a Free Quote** → #contact, **Call (214) 538-9993** → `tel:+12145389993`), a row of 3 mini trust stats
   ("Family owned since 2020", "CPO® & RAIL certified", "Fully insured"). Full-bleed pool photo with a dark gradient overlay.
3. **"The Tide Pools Difference" + credentials**: three pillars first (Full Service Cleanings, Honest Repairs,
   E-Reports with every visit), then a badge strip with the REAL credentials: Fully Insured, CPO® Certified,
   RAIL Certified, Jandy Service Pro, Pentair Partner, Family Owned Since 2020. Use simple line icons (inline SVG, no icon library).
4. **Services**: all 11 real services. Group into 3 categories so it doesn't feel like a wall of cards:
   - **Maintenance:** Weekly Pool Service, Chem-only Service, Filter Cleaning, Green-to-Cleans
   - **Repairs:** Equipment Repairs, Leak Detection, Polaris Rebuilds, Mastic Replacement
   - **Upgrades & Education:** Pool Remodels, Automation Upgrades, Pool School
   Each card: inline-SVG icon + 1-line description. Descriptions are our copy; tag them `// MOCK copy, confirm with Jack`.
   Pool School = teaching homeowners to care for their own pool (assumption, confirm). Mastic Replacement = replacing the
   flexible joint sealant between pool coping and deck. Polaris Rebuilds = rebuilding Polaris pressure-side cleaners.
5. **How it works**: 3 steps: 1) Request a free quote → 2) First deep clean → 3) Relax, we handle it weekly.
6. **What's included in a weekly visit**: checklist (skim surface, brush walls & steps, vacuum floor, empty skimmer &
   pump baskets, test & balance chemicals, inspect equipment, photo report sent after every visit).
7. **Pricing** (MOCK until Jack sends real pricing; 3 tiers, labeled "Starting at", monthly):
   - **Chem-only Service**: $99/mo
   - **Full Service Weekly**: $159/mo ← "Most Popular"
   - **Premium Care**: $219/mo (full service + filter cleans + priority repairs)
   Footnote: "Final price depends on pool size and condition. Free on-site quote."
8. **Before & After gallery**: 3–4 interactive comparison sliders (drag handle, keyboard arrows, touch support,
   `role="slider"` with aria values). Caption each ("Green-to-clean in 3 visits", and similar).
9. **Reviews**: 6 mock Google-style reviews (first name + last initial, city, 5 stars, 1–3 sentences, relative date).
   Horizontal scroll-snap carousel on mobile, 3-column grid on desktop. Show an aggregate "5.0 ★ · 48 reviews" badge.
10. **Service areas**: list of city chips + a static, stylized SVG map or a simple radius graphic (no Google Maps embed).
    "Don't see your city? Call us, we may still cover you."
11. **FAQ**: accordion using `<details>/<summary>` (6–8 Q&As: do I need to be home, contracts, what if it rains,
    pets in the yard, how do I pay, what chemicals do you use, how quickly can you start).
12. **Contact / Get a Free Quote**: form + side panel with phone, email, hours, and service-area summary.
13. **Footer** (dark): logo, short about line, contact info, nav links, social icons (placeholder `#`),
    "© {current year} Tide Pools. All rights reserved."
14. **Mobile sticky bottom bar** (< 640px only): two buttons, **Call** and **Free Quote**.

## Contact form
Fields: First name*, Last name*, Email*, Phone (optional), Address/City (optional), Service interested in (select),
Message (optional), hidden honeypot field `company_website` (reject if filled).
- Client-side validation with inline error messages (not `alert()`), accessible (`aria-invalid`, `aria-describedby`).
- Submit via `fetch`, show a loading state, then an inline success or error message. No page reload.
- **Transport is configurable** in `site-data.js`:
  ```js
  contact: {
    provider: "web3forms",              // "web3forms" for preview (GitHub Pages) | "php" for Bluehost
    web3formsKey: "YOUR_WEB3FORMS_KEY", // MOCK: create a free key at web3forms.com with Jack's email
    phpEndpoint: "./contact.php",
    toEmail: "Swim@tidepoolsllc.com"
  }
  ```
- `contact.php`: sanitize inputs, check honeypot, validate email with `filter_var`, send with PHP `mail()` to the
  configured address with a `Reply-To` header set to the visitor's email, and return JSON `{ ok: true }` or `{ ok: false, error }`.
  Add a simple rate limit (e.g., one submission per IP per 60 seconds via a temp file). Never echo raw input back.

## Mock content rules
- A small, dismissible ribbon at the very top reads **"Preview: sample content"**, controlled by
  `SITE.isPreview = true`. Setting it to `false` removes it for launch.
- Phone and email are REAL (see Real business facts). Still MOCK: reviews, rating/review count, prices, photos, service descriptions.
- **Service areas** are REAL (University Park, North Dallas, Garland, Richardson, Plano, Allen, McKinney).
- **Mock reviews:** invented first names + last initial only; no real people, no real business names.
- **Photos:** download 8–12 free-license pool photos (Unsplash or Pexels) into `assets/img/`, resize to max 1920px wide,
  export as WebP with a JPG fallback via `<picture>`, and use `loading="lazy"` except the hero. Record each photo's
  source URL in `MOCK_CONTENT.md`.
- **Before/After mock:** reuse the same clean-pool photo for both sides and generate the "before" side with a CSS filter
  (e.g., `sepia(.6) hue-rotate(40deg) saturate(1.4) brightness(.8)`) so it looks green and murky. Replace with Jack's
  real photos later.
- `MOCK_CONTENT.md` must list every mock item with its file and line/key so the pre-launch swap is a checklist.

## SEO & meta
- `<title>`: "Tide Pools Texas | Pool Service & Repair in Plano, Richardson, McKinney & North Dallas"
- Meta description, Open Graph and Twitter tags, `theme-color` = `#060D1F`, canonical `https://www.tidepoolsllc.com/`.
- JSON-LD `LocalBusiness` schema (type `HomeAndConstructionBusiness`) with real name, telephone, email, foundingDate 2020,
  areaServed (7 cities), url. Do NOT include aggregateRating until real reviews exist (fake ratings in schema violate Google policy).
- One `<h1>`, logical heading order, descriptive `alt` text on every image.

## Accessibility
- Skip-to-content link, visible focus styles (`--blue-400` ring), all interactive elements reachable by keyboard.
- Before/after slider operable by keyboard and screen reader.
- Form labels always visible (no placeholder-only labels).

## Definition of done
- [ ] Renders correctly at 360, 768, 1024, 1440px; no horizontal scroll
- [ ] Works when opened from GitHub Pages sub-path (relative paths verified)
- [ ] Form works end-to-end with Web3Forms; `contact.php` present and documented
- [ ] Lighthouse mobile ≥ 90 in all four categories
- [ ] `MOCK_CONTENT.md` complete; every mock value tagged `// MOCK`
- [ ] README covers: local preview (`python3 -m http.server`), GitHub Pages setup, Bluehost upload steps
      (File Manager or FTP → `public_html/`, switch `contact.provider` to `"php"`, set `isPreview: false`)

## Workflow for Claude Code
- Work in small, reviewable steps and commit after each: scaffold → tokens and layout → sections 1–7 → sections 8–14 →
  form → SEO/a11y pass → Lighthouse fixes → docs.
- After each visual step, serve locally and check it at mobile and desktop widths before moving on.
- Do not introduce a build tool or framework. If something seems to need one, stop and ask.
