import { useEffect, useState } from 'react'
import { MOTION } from '../config'

export type MotionMode = 'full' | 'subtle' | 'off'

const QUERY = '(prefers-reduced-motion: reduce)'

function current(): MotionMode {
  if (typeof window !== 'undefined' && window.matchMedia(QUERY).matches) return 'off'
  return MOTION
}

/** Non-reactive read, for imperative code (rAF loops, observers). */
export const getMotion = current

/** Motion level: config value, forced to 'off' by prefers-reduced-motion. */
export function useMotion(): MotionMode {
  const [mode, setMode] = useState<MotionMode>(current)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const on = () => setMode(current())
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = mode
  }, [mode])

  return mode
}
