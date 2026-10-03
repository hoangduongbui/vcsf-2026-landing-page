import { asset } from '../../config'
import { LIVE } from '../../data/content'
import { useLive } from '../../hooks/useLive'
import { useLiveProbe } from '../../hooks/useLiveProbe'
import { useLocale } from '../../i18n/context'
import LiveDot from '../LiveDot/LiveDot'
import styles from './LiveStream.module.css'

/** #live — only rendered while the stream is on (see LIVE_MODE in config). */
export default function LiveStream() {
  const { locale } = useLocale()
  const lv = LIVE[locale]
  const { liveOn, embedUrl, watchUrl, channelUrl, channelWatchUrl, catching } = useLive()

  // Plan A: the announced video (LIVE_URL), shown as is until it errors.
  const { frameRef: mainRef, caught: mainPlayed, failed: mainFailed } = useLiveProbe(liveOn && !!embedUrl, false)
  const mainOk = !!embedUrl && !mainFailed
  // Plan B: the channel's own live stream, loaded out of sight for as long as plan A
  // isn't playing. Once it plays it takes over — also covers a stream moved to a new link.
  const watchAlt = !!channelUrl && !(mainOk && mainPlayed) && (mainOk || catching)
  const { frameRef: altRef, caught: altPlayed, attempt } = useLiveProbe(liveOn && watchAlt, true)
  if (!liveOn) return null

  // Without a working plan A the channel player is shown anyway after LIVE.catchEnd.
  const showAlt = !!channelUrl && (altPlayed || (!mainOk && !catching))
  const showMain = mainOk && !showAlt
  const probing = watchAlt && !showAlt
  const waiting = !showMain && !showAlt
  const openUrl = showMain ? watchUrl : channelWatchUrl || watchUrl

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
            {openUrl && (
              <a href={openUrl} target="_blank" rel="noopener noreferrer" className={styles.watch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0033">
                  {/* Same glyph as the footer's YouTube button (SocialLinks) */}
                  <path d="M23.4735 6.54167C24 8.29167 24 12.0417 24 12.0417C24 12.0417 24 15.75 23.4735 17.5417C23.2102 18.5417 22.3766 19.2917 21.3675 19.5417C19.4808 20 12.0219 20 12.0219 20C12.0219 20 4.5192 20 2.63254 19.5417C1.6234 19.2917 0.789762 18.5417 0.526508 17.5417C0 15.75 0 12.0417 0 12.0417C0 12.0417 0 8.29167 0.526508 6.54167C0.789762 5.54167 1.6234 4.75 2.63254 4.5C4.5192 4 12.0219 4 12.0219 4C12.0219 4 19.4808 4 21.3675 4.5C22.3766 4.75 23.2102 5.54167 23.4735 6.54167ZM9.5649 15.4167L15.7952 12.0417L9.5649 8.66667V15.4167Z" />
                </svg>
                {lv.open}
              </a>
            )}
          </div>
        </div>
        <div className={styles.playerWrap}>
          <div className={styles.player}>
            {(showAlt || probing) && (
              <iframe
                key={attempt}
                ref={altRef}
                src={channelUrl}
                title={lv.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className={showAlt ? undefined : styles.hidden}
                tabIndex={showAlt ? undefined : -1}
                aria-hidden={showAlt ? undefined : true}
              />
            )}
            {showMain && (
              <iframe
                ref={mainRef}
                src={embedUrl}
                title={lv.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )}
            {waiting && (
              <>
                <img src={asset('images/KV-VCSF-2026-02.jpg')} alt="" className={styles.poster} />
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
