import { useEffect, useId, useRef } from 'react'
import { useMotion } from '../../hooks/useMotion'
import styles from './LightBeams.module.css'

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

const PATHS = [
  { d: 'M-40 470 C 300 400 560 250 760 60', side: 'A', w: 6, glow: true },
  { d: 'M-40 500 C 360 440 640 320 820 120', side: 'A', w: 2, glow: false },
  { d: 'M1480 460 C 1140 400 880 260 690 40', side: 'B', w: 6, glow: true },
  { d: 'M1480 500 C 1100 450 820 330 640 110', side: 'B', w: 2, glow: false },
] as const

interface Props {
  /** Mirror vertically and pin to the section bottom (dark → light transition). */
  flip?: boolean
  /** Peak opacity of the left-hand beams. */
  peak?: number
}

/**
 * Curved light beams across a colour-zone boundary. They draw themselves in
 * as the SVG scrolls into view (dash offset 1 → 0).
 */
export default function LightBeams({ flip = false, peak = 0.95 }: Props) {
  const id = useId().replace(/:/g, '')
  const ref = useRef<SVGSVGElement>(null)
  const motion = useMotion()

  useEffect(() => {
    const svg = ref.current
    if (!svg || motion === 'off') return
    const paths = [...svg.querySelectorAll('path')]
    let raf = 0
    const tick = () => {
      raf = 0
      const vh = window.innerHeight
      const p = clamp01((vh - svg.getBoundingClientRect().top) / (vh * 0.95))
      paths.forEach((path, i) => {
        path.style.strokeDashoffset = String(1 - clamp01(p * 1.25 - (i % 2) * 0.12))
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
      paths.forEach((path) => (path.style.strokeDashoffset = ''))
    }
  }, [motion])

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      className={`${styles.beams} ${flip ? styles.flip : ''}`}
    >
      <defs>
        <linearGradient id={`${id}A`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".45" stopColor="#fff" stopOpacity={peak} />
          <stop offset="1" stopColor="#5FE0F0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}B`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#9CF7D6" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}G`} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {PATHS.map((p) => (
        <path
          key={p.d}
          pathLength={1}
          d={p.d}
          fill="none"
          stroke={`url(#${id}${p.side})`}
          strokeWidth={p.w}
          filter={p.glow ? `url(#${id}G)` : undefined}
          className={styles.path}
        />
      ))}
    </svg>
  )
}
