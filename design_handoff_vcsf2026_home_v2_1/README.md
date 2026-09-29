# Handoff: VCSF 2026 Homepage (v2.1)

## Overview
Single-page bilingual (VI/EN) homepage for the Vietnam Corporate Sustainability Forum 2026 (VCSF 2026, 05/10/2026). Target repo: https://github.com/hoangduongbui/vcsf-2026-landing-page (new, empty) — build with **React + Vite + TypeScript**: components in `src/components/`, data in `src/data/*.ts`, assets in `public/`.

## About the design files
`design/VCSF 2026 Home v2.1.dc.html` is a **design reference built in HTML** (a self-running prototype; to preview it, put it and `support.js` temporarily in the repo root next to `public/` and open it via a local server). It is NOT production code. Recreate it in React: one component per section in `src/components/`, content in `src/data/`, styles with CSS Modules + CSS variables, no UI library. Do not ship the `.dc.html` or `support.js`.

Paths in the prototype are `public/images/...`; in Vite these are served as `/images/...` and `/videos/...`.

## Fidelity
**High-fidelity.** Match colours, type, spacing, motion and responsive behaviour. Read exact values (px, gradients, shadows, copy) directly from the inline styles in the reference file — it is the source of truth; this README summarises.

## Page structure (keep this order)
Section anchors (`id`) in order — numbered headers 01–07 share one header style:
1. `#top` — Hero: KV background (video `public/videos/kv-vcsf-2026-v2.mp4`, mobile `kv-vcsf-2026-mobile-v3.mp4`, poster `KV-VCSF-2026-02.jpg` / `-mobile.jpg`), sticky header with nav + VI/EN toggle + mobile menu, title/date/venue, countdown to 2026-10-05T00:00+07:00, CTA. 6 floating icon rings (`floating-icon-01..07.png`, `vcFloat` bob animation); on mobile/portrait they are positioned by JS along an arc between text and skyline (`placeKvm()`).
2. `#live` — Live-stream block. `liveMode` = auto|on|off; auto = on between `LIVE.start`–`LIVE.end`; embeds YouTube from `liveUrl`; pulsing red LIVE dot (`vcLive`, `vcLiveW`). Before the event a "coming soon" state shows until 2026-10-08.
3. `#about` — **01 Giới thiệu chung** on a blue zone: concept visual `public/images/about-concept-2026.webp` with 7 hover hotspots (tooltip per pillar) + expandable SDG icon row (`SDGs-icon-01..17.svg`, horizontal scroll < 1200px).
4. `#history` — **02 VCSF qua các năm**: year timeline 2020–2025, autoplay (`historyAutoplay`), photo lightbox, video player per year.
5. `#speakers` — Speaker cards, accent-insensitive name search (NFD fold, đ→d), counter + prev/next arrows below cards, 2 cards/row on mobile, click → speaker modal (`vcPop`).
6. `#agenda` — Tabs per day/session, session list per locale.
7. `#library` (`#library-photos`, `#library-videos`) — photo + video library.
8. `#documents` — downloadable documents list.
9. `#partners` — 4 tiers (diamond/gold/silver/partner) with tier-gradient badges and logo sizes 260/210/170/150px wide.
10. `#contact` / footer — organiser logos (VCCI, VBCSD, VCSF), Hemera logos 32px tall.

## Interactions & behaviour
- Scroll-linked: section reveals (`vcSlide` 30px up + fade), parallax, animated curved light beams between colour zones (light → dark → light).
- Active nav item follows the section in view; nav clicks smooth-scroll with 80px header offset.
- Hover: cards lift `translateY(-8px)` + lighter glass bg; buttons `translateY(-2px)`; images `scale(1.06)`.
- `motion` = full | subtle | off — respect `prefers-reduced-motion` → off.
- Locale toggle switches all copy instantly; default `vi`.
- Breakpoints: `< 760px` mobile, `vh/vw > 0.9` portrait treatment, `< 1200px` SDG row scrolls. Check at 390 / 768 / 1280 / 1440.

## State
locale, active section, mobile menu, history year + autoplay, lightbox index, active video / playing, agenda tab, speaker search query + carousel index, open speaker, tree hotspot hover, SDG row expanded, live on/off.

## Design tokens
Colours: navy `#041463` `#000C7A` `#040F85` `#0016B4`; royal/sky `#0A4FE6` `#1FA2F2`; aqua `#5FE0F0` `#BDF6FF`; teal `#14C9A4`; leaf `#5CC83C` `#7CF0BE` `#B6F28A`; near-white `#F2FCFF` `#E9FAFF`; muted text `#4A5F9A` `#3A4F8A`; live red `#FF3B4E` `#D90429` `#FF4D5E`; gold `#F2C14E` `#FFC857`.
Fonts: **Manrope** 500–800 (headings), **Open Sans** 300–800 (body) — Google Fonts.
Keyframes: `vcFade`, `vcSlide`, `vcPop`, `vcFloat`, `vcLive`, `vcLiveW` (definitions at top of the reference file).

## Content
All VI/EN copy and data live in the reference file's logic script: `L` (UI strings), `YEARS`, `SPEAKERS`, `AGENDA`, `PARTNERS`, `VIDEOS`, `LIVE`. Move them into `src/data/` (content.ts, speakers.ts, agenda.ts, archive.ts, partners.ts) with a VI/EN context + `useT()` hook. Keep content order unchanged.

## Assets
Delivered separately as `public/` (only files used by v2.1): KV images + 2 videos, floating icons, about concept, SDGs, history (compressed, ≤250 KB each), speakers, 16 partner logos, organiser + Hemera logos.
Pending from client: real 2025 photos, YouTube links for 2023/2022 videos, individual PDF links for documents. Footer: `hemera-tech.png` is placed as Hemera Media and `hemera-media.png` as the green H — file names may be swapped, confirm.

## Files
- `design/VCSF 2026 Home v2.1.dc.html` — full design reference
- `design/support.js` — runtime needed only to open the reference in a browser
