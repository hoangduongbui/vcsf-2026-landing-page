import { useEffect, useRef, useState } from 'react'

/**
 * Header scroll state: `scrolled` (past 30px), the id of the `[data-sec]`
 * section whose top is above 40% of the viewport, and a ref for the
 * progress-bar element whose width is updated without re-rendering.
 */
export function useScrollState() {
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState('top')
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      setScrolled(y > 30)
      const docH = document.documentElement.scrollHeight - vh
      if (progressRef.current) {
        progressRef.current.style.width = (docH > 0 ? Math.min(100, (y / docH) * 100) : 0) + '%'
      }
      let cur = 'top'
      document.querySelectorAll<HTMLElement>('[data-sec]').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.4) cur = el.dataset.sec || cur
      })
      setSection(cur)
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
    }
  }, [])

  return { scrolled, section, progressRef }
}
