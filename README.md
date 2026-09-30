# Tide Pools Texas: landing site

A single-page site for **Tide Pools** (Tide Pools LLC), a family-owned pool cleaning and repair company
serving the North DFW metroplex. Plain HTML, CSS and vanilla JavaScript: **no framework, no build step, no npm.**

- **Preview:** https://miela-labs.github.io/tide-pools-website/
- **Production (later):** https://www.tidepoolsllc.com/ (domain stays in Jack's Bluehost account)

> This is a **preview build**. Prices, reviews, the rating, photos and some copy are placeholders.
> See **[MOCK_CONTENT.md](./MOCK_CONTENT.md)** for the full pre-launch checklist.

---

## Project structure

```
index.html          Page skeleton: header, hero, section landmarks, form markup, SEO tags + JSON-LD
css/styles.css      Tokens at the top, then base, layout, components, sections
js/site-data.js     ALL content (one SITE object). Edit this to change text, prices, reviews, etc.
js/main.js          Renders sections from SITE + interactions (menu, sliders, form). No business copy.
assets/             logo.svg, logo-dark.svg, favicon.svg, apple-touch-icon.png, fonts/, img/
contact.php         Form mailer for Bluehost (only used when contact.provider = "php")
robots.txt          Allows crawling; points to sitemap.xml
sitemap.xml         Production URL
.nojekyll           Tells GitHub Pages to serve files as-is
MOCK_CONTENT.md     Checklist of every placeholder to replace before launch
```

### Editing content

Almost everything lives in **`js/site-data.js`**. Every placeholder is tagged `// MOCK` on the same line.

`index.html` also contains a **static copy** of the hero text, company name, phone number and section headings.
That way the page is readable and indexable even without JavaScript. When JS runs, it overwrites those
elements with the values from `site-data.js`. **If you change the hero, phone or a heading, update both files.**

---

## Local preview

The JavaScript uses ES modules, so open the site through a local web server, not by double-clicking `index.html`:

```bash
cd tide-pools
python3 -m http.server 8000
# then open http://localhost:8000
```

To test `contact.php` locally you need PHP (`brew install php`):

```bash
php -S localhost:8000
```

---

## GitHub Pages (preview)

Already set up for `MIELA-LABS/tide-pools-website`: **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
Every push to `main` redeploys in about a minute. All asset paths are relative (`./css/...`), so the site works
under the `/tide-pools-website/` sub-path.

To set it up from scratch with the GitHub CLI:

```bash
gh api -X POST repos/MIELA-LABS/tide-pools-website/pages -f 'source[branch]=main' -f 'source[path]=/'
```

---

## Contact form

The form validates in the browser, then sends with `fetch` (no page reload). The transport is set in `site-data.js`:

```js
contact: {
  provider: "web3forms",              // "web3forms" (GitHub Pages / any static host) | "php" (Bluehost)
  web3formsKey: "YOUR_WEB3FORMS_KEY", // free key from web3forms.com
  phpEndpoint: "./contact.php",
  toEmail: "Swim@tidepoolsllc.com",
}
```

### Web3Forms (preview, and production option B)

1. Go to https://web3forms.com, enter **Swim@tidepoolsllc.com** and create an access key. The key arrives by email.
2. Paste it into `contact.web3formsKey` and push.
3. Submit a test request and confirm it arrives in the Swim@ inbox.

The access key is meant to be public (it only allows sending *to* that inbox). Until a key is set, the form shows
a friendly "call or email us" message instead of failing silently.

### PHP / Bluehost (production option A)

`contact.php` accepts POST only, checks the `company_website` honeypot, validates the email with `filter_var`,
strips control characters and line breaks from header fields, rate-limits each IP to one submission per 60 seconds,
and sends with PHP `mail()` with `Reply-To` set to the visitor. It returns JSON: `{ "ok": true }` or
`{ "ok": false, "error": "..." }`. It never echoes user input back.

Before using it, open `contact.php` and set `FROM_EMAIL` to a real mailbox on the domain
(e.g. create `website@tidepoolsllc.com` in Bluehost → Email). Mail sent "from" another domain is often marked as spam.

---

## Going live

The domain `tidepoolsllc.com` stays in Jack's **Bluehost** account either way. It currently points at a Google Sites page.

### Before either option

- [ ] Work through **MOCK_CONTENT.md** (real prices, photos, reviews, hours, social links)
- [ ] In `js/site-data.js`, set **`isPreview: false`** (removes the "Preview: sample content" ribbon)
- [ ] In `index.html`, change `og:image` and `twitter:image` to `https://www.tidepoolsllc.com/assets/img/og-image.jpg`

