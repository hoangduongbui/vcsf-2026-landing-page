import { DOCUMENTS_URL } from '../../data/archive'
import { useT } from '../../i18n/context'
import { SubHeading } from '../Library/Library'
import LightBeams from '../LightBeams/LightBeams'
import styles from './Documents.module.css'

/** 05.3 — documents list; blue fades back to light with flipped light beams. */
export default function Documents() {
  const t = useT()

  return (
    <section id="documents" data-sec="library" className={styles.section}>
      <LightBeams flip peak={0.9} />
      <div className={`container ${styles.inner}`}>
        <div data-reveal="">
          <SubHeading num="05.3" title={t.documents} />
        </div>
        <div data-reveal="" data-delay="100" className={styles.list}>
          {t.docs.map((name) => (
            <div key={name} className={styles.row}>
              <span className={styles.name}>{name}</span>
              <a href={DOCUMENTS_URL} target="_blank" rel="noopener noreferrer" className={styles.download}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                {t.download}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
