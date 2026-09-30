Read `design_handoff_vcsf2026_about_tree/README.md` and apply its changes to the existing React app (repo: hoangduongbui/vcsf-2026-landing-page). The reference is `design_handoff_vcsf2026_about_tree/design/VCSF 2026 Home v2.1.dc.html`.

1. Copy `assets/videos/vcsf-tree.mp4` → `public/videos/vcsf-tree.mp4`.
2. Update the About / Giới thiệu chung component: white background, remove the gradient overlay, replace the 2 photos with the tree video (plays once, no loop), add the 6 coloured icons on an arc + hover/focus popup, per README §1–4. Put the 6 icon entries (VI/EN title + description) in `src/data/content.ts` next to the existing about copy.
3. Hero: hide the floating icons on mobile only (README §5).
4. Live compare: copy the reference to `reference.html` + `support.js` at the repo root (gitignored), `npx serve -l 4000 .`, and check with Playwright at 390 / 768 / 1280 / 1440 — especially: icons appear ~0.5s before the video ends, don't overlap the text or the leaves, aren't clipped at 390, and the popups stay on screen.
5. Respect prefers-reduced-motion (no float; show icons without the pop animation).
Show me a short summary of the changed files when done.
