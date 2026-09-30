# Mock content checklist

Everything on this list is a **placeholder** and must be replaced or confirmed before launch.
Everything *not* on this list is a real, owner-confirmed business fact (name, phone, email, founding year,
family owned, credentials, the 11 services, the 7 service areas).

Line numbers refer to `js/site-data.js` unless another file is named. Every mock value there is tagged
`// MOCK` on the same line, so `grep -n "MOCK" js/site-data.js` lists them all.

## 1. Waiting on Jack (real data needed)

| # | Item | Where | Notes |
|---|------|-------|-------|
| 1 | **Prices**: Chem-only $99, Full Service $159, Premium $219 | `pricing.tiers[].price` (lines 174, 184, 195) | Jack is sending real pricing. Keep the "Starting at" wording if prices vary. |
| 2 | Plan descriptions and feature lists | `pricing.tiers[]` (lines 176–177, 186–187, 197–198) | Match to what each real plan includes. |
| 3 | "No long-term contracts" | `pricing.intro` (line 169), FAQ line 252 | Confirm the policy. |
| 4 | **Photos**: hero, weekly service, gallery 1–4, social preview | `assets/img/`, `hero.image` (line 64), `weeklyChecklist.image` (line 165), `gallery.items` (lines 212–215), `index.html` hero `<picture>` | Jack is sending real photos. See README → *Replacing photos* for sizes. |
| 5 | **Before/after photos** | `gallery.items[]` (lines 212–215) | The "before" side is currently the same photo with a green CSS filter. Add a real before photo per item with `before: "gallery-1-before"`. See the README. |
| 6 | Before/after captions ("Green-to-clean in 3 visits", …) | `gallery.items[].caption` (lines 212–215) | Make them match the real jobs. |
| 7 | **Reviews** (6 invented customers) | `reviews.items` (lines 224–229) | Replace with real Google reviews (first name + last initial, with permission), or link to the Google Business profile. |
| 8 | **Rating badge** "5.0 ★ · 48 reviews" | `reviews.rating` / `reviews.count` (lines 220–221) | Use the real Google numbers. Do **not** add `aggregateRating` to the JSON-LD unless the reviews are real and shown on the page. |
| 9 | Business hours (Mon–Fri 8–6, Sat by appointment) | `company.hours` (lines 32–33) | Confirm. |
| 10 | Social links (Facebook, Instagram, Nextdoor → `#`) | `company.social` (lines 36–38) | Add real URLs, or delete the entries you don't use. |
| 11 | "Within one business day" response promise | `contact.intro` (line 268), `contact.messages.success` (line 275) | Confirm the promise. |
| 12 | **Official partner badge files** (Jandy Service Pro, Pentair Partner) | `trustBadges.credentials` | Ask Jack for official partner badge files and permission to use them. Until then these stay text-only with generic icons (no logos or trademarks). |

## 2. Our copy (written for the preview; Jack should read and confirm)

| # | Item | Where |
|---|------|-------|
| 13 | Three "Tide Pools Difference" pillar descriptions | `trustBadges.pillars[].text` (lines 73, 78, 83) |
| 14 | All 11 service one-liners | `services.categories[].items[].description` (lines 104–107, 115–118, 126–128) |
| 15 | Pool School = "teaching homeowners to care for their own pool" (**assumption**) | line 128 |
| 16 | How-it-works step descriptions | `howItWorks.steps[].text` (lines 137–139) |
| 17 | Sample E-Report card (readings, note, "Plano") | `weeklyChecklist.report` (lines 157–163) |
| 18 | All 8 FAQ answers (access, contracts, rain, pets, payment, chemicals, repairs, start time) | `faq.items` (lines 251–258) |
| 19 | Contact panel line ("…never a call center") | `contact.panelText` (line 272) |

## 3. Configuration to finish before launch

| # | Item | Where | Notes |
|---|------|-------|-------|
| 20 | **Web3Forms access key** | `contact.web3formsKey` (line 264) | Create a free key at web3forms.com with **Swim@tidepoolsllc.com**. Until then the form shows a "call or email us" message. |
| 21 | Preview ribbon | `SITE.isPreview` (top of `site-data.js`) | Set to `false` at launch. You can also delete the `#preview-ribbon` block in `index.html`. |
| 22 | Social preview image URL | `index.html` `og:image` + `twitter:image` (lines 18, 25); `seo.ogImage` (line 316) | Points at the GitHub Pages preview. Switch it to `https://www.tidepoolsllc.com/assets/img/og-image.jpg` at launch. |
| 23 | Sender mailbox for `contact.php` | `contact.php` → `FROM_EMAIL` | Only for the Bluehost/PHP option. Create `website@tidepoolsllc.com` in Bluehost (or change the constant to an existing mailbox on the domain). |
| 24 | Hero `alt` text | `index.html` hero `<img>` and `hero.image.alt` | Update both when the hero photo changes. |

## 4. Photo sources (all free for commercial use; no attribution required)

Originals were downloaded, cropped and exported as WebP + JPG. Replace all of them with Jack's photos before launch.

| File(s) in `assets/img/` | Source | Photographer | License |
|---|---|---|---|
| `hero-960.*`, `hero-1920.*` | https://unsplash.com/photos/K76E3nttJFE | Marty O'Neill | Unsplash License |
| `og-image.jpg` | https://unsplash.com/photos/8iDJxbmx2Bc | @asd32123 | Unsplash License |
| `weekly-service-480.*`, `weekly-service-960.*` | https://unsplash.com/photos/z183EqFxuTw | Karl Joshua Bernal | Unsplash License (edited: a small clothing logo was painted out) |
| `gallery-1-640.*`, `gallery-1-1200.*` | https://unsplash.com/photos/pB-TsiiZdfQ | Michaela Böhm (Římáková) | Unsplash License |
| `gallery-2-640.*`, `gallery-2-1200.*` | https://unsplash.com/photos/8w1JRVzx0sw | Nick Nolan | Unsplash License |
| `gallery-3-640.*`, `gallery-3-1200.*` | https://unsplash.com/photos/RxwkISGW8ds | Zhen Yao | Unsplash License |
| `gallery-4-640.*`, `gallery-4-1200.*` | https://www.pexels.com/photo/a-modern-house-with-swimming-pool-8134745/ | Max Vakhtbovych | Pexels License |

## Pre-launch sign-off

- [ ] Items 1–12 replaced with Jack's real data
- [ ] Items 13–19 read and approved by Jack
- [ ] Items 20–24 configured
- [ ] `grep -n "MOCK" js/site-data.js` reviewed; tags removed from values that are now real
- [ ] Test form submission received at Swim@tidepoolsllc.com
