# Handoff: Sugarpine — Home / Living-Landscape Shell

## Overview
Sugarpine (`sugarpine.ai`) is an independent AI-education and "living landscape" site. It has two jobs: explain AI to a general audience in plain language (**AI 101**), and maintain a set of regularly-updated **topic pages** ("the living landscape") that track what AI can currently do. Readers can **subscribe** to a single topic or to the whole site and get email when pages change.

This bundle is the **home/landing page + the persistent app shell** (left navigation, search, theming) plus a working **article template** used by every AI 101 and topic page. It is a fully clickable prototype: nav works, pages switch, and subscribe modals open.

## About the Design Files
The files in this bundle are **design references authored in HTML/React-via-Babel** — a prototype showing the intended look, layout, and behavior. **They are not production code to ship directly.** The task is to **recreate these designs in the target codebase** using its real environment and patterns.

Per the project vision the target stack is:
- **Next.js** (App Router) hosted on **Vercel**
- **Supabase** for database, auth, and storage
- Domain on **Cloudflare** registrar/DNS pointing to Vercel

So: rebuild these views as Next.js routes + React server/client components, drive content from Supabase (see **Content Model** below) rather than the hard-coded `sp-data.jsx`, and wire subscriptions to Supabase auth + an email provider. Keep the visual design pixel-faithful.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are all specified here and in the prototype. Recreate the UI faithfully. The one thing that is *sample* data is the page copy — realistic but meant to be refined/replaced by real content from the CMS/Supabase.

---

## Information Architecture / Routes

| Prototype view | Suggested Next.js route | Notes |
|---|---|---|
| Home / landing | `/` | Hero, "recently updated" feed, topic grid, subscribe band, YouTube band |
| AI 101 + topic pages | `/[slug]` (or `/topics/[slug]` + `/learn/[slug]`) | Single **article template** renders all of them, driven by data |
| (future) Changelog / versions | `/[slug]/history` | Vision roadmap; not in this bundle |

The prototype is a single-page app that swaps an in-memory `route.id` (`"home"` or a page id). In Next.js these become real routes. Page ids in the prototype map directly to URL slugs.

### Pages currently in the prototype (14)
**Start here (AI 101):** `what-is-ai`, `key-terms`
**Living Landscape:** `text-generation`, `image-video`, `deepfakes`, `science`, `math`, `coding`, `robotics`, `anthropic-stack`, `agent-platforms`, `frameworks`, `big-picture`, `benchmarks`

---

## Screens / Views

### 1. App Shell (persistent)
A two-pane layout: fixed **left sidebar** (268px) + scrollable **main** content area. The whole app is `position: fixed; inset: 0; display: flex`.

**Sidebar (`Sidebar` in `sp-views.jsx`)** — width **268px**, `border-right: 1px solid var(--border)`, `background: var(--bg-elev)`, full height, vertical flex:
- **Brand** (top): pine mark (SVG, see Assets) + "Sugarpine" in display serif 19px/600, with "sugarpine.ai" eyebrow below in mono 9.5px uppercase, 0.12em tracking. Clicking returns to home.
- **Search box**: rounded 9px input, `var(--bg)` fill, 1px border, placeholder "Search topics", leading "⌕" glyph. Filters the nav list live by title + blurb (case-insensitive substring).
- **Nav list** (scrollable, flex:1): grouped by `group` field — section labels ("Start here", "Living Landscape") in mono 10px uppercase 0.16em tracking, `var(--text-faint)`. Each item is a button: a **recency dot** + title. Active item: `background: var(--accent-ghost)`, text `var(--text)`, weight 600. Hover (inactive): `background: var(--bg-elev)`. Item padding `8px 10px`, radius 8px, font 13.5px.
- **Footer (bottom, pinned)**: full-width **"Subscribe to everything"** button (`var(--accent)` bg, `var(--accent-on)` text, radius 10px, 600, `white-space: nowrap`), plus a centered caption "An independent, reader-funded guide. No ads." in 11px `var(--text-faint)`.

**Recency dot (`RecencyDot`)** — 7px circle. If the page was updated within **7 days** → filled `var(--accent)` with a `0 0 0 3px var(--accent-ghost)` halo ("fresh"); otherwise `var(--text-faint)`, no halo. Optional trailing relative-time label in mono 11px.

