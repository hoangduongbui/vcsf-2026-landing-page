import { useEffect } from 'react'

/**
 * Lock page scroll while an overlay (menu, modal, lightbox) is open.
 * The scrollbar's width is put back as padding (and exposed as `--sbw` for
 * fixed elements like the header) so nothing shifts when it disappears.
 */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const sbw = window.innerWidth - root.clientWidth
    root.style.setProperty('--sbw', sbw + 'px')
    document.body.style.paddingRight = sbw + 'px'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      root.style.removeProperty('--sbw')
    }
  }, [locked])
}
