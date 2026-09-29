import { useEffect } from 'react'
import { useMotion } from './useMotion'

/**
 * Scroll parallax for every `[data-par="<factor>"]` element: it drifts
 * against its parent's distance from the viewport centre (the parent
 * should clip it). Call once from the page root.
 */
export function useParallax() {
  const motion = useMotion()

  useEffect(() => {
    if (motion === 'off') return
    const k = motion === 'subtle' ? 0.5 : 1
    const els = [...document.querySelectorAll<HTMLElement>('[data-par]')]
    let raf = 0
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      els.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const f = parseFloat(el.dataset.par || '0')
        el.style.transform = `translate3d(0,${-(r.top + r.height / 2 - vh / 2) * f * k}px,0)`
      })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      els.forEach((el) => (el.style.transform = ''))
    }
  }, [motion])
}