**Responsive:** at `max-width: 880px` the sidebar collapses to width 0 and becomes an overlay (z-index 30, drop shadow) toggled by a hamburger in a sticky top bar (blurred translucent `var(--bg)`, 1px bottom border). A dim scrim (z-index 25) covers main when open. Navigating closes the overlay.

### 2. Home / Landing (`HomeView`)
Centered column, `max-width: 880px`, padding `clamp(28px,5vw,64px) clamp(20px,5vw,56px) 48px`. Sections top to bottom:

1. **Hero** — eyebrow "AN INDEPENDENT, LIVING GUIDE TO AI" (mono, accent); H1 in display serif `clamp(36px,6vw,60px)`/500, line-height 1.04, letter-spacing -0.025em, `text-wrap: balance`: "Understand AI." / "Then watch it *move.*" — the word "move." is `var(--accent)` + italic. Sub-paragraph `clamp(16px,2vw,19px)`, `var(--text-dim)`, max-width 560. Two buttons: primary **"Start with AI 101 →"** (accent fill) navigates to `what-is-ai`; secondary **"Explore the landscape"** (1px border, transparent) navigates to `text-generation`.
2. **Recently updated** — heading (display 24px/500, `white-space: nowrap`) + mono label "WHAT CHANGED" right-aligned. A list (top 4 pages by `updated` desc) of full-width rows: recency dot · title (display 17px) + blurb (13.5px, truncated) · relative-time (mono 11.5px). Row hover: `background: var(--bg-elev)`. Each row navigates to its page.
3. **The living landscape** — heading + sub. Responsive card grid `repeat(auto-fill, minmax(248px,1fr))`, gap 14. Each topic card (`var(--bg-card)`, 1px border, radius 13, padding ~18px): title (display 18px) + recency dot, blurb (13.5px, `flex:1`), footer row with "Updated <relative>" (mono 10.5px uppercase) and a **"+ Subscribe"** text button (accent) that opens the per-topic modal (stops propagation). Card hover: border → `var(--accent)`, `translateY(-2px)`.
4. **Subscribe band** — full-width panel, radius 16, `background: linear-gradient(135deg, var(--accent-ghost), var(--bg-card))`. Heading "Don't check back. Get told." + copy, and a **"Subscribe to everything"** button (accent) opening the whole-site modal.
5. **YouTube band** — eyebrow "FROM THE CHANNEL", heading "Watch the explanations", then a lite **YouTube embed** (see Interactions).
6. **Living footer** — top border; mono "LIVING DOCUMENT · REVISIT OFTEN" left, "© 2026 Sugarpine" right.

### 3. Article template (`ArticleView`) — used by AI 101 + every topic
Centered column, `max-width: 740px`. Order:
1. **"← Home"** back link (mono 11.5px uppercase, `white-space: nowrap`).
2. **Eyebrow** = page `kicker` (mono, accent), e.g. "LIVING LANDSCAPE · ECOSYSTEM".
3. **H1** = page title, display `clamp(32px,5vw,48px)`/500, balance.
4. **Meta row** (border-bottom): recency dot + "Updated <Month D, YYYY>" (mono 12px) + "· N min read"; right side a **"Subscribe to this page"** button (1px accent border, `var(--accent-ghost)` fill, accent text).
5. **Lede** — display serif `clamp(18px,2.4vw,22px)`/1.5, `var(--text)`.
6. **Sections** (optional `sections[]`) — each: H2 display 22px/600 + body paragraph 16.5px/1.72 `var(--text-dim)`.
7. **Card grid** (optional `cards[]`) — eyebrow = `cardsHeading` (default "In detail"), then `repeat(auto-fill, minmax(260px,1fr))` grid, gap 14. Each card (`var(--bg-card)`, 1px border, radius 13, padding ~20px): title (display 17.5px/600), body (14px/1.62 `var(--text-dim)`, `flex:1`), then a top-bordered **note** in display *italic* 13.5px `var(--accent)`. Card hover: border → accent. **Some pages are sections-only, some cards-only, some both — both fields are optional; guard for missing arrays.**
8. **YouTube** (optional `youtube{id,title}`) — eyebrow "WATCH" + lite embed.
9. **Subscribe nudge** — bordered `var(--bg-elev)` strip: "This page is maintained. Get an email when it changes." + Subscribe button.
10. **Related** (optional `related[]` of page ids) — eyebrow "RELATED" + grid of small cards (title + "Updated <relative>"), each navigating to that page.
11. **Living footer**.

