import { useState } from 'react'
import { ALBUM_URL, PHOTOS, VIDEO_POSTER, VIDEOS, YOUTUBE_CHANNEL_URL, ytThumb } from '../../data/archive'
import { useDragMarquee } from '../../hooks/useDragMarquee'
import { useMotion } from '../../hooks/useMotion'
import { useLocale, useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import Lightbox from './Lightbox'
import styles from './Library.module.css'

/** "05.1 / Ảnh" style sub-heading. */
export function SubHeading({ num, title }: { num: string; title: string }) {
  return (
    <div>
      <div className={styles.subNum}>{num}</div>
      <h3 className={styles.subTitle}>{title}</h3>
    </div>
  )
}

function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.pillLink}>
      {label}
      <span className={styles.pillIcon}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </span>
    </a>
  )
}

export default function Library() {
  const t = useT()
  const { locale } = useLocale()
  const motion = useMotion()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [vid, setVid] = useState(0)
  const [playing, setPlaying] = useState(false)
  /** Swap animation on the poster only after the user picks another video. */
  const [vidChanged, setVidChanged] = useState(false)

  const { trackRef, setPaused, handlers } = useDragMarquee(0.028, {
    onRelease: (type) => {
      if (type !== 'mouse') setPaused(false)
    },
  })

  const cv = VIDEOS[vid]
  const strip = PHOTOS.concat(PHOTOS)

  return (
    <section id="library" data-sec="library" className={styles.section}>
      <div className="container">
        <div data-reveal="">
          <SectionHeader num="05" kicker={t.libraryAside} title={t.library} tone="dark" />
        </div>

        {/* 05.1 Photos */}
        <div id="library-photos" className={styles.photos}>
          <div data-reveal="" className={styles.subHead}>
            <SubHeading num="05.1" title={t.libraryPhotos} />
            <ArrowLink href={ALBUM_URL} label={t.libraryAlbumLink} />
          </div>
        </div>
        <div
          data-reveal=""
          data-delay="100"
          className={styles.stripViewport}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          {...handlers}
        >
          <div ref={trackRef} className={styles.strip}>
            {strip.map((p, j) => {
              const i = j % PHOTOS.length
              return (
                // The whole tile opens the lightbox; a drag's closing click is
                // swallowed by the strip's onClickCapture, so dragging never opens it.
                <div key={j} className={styles.tile} style={{ aspectRatio: p.ar }} onClick={() => setLightbox(i)}>
                  <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
                  <span className={styles.tileShade} />
                  <button type="button" className={styles.expand} aria-label={t.expand}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* 05.2 Videos */}
        <div id="library-videos" className={styles.videos}>
          <div data-reveal="" className={styles.subHead}>
            <SubHeading num="05.2" title={t.libraryVideos} />
            <ArrowLink href={YOUTUBE_CHANNEL_URL} label={t.libraryVideoList} />
          </div>
          <div data-reveal="" data-delay="100" className={styles.videoBlock}>
            <div className={styles.player}>
              {playing && cv.id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${cv.id}?autoplay=1&rel=0`}
                  title={cv.title[locale]}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  key={vid}
                  type="button"
                  className={`${styles.poster} ${vidChanged && motion !== 'off' ? styles.swap : ''}`}
                  style={{ cursor: cv.id ? 'pointer' : 'default' }}
                  aria-label={cv.title[locale]}
                  onClick={() => cv.id && setPlaying(true)}
                >
                  <img
                    src={cv.id ? ytThumb(cv.id) : VIDEO_POSTER}
                    alt=""
                    onError={(e) => {
                      // maxres isn't generated for every upload — drop to hqdefault once.
                      const fallback = cv.id ? ytThumb(cv.id, 'hqdefault') : ''
                      if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                    }}
                  />
                  <span className={styles.posterShade} />
                  {cv.id ? (
                    <span className={styles.play}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                  ) : (
                    <span className={styles.soon}>{t.videoSoon}</span>
                  )}
                </button>
              )}
            </div>
            <div role="tablist" className={styles.videoTabs}>
              {VIDEOS.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === vid}
                  className={`${styles.videoTab} ${i === vid ? styles.videoTabActive : ''}`}
                  onClick={() => {
                    if (i === vid) return
                    setVidChanged(true)
                    setVid(i)
                    setPlaying(false)
                  }}
                >
                  <span className={styles.videoBar}>
                    <span />
                  </span>
                  <span className={styles.videoIcon}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="14" height="12" rx="2" />
                      <path d="M16 10l6-3v10l-6-3z" />
                    </svg>
                  </span>
                  <span className={styles.videoTitle}>{v.title[locale]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox photos={PHOTOS} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}
