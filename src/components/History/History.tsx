import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { HISTORY_AUTOPLAY } from '../../config'
import { YEARS } from '../../data/archive'
import { useMotion } from '../../hooks/useMotion'
import { useLocale, useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './History.module.css'

const STEP_MS = 5000

export default function History() {
  const t = useT()
  const { locale } = useLocale()
  const motion = useMotion()
  const [year, setYear] = useState(0)
  /** Only animate the text swap after the first change, not on mount. */
  const [changed, setChanged] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const visible = useRef(false)

  const select = (i: number) => {
    setChanged(true)
    setYear(i)
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Autoplay: fill the progress bar over 5 s, then advance — but only while the
  // section is on screen and the tab is visible; otherwise start the bar again.
  useEffect(() => {
    const bar = barRef.current
    let timer = 0
    const restart = () => {
      if (bar) {
        bar.style.transition = 'none'
        bar.style.width = '0'
        void bar.offsetWidth
      }
      if (!HISTORY_AUTOPLAY) return
      if (bar) {
        bar.style.transition = `width ${STEP_MS / 1000}s linear`
        bar.style.width = '100%'
      }
      timer = window.setTimeout(() => {
        if (visible.current && !document.hidden) {
          setChanged(true)
          setYear((y) => (y + 1) % YEARS.length)
        } else restart()
      }, STEP_MS)
    }
    restart()
    return () => clearTimeout(timer)
  }, [year])

  const hy = YEARS[year]
  const fill = (year / (YEARS.length - 1)) * 100 + '%'
  const swap = changed && motion !== 'off' ? styles.swap : ''
  const swapDelay = (i: number) => ({ animationDelay: i * 70 + 'ms' }) as CSSProperties

  return (
    <section id="history" data-sec="history" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <div data-reveal="" className={styles.headText}>
            <SectionHeader num="01" kicker={t.historyKicker} title={t.history} />
          </div>
        </div>

        <div data-reveal="" data-delay="150" className={styles.timeline}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: fill }} />
          </div>
          <div role="tablist" className={styles.years}>
            {YEARS.map((y, i) => {
              const active = i === year
              const past = i <= year
              return (
                <button
                  key={y.year}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => select(i)}
                  className={`${styles.yearBtn} ${active ? styles.active : past ? styles.past : ''}`}
                >
                  <span className={styles.dotBox}>
                    <span className={styles.dot} />
                  </span>
                  <span className={styles.yearLabel}>{y.year}</span>
                </button>
              )
            })}
          </div>
        </div>

        <a data-reveal="" data-delay="200" href={hy.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <div className={styles.cardText}>
            <div>
              <div key={'y' + year} className={`${styles.bigYear} ${swap}`} style={swapDelay(0)}>
                {hy.year}
              </div>
              <h3 key={'t' + year} className={`${styles.theme} ${swap}`} style={swapDelay(1)}>
                {hy[locale]}
              </h3>
            </div>
            <span className={styles.more}>
              {t.historyOpen}
              <span className={styles.moreIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </span>
          </div>
          <div className={styles.media}>
            {YEARS.map((y, i) => (
              <img
                key={y.year}
                src={y.image}
                alt={'VCSF ' + y.year}
                className={styles.photo}
                style={{ opacity: i === year ? 1 : 0, transform: `scale(${i === year ? 1 : 1.08})` }}
              />
            ))}
            <div className={styles.sheen} />
            <div className={styles.barTrack}>
              <div ref={barRef} className={styles.bar} />
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
