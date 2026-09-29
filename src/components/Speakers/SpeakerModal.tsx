import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { HIDDEN_GROUPS, SHOW_DRAFT_BADGE, SP_GROUPS, SPEAKERS, speakerImage } from '../../data/speakers'
import { useBodyLock } from '../../hooks/useBodyLock'
import { getMotion } from '../../hooks/useMotion'
import { useLocale, useT } from '../../i18n/context'
import { pad2 } from '../../lib/text'
import { PersonPlaceholder } from './SpeakerCard'
import styles from './SpeakerModal.module.css'

interface Props {
  /** SPEAKERS indices in the current (filtered) order. */
  order: number[]
  current: number
  onNavigate: (i: number) => void
  onClose: () => void
}

const CLOSE_MS = 440
const EASE_OUT = 'cubic-bezier(.2,.8,.2,1)'

export default function SpeakerModal({ order, current, onNavigate, onClose }: Props) {
  const t = useT()
  const { locale } = useLocale()
  useBodyLock(true)

  const backRef = useRef<HTMLDivElement>(null)
  const dlgRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closing = useRef(false)
  const lastDir = useRef(0)
  const firstRender = useRef(true)

  const pos = Math.max(0, order.indexOf(current))

  const nav = useCallback(
    (dir: 1 | -1) => {
      if (!order.length) return
      lastDir.current = dir
      onNavigate(order[(pos + dir + order.length) % order.length])
    },
    [order, pos, onNavigate],
  )

  const close = useCallback(() => {
    if (closing.current) return
    const b = backRef.current
    const d = dlgRef.current
    if (!b || !d || getMotion() === 'off') return onClose()
    closing.current = true
    const ease = 'cubic-bezier(.4,0,.2,1)'
    b.style.animation = 'none'
    d.style.animation = 'none'
    b.style.transition = `opacity .42s ${ease}, backdrop-filter .42s ${ease}`
    d.style.transition = `opacity .32s ${ease}, transform .42s ${ease}`
    requestAnimationFrame(() => {
      b.style.opacity = '0'
      b.style.backdropFilter = 'blur(0px)'
      d.style.opacity = '0'
      d.style.transform = 'translateY(16px) scale(.97)'
    })
    setTimeout(onClose, CLOSE_MS)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nav(1)
      else if (e.key === 'ArrowLeft') nav(-1)
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav, close])

  // On prev/next: reset scroll, cross-fade the photo, slide the text in.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    if (dlgRef.current) dlgRef.current.scrollTop = 0
    if (getMotion() === 'off') return
    fadeRef.current?.animate([{ opacity: 0, transform: 'scale(1.06)' }, { opacity: 1, transform: 'none' }], { duration: 520, easing: EASE_OUT })
    bodyRef.current?.animate([{ opacity: 0, transform: `translateX(${lastDir.current * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 460, easing: EASE_OUT })
  }, [current])

  const sp = SPEAKERS[current]
  const txt = sp[locale]
  const roleDraft = SHOW_DRAFT_BADGE && sp.draft.includes('chuc_danh_' + locale)
  const bioDraft = SHOW_DRAFT_BADGE && sp.draft.includes('bio_' + locale)
  const stop = (e: MouseEvent) => e.stopPropagation()

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      data-marr={dir < 0 ? 'prev' : 'next'}
      className={`${styles.arrow} ${dir < 0 ? styles.arrowPrev : styles.arrowNext}`}
      aria-label={dir < 0 ? t.speakerPrev : t.speakerNext}
      onClick={(e) => {
        e.stopPropagation()
        nav(dir)
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  )

  return createPortal(
    <div ref={backRef} className={styles.back} onClick={close}>
      {arrow(-1)}
      {arrow(1)}
      <div ref={dlgRef} className={styles.dialog} role="dialog" aria-modal="true" aria-label={txt.name} onClick={stop}>
        <button type="button" className={styles.close} aria-label={t.speakerClose} onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className={styles.media}>
          <div ref={fadeRef} className={styles.fade}>
            {sp.img ? (
              <img src={speakerImage(sp)} alt={txt.name} />
            ) : (
              <div className={styles.placeholder}>
                <PersonPlaceholder size={84} />
                <span>{t.spUpdating}</span>
              </div>
            )}
          </div>
          <div className={styles.shade} />
          <div className={styles.mediaFoot}>
            <div className={styles.count}>
              <strong>{pad2(pos + 1)}</strong>
              <span>/ {pad2(order.length)}</span>
            </div>
            <div className={styles.rule} />
          </div>
        </div>

        <div ref={bodyRef} className={styles.body}>
          <div className={styles.head}>
            {!HIDDEN_GROUPS.includes(sp.g) && (
              <span className={styles.group}>
                <span />
                {SP_GROUPS[locale][sp.g]}
              </span>
            )}
            <h3 className={`${styles.name} ${HIDDEN_GROUPS.includes(sp.g) ? styles.nameFirst : ''}`}>{txt.name}</h3>
            <p className={styles.role}>
              {txt.role || <em>{t.spUpdating}</em>}
              {roleDraft && (
                <span className={styles.roleDraft}>
                  <span className={styles.badge}>{t.spDraft}</span>
                </span>
              )}
            </p>
            <div className={styles.org}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14C9A4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
              <span>{sp.org}</span>
            </div>
          </div>
          <div ref={scrollRef} className={styles.scroll}>
            <div className={styles.bioLabel}>
              <span>{t.speakerBio}</span>
              <span className={styles.bioRule} />
              {bioDraft && <span className={styles.badge}>{t.spDraft}</span>}
            </div>
            {txt.bio.length === 0 && <p className={styles.noBio}>{t.spUpdating}</p>}
            <div className={styles.bio}>
              {txt.bio.map((line, i) =>
                line.startsWith('•') ? (
                  <div key={i} className={styles.bullet}>
                    <span className={styles.bulletDot} />
                    <span>{line.replace(/^•\s*/, '')}</span>
                  </div>
                ) : (
                  <p key={i}>{line}</p>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
