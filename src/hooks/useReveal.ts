import { useEffect } from 'react'
import { EASE } from '../lib/scroll'
import { getMotion } from './useMotion'

/**
 * Scroll reveal for every `[data-reveal]` element (optional `data-delay` in ms):
 * elements below the fold start 36px down + transparent and slide in once.
 * Call once from the page root, after all sections have mounted.
 */
export function useReveal() {
  useEffect(() => {
    if (getMotion() === 'off') return
    const timers: number[] = []
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const d = +(el.dataset.delay || 0)
          el.style.transition = `opacity 1s ${d}ms ${EASE}, transform 1s ${d}ms ${EASE}`
          el.style.opacity = '1'
          el.style.transform = 'none'
          io.unobserve(el)
          timers.push(
            window.setTimeout(() => {
              el.style.transition = ''
              el.style.transform = ''
            }, 1100 + d),
          )
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(36px)'
      io.observe(el)
    })
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])
}
