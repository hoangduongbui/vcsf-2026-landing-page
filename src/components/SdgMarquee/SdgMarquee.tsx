import { useRef, useState, type MouseEvent } from 'react'
import { SDG_COLOR, SDG_FILE, SDG_SCALE, SDG_TEXT } from '../../data/content'
import { useDragMarquee } from '../../hooks/useDragMarquee'
import { useViewport } from '../../hooks/useViewport'
import { useLocale } from '../../i18n/context'
import styles from './SdgMarquee.module.css'

/** Hovered / tapped icon, measured relative to the wrapper. */
interface Hot {
  j: number
  left: number
  top: number
  size: number
  wrapW: number
}

const pad2 = (n: number) => String(n).padStart(2, '0')
const iconSrc = (i: number) => `/images/SDGs-icon-${pad2(SDG_FILE[i])}.svg`

export default function SdgMarquee() {
  const { locale } = useLocale()
  const { narrow } = useViewport()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hot, setHot] = useState<Hot | null>(null)

  const { trackRef, setPaused, isDragging, handlers } = useDragMarquee(0.035, {
    onDragStart: () => setHot(null),
    onRelease: (type) => {
      if (type !== 'mouse' && !hot) setPaused(false)
    },
  })

  const texts = SDG_TEXT[locale]
  const items = texts.concat(texts)
  const iconW = (i: number) => (((narrow ? 50 : 70) * SDG_SCALE[SDG_FILE[i] - 1]) / 60).toFixed(1) + 'px'

  const show = (j: number, el: HTMLElement) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const wr = wrap.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setHot({ j, left: r.left - wr.left, top: r.top - wr.top, size: r.width, wrapW: wr.width })
  }

  const onEnter = (j: number) => (e: MouseEvent<HTMLDivElement>) => {
    if (!narrow && !isDragging()) show(j, e.currentTarget)
  }
  const onTap = (j: number) => (e: MouseEvent<HTMLDivElement>) => {
    if (hot?.j === j) {
      setPaused(false)
      setHot(null)
    } else {
      setPaused(true)
      show(j, e.currentTarget)
    }
  }

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {hot && <SdgPopover hot={hot} narrow={narrow} iconW={iconW} />}
      <div
        className={styles.viewport}
        onMouseEnter={() => {
          setPaused(true)
        }}
        onMouseLeave={() => {
          if (isDragging()) return
          setPaused(false)
          setHot(null)
        }}
        {...handlers}
      >
        <div ref={trackRef} className={styles.track} style={{ gap: narrow ? '10px' : '14px' }}>
          {items.map((_, j) => {
            const i = j % 17
            const cell = narrow ? '68px' : '96px'
            return (
              <div
                key={j}
                className={styles.cell}
                style={{ width: cell, height: cell }}
                onMouseEnter={onEnter(j)}
                onClick={onTap(j)}
              >
                <img src={iconSrc(i)} alt={`SDG ${pad2(i + 1)}`} draggable={false} style={{ width: iconW(i) }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** White "tab + card" tooltip that grows out of the hovered icon. */
function SdgPopover({ hot, narrow, iconW }: { hot: Hot; narrow: boolean; iconW: (i: number) => string }) {
  const { locale } = useLocale()
  const i = hot.j % 17
  const [name, desc] = SDG_TEXT[locale][i]
  const W = narrow ? 280 : 360
  const pad = narrow ? 6 : 8
  const cs = hot.size
  const L = hot.left - pad
  const tabW = cs + pad * 2
  let ml = Math.min(0, hot.wrapW - (L + W))
  if (ml < 0 && ml > -36) ml = 0
  const flushR = W + ml - tabW < 36
  if (flushR) ml = tabW - W
  const filT = cs + pad - 18

  return (
    <div role="tooltip" className={styles.pop} style={{ left: L, top: hot.top - pad, width: W }}>
      {W + ml >= tabW + 36 && <span className={styles.filR} style={{ left: tabW, top: filT }} />}
      {ml <= -36 && <span className={styles.filL} style={{ top: filT }} />}
      <div
        className={styles.tab}
        style={{ width: tabW, height: cs + pad, borderRadius: `${cs / 2 + pad}px ${cs / 2 + pad}px 0 0` }}
      >
        <img src={iconSrc(i)} alt="" style={{ width: iconW(i) }} />
      </div>
      <div
        className={styles.card}
        style={{
          marginLeft: ml,
          width: W,
          borderRadius: `${ml < 0 ? '18px' : '0'} ${flushR ? '0' : '18px'} 18px 18px`,
        }}
      >
        <div className={styles.num}>
          <span style={{ background: SDG_COLOR[SDG_FILE[i] - 1] }} />
          SDG {pad2(i + 1)}
        </div>
        <div className={styles.name}>{name}</div>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  )
}
