import { useEffect, useState } from 'react'
import { useLocale } from '../../i18n/context'
import { scrollToSection } from '../../lib/scroll'
import styles from './BackToTop.module.css'

/** Downward scroll travel (px) before the button appears — ignores jitter. */
const SHOW_AFTER = 12
/**
 * Upward travel (px) before it hides. Phones need a longer pull: small
 * flicks up while reading shouldn't take the button away.
 */
const HIDE_AFTER_DESKTOP = 12
const HIDE_AFTER_PHONE = 240

/**
 * Floating "back to top" button, bottom-right. Appears while the user scrolls
 * down (past the first screen) and hides when they scroll back up.
 */
export default function BackToTop() {
  const { locale } = useLocale()
  const [show, setShow] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let travel = 0
    let raf = 0
    const tick = () => {
      raf = 0
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (y < window.innerHeight * 0.6) {
        travel = 0
        setShow(false)
        return
      }
      // Accumulate travel in the current direction; reset when it flips.
      travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy
      const hideAfter = window.innerWidth < 760 ? HIDE_AFTER_PHONE : HIDE_AFTER_DESKTOP
      if (travel > SHOW_AFTER) setShow(true)
      else if (travel < -hideAfter) setShow(false)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
    }
  }, [])

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.show : ''}`}
      aria-label={locale === 'vi' ? 'Lên đầu trang' : 'Back to top'}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() => scrollToSection('top')}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  )
}
