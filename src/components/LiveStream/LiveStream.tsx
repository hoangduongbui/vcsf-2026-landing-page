import { LIVE } from '../../data/content'
import { useLive } from '../../hooks/useLive'
import { useLocale } from '../../i18n/context'
import LiveDot from '../LiveDot/LiveDot'
import styles from './LiveStream.module.css'

/** #live — only rendered while the stream is on (see LIVE_MODE in config). */
export default function LiveStream() {
  const { locale } = useLocale()
  const lv = LIVE[locale]
  const { liveOn, embedUrl, watchUrl } = useLive()
  if (!liveOn) return null

  return (
    <section id="live" aria-label={lv.aria} className={styles.section}>
      <div className={styles.card}>
        <div aria-hidden="true" className={styles.glow} />
        <div className={styles.head}>
          <div className={styles.text}>
            <div className={styles.badge}>
              <LiveDot />
              <span>{lv.badge}</span>
            </div>
            <h2 className={styles.title}>{lv.title}</h2>
            <p className={styles.desc}>{lv.desc}</p>
          </div>
          <div className={styles.side}>
            <div className={styles.meta}>
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {lv.time}
              </span>
              <span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {lv.venue}
              </span>
            </div>
            {watchUrl && (
              <a href={watchUrl} target="_blank" rel="noopener noreferrer" className={styles.watch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0033">
                  <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.1V8.9l5.2 3.1z" />
                </svg>
                {lv.open}
              </a>
            )}
          </div>
        </div>
        <div className={styles.playerWrap}>
          <div className={styles.player}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={lv.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <>
                <img src="/images/KV-VCSF-2026-02.jpg" alt="" className={styles.poster} />
                <div className={styles.soon}>
                  <span className={styles.play}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className={styles.soonText}>{lv.soon}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
