import { YOUTUBE_CHANNEL_URL } from '../../data/archive'
import { useT } from '../../i18n/context'
import styles from './Footer.module.css'

const PHONE = '+84 3574 4002'
const PHONE_HREF = 'tel:+8435744002'
const EMAIL = 'info@vbcsd.vn'

export default function Footer() {
  const t = useT()

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.topLine} />
      <div className={styles.glow} />

      <div className={styles.top}>
        <div className={styles.brand}>
          <img src="/images/logo-vcsf-white.png" alt="VCSF 2026" className={styles.logo} />
          <p className={styles.theme}>
            <span>{t.theme}</span>
            <span className={styles.themeSecond}>{t.themeSecond}</span>
          </p>
        </div>

        <div className={styles.side}>
          <div className={styles.social} aria-label={t.social}>
            {/* Facebook page not provided yet — shown dimmed, not linked */}
            <span title="Facebook" className={`${styles.socialBtn} ${styles.socialOff}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.5 10.6 6.1V8H8v3.4h2.6V22H14V11.4h2.7L17 8z" />
              </svg>
            </span>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.1V8.9l5.2 3.1z" />
              </svg>
            </a>
          </div>
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
              <img src="/images/hemera-media.png" alt="Hemera Media" />
              <span className={styles.devRule} />
              <img src="/images/hemera-tech.png" alt="Hemera Tech" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
