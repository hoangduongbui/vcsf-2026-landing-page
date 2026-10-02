import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { asset } from '../../config'
import { useViewport } from '../../hooks/useViewport'
import { useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './About.module.css'

/** Icons on the arc above the tree, L→R: file number, colour, centre (% of the icon layer). */
const TREE_ICONS = [
  { icon: 6, c: '#0A4FE6', x: -4.7, y: 37.1 },
  { icon: 7, c: '#F58A1F', x: 10.7, y: 16.8 },
  { icon: 4, c: '#0016B4', x: 34.1, y: 4.4 },
  { icon: 1, c: '#3E9B6E', x: 66.8, y: 4.4 },
  { icon: 3, c: '#14A3B8', x: 90.2, y: 16.8 },
  { icon: 2, c: '#1FA2F2', x: 105.7, y: 37.1 },
]

/** Share of the tree video that must be on screen before it starts playing. */
const TREE_START_VISIBLE = 0.4

/** Icons appear this many seconds before the tree video ends. */
const ICONS_LEAD = 0.5

export default function About() {
  const t = useT()
  const { vw } = useViewport()
  const [lead, ...rest] = t.aboutParagraphs
  const videoRef = useRef<HTMLVideoElement>(null)
  const [treeDone, setTreeDone] = useState(false)
  const [hot, setHot] = useState(-1)

  // The tree starts growing only once it has scrolled into view (plays once).
  // Playback can be refused (e.g. iOS Low Power Mode): show the icons anyway.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        v.play()?.catch(() => setTreeDone(true))
      },
      { threshold: TREE_START_VISIBLE },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const onTime = () => {
    const v = videoRef.current
    if (!treeDone && v && v.duration && v.duration - v.currentTime < ICONS_LEAD) setTreeDone(true)
  }

  const wide = vw >= 900

  return (
    <section id="about" data-sec="about" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <SectionHeader num="02" kicker="VCSF" title={t.about} split />
          <p data-reveal="" data-delay="160" className={styles.lead}>
            {lead}
          </p>
          {rest.map((p, i) => (
            <p key={i} data-reveal="" data-delay="220" className={styles.para}>
              {p}
            </p>
          ))}
        </div>
        <figure data-reveal="" data-delay="120" className={styles.figure}>
          <video
            ref={videoRef}
            className={styles.tree}
            style={{ width: wide ? '90%' : '100%', marginTop: wide ? '16%' : '12%' }}
            src={asset('videos/vcsf-tree.mp4')}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onTimeUpdate={onTime}
            onEnded={() => setTreeDone(true)}
          />
          <div className={`${styles.icons} ${treeDone ? styles.iconsOn : ''}`}>
            {TREE_ICONS.map((ic, i) => {
              const on = hot === i
              const side = i < 2 ? styles.popL : i > 3 ? styles.popR : styles.popC
              const item = t.aboutFocus[i]
              return (
                <span
                  key={ic.icon}
                  tabIndex={treeDone ? 0 : -1}
                  aria-label={item.title}
                  className={`${styles.icon} ${on ? styles.iconHot : ''}`}
                  style={
                    {
                      left: ic.x + '%',
                      top: ic.y + '%',
                      '--c': ic.c,
                      transitionDelay: i * 0.07 + 's',
                    } as CSSProperties
                  }
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(-1)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(-1)}
                >
                  <span data-float="" className={styles.floater} style={{ animationDelay: -(i * 0.9).toFixed(1) + 's' }}>
                    {on && (
                      <span role="tooltip" className={`${styles.pop} ${side}`}>
                        <span className={styles.popTab} />
                        <span className={styles.filL} />
                        <span className={styles.filR} />
                        <span className={styles.popCard}>
                          <span className={styles.popKicker}>
                            <span />
                            {t.aboutFocusKicker} 0{i + 1}
                          </span>
                          <span className={styles.popTitle}>{item.title}</span>
                          <span className={styles.popDesc}>{item.desc}</span>
                        </span>
                      </span>
                    )}
                    <span className={styles.disc}>
                      <img src={asset(`images/floating-icon-0${ic.icon}.png`)} alt="" />
                    </span>
                  </span>
                </span>
              )
            })}
          </div>
        </figure>
      </div>
    </section>
  )
}
