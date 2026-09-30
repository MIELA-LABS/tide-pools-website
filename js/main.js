/**
 * Tide Pools: renderer + interactions.
 * Reads everything from SITE (js/site-data.js). No business copy lives here.
 */
import { SITE } from "./site-data.js";

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

/** Read a dotted path from SITE, e.g. "company.phoneDisplay". */
const get = (path) => path.split(".").reduce((obj, key) => obj?.[key], SITE);

/** Fill {placeholders} in a string. */
const fmt = (str, vars = {}) => String(str).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
const companyVars = () => ({ phone: SITE.company.phoneDisplay, email: SITE.company.email });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Icons (inline SVG, 24×24 line icons) ---------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
  certificate: '<circle cx="12" cy="9" r="6"/><path d="m9 14.2-1.5 6.8L12 18.5l4.5 2.5L15 14.2"/><path d="m9.5 9 1.8 1.8 3.3-3.3"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z"/><path d="m8.8 12 2.2 2.2 4.3-4.4"/>',
  badge: '<path d="m12 2.8 2.4 2.2 3.2-.4.6 3.2 2.8 1.6-1.4 2.9 1.4 2.9-2.8 1.6-.6 3.2-3.2-.4-2.4 2.2-2.4-2.2-3.2.4-.6-3.2L3 14.6l1.4-2.9L3 8.8l2.8-1.6.6-3.2 3.2.4Z"/><path d="m9 12 2 2 4-4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3 3 0 0 1 3.6-.5l.5.3a2 2 0 0 0 1.5.2L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
  sparkle: '<path d="M11 3c.6 4.2 2.1 6.3 6 7-3.9.7-5.4 2.8-6 7-.6-4.2-2.1-6.3-6-7 3.9-.7 5.4-2.8 6-7Z"/><path d="M18.5 14.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9Z"/>',
  report: '<rect x="5" y="3.5" width="14" height="17.5" rx="2"/><path d="M9 2.5h6v3H9z"/><path d="M8.5 10.5h7M8.5 14h7M8.5 17.5h4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
  flask: '<path d="M9 3h6M10 3v6.2L4.6 18.4A1.7 1.7 0 0 0 6.1 21h11.8a1.7 1.7 0 0 0 1.5-2.6L14 9.2V3"/><path d="M7 15h10"/>',
  filter: '<rect x="6" y="3" width="12" height="18" rx="3"/><path d="M6 7.5h12M6 16.5h12M10 7.5v9M14 7.5v9"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-15-.5 10-6.5 15-14 15"/><path d="M5 19c3-4 6-6.5 9-8"/>',
  tool: '<circle cx="9" cy="13" r="6"/><circle cx="9" cy="13" r="2"/><path d="M15 13h4a2 2 0 0 0 2-2V8M9 7V4h6"/>',
  drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
  cleaner: '<path d="M4 15a8 8 0 0 1 16 0v1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16Z"/><circle cx="8" cy="19.5" r="1.5"/><circle cx="16" cy="19.5" r="1.5"/><path d="M12 7V4.5A1.5 1.5 0 0 1 13.5 3H17"/>',
  seal: '<path d="M3 7.5h7v5.5H3zM14 7.5h7v5.5h-7z"/><path d="M10 10.2c1.3-1.2 2.7 1.2 4 0"/><path d="M3 17h18"/>',
  remodel: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><path d="m14 20 6-6M17 14h3v3"/>',
  "phone-app": '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M9.2 9.2a4 4 0 0 1 5.6 0M10.6 11a1.6 1.6 0 0 1 2.8 0"/>',
  school: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5Z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11"/><path d="M21.5 9v5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  phone: '<path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  "arrow-both": '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  nextdoor: '<path d="M3 11 12 4l9 7"/><path d="M6 9.5V20h4.5v-5.5h3V20H18V9.5"/>',
};
const FILLED_ICONS = {
  star: '<path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8Z"/>',
  facebook: '<path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.6 1.6-1.6h1.7V3.9a22 22 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.3v2.3H7.4v3.2h2.8v8Z"/>',
};

