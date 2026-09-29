import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { EVENT_END, EVENT_START } from '../../config'
import { LIVE } from '../../data/content'
import { useLive } from '../../hooks/useLive'
import { useMotion } from '../../hooks/useMotion'
import { useViewport } from '../../hooks/useViewport'
import { useLocale, useT } from '../../i18n/context'
import { scrollToSection } from '../../lib/scroll'
import LiveDot from '../LiveDot/LiveDot'
import styles from './Hero.module.css'

/** Desktop icon rings, positioned in % of a 16:9 box pinned to the skyline. */
const KV_ICONS = [
  { icon: 6, left: 5.85, top: 66.3, width: 4.2, delay: 0 },
  { icon: 7, left: 12.95, top: 58, width: 4.2, delay: -1.6 },
  { icon: 4, left: 18.8, top: 64.7, width: 3.3, delay: -3.1 },
  { icon: 1, left: 86.1, top: 58, width: 4.2, delay: -0.8 },
  { icon: 3, left: 79.85, top: 67.9, width: 3.4, delay: -2.4 },
  { icon: 2, left: 92.1, top: 63.6, width: 3.7, delay: -3.8 },
]

interface Ring {
  l: number
  t: number
  s: number
  icon: number
  d: number
}

const iconSrc = (n: number) => `/images/floating-icon-0${n}.png`

/**
 * Vertical object-position (%) of the portrait KV video. Higher = the frame
 * moves up, showing more of the skyline. The ring arc is computed from the
 * same value, so change it only here.
 */
const VIDEO_Y_PHONE = 60
const VIDEO_Y_PORTRAIT = 65

/**
 * Mobile / portrait: place 3 rings per side on a mirrored arc between the
 * text block and the skyline (the reference's placeKvm()).
 */
function computeRings(section: HTMLElement): Ring[] {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (!(vw < 760 || vh / vw > 0.9)) return []
  const tr = section.getBoundingClientRect()
  const W = tr.width
  const H = tr.height
  let cT = Infinity
  let cB = 0
  section.querySelectorAll('[data-intro]').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (!r.height) return
    cT = Math.min(cT, r.top - tr.top)
    cB = Math.max(cB, r.bottom - tr.top)
  })
  if (!isFinite(cT)) return []
  const pos = (vw < 760 ? VIDEO_Y_PHONE : VIDEO_Y_PORTRAIT) / 100
  const VH = Math.max((W * 2276) / 908, H)
  const city = (H - VH) * pos + 0.7 * VH
  const phone = W < 500
  const s = phone ? 30 : 44
  const edge = phone ? 17 : 34
  const sizes = [s * 0.95, s * 0.82, s * 0.72]
  const aTop = cB + 10 + sizes[2] / 2
  const aBot = city - 6 - sizes[0] / 2
  const ah = Math.max(10, aBot - aTop)
  const yLow = aTop + ah
  const aw = W * 0.2
  const arcPts = [[0, 0], [0.5, 0.72], [1, 1]]
  const setIc = [[6, 7, 4], [1, 3, 2]]
  const delays = [[0, -1.3, -2.6], [-0.7, -2, -3.3]]
  const jit = [[0, 2, -1], [-2, -1, 1]]
  const ring: Ring[] = []
  ;[0, 1].forEach((sd) =>
    arcPts.forEach(([px, py], k) => {
      const dx = edge + aw * px
      ring.push({
        l: sd ? W - dx : dx,
        t: yLow - ah * py + jit[sd][k],
        s: sizes[k],
        icon: setIc[sd][k],
        d: delays[sd][k],
      })
    }),
  )
  return ring
}