### Option A: Bluehost has an active web hosting plan

1. In `js/site-data.js`, set **`contact.provider: "php"`**.
2. In `contact.php`, set `FROM_EMAIL` (see above).
3. Log in to Bluehost → **Hosting → File Manager** (or connect by FTP/SFTP with the credentials under *FTP Accounts*).
4. Open **`public_html/`**. Back up and remove anything already there that belongs to the old site.
5. Upload these files and folders, keeping the structure:
   `index.html`, `contact.php`, `robots.txt`, `sitemap.xml`, `css/`, `js/`, `assets/`
   (you don't need to upload `.git`, `README.md`, `MOCK_CONTENT.md` or `CLAUDE.md`).
6. Point the domain at the Bluehost hosting if it currently goes to Google Sites: in Bluehost **Domains → DNS**, remove the
   Google Sites records (usually `www` CNAME → `ghs.googlehosted.com`) and use Bluehost's default hosting records.
7. Enable the free SSL certificate (**Security → SSL**) and turn on *Force HTTPS*.
8. Visit https://www.tidepoolsllc.com, submit a test quote and confirm it arrives in Swim@tidepoolsllc.com.

### Option B: Bluehost only holds the domain → serve from GitHub Pages

Keep `contact.provider: "web3forms"` with a real key.

1. In the repo, **Settings → Pages → Custom domain**: enter `www.tidepoolsllc.com` and save. GitHub commits a `CNAME` file.
2. Recommended: verify the domain for the organization (**MIELA-LABS → Settings → Pages → Verified domains**)
   so nobody else can claim it on GitHub.
3. In Bluehost **Domains → DNS** for `tidepoolsllc.com`:
   - remove the Google Sites records,
   - `www` **CNAME** → `miela-labs.github.io`
   - apex `@` **A** records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (optional **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
4. Wait for DNS to propagate (minutes to a few hours), then tick **Enforce HTTPS** in Settings → Pages.
5. Submit a test quote.

No registrar change and no credential change is needed for either option.

---

## Replacing photos

Photos live in `assets/img/` as `{name}-{width}.webp` plus a `.jpg` fallback of the same size. Export each photo at
these sizes and **crop it to the same aspect ratio**:

| Slot | Files | Sizes | Aspect |
|------|-------|-------|--------|
| Hero | `hero-960`, `hero-1920` | 960×640, 1920×1280 | 3:2 |
| Weekly service | `weekly-service-480`, `weekly-service-960` | 480×600, 960×1200 | 4:5 |
| Gallery 1–4 | `gallery-N-640`, `gallery-N-1200` | 640×480, 1200×900 | 4:3 |
| Social preview | `og-image.jpg` | 1200×630 | 1.91:1 |

Any image tool works (Squoosh at https://squoosh.app is free and runs in the browser). Aim for about 60–75 quality for
WebP and 70–80 for JPG. Update the `alt` text in `site-data.js` (and for the hero, also in `index.html`).

**Real before/after photos:** export the "before" shot with the same name plus `-before`
(e.g. `gallery-1-before-640.webp`, `gallery-1-before-1200.webp` and the `.jpg`s), then add `before` to the item:

```js
{ image: { base: "gallery-1", alt: "..." }, before: "gallery-1-before", caption: "Green-to-clean in 3 visits" }
```

When `before` is set, the green CSS filter is switched off automatically.

---

## Quality notes

- **Lighthouse (mobile, live GitHub Pages):** Performance 98–100 (varies run to run) · Accessibility 100 · Best Practices 100 · SEO 100.
- Checked at 360, 768, 1024 and 1440px with no horizontal scroll.
- Keyboard: skip link, visible focus rings, accessible mobile menu (focus trap, Esc to close), before/after sliders
  operable with arrow keys, Home and End (`role="slider"` with aria values).
- Motion is limited to fades, slide-ups, the hero wave and the map pulse, and all of it is disabled for `prefers-reduced-motion`.
- JSON-LD `HomeAndConstructionBusiness` with the real business facts. It deliberately has **no `aggregateRating`**
  until real reviews exist (fake ratings in schema violate Google's policy).

## Credits

- Font: [Inter](https://rsms.me/inter/), self-hosted, SIL Open Font License (`assets/fonts/OFL.txt`).
- Placeholder photos: Unsplash and Pexels (free licenses). Sources are listed in `MOCK_CONTENT.md`.
- Icons: simple inline SVG line icons drawn for this site. Partner brands appear as plain text only.
