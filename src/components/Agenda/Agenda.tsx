import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AGENDA } from '../../data/agenda'
import { useMotion } from '../../hooks/useMotion'
import { useViewport } from '../../hooks/useViewport'
import { useLocale, useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Agenda.module.css'

export default function Agenda() {
  const t = useT()
  const { locale } = useLocale()
  const motion = useMotion()
  const { narrow } = useViewport()
  const [tab, setTab] = useState(0)
  /** Animate head + rows only after a tab switch, not on first render. */
  const [switched, setSwitched] = useState(false)

  // Sticky tab bar: `stuck` = pinned under the header (gets a solid backdrop).
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const stickTop = () => {
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68
    const gap = sectionRef.current ? parseFloat(getComputedStyle(sectionRef.current).getPropertyValue('--stick-gap')) : 10
    return header + (gap || 10)
  }

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const s = sentinelRef.current
      if (s) setStuck(s.getBoundingClientRect().top < stickTop())
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  const selectTab = (i: number) => {
    if (i === tab) return
    setSwitched(true)
    setTab(i)
    // Deep in a long programme? Bring the new tab's content back to its start.
    const s = sentinelRef.current
    if (stuck && s) {
      window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - stickTop(), behavior: 'smooth' })
    }
  }

  const sess = AGENDA[tab][locale]
  const anim = switched && motion !== 'off'
  const swap = (i: number) =>
    anim ? { className: styles.swap, style: { animationDelay: i * 70 + 'ms' } as CSSProperties } : {}

  return (
    <section id="agenda" data-sec="agenda" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div data-reveal="">
          <SectionHeader num="04" kicker="VCSF 2026" title={t.agenda} tone="dark" />
        </div>

        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
        <div className={styles.tabsSticky}>
          <div data-reveal="" data-delay="100" role="tablist" className={`${styles.tabs} ${stuck ? styles.stuck : ''}`}>
            {AGENDA.map((a, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === tab}
                className={`${styles.tab} ${i === tab ? styles.tabActive : ''}`}
                onClick={() => selectTab(i)}
              >
                {a[locale].tab}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal="" data-delay="160" className={styles.card}>
          <div key={'h' + tab} className={styles.head}>
            <div {...swap(0)}>
              <div className={styles.title}>{sess.title}</div>
            </div>
            <div {...swap(1)}>
              <div className={styles.subtitle}>{sess.subtitle}</div>
            </div>
            {sess.theme && (
              <div {...swap(2)}>
                <div className={styles.theme}>{sess.theme}</div>
              </div>
            )}
            <div {...swap(3)}>
              <div className={styles.date}>
                <span />
                {sess.date}
              </div>
            </div>
            {sess.note && (
              <div role="note" className={styles.note}>
                <span className={styles.noteTag}>NOTE</span>
                <span>{sess.note}</span>
              </div>
            )}
          </div>

          {!narrow && (
            <div className={styles.cols}>
              <span>{t.agendaTime}</span>
              <span>{t.agendaActivity}</span>
              <span>{t.agendaSpeaker}</span>
            </div>
          )}

          <div key={'r' + tab} className={styles.rows}>
            {sess.rows.map((r, i) => (
              <div
                key={i}
                className={anim ? styles.rowIn : undefined}
                style={anim ? { animationDelay: Math.min(i, 16) * 35 + 'ms' } : undefined}
              >
                {'section' in r ? (
                  <div className={styles.divider}>
                    <span>{r.section}</span>
                    <span className={styles.dividerLine} />
                  </div>
                ) : (
                  <div className={`${styles.row} ${narrow ? styles.rowNarrow : ''}`}>
                    <span className={styles.time}>{r[0]}</span>
                    <span className={styles.act}>{r[1]}</span>
                    <span className={styles.spk}>{r[2]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