export default function Hero() {
  const t = useT()
  const { locale } = useLocale()
  const lv = LIVE[locale]
  const motion = useMotion()
  const { narrow, portraitFit } = useViewport()
  const { liveOn, liveOff, now } = useLive()

  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [rings, setRings] = useState<Ring[]>([])
  const [introRun, setIntroRun] = useState(false)

  // Intro: start state is painted first, then everything eases in.
  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setIntroRun(true))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  // Scroll parallax: background drifts at .32, content at .16 and fades out.
  useEffect(() => {
    const bg = bgRef.current
    const content = contentRef.current
    if (motion === 'off' || !bg || !content) return
    const k = motion === 'subtle' ? 0.5 : 1
    let raf = 0
    const tick = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      if (y >= vh * 1.3) return
      bg.style.transform = `translate3d(0,${y * 0.32 * k}px,0)`
      content.style.transform = `translate3d(0,${y * 0.16 * k}px,0)`
      content.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      bg.style.transform = ''
      content.style.transform = ''
      content.style.opacity = ''
    }
  }, [motion])

  // Mobile / portrait icon rings: re-measure after the intro settles and on resize.
  const place = useCallback(() => {
    if (sectionRef.current) setRings(computeRings(sectionRef.current))
  }, [])
  useEffect(() => {
    const timers = [300, 1200, 2500].map((ms) => setTimeout(place, ms))
    let rt = 0
    const onResize = () => {
      clearTimeout(rt)
      rt = window.setTimeout(place, 120)
    }
    window.addEventListener('resize', onResize)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(rt)
      window.removeEventListener('resize', onResize)
    }
  }, [place])
  useEffect(() => {
    place()
  }, [locale, place])

  const heroVideoRef = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.loop = true
    v.onended = () => {
      v.currentTime = 0
      v.play().catch(() => {})
    }
    v.play()?.catch(() => {})
  }, [])

  const animate = motion !== 'off'
  const zoomClass = `${styles.zoom} ${introRun || !animate ? styles.zoomed : ''} ${animate ? styles.zoomAnim : ''}`
  const introClass = animate ? `${styles.intro} ${introRun ? styles.introIn : ''}` : ''
  const introStyle = (d: number) => ({ '--d': d + 'ms' }) as CSSProperties

  const showKvIcons = !narrow && !portraitFit
  const mobileKv = narrow || portraitFit

  const themeLines = narrow ? t.theme.split(' – ').map((x, i, a) => (i < a.length - 1 ? x + ' –' : x)) : [t.theme]
  const theme2Lines = narrow
    ? t.themeSecond.split(', ').map((x, i, a) => (i < a.length - 1 ? x + ',' : x))
    : [t.themeSecond]

  const start = new Date(EVENT_START).getTime()
  const days = Math.max(0, Math.ceil((start - now) / 864e5))
  const cdText = now >= new Date(EVENT_END).getTime() ? t.countdownEnded : t.countdownToday

  return (
    <section
      id="top"
      data-sec="top"
      ref={sectionRef}
      className={styles.hero}
      // Mobile uses the *large* viewport height (browser bars hidden), so in-app
      // browsers with toolbars don't squeeze the KV video and crop the skyline.
      style={{ minHeight: narrow ? 'max(100lvh,560px)' : 'max(100svh,700px)' }}
    >
      <div ref={bgRef} className={styles.bg}>
        <img
          src={narrow ? '/images/KV-VCSF-2026-02-mobile.jpg' : '/images/KV-VCSF-2026-02.jpg'}
          alt=""
          className={`${styles.kvImg} ${zoomClass} ${portraitFit ? styles.kvImgPortrait : ''}`}
          style={{ objectPosition: narrow ? 'center 45%' : 'center bottom' }}
        />
        {showKvIcons && (
          <video
            ref={heroVideoRef}
            className={styles.video}
            src="/videos/kv-vcsf-2026-v2.mp4"
            poster="/images/KV-VCSF-2026-02.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        {mobileKv && (
          <video
            ref={heroVideoRef}
            className={styles.videoM}
            src="/videos/kv-vcsf-2026-mobile-v3.mp4"
            style={{ objectPosition: `center ${portraitFit ? VIDEO_Y_PORTRAIT : VIDEO_Y_PHONE}%` }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        {mobileKv && (
          <div className={styles.iconsM} aria-hidden="true">
            {rings.map((k, i) => (
              <span key={i} className={styles.ringSlot} style={{ left: k.l, top: k.t, width: k.s, height: k.s }}>
                <span data-float="" className={`${styles.ring} ${styles.ringM}`} style={{ animationDelay: k.d + 's' }}>
                  <img src={iconSrc(k.icon)} alt="" />
                </span>
              </span>
            ))}
          </div>
        )}
        {showKvIcons && (
          <div className={`${styles.icons} ${zoomClass}`} aria-hidden="true">
            <div className={styles.iconsBox}>
              {KV_ICONS.map((k) => (
                <span
                  key={k.icon}
                  className={styles.ringSlotD}
                  style={{ left: k.left + '%', top: k.top + '%', width: k.width + '%' }}
                >
                  <span data-float="" className={styles.ring} style={{ animationDelay: k.delay + 's' }}>
                    <img src={iconSrc(k.icon)} alt="" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.overlay} />

      <div
        ref={contentRef}
        className={styles.content}
        style={{ paddingTop: narrow ? '84px' : 'clamp(128px,19vh,190px)' }}
      >
        <h1 data-intro="" className={`${styles.line} ${introClass}`} style={introStyle(250)}>
          {t.heroLine}
        </h1>
        <p data-intro="" className={`${styles.theme} ${introClass}`} style={introStyle(420)}>
          <span className={styles.theme1} style={{ fontSize: narrow ? '30px' : '48px' }}>
            {themeLines.map((ln) => (
              <span key={ln}>{ln}</span>
            ))}
          </span>
          <strong className={styles.theme2} style={{ fontSize: narrow ? '38px' : 'clamp(34px,5.4vw,80px)' }}>
            {theme2Lines.map((ln) => (
              <span key={ln}>{ln}</span>
            ))}
          </strong>
        </p>
        <div data-intro="" className={`${styles.pills} ${introClass}`} style={introStyle(580)}>
          <div className={styles.pill}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A4FE6" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="16" rx="3" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            <span>{t.eventDate}</span>
          </div>
          {liveOn && (
            <a
              href="#live"
              className={styles.liveCta}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('live', 80)
              }}
            >
              <LiveDot variant="white" />
              <span>{lv.cta}</span>
              <span className={styles.liveCtaPlay}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D90429">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              </span>
            </a>
          )}
          {liveOff && (
            <div className={`${styles.pill} ${styles.countdown}`}>
              {days > 0 ? (
                <>
                  <span>{t.countdownBefore}</span>
                  <strong className={styles.days}>{days}</strong>
                  <span className={styles.padEnd}>{t.countdownAfter}</span>
                </>
              ) : (
                <span className={styles.padEnd}>{cdText}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