function icon(name, className = "icon") {
  if (FILLED_ICONS[name]) {
    return `<svg class="${className}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${FILLED_ICONS[name]}</svg>`;
  }
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

/* ---------- Data binding (static HTML fallbacks ← SITE) ---------- */
function bindData() {
  $$("[data-bind]").forEach((el) => {
    const value = get(el.dataset.bind);
    if (value != null) el.textContent = value;
  });
  $$("[data-bind-href]").forEach((el) => {
    const value = get(el.dataset.bindHref);
    if (value != null) el.setAttribute("href", value);
  });
  $$("[data-bind-alt]").forEach((el) => {
    const value = get(el.dataset.bindAlt);
    if (value != null) el.setAttribute("alt", value);
  });
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/** Fill a [data-render] container. */
function render(name, html) {
  const el = $(`[data-render="${name}"]`);
  if (el) el.innerHTML = html;
  return el;
}

/* ---------- Preview ribbon ---------- */
const RIBBON_KEY = "tp-preview-ribbon-dismissed";

function initRibbon() {
  const ribbon = $("#preview-ribbon");
  if (!ribbon) return;
  if (!SITE.isPreview) { ribbon.remove(); return; }

  ribbon.insertAdjacentHTML("beforeend",
    `<button type="button" class="preview-ribbon-close" aria-label="${esc(SITE.ui.dismissRibbon)}">${icon("close")}</button>`);
  $(".preview-ribbon-close", ribbon).addEventListener("click", () => {
    ribbon.hidden = true;
    try { sessionStorage.setItem(RIBBON_KEY, "1"); } catch { /* storage blocked */ }
  });
}

/* ---------- Header: sticky state + mobile menu ---------- */
function initHeader() {
  const header = $(".site-header");
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!header || !toggle || !nav) return;

  const desktop = window.matchMedia("(min-width: 960px)");
  const outside = [$("main"), $(".site-footer"), $(".mobile-bar"), $("#preview-ribbon"), $(".brand")].filter(Boolean);
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setOpen = (open, { returnFocus = true } = {}) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? SITE.ui.menuClose : SITE.ui.menuOpen);
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    outside.forEach((el) => { el.inert = open; });
    if (open) {
      nav.style.setProperty("--nav-top", `${Math.round(header.getBoundingClientRect().bottom)}px`);
      $("a", nav)?.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.setAttribute("aria-label", SITE.ui.menuOpen);
  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Close when a link is chosen.
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") && isOpen()) setOpen(false, { returnFocus: false });
  });

  // Esc closes; Tab is trapped inside toggle + menu.
  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
    if (e.key !== "Tab") return;
    const focusables = [toggle, ...$$("a, button", nav)];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  desktop.addEventListener("change", (e) => { if (e.matches && isOpen()) setOpen(false, { returnFocus: false }); });

  // Border/shade once the page scrolls.
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the nav link for the section in view.
  const links = new Map($$(".nav-list a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = links.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach((a) => a.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "true");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_, id) => { const section = document.getElementById(id); if (section) spy.observe(section); });
}

/* ---------- Images ---------- */
// Export sizes per slot (see README "Replacing photos"). Files: assets/img/{base}-{width}.webp|jpg
const IMAGE_SLOTS = {
  weekly:  { widths: [480, 960],  width: 960,  height: 1200, sizes: "(min-width: 960px) 40vw, 100vw" },
  gallery: { widths: [640, 1200], width: 1200, height: 900,  sizes: "(min-width: 960px) 50vw, 100vw" },
};

function picture(image, slotName, { eager = false } = {}) {
  const slot = IMAGE_SLOTS[slotName];
  const src = (w, ext) => `./assets/img/${image.base}-${w}.${ext}`;
  const set = (ext) => slot.widths.map((w) => `${src(w, ext)} ${w}w`).join(", ");
  return `<picture>
    <source type="image/webp" srcset="${set("webp")}" sizes="${slot.sizes}">
    <img src="${src(slot.width, "jpg")}" srcset="${set("jpg")}" sizes="${slot.sizes}"
      alt="${esc(image.alt)}" width="${slot.width}" height="${slot.height}"
      ${eager ? "" : 'loading="lazy"'} decoding="async">
  </picture>`;
}

/* ---------- Section renderers ---------- */
function renderHeroStats() {
  render("hero-stats", SITE.hero.stats
    .map((s) => `<li>${icon(s.icon)}<span>${esc(s.label)}</span></li>`)
    .join(""));
}

function renderDifference() {
  const { pillars, credentials } = SITE.trustBadges;
  render("pillars", pillars.map((p, i) => `
    <article class="pillar reveal" style="--i:${i}">
      <div class="icon-tile">${icon(p.icon)}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
    </article>`).join(""));
  render("credentials", credentials
    .map((c) => `<li class="badge">${icon(c.icon)}<span>${esc(c.label)}</span></li>`)
    .join(""));
}

function renderServices() {
  render("services", SITE.services.categories.map((cat, i) => `
    <article class="service-group reveal" style="--i:${i}" aria-labelledby="svc-${esc(cat.id)}">
      <header class="service-group-head">
        <span class="service-group-count">${String(i + 1).padStart(2, "0")}</span>
        <h3 id="svc-${esc(cat.id)}">${esc(cat.title)}</h3>
        <p>${esc(cat.blurb)}</p>
      </header>
      <ul class="service-list">
        ${cat.items.map((s) => `
          <li class="service">
            <span class="icon-tile">${icon(s.icon)}</span>
            <div>
              <h4>${esc(s.name)}</h4>
              <p>${esc(s.description)}</p>
            </div>
          </li>`).join("")}
      </ul>
    </article>`).join(""));
}

function renderSteps() {
  render("steps", SITE.howItWorks.steps.map((s, i) => `
    <li class="step reveal" style="--i:${i}">
      <span class="step-num" aria-hidden="true">${i + 1}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </li>`).join(""));
}

function renderChecklist() {
  const { items, report, image } = SITE.weeklyChecklist;
  render("checklist", items.map((item) => `
    <li><span class="check">${icon("check")}</span><span>${esc(item)}</span></li>`).join(""));

  render("weekly-media", `
    <div class="media reveal">${picture(image, "weekly")}</div>
    <aside class="report-card reveal" style="--i:2" aria-label="${esc(report.title)}">
      <div class="report-head">
        <span class="icon-tile">${icon("report")}</span>
        <div><strong>${esc(report.title)}</strong><span>${esc(report.subtitle)}</span></div>
      </div>
      <dl class="report-readings">
        ${report.readings.map((r) => `<div><dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd></div>`).join("")}
      </dl>
      <p class="report-note">${icon("check", "icon")}${esc(report.note)}</p>
    </aside>`);
}

function renderPricing() {
  const { tiers, periodLabel } = SITE.pricing;
  render("pricing", tiers.map((t, i) => `
    <article class="price-card reveal${t.featured ? " is-featured" : ""}" style="--i:${i}">
      ${t.badge ? `<p class="price-badge">${esc(t.badge)}</p>` : ""}
      <h3>${esc(t.name)}</h3>
      <p class="price-desc">${esc(t.description)}</p>
      <p class="price">
        <span class="price-prefix">${esc(t.prefix)}</span>
        <span class="price-amount">$${esc(t.price)}</span>
        <span class="price-period" aria-hidden="true">${esc(t.period)}</span>
        <span class="visually-hidden">${esc(periodLabel)}</span>
      </p>
      <ul class="price-features">
        ${t.features.map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}
      </ul>
      <a class="btn ${t.featured ? "btn-primary" : "btn-outline"} btn-block" href="#contact" data-service="${esc(t.cta.service)}">${esc(t.cta.label)}</a>
    </article>`).join(""));
}

function renderGallery() {
  const { items, beforeLabel, afterLabel } = SITE.gallery;
  render("gallery", items.map((item, i) => `
    <figure class="compare reveal" style="--i:${i % 2}">
      <div class="compare-frame">
        <div class="compare-layer compare-after">${picture(item.image, "gallery")}</div>
        <div class="compare-layer compare-before${item.before ? " is-real" : ""}" aria-hidden="true">
          ${picture({ ...item.image, ...(item.before ? { base: item.before } : {}), alt: "" }, "gallery")}
        </div>
        <span class="compare-tag compare-tag-before" aria-hidden="true">${esc(beforeLabel)}</span>
        <span class="compare-tag compare-tag-after" aria-hidden="true">${esc(afterLabel)}</span>
        <div class="compare-handle" role="slider" tabindex="0"
          aria-label="${esc(SITE.ui.sliderLabel)}: ${esc(item.caption)}"
          aria-orientation="horizontal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"
          aria-valuetext="${esc(fmt(SITE.ui.sliderValueText, { pct: 50 }))}">
          <span class="compare-knob">${icon("arrow-both")}</span>
        </div>
      </div>
      <figcaption>${icon("sparkle")}${esc(item.caption)}</figcaption>
    </figure>`).join(""));
}

function renderReviews() {
  const { rating, count, items } = SITE.reviews;
  const ratingStr = Number(rating).toFixed(1);
  const [beforeStar, afterStar] = fmt(SITE.ui.ratingText, { rating: ratingStr, count }).split("★");
  render("rating", `
    <span aria-hidden="true">${esc(beforeStar.trim())}</span>
    <span class="stars" aria-hidden="true">${icon("star")}</span>
    <span aria-hidden="true">${esc((afterStar ?? "").trim())}</span>
    <span class="visually-hidden">${esc(fmt(SITE.ui.ratingLabel, { rating: ratingStr, count }))}</span>`);

  const list = render("reviews", items.map((r) => `
    <article class="review">
      <div class="stars" role="img" aria-label="${esc(fmt(SITE.ui.starsLabel, { rating: r.rating }))}">
        ${icon("star").repeat(Math.round(r.rating))}
      </div>
      <blockquote><p>${esc(r.text)}</p></blockquote>
      <footer>
        <span class="review-avatar" aria-hidden="true">${esc(r.name.charAt(0))}</span>
        <div>
          <span class="review-name">${esc(r.name)}</span>
          <span class="review-meta">${esc(r.city)} · ${esc(r.date)}</span>
        </div>
      </footer>
    </article>`).join(""));
  if (!list) return;
  list.insertAdjacentHTML("afterend", `<p class="reviews-hint" aria-hidden="true">${esc(SITE.ui.reviewsHint)}</p>`);
  list.setAttribute("role", "region");
  list.setAttribute("aria-label", SITE.ui.reviewsLabel);

  // Scrollable carousel (mobile) must be keyboard-focusable; the grid (desktop) needn't be.
  const syncFocusable = () => {
    if (list.scrollWidth > list.clientWidth + 1) list.setAttribute("tabindex", "0");
    else list.removeAttribute("tabindex");
  };
  syncFocusable();
  window.addEventListener("resize", syncFocusable, { passive: true });
}

function renderAreas() {
  const { cities } = SITE.serviceAreas;
  render("area-chips", cities.map((c) => `<li>${icon("pin")}${esc(c.name)}</li>`).join(""));

  // Stylized map: project lat/lng into an SVG box (equirectangular, fine at this scale).
  const W = 420, H = 460, PAD_X = 130, PAD_Y = 50;
  const lats = cities.map((c) => c.lat), lngs = cities.map((c) => c.lng);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const kx = Math.cos(((minLat + maxLat) / 2) * Math.PI / 180);
  const spanX = Math.max((maxLng - minLng) * kx, 1e-6), spanY = Math.max(maxLat - minLat, 1e-6);
  const scale = Math.min((W - PAD_X * 2) / spanX, (H - PAD_Y * 2) / spanY);
  const offX = (W - spanX * scale) / 2, offY = (H - spanY * scale) / 2;
  const pts = cities.map((c) => ({
    name: c.name,
    x: offX + (c.lng - minLng) * kx * scale,
    y: offY + (maxLat - c.lat) * scale,
  }));
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;

  // Coverage zone: convex hull pushed outward, drawn with rounded corners.
  const hull = convexHull(pts).map((p) => {
    const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / d) * 34, y: p.y + (dy / d) * 34 };
  });
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const zone = hull.map((p, i) => {
    const m = mid(p, hull[(i + 1) % hull.length]);
    return `${i === 0 ? `M${mid(hull[hull.length - 1], p).x.toFixed(1)} ${mid(hull[hull.length - 1], p).y.toFixed(1)} ` : ""}Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`;
  }).join(" ") + " Z";

  const grid = [];
  for (let x = 20; x < W; x += 40) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
  for (let y = 20; y < H; y += 40) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);
  const leftEdge = offX + spanX * scale * 0.25;

  render("area-map", `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="map-title" focusable="false">
      <title id="map-title">${esc(SITE.ui.mapLabel)}</title>
      <g class="map-grid">${grid.join("")}</g>
      ${[70, 140, 210].map((r) => `<circle class="map-ring" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"/>`).join("")}
      <path class="map-zone" d="${zone}"/>
      ${pts.map((p, i) => {
        const left = p.x < leftEdge;
        return `<g>
          <circle class="map-pulse" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>
          <circle class="map-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7"/>
          <text class="map-label" x="${(p.x + (left ? -14 : 14)).toFixed(1)}" y="${(p.y + 5).toFixed(1)}" text-anchor="${left ? "end" : "start"}">${esc(p.name)}</text>
        </g>`;
      }).join("")}
      <g transform="translate(${W - 34} 34)" aria-hidden="true">
        <path class="map-compass-arrow" d="M0 -18 6 0 0 -4 -6 0Z"/>
        <text class="map-compass" x="0" y="16" text-anchor="middle">${esc(SITE.ui.mapNorth)}</text>
      </g>
    </svg>`);
}

/** Monotone-chain convex hull. */
function convexHull(points) {
  const p = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  if (p.length < 3) return p;
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [], upper = [];
  for (const pt of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0) lower.pop();
    lower.push(pt);
  }
  for (const pt of [...p].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0) upper.pop();
    upper.push(pt);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

function renderFaq() {
  render("faq", SITE.faq.items.map((f) => `
    <details class="faq-item">
      <summary><span>${esc(f.q)}</span><span class="faq-toggle" aria-hidden="true">${icon("chevron")}</span></summary>
      <div class="faq-answer"><p>${esc(f.a)}</p></div>
    </details>`).join(""));
}

function renderContactPanel() {
  const { company, contact, ui } = SITE;
  render("service-options", [
    ...SITE.services.categories.flatMap((c) => c.items.map((s) => s.name)),
    contact.otherServiceOption,
  ].map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join(""));

  render("contact-panel", `
    <h3>${esc(contact.panelTitle)}</h3>
    <p>${esc(contact.panelText)}</p>
    <ul class="contact-list">
      <li><span class="icon-tile">${icon("phone")}</span>
        <div><span class="contact-label">${esc(ui.callUs)}</span>
        <a class="contact-value" href="${esc(company.phoneHref)}">${esc(company.phoneDisplay)}</a></div></li>
      <li><span class="icon-tile">${icon("mail")}</span>
        <div><span class="contact-label">${esc(ui.emailUs)}</span>
        <a class="contact-value" href="mailto:${esc(company.email)}">${esc(company.email)}</a></div></li>
      <li><span class="icon-tile">${icon("clock")}</span>
        <div><span class="contact-label">${esc(ui.hours)}</span>
        ${company.hours.map((h) => `<span class="contact-value">${esc(h.days)}: ${esc(h.time)}</span>`).join("")}</div></li>
      <li><span class="icon-tile">${icon("pin")}</span>
        <div><span class="contact-label">${esc(ui.areas)}</span>
        <span class="contact-value">${esc(contact.serviceAreaSummary)}</span></div></li>
    </ul>
    <a class="btn btn-primary btn-block" href="${esc(company.phoneHref)}">${icon("phone")}${esc(SITE.hero.secondaryCta.label)}</a>`);
}

function renderFooter() {
  const { company, nav, ui } = SITE;
  render("footer", `
    <div class="footer-brand">
      <img src="./assets/logo-dark.svg" alt="${esc(company.brand)}" width="176" height="48" loading="lazy">
      <p>${esc(company.about)}</p>
      <ul class="socials">
        ${company.social.map((s) => `
          <li><a href="${esc(s.url)}" aria-label="${esc(fmt(ui.socialLabel, { name: s.name }))}">${icon(s.icon)}</a></li>`).join("")}
      </ul>
    </div>
    <nav aria-label="${esc(ui.footerNav)}">
      <h2 class="footer-title">${esc(ui.footerNav)}</h2>
      <ul class="footer-links">
        ${nav.map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join("")}
      </ul>
    </nav>
    <div>
      <h2 class="footer-title">${esc(ui.footerContact)}</h2>
      <ul class="footer-contact">
        <li>${icon("phone")}<a href="${esc(company.phoneHref)}">${esc(company.phoneDisplay)}</a></li>
        <li>${icon("mail")}<a href="mailto:${esc(company.email)}">${esc(company.email)}</a></li>
        <li>${icon("pin")}<span>${esc(company.region)}</span></li>
      </ul>
    </div>`);
}

/* ---------- Before/after sliders ---------- */
function initCompareSliders() {
  $$(".compare-frame").forEach((frame) => {
    const handle = $(".compare-handle", frame);
    let pos = 50;
    let dragging = false;

    const set = (value) => {
      pos = Math.min(100, Math.max(0, value));
      const rounded = Math.round(pos);
      frame.style.setProperty("--pos", `${pos}%`);
      handle.setAttribute("aria-valuenow", String(rounded));
      handle.setAttribute("aria-valuetext", fmt(SITE.ui.sliderValueText, { pct: rounded }));
    };
    const fromPointer = (e) => {
      const rect = frame.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    };

    frame.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      dragging = true;
      frame.setPointerCapture(e.pointerId);
      frame.classList.add("is-dragging");
      handle.focus({ preventScroll: true });
      set(fromPointer(e));
    });
    frame.addEventListener("pointermove", (e) => { if (dragging) set(fromPointer(e)); });
    const stop = () => { dragging = false; frame.classList.remove("is-dragging"); };
    frame.addEventListener("pointerup", stop);
    frame.addEventListener("pointercancel", stop);

    handle.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 10 : 2;
      const keys = {
        ArrowLeft: pos - step, ArrowDown: pos - step,
        ArrowRight: pos + step, ArrowUp: pos + step,
        PageDown: pos - 10, PageUp: pos + 10,
        Home: 0, End: 100,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      set(keys[e.key]);
    });
  });
}

/* Hide the mobile call/quote bar while the quote form itself is on screen. */
function initMobileBar() {
  const bar = $(".mobile-bar");
  const form = $("#quote-form");
  if (!bar || !form || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle("is-hidden", entry.isIntersecting);
  }, { threshold: 0.15 }).observe(form);
}

/* ---------- Quote form ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function initQuoteForm() {
  const form = $("#quote-form");
  if (!form) return;
  const cfg = SITE.contact;
  const msg = cfg.messages;
  const status = $("#form-status");
  const submitLabel = $(".btn-label", form);
  const idleLabel = submitLabel.textContent;

  // Field rules: return an error message or "".
  const rules = {
    first_name: (v) => (v ? "" : msg.required),
    last_name: (v) => (v ? "" : msg.required),
    email: (v) => (!v ? msg.required : EMAIL_RE.test(v) ? "" : msg.email),
    phone: (v) => {
      if (!v) return "";
      const digits = v.replace(/\D/g, "");
      return /^[\d\s()+.\-]+$/.test(v) && digits.length >= 10 && digits.length <= 15 ? "" : msg.phone;
    },
  };

  const showError = (input, error) => {
    const out = document.getElementById(`${input.id}-error`);
    input.setAttribute("aria-invalid", error ? "true" : "false");
    if (out) out.textContent = error;
  };
  const validateField = (input) => {
    const rule = rules[input.name];
    if (!rule) return true;
    const error = rule(input.value.trim());
    showError(input, error);
    return !error;
  };
  const setStatus = (type, text) => {
    status.className = `form-status${type ? ` is-${type}` : ""}`;
    status.innerHTML = text ? `${icon(type === "success" ? "check" : "close")}<span>${esc(text)}</span>` : "";
  };
  const setLoading = (loading) => {
    form.classList.toggle("is-loading", loading);
    form.setAttribute("aria-busy", String(loading));
    $("button[type=submit]", form).disabled = loading;
    submitLabel.textContent = loading ? msg.sending : idleLabel;
  };

  // Validate on blur once touched; clear errors as soon as input becomes valid.
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    input.addEventListener("blur", () => { if (input.value.trim() || input.hasAttribute("aria-invalid")) validateField(input); });
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateField(input); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", "");

    const inputs = Object.keys(rules).map((n) => form.elements[n]).filter(Boolean);
    const invalid = inputs.filter((input) => !validateField(input));
    if (invalid.length) {
      setStatus("error", msg.summary);
      invalid[0].focus();
      return;
    }

    const data = Object.fromEntries(
      [...new FormData(form).entries()].map(([k, v]) => [k, String(v).trim()])
    );

    // Honeypot filled → a bot. Pretend success, send nothing.
    if (data.company_website) {
      form.reset();
      setStatus("success", msg.success);
      return;
    }

    setLoading(true);
    try {
      await sendQuote(cfg, data);
      form.reset();
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
      setStatus("success", msg.success);
    } catch (err) {
      if (err.code !== "not-configured") console.error("[tide-pools] quote form:", err);
      const text = err.code === "not-configured" ? msg.notConfigured : err.serverMessage || msg.error;
      setStatus("error", fmt(text, companyVars()));
    } finally {
      setLoading(false);
      status.focus();
    }
  });
}

/** Send the quote request with the configured provider. Throws on failure. */
async function sendQuote(cfg, data) {
  const fail = (code, serverMessage) => Object.assign(new Error(code), { code, serverMessage });

  if (cfg.provider === "php") {
    const res = await fetch(cfg.phpEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) throw fail("php", json.error);
    return;
  }

  // Default: Web3Forms (works on static hosting such as GitHub Pages).
  // Sent as FormData so the browser makes a "simple" CORS request (no preflight).
  if (!cfg.web3formsKey || cfg.web3formsKey.startsWith("YOUR_")) throw fail("not-configured");
  const name = `${data.first_name} ${data.last_name}`;
  const body = new FormData();
  Object.entries({
    access_key: cfg.web3formsKey,
    subject: cfg.subject,
    from_name: name,
    replyto: data.email,
    name,
    email: data.email,
    phone: data.phone || "-",
    address: data.address || "-",
    service: data.service,
    message: data.message || "-",
  }).forEach(([k, v]) => body.append(k, v));
  const res = await fetch(WEB3FORMS_URL, { method: "POST", headers: { Accept: "application/json" }, body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) throw fail("web3forms");
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

/* Pricing "Get a quote" buttons preselect the service in the form. */
function initServicePrefill() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-service]");
    const select = $("#f-service");
    if (!trigger || !select) return;
    const option = [...select.options].find((o) => o.value === trigger.dataset.service);
    if (option) select.value = option.value;
  });
}

/* ---------- Boot ---------- */
function safely(fn) {
  try { fn(); } catch (err) { console.error(`[tide-pools] ${fn.name} failed:`, err); }
}

[
  bindData,
  initRibbon,
  initHeader,
  renderHeroStats,
  renderDifference,
  renderServices,
  renderSteps,
  renderChecklist,
  renderPricing,
  renderGallery,
  renderReviews,
  renderAreas,
  renderFaq,
  renderContactPanel,
  renderFooter,
  initCompareSliders,
  initMobileBar,
  initServicePrefill,
  initQuoteForm,
  initReveal, // last: observes everything rendered above
].forEach(safely);
