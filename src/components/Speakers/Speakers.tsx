import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { SPEAKERS } from '../../data/speakers'
import { useT } from '../../i18n/context'
import { fold, pad2 } from '../../lib/text'
import LightBeams from '../LightBeams/LightBeams'
import SectionHeader from '../SectionHeader/SectionHeader'
import SpeakerCard from './SpeakerCard'
import SpeakerModal from './SpeakerModal'
import styles from './Speakers.module.css'

export default function Speakers() {
  const t = useT()
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  /** Text being typed into the "go to number" box (null = not editing). */
  const [numDraft, setNumDraft] = useState<string | null>(null)
  /** Index into SPEAKERS of the open modal. */
  const [open, setOpen] = useState<number | null>(null)

  const trackRef = useRef<HTMLDivElement>(null)
  /** Card jumped to via the number box; keeps the counter on it near the end. */
  const pin = useRef<number | null>(null)
  const drag = useRef<{ id: number; x: number; sl: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const flashTimer = useRef(0)

  const list = useMemo(() => {
    const q = fold(query.trim())
    return SPEAKERS.map((s, i) => ({ s, i })).filter(({ s }) => !q || fold(`${s.vi.name} ${s.en.name} ${s.org}`).includes(q))
  }, [query])

  /** Card width + gap. */
  const step = useCallback(() => {
    const tr = trackRef.current
    const c = tr?.querySelector('button')
    if (!tr || !c) return 300
    return c.getBoundingClientRect().width + (parseFloat(getComputedStyle(tr).columnGap) || 20)
  }, [])

  const update = useCallback(() => {
    const tr = trackRef.current
    if (!tr) return
    const max = tr.scrollWidth - tr.clientWidth
    let i = Math.min(Math.max(0, list.length - 1), Math.round(tr.scrollLeft / step()))
    const p = pin.current
    if (p != null && ((tr.scrollLeft >= max - 2 && p >= i) || i === p)) i = p
    setIdx(i)
    setCanPrev(tr.scrollLeft > 2)
    setCanNext(tr.scrollLeft < max - 2)
  }, [list.length, step])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const resetScroll = () => {
    pin.current = null
    setIdx(0)
    if (trackRef.current) trackRef.current.scrollLeft = 0
  }

  const scrollByStep = (dir: 1 | -1) => {
    pin.current = null
    trackRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' })
  }

  const jumpTo = () => {
    const v = parseInt(numDraft ?? '', 10)
    setNumDraft(null)
    const tr = trackRef.current
    if (!v || !tr) return
    const n = Math.min(Math.max(v, 1), list.length)
    const cards = tr.querySelectorAll<HTMLElement>('[data-spcard]')
    const c = cards[n - 1]
    if (!c) return
    const cs = getComputedStyle(tr)
    const pl = parseFloat(cs.scrollPaddingLeft) || parseFloat(cs.paddingLeft) || 0
    pin.current = n - 1
    setIdx(n - 1)
    tr.scrollTo({ left: Math.min(c.offsetLeft - pl, tr.scrollWidth - tr.clientWidth), behavior: 'smooth' })
    clearTimeout(flashTimer.current)
    cards.forEach((x) => (x.style.boxShadow = ''))
    c.style.boxShadow = '0 0 0 2px #5FE0F0, 0 12px 40px rgba(95,224,240,.35)'
    flashTimer.current = window.setTimeout(() => (c.style.boxShadow = ''), 1600)
  }

  // Mouse drag-to-scroll (touch uses native scrolling).
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    pin.current = null
    if (e.pointerType !== 'mouse' || e.button !== 0 || !trackRef.current) return
    drag.current = { id: e.pointerId, x: e.clientX, sl: trackRef.current.scrollLeft, moved: false }
  }
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const tr = trackRef.current
    if (!d || !tr || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) < 6) return
    if (!d.moved) {
      d.moved = true
      tr.setPointerCapture(e.pointerId)
      tr.style.scrollSnapType = 'none'
      tr.style.cursor = 'grabbing'
    }
    tr.scrollLeft = d.sl - dx
  }
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const tr = trackRef.current
    if (!d || !tr) return
    if (tr.hasPointerCapture(e.pointerId)) tr.releasePointerCapture(e.pointerId)
    suppressClick.current = d.moved
    drag.current = null
    tr.style.cursor = 'grab'
    if (d.moved) {
      const st = step()
      tr.scrollTo({ left: Math.round(tr.scrollLeft / st) * st, behavior: 'smooth' })
      setTimeout(() => (tr.style.scrollSnapType = ''), 450)
    }
  }

  const order = list.map((x) => x.i)

  return (
    <section id="speakers" data-sec="speakers" className={styles.section}>
      <LightBeams />
      <div className={`container ${styles.head}`}>
        <div data-reveal="">
          <SectionHeader num="03" kicker="VCSF 2026" title={t.speakers} tone="dark" />
        </div>
        <div data-reveal="" data-delay="120" className={styles.search}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FE0F0" strokeWidth="2.2" strokeLinecap="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              resetScroll()
            }}
            placeholder={t.speakerSearch}
            aria-label={t.speakerSearch}
            className={styles.searchInput}
          />
          {query && (
            <button
              type="button"
              aria-label={t.close}
              className={styles.clear}
              onClick={() => {
                setQuery('')
                resetScroll()
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div data-reveal="" data-delay="160" className={styles.body}>
        <div
          ref={trackRef}
          className={styles.track}
          onScroll={update}
          onWheel={() => (pin.current = null)}
          onTouchStart={() => (pin.current = null)}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault()
              e.stopPropagation()
              suppressClick.current = false
            }
          }}
        >
          {list.map(({ s, i }) => (
            <SpeakerCard key={s.id} speaker={s} onOpen={() => setOpen(i)} />
          ))}
        </div>

        {list.length === 0 ? (
          <p className={`container ${styles.empty}`}>{t.speakerNone}</p>
        ) : (
          <div className={`container ${styles.controls}`}>
            <div className={styles.controlsInner}>
              <span className={styles.counter}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={numDraft ?? pad2(idx + 1)}
                  onFocus={() => setNumDraft('')}
                  onChange={(e) => setNumDraft(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                    if (e.key === 'Escape') {
                      setNumDraft(null)
                      e.currentTarget.blur()
                    }
                  }}
                  onBlur={jumpTo}
                  aria-label="Go to speaker number"
                  className={styles.counterInput}
                />{' '}
                / {pad2(list.length)}
              </span>
              <button
                type="button"
                aria-label={t.speakerPrev}
                className={styles.prev}
                style={{ opacity: canPrev ? 1 : 0.35 }}
                onClick={() => scrollByStep(-1)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={t.speakerNext}
                className={styles.next}
                style={{ opacity: canNext ? 1 : 0.35 }}
                onClick={() => scrollByStep(1)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {open !== null && (
        <SpeakerModal order={order} current={open} onNavigate={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
