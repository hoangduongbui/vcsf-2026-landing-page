import { useEffect, useState } from 'react'

export interface Viewport {
  vw: number
  vh: number
  /** < 760px: mobile layout */
  narrow: boolean
  /** Tall, not-narrow screens (vh/vw > 0.9): portrait hero treatment */
  portraitFit: boolean
}

function read(): Viewport {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const narrow = vw < 760
  return { vw, vh, narrow, portraitFit: !narrow && vh / vw > 0.9 }
}

export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read)

  useEffect(() => {
    const on = () => setVp(read())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  return vp
}
