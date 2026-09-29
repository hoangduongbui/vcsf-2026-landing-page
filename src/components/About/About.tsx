import { useLocale, useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './About.module.css'

const PHOTOS = [
  { src: '/images/history/2025-gallery.jpg', alt: 'VCSF 2025', className: styles.photoLow },
  { src: '/images/history/2024-1.jpg', alt: 'VCSF 2025', className: styles.photoHigh },
]

export default function About() {
  const t = useT()
  const { locale } = useLocale()
  const [lead, ...rest] = t.aboutParagraphs

  return (
    <section id="about" data-sec="about" className={styles.section}>
      <div aria-hidden="true" className={styles.glow} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <SectionHeader num="02" kicker="VCSF" title={t.about} split />
          {locale === 'en' && (
            <div role="note" className={styles.note}>
              <span className={styles.noteTag}>NOTE</span>
              <span>
                Unofficial translation — the official English version of this content has not been provided yet. Please
                refer to the Vietnamese version.
              </span>
            </div>
          )}
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
          {PHOTOS.map((p) => (
            <div key={p.src} className={`${styles.photo} ${p.className}`}>
              <img data-par="0.06" src={p.src} alt={p.alt} loading="lazy" />
            </div>
          ))}
        </figure>
      </div>
    </section>
  )
}
