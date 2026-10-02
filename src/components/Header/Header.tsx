import { useEffect, useRef, useState } from 'react'
import { asset, MENU_BG, SECTIONS, type SectionId } from '../../config'
import { useMotion } from '../../hooks/useMotion'
import { useScrollState } from '../../hooks/useScrollState'
import { useViewport } from '../../hooks/useViewport'
import { useT } from '../../i18n/context'
import { scrollToSection } from '../../lib/scroll'
import LangToggle from '../LangToggle/LangToggle'
import MobileMenu, { type MenuAnchor } from './MobileMenu'
import styles from './Header.module.css'

export default function Header() {
  const t = useT()
  const motion = useMotion()
  const { vw } = useViewport()
  const { scrolled, section, progressRef } = useScrollState()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const [menu, setMenu] = useState<MenuAnchor | null>(null)

  // Publish the header's live height as --header-h (used by sticky UI such as
  // the agenda tabs); it changes with breakpoints and the scrolled state.
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px')
    })
    // border-box: the scrolled state only changes padding, which content-box ignores.
    ro.observe(el, { box: 'border-box' })
    return () => ro.disconnect()
  }, [])

  // Fetch + decode the menu background ahead of time: decoding a large JPEG
  // on the first open is what made the fade-in stutter.
  useEffect(() => {
    const img = new Image()
    img.src = MENU_BG
    img.decode?.().catch(() => {})
  }, [])

  const labels: Record<SectionId, string> = {
    history: t.history,
    about: t.about,
    speakers: t.speakers,
    agenda: t.agenda,
    library: t.library,
    partners: t.partners,
  }
  const secId = section as SectionId
  const secIndex = section === 'top' ? '00' : '0' + (SECTIONS.indexOf(secId) + 1)
  const secLabel = section === 'top' ? 'VCSF 2026' : labels[secId]

  const openMenu = () => {
    const r = burgerRef.current?.getBoundingClientRect()
    setMenu({
      padTop: r ? Math.max(0, Math.round(r.top + r.height / 2 - 30)) + 'px' : '18px',
      btnTop: r ? r.top + r.height / 2 - 22 + 'px' : '18px',
      // Measured from the window edge: the scrollbar is gone once the menu locks scroll.
      btnRight: r ? window.innerWidth - (r.left + r.width / 2) - 22 + 'px' : '20px',    })
  }

  return (
    <>
      <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a
            href="#top"
            className={styles.logos}
            aria-label="VCSF 2026"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('top')
            }}
          >
            <img src={asset('images/logo-vcci.png')} alt="VCCI" className={styles.logo} />
            <img src={asset('images/logo-vcsf.png')} alt="VCSF 2026" className={styles.logo} />
            <img src={asset('images/logo-vbcsd.png')} alt="VBCSD" className={styles.logoSm} />
          </a>
          <div className={styles.actions}>
            {vw >= 900 && (
              <div key={section} className={`${styles.chip} ${motion !== 'off' ? styles.swap : ''}`}>
                <span className={styles.chipIndex}>{secIndex}</span>
                <span>{secLabel}</span>
              </div>
            )}
            <LangToggle className={styles.lang} />
            <button ref={burgerRef} type="button" className={styles.burger} aria-label={t.menu} onClick={openMenu}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className={styles.progressTrack}>
          <div ref={progressRef} className={styles.progress} />
        </div>
      </header>
      {menu && <MobileMenu anchor={menu} labels={labels} onClose={() => setMenu(null)} />}
    </>
  )
}
