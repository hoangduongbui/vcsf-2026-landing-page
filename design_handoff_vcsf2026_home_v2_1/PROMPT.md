This is a NEW empty repo (https://github.com/hoangduongbui/vcsf-2026-landing-page). Read `design_handoff_vcsf2026_home_v2_1/README.md`, then study `design_handoff_vcsf2026_home_v2_1/design/VCSF 2026 Home v2.1.dc.html` as the source of truth. Build in React.

0. Live reference (do this first): copy `design/VCSF 2026 Home v2.1.dc.html` → `reference.html` and `design/support.js` → `support.js` at the repo root (next to `public/`), add both to `.gitignore`. Run `npx serve -l 4000 .` in a separate terminal and open http://localhost:4000/reference.html with the Playwright MCP tool. Use it throughout to watch the real effects — scroll reveals, parallax, light beams, hero video + floating icons, hover states, countdown, history autoplay, lightbox, speaker search/modal — at 390 / 768 / 1280 / 1440, and compare against the React build (http://localhost:5173) side by side before finishing each section. For exact values (timings, easings, gradients, keyframes) read the source file.
1. Scaffold React + Vite + TypeScript here (`npm create vite@latest . -- --template react-ts`). No UI library. Assets are already in `public/images` and `public/videos` (served as `/images/...`, `/videos/...`).
2. Propose a plan first: components in `src/components/` (one per section), data in `src/data/` (`content.ts`, `speakers.ts`, `agenda.ts`, `archive.ts`, `partners.ts`), a simple VI/EN context + `useT()` hook (default `vi`), styling approach (CSS Modules + CSS variables). Wait for my OK.
3. Global setup: Manrope + Open Sans (Google Fonts), colour tokens as CSS variables, keyframes.
4. Implement section by section in page order (Header+Hero → Live → 01 About/Tree → 02 History → Speakers → Agenda → Library → Documents → Partners → Footer). Stop after each section so I can check it with `npm run dev`.
5. Keep all VI/EN copy exactly as in the reference; keep content order.
6. Responsive at 390 / 768 / 1280 / 1440; respect prefers-reduced-motion.
7. Add `.gitignore` and a short README with run/build/deploy steps (static build for Vercel/Netlify).
Do not import `support.js` or `reference.html` into the app (they are for viewing only).
