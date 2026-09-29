import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { MENU_BG, SECTIONS, type SectionId } from '../../config'
import { useBodyLock } from '../../hooks/useBodyLock'
import { getMotion } from '../../hooks/useMotion'
import { useT } from '../../i18n/context'
import { scrollToSection } from '../../lib/scroll'
import LangToggle from '../LangToggle/LangToggle'
import styles from './MobileMenu.module.css'

/** Where the close button sits, so it lands exactly on top of the burger. */
export interface MenuAnchor {
  padTop: string
  btnTop: string
  btnRight: string
}

interface Props {
  anchor: MenuAnchor
  labels: Record<SectionId, string>
  onClose: () => void
}

/** Must match the closing transition in MobileMenu.module.css. */
const CLOSE_MS = 450

export default function MobileMenu({ anchor, labels, onClose }: Props) {
  const t = useT()
  // Mounted hidden; `open` flips on the frame after the first paint so the
  // fade runs as a transition from a painted start state (no skipped frames).
  const [open, setOpen] = useState(false)
  // Scroll stays locked until unmount, so the scrollbar can't reappear mid-fade.
  const [locked, setLocked] = useState(false)
  const closingRef = useRef(false)
  useBodyLock(locked)

  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setOpen(true)
        setLocked(true)
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  const hide = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setOpen(false)
    setTimeout(onClose, getMotion() === 'off' ? 0 : CLOSE_MS)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hide])

  const items = [{ id: 'top', label: t.home }, ...SECTIONS.map((id) => ({ id, label: labels[id] }))]

  return (
    <div className={`${styles.menu} ${open ? styles.open : ''}`} role="dialog" aria-modal="true" aria-label={t.menu}>
      <img src={MENU_BG} alt="" decoding="async" className={styles.bg} />
      <div className={styles.inner} style={{ paddingTop: anchor.padTop }}>
        <div className={styles.top}>
          <span className={styles.kicker}>VCSF 2026</span>
          <div className={styles.controls} style={{ top: anchor.btnTop, right: anchor.btnRight }}>
            <LangToggle className={styles.lang} />
            <button type="button" className={styles.close} aria-label={t.closeMenu} onClick={hide}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
        <nav className={styles.nav}>
          {items.map((it, i) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={styles.item}
              style={{ '--i': i } as CSSProperties}
              onClick={(e) => {
                e.preventDefault()
                hide()
                setTimeout(() => scrollToSection(it.id), CLOSE_MS)
              }}
            >
              <span className={styles.num}>{String(i).padStart(2, '0')}</span>
              <span className={styles.label}>{it.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