### 4. Subscribe modal (`SubscribeModal`)
Fixed overlay, `background: color-mix(in srgb, var(--bg) 62%, transparent)`, `backdrop-filter: blur(6px)`, grid-centered. Card: `min(460px,100%)`, `var(--bg-card)`, 1px border, radius 16, padding ~30px, big soft shadow. Close "×" top-right.
- **Two modes** by whether a `target` page is passed: whole-site ("Subscribe to all of Sugarpine") vs single ("Subscribe to <title>"). Eyebrow reads "FULL SITE" or "SINGLE TOPIC".
- Email input (validated by `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`), a 2-option frequency segmented control ("As it happens" / "Weekly digest"), and a **Subscribe** button **disabled until the email is valid**.
- On submit → success state: pine mark in an accent-ghost circle, "You're subscribed.", confirmation line naming the email + cadence + scope, and a "Done" button.
- **Esc** closes; clicking the backdrop closes; clicking the card does not (stopPropagation). Input autofocuses on open.
- ⚠️ Do **not** gate modal visibility on a CSS entrance animation — an opacity keyframe caused an invisible-modal bug under non-painting conditions; the prototype has it removed. Animate transform/opacity only with `animation-fill-mode: forwards` or via JS state if you re-add motion.

---

## Interactions & Behavior
- **Navigation**: clicking nav items, hero buttons, feed rows, topic cards, and related cards changes the route and resets main scroll to top (`scrollRef.current.scrollTop = 0` — **never** `scrollIntoView`). In Next.js use `<Link>` / `router.push` and real routes.
- **Search**: live client-side filter of the nav list by title + blurb. With Supabase you may keep this client-side over a fetched index, or add full-text search later.
- **Subscribe**: opens modal; submit currently just shows a success state. Real impl: write `{email, scope, frequency}` to Supabase and trigger a confirmation email (double opt-in recommended).
- **YouTube lite embed (`YouTubeEmbed`)**: shows `https://i.ytimg.com/vi/<id>/hqdefault.jpg` thumbnail with a gradient fallback, an accent play button, and a title overlay; on click swaps in a `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0` iframe. Keeps the page light until the user opts in.
- **Hover states**: nav items, rows, and all cards have explicit hover treatments (see screens).
- **Theming (Tweaks)**: the prototype exposes a Tweaks panel (theme/accent/font). This is a *design-exploration* device, **not a required product feature** — pick the chosen defaults (Evergreen Dark / gold / Spectral) as the shipping theme unless you want a real light/dark toggle.

## State Management
Prototype state (all client-side):
- `route` `{ id }` — current view → becomes URL routing in Next.js.
- `modal` `{ open, target }` — subscribe modal.
- `narrow` / `collapsed` — responsive sidebar (driven by `matchMedia('(max-width: 880px)')`).
- Tweak values `{ theme, accent, font }` — persisted via the prototype's tweak host; drop or replace with a normal theme mechanism.
- Modal-local: `email`, `freq`, `done`.

Real data-fetching: pages, their `updated` timestamps, sections/cards, related ids, and YouTube refs should come from Supabase. The "recently updated" feed = pages ordered by `updated` desc, limit 4. Recency "fresh" = updated within 7 days.

---

## Content Model (suggested Supabase schema)
Mirrors the shape in `sp-data.jsx`:

```
pages
  id            text  primary key   -- slug, e.g. "anthropic-stack"
  group         text                -- "Start here" | "Living Landscape"
  title         text
  kicker        text                -- eyebrow label
  blurb         text                -- one-line summary (nav + cards + feed)
  lede          text                -- opening display paragraph
  read_mins     int
  cards_heading text  null          -- eyebrow above card grid
  youtube_id    text  null
  youtube_title text  null
  updated_at    timestamptz         -- drives recency dots + feed ordering
  created_at    timestamptz

page_sections        (ordered prose blocks)
  page_id  fk -> pages.id
  position int
  heading  text
  body     text

page_cards           (ordered "consumable" cards)
  page_id  fk -> pages.id
  position int
  title    text
  body     text
  note     text                     -- the italic accent takeaway

page_related         (page ↔ page)
  page_id     fk
  related_id  fk

subscriptions
  id          uuid
  email       text
  scope       text                  -- "all" | page_id
  frequency   text                  -- "instant" | "weekly"
  status      text                  -- "pending" | "confirmed" | "unsubscribed"
  created_at  timestamptz
```
A page is "AI 101" if `group = 'Start here'`, otherwise a living-landscape topic. `updated_at` is the single source of truth for the prominent "last updated" date and the recency indicators.

