import { useEffect, useRef, type PointerEvent, type MouseEvent } from 'react'
import { useMotion } from './useMotion'

interface Options {
  /** Called once a drag passes the 5px threshold. */
  onDragStart?: () => void
  /** Called on pointer release after a press started on the strip. */
  onRelease?: (pointerType: string) => void
}

/**
 * Endless horizontal strip: auto-scrolls left at `speed` px/ms (halved in
 * 'subtle' motion, stopped in 'off'), pauses on demand, and can be dragged.
 * The track must contain its items twice so it can wrap at half its width.
 */
export function useDragMarquee(speed: number, { onDragStart, onRelease }: Options = {}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const x = useRef(0)
  const drag = useRef<{ x: number; mx: number; id: number } | null>(null)
  const moved = useRef(0)
  const motion = useMotion()

  useEffect(() => {
    const k = motion === 'subtle' ? 0.5 : 1
    let raf = 0
    let last = 0
    const loop = (ts: number) => {
      const el = trackRef.current
      if (el) {
        const dt = last ? Math.min(50, ts - last) : 16
        if (motion !== 'off' && !paused.current && !drag.current) x.current -= dt * speed * k
        const half = el.scrollWidth / 2
        if (half) {
          while (-x.current >= half) {
            x.current += half
            if (drag.current) drag.current.mx += half
          }
          while (x.current > 0) {
            x.current -= half
            if (drag.current) drag.current.mx -= half
          }
        }
        el.style.transform = `translate3d(${x.current}px,0,0)`
      }
      last = ts
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [motion, speed])

  const handlers = {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (e.button !== 0) return
      drag.current = { x: e.clientX, mx: x.current, id: e.pointerId }
      moved.current = 0
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x
      const wasDragging = moved.current > 5
      moved.current = Math.max(moved.current, Math.abs(dx))
      if (moved.current > 5) {
        try {
          e.currentTarget.setPointerCapture(d.id)
        } catch {
          /* pointer already released */
        }
        e.currentTarget.style.cursor = 'grabbing'
        if (!wasDragging) onDragStart?.()
      }
      x.current = d.mx + dx
    },
    onPointerUp: (e: PointerEvent<HTMLElement>) => {
      if (!drag.current) return
      drag.current = null
      e.currentTarget.style.cursor = 'grab'
      onRelease?.(e.pointerType)
    },
    /** Swallow the click that ends a drag so items don't open. */
    onClickCapture: (e: MouseEvent<HTMLElement>) => {
      if (moved.current > 5) {
        e.stopPropagation()
        e.preventDefault()
        moved.current = 0
      }
    },
  }

  return {
    trackRef,
    setPaused: (v: boolean) => {
      paused.current = v
    },
    isDragging: () => !!drag.current,
    handlers: { ...handlers, onPointerCancel: handlers.onPointerUp },
  }
}
