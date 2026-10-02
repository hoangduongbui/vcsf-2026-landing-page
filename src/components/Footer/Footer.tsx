import { Fragment } from 'react'
import { asset } from '../../config'
import { useT } from '../../i18n/context'
import { scrollToSection } from '../../lib/scroll'
import SocialLinks from '../SocialLinks/SocialLinks'
import styles from './Footer.module.css'

const PHONE = '+84 3574 4002'
const PHONE_HREF = 'tel:+8435744002'
const EMAIL = 'info@vbcsd.vn'
const HEMERA_URL = 'https://hemera.vn/'

export default function Footer() {
  const t = useT()
  // Each half stays on one line, so a wrap can only fall right after the dash
  const themeParts = t.theme.split(' – ').map((x, i, a) => (i < a.length - 1 ? x + ' –' : x))

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.topLine} />
      <div className={styles.glow} />

      <div className={styles.top}>
        <div className={styles.brand}>
          <a
            href="#top"
            className={styles.logoLink}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('top')
            }}
          >
            <img src={asset('images/logo-vcsf-white.png')} alt="VCSF 2026" className={styles.logo} />
          </a>
          <p className={styles.theme}>
            <span>
              {themeParts.map((x, i) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <span className={styles.themePart}>{x}</span>
                </Fragment>
              ))}
            </span>
            <span className={styles.themeSecond}>{t.themeSecond}</span>
          </p>
        </div>

        <div className={styles.side}>
          <SocialLinks />
          <div className={styles.contact}>
            <div className={styles.contactRow}>
              <svg className={styles.contactIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{t.address}</span>
            </div>
            <a href={PHONE_HREF} className={`${styles.contactRow} ${styles.contactLink}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className={`${styles.contactRow} ${styles.contactLink}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.barWrap}>
        <div className={styles.bar}>
          <p className={styles.copy}>
            {t.copyright}
            <br />
            {t.council}
          </p>
          <div className={styles.dev}>
            <span>{t.developed}</span>
            <div className={styles.devLogos}>
              {/* File names may be swapped (see handoff README) — placed as in the design */}
              <a href={HEMERA_URL} target="_blank" rel="noopener noreferrer">
                <img src={asset('images/hemera-media.png')} alt="Hemera Media" />
              </a>
              <span className={styles.devRule} />
              <a href={HEMERA_URL} target="_blank" rel="noopener noreferrer">
                <img src={asset('images/hemera-tech.png')} alt="Hemera Tech" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