---

## Design Tokens

### Colors — Evergreen Dark (shipping default)
```
--bg          #0e0e0c
--bg-elev     #15150f
--bg-card     #17170f
--border      #2c2a22
--text        #efe9dd
--text-dim    #b1aa9a
--text-faint  #787264
```
### Colors — Paper (optional light theme)
```
--bg #f6f2e9   --bg-elev #efeadd   --bg-card #fffdf8
--border #e2dac9   --text #211f18   --text-dim #565247   --text-faint #928c7c
```
### Accent (default = Gold)
```
Gold  accent #c9a96e  on #1c1405      (default)
Pine  accent #43856a  on #ffffff
Clay  accent #bb6a49  on #ffffff
--accent-ghost = color-mix(in srgb, <accent> 14%, transparent)
```
`--accent-on` is the text/foreground color used on top of an accent fill.

### Typography
- **Display (headlines, ledes, card titles, notes-italic):** `Spectral` (Google) — default. Alternatives wired in prototype: `Newsreader`, `Georgia`.
- **UI / body:** `IBM Plex Sans`, fallback `system-ui, sans-serif`.
- **Mono (eyebrows, dates, labels):** `IBM Plex Mono`, fallback `ui-monospace, monospace`.
- Eyebrows: mono, ~11.5px, `letter-spacing: 0.18em`, uppercase, accent color.
- Headlines use negative tracking (-0.01 to -0.025em) and `text-wrap: balance`; body uses `text-wrap: pretty`.

Google Fonts import used:
`Spectral` (400,500,600 + italic 400/500), `Newsreader` (400,500,600 + italic 400), `IBM Plex Sans` (400,500,600), `IBM Plex Mono` (400,500).

### Radius / spacing / shadow
- Radii: inputs/buttons 9–11px, cards 13px, panels/modal 16px, dots 99px.
- Card padding ~18–20px; content column max-widths: home 880px, article 740px, modal 460px.
- Modal shadow: `0 30px 80px -20px rgba(0,0,0,.6)`.
- Sidebar width 268px; mobile breakpoint 880px; hit targets ≥ 36px.

---

## Assets
- **Pine mark** — inline SVG (`PineMark` in `sp-ui.jsx`): three stacked triangles + a small trunk rect, filled with `currentColor`/`var(--accent)`. 48×48 viewBox, rendered at 20–30px. No external image. Recreate as a small React component / SVG.
- **YouTube thumbnails** — fetched from `i.ytimg.com` at runtime (sample video ids `aircAruvnKk`, `Qnz3Pj3W9JU` are placeholders — swap for real channel videos).
- No other raster assets. No icon library is used (the "⌕", "×", "▶", "☰", "←" are plain glyphs — swap for your icon set if desired).

## Files in this bundle
- `Sugarpine.html` — entry; loads React 18 + Babel + Google Fonts, defines theme CSS variables and base styles, mounts the app.
- `sp-data.jsx` — all sample content + helpers (`fmtDate`, `relTime`, `daysAgo`, recency feed). **This is the data that should move to Supabase.**
- `sp-ui.jsx` — primitives: `PineMark`, `Eyebrow`, `RecencyDot`, `SubscribeModal`, `YouTubeEmbed`.
- `sp-views.jsx` — `Sidebar`, `HomeView`, `ArticleView`, `LivingFooter`.
- `sp-app.jsx` — controller: routing, responsive sidebar, theme/accent/font tokens (`ACCENTS`, `FONTS`, `THEME_VARS`, `buildVars`), Tweaks wiring, mount.
- `tweaks-panel.jsx` — design-exploration tweak shell (NOT needed in production).
- `screenshots/` — reference captures: `01-home`, `02-article-cards` (Anthropic Stack), `03-article-prose` (Coding: sections + cards), `04-subscribe-modal`, `05-paper-theme` (alt light theme).

## Out of scope for this bundle (vision roadmap)
Build later, but design with them in mind: per-topic + whole-site **email delivery**, **changelog/version history** per page (the "living document" angle), capability/benchmark **progress charts**, a **predictions tracker**, and the **autonomous content agent** that gathers AI news and proposes page updates. A future "link back to the consulting site" hook lives near the sidebar footer copy — currently neutral.
