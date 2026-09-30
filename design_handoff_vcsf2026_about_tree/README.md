# VCSF 2026 — Handoff: Giới thiệu chung (tree video + 6 icons) & mobile Hero

Source of truth: `design/VCSF 2026 Home v2.1.dc.html` (search for `id="about"`, `treeIcons`, `onTreeEnd`, `showKvIconsM`).
New asset: `assets/videos/vcsf-tree.mp4` → copy to `public/videos/vcsf-tree.mp4`.

## 1. About section background
- Section `#about`: background solid `#fff` (was transparent over a gradient).
- Remove the decorative radial-gradient overlay (aqua at 88% 42% + green at 6% 92%) so nothing tints the video's white background.

## 2. Replace the 2 photos with the tree video
- Remove the 2-photo grid (`2025-gallery.jpg`, `2024-web.jpg`).
- Figure: `flex: 1 1 440px; max-width: 620px; margin: clamp(44px, 8vw, 80px) auto 0; position: relative; background: #fff`. Margin-top always reserves room for the icon arc (it must never overlap the text when stacked).
- `<video src="/videos/vcsf-tree.mp4" autoPlay muted playsInline>` — **no loop**, plays once and rests on the final frame.
  - `display:block; height:auto; border-radius:28px`
  - Width / top margin: viewport ≥ 900px → `width: 90%; margin: 16% auto 0`; below 900px → `width: 100%; margin: 12% auto 0` (% relative to figure width).
- Set `treeDone = true` when `duration - currentTime < 0.5` (`timeupdate`) or on `ended` → icons start ~0.5s before the video ends.

## 3. Six icons on an arc above the tree
- Overlay layer: `position:absolute; left:7%; top:0; width:86%; aspect-ratio:1; pointer-events:none`.
- Each icon (centre, % of layer), order L→R:

| # | icon file | colour | left | top |
|---|---|---|---|---|
| 1 | floating-icon-06 (chart) | #0A4FE6 | -4.7% | 37.1% |
| 2 | floating-icon-07 (bulb) | #F58A1F | 10.7% | 16.8% |
| 3 | floating-icon-04 (chip) | #1FA2F2 | 34.1% | 4.4% |
| 4 | floating-icon-01 (leaf) | #3E9B6E | 66.8% | 4.4% |
| 5 | floating-icon-03 (recycle) | #14A3B8 | 90.2% | 16.8% |
| 6 | floating-icon-02 (drop) | #0016B4 | 105.7% | 37.1% |

- Size: `width: 12%; min-width: 44px; aspect-ratio: 1; transform: translate(-50%,-50%)`.
- Disc: solid colour fill, `border: 3px solid #fff`, `border-radius: 50%`, shadow `0 0 0 1.5px {c}55, 0 14px 30px -10px {c}`; icon image 50% × 50%, `object-fit: contain`.
- Floating: same `vcFloat` keyframes as the Hero (5.5s ease-in-out infinite, translateY 0 → -14%), `animation-delay: -(i × 0.9)s`. Disabled with prefers-reduced-motion.
- Entrance (when `treeDone`): opacity 0 → 1 (`.3s ease`), scale .3 → 1 (`.4s cubic-bezier(.3,1.6,.5,1)`), stagger `i × 0.07s`. Before that: `pointer-events: none`.

## 4. Hover / focus popup (styled like the SDG tooltip)
- Trigger: mouseenter / focus on the icon (`tabIndex=0`, `aria-label` = name). Hovered icon: scale 1.12, z-index 5, shadow `0 0 0 6px {c}33, 0 18px 34px -10px {c}`.
- Card: `position:absolute; top: calc(100% + 14px); width: clamp(220px, 24vw, 290px); padding: 16px 18px 18px; border-radius: 18px; background: #fff; box-shadow: 0 22px 44px -14px rgba(0,8,70,.28), 0 2px 6px rgba(0,8,70,.1); animation: vcPop .28s ease-out`.
- Alignment: icons 1–2 → `left:0`; 3–4 → `left:50%; translateX(-50%)`; 5–6 → `right:0`. Arrow: 14px white square rotated 45°, `top:-6px`, at 22px / 50% / calc(100% - 22px).
- Content: kicker (Open Sans 800 12px, letter-spacing .16em, uppercase, #0A4FE6, 10px colour dot) → title (Manrope 700 18px/1.3, #041463) → description (Open Sans 400 14px/1.55, #4A5F9A).
- Kicker text: VI `Định hướng 0{n}` / EN `Focus 0{n}`.

Copy (placeholder — client will revise):

| # | VI title | VI description | EN title | EN description |
|---|---|---|---|---|
| 1 | Tăng trưởng bứt phá | Tăng trưởng hai con số dựa trên năng suất, chất lượng và giá trị dài hạn cho doanh nghiệp và xã hội. | Breakthrough growth | Double-digit growth built on productivity, quality and long-term value for business and society. |
| 2 | Đổi mới sáng tạo | Ý tưởng, mô hình và công nghệ mới biến phát triển bền vững thành lợi thế cạnh tranh. | Innovation | New ideas, models and technologies that turn sustainability into a competitive advantage. |
| 3 | Chuyển đổi số | Dữ liệu và nền tảng số giúp vận hành minh bạch, hiệu quả và đo lường được. | Digital transformation | Data and digital platforms that make operations transparent, efficient and measurable. |
| 4 | Kinh tế xanh | Sản xuất và đầu tư phát thải thấp, đồng hành cùng cam kết Net Zero 2050 của Việt Nam. | Green economy | Low-emission production and investment aligned with Viet Nam’s Net Zero 2050 commitment. |
| 5 | Kinh tế tuần hoàn | Giảm thiểu, tái sử dụng và tái chế trong toàn chuỗi giá trị để kéo dài vòng đời tài nguyên. | Circular economy | Reduce, reuse and recycle across the value chain to keep resources in use for longer. |
| 6 | Tài nguyên & khí hậu | Bảo vệ nguồn nước, năng lượng và hệ sinh thái, nâng cao khả năng chống chịu biến đổi khí hậu. | Resources & climate | Protecting water, energy and ecosystems while building resilience to climate change. |

## 5. Hero — mobile
- Hide the 6 floating icon rings on mobile (narrow viewport). Keep them on tablet (portrait layout) and desktop.
- In the reference: `showKvIconsM: !narrow && portraitFit` (was `narrow || portraitFit`).
