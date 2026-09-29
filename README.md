# VCSF 2026 — Landing page

Bilingual (VI/EN) homepage for the **Vietnam Corporate Sustainability Forum 2026** (Hanoi, 05/10/2026).
React 19 + Vite + TypeScript, CSS Modules, no UI library.

## Run

Requires Node 20.19+ (or 22.12+), as required by Vite.

```bash
npm install
npm run dev        # http://localhost:5173
npm run dev:lan    # same, also reachable from phones on the local network
```

## Build

```bash
npm run build      # type-check + production build → dist/
npm run preview    # serve dist/ locally
npm run lint       # oxlint
```

## Deploy

`dist/` is a fully static site with a single page and no server routes.

- **Vercel:** import the repo. Vercel detects Vite; build command `npm run build`, output directory `dist`.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Any static host / CDN:** upload the contents of `dist/`.

## Editing content

| What | Where |
|---|---|
| UI copy (VI/EN), live-stream text, SDG names | `src/data/content.ts` |
| Speakers, groups, draft badges | `src/data/speakers.ts` |
| Programme tabs | `src/data/agenda.ts` |
| Past editions, photos, videos, document links | `src/data/archive.ts` |
| Sponsors by tier | `src/data/partners.ts` |
| Live mode / URL, motion level, history autoplay, event dates | `src/config.ts` |

Assets live in `public/images` and `public/videos` and are served from `/images/...` and `/videos/...`.

### Live stream on event day

In `src/config.ts`, `LIVE_MODE = 'auto'` shows the live block on 05/10/2026 between 07:30 and 17:30 (Hanoi time). Put the YouTube link in `LIVE_URL`. Use `'on'` to preview it at any other time.

### Before going live

- Set `SHOW_DRAFT_BADGE = false` in `src/data/speakers.ts` to hide the yellow "NHÁP / DRAFT" tags.
- Pending from the client: real 2025 photos, the VCSF 2026 video id, one PDF link per document, a Facebook page URL, and confirmation of which Hemera logo file is which.

## Design reference

`design_handoff_vcsf2026_home_v2_1/` holds the design handoff. To compare side by side, copy `design/VCSF 2026 Home v2.1.dc.html` → `reference.html` and `design/support.js` → `support.js` at the repo root, then run `npx serve -l 4000 .` and open http://localhost:4000/reference.html. Both files are git-ignored and never part of the build.
