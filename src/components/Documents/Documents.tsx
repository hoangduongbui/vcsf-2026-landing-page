import { DOC_LANG, DOCUMENTS, docUrl } from '../../data/archive'
import type { Locale } from '../../data/content'
import { useLocale, useT } from '../../i18n/context'
import { SubHeading } from '../Library/Library'
import LightBeams from '../LightBeams/LightBeams'
import styles from './Documents.module.css'

/** 05.3 — documents list; blue fades back to light with flipped light beams. */
export default function Documents() {
  const t = useT()
  const { locale } = useLocale()
  const other: Locale = locale === 'vi' ? 'en' : 'vi'

  return (
    <section id="documents" data-sec="library" className={styles.section}>
      <LightBeams flip peak={0.9} />
      <div className={`container ${styles.inner}`}>
        <div data-reveal="">
          <SubHeading num="05.3" title={t.documents} />
        </div>
        <div data-reveal="" data-delay="100" className={styles.list}>
          {/* One row per file: the viewing language first, then the other one. */}
          {[locale, other].flatMap((lang) =>
            DOCUMENTS.map((doc) => (
              <div key={doc.file[lang]} className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />
                  </svg>
                </span>
                <div className={styles.text} lang={lang}>
                  <span className={styles.name}>{doc.title[lang]}</span>
                  <span className={styles.meta}>
                    <span className={styles.type}>{doc.type}</span>
                    {DOC_LANG[lang]}
                  </span>
                </div>
                <a href={docUrl(doc.file[lang])} target="_blank" rel="noopener noreferrer" className={styles.download}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                  {t.download}
                </a>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  )
}
