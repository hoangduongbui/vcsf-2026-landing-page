import { useEffect, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Photo } from '../../data/archive'
import { useBodyLock } from '../../hooks/useBodyLock'
import { useMotion } from '../../hooks/useMotion'
import { useT } from '../../i18n/context'
import { pad2 } from '../../lib/text'
import styles from './Lightbox.module.css'

interface Props {
  photos: Photo[]
  index: number
  onChange: (i: number) => void
  onClose: () => void
}

export default function Lightbox({ photos, index, onChange, onClose }: Props) {
  const t = useT()
  const motion = useMotion()
  const n = photos.length
  /** Animate the photo swap only after the user navigates, not on open. */
  const [moved, setMoved] = useState(false)
  const show = (i: number) => {
    setMoved(true)
    onChange(i)
  }
  useBodyLock(true)

  const go = (dir: 1 | -1) => show((index + dir + n) % n)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setMoved(true)
        onChange((index + (e.key === 'ArrowRight' ? 1 : -1) + n) % n)
      } else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, n, onChange, onClose])

  const stop = (e: MouseEvent) => e.stopPropagation()
  const photo = photos[index]

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.bar}>
        <span className={styles.count}>
          <strong>{pad2(index + 1)}</strong> / {pad2(n)}
        </span>
        <button type="button" className={styles.close} aria-label={t.close} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className={styles.stage}>
        <img
          key={index}
          src={photo.src}
          alt={photo.alt}
          className={`${styles.img} ${moved && motion !== 'off' ? styles.swap : ''}`}
          onClick={stop}
        />
        <button
          type="button"
          aria-label="Previous"
          className={`${styles.nav} ${styles.prev}`}
          onClick={(e) => {
            e.stopPropagation()
            go(-1)
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          className={`${styles.nav} ${styles.next}`}
          onClick={(e) => {
            e.stopPropagation()
            go(1)
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className={styles.thumbs} onClick={stop}>
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${pad2(i + 1)} / ${pad2(n)}`}
            className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
            onClick={() => show(i)}
          >
            <img src={p.src} alt="" />
          </button>
        ))}
      </div>
    </div>,
    document.body,
  )
}
