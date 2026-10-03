import { useEffect, useRef, useState } from 'react'

/** While nothing is playing, a `retry` player is reloaded this often. */
const RETRY_MS = 60_000
const PLAYING = 1

interface YTApi {
  Player: new (
    el: HTMLIFrameElement,
    opts: { events: { onStateChange: (e: { data: number }) => void; onError: () => void } },
  ) => unknown
}

declare global {
  interface Window {
    YT?: YTApi
    onYouTubeIframeAPIReady?: () => void
  }
}

let api: Promise<void> | null = null

/** Loads YouTube's IFrame Player API once, on first use. */
function loadApi(): Promise<void> {
  api ??= new Promise<void>((resolve) => {
    if (window.YT?.Player) return resolve()
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  })
  return api
}

/**
 * Watches a YouTube iframe (needs `enablejsapi=1`). `caught` turns true once it
 * actually plays; `failed` once the player reports an error (removed, private,
 * embedding off…). A stream that is only scheduled sits on "unstarted" — neither.
 * With `retry`, put `attempt` on the iframe's `key` so each retry loads a fresh player.
 */
export function useLiveProbe(active: boolean, retry: boolean) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [caught, setCaught] = useState(false)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const probing = active && !caught

  useEffect(() => {
    if (!probing) return
    let dead = false
    loadApi().then(() => {
      if (dead || !frameRef.current || !window.YT) return
      new window.YT.Player(frameRef.current, {
        events: {
          onStateChange: (e) => {
            if (!dead && e.data === PLAYING) setCaught(true)
          },
          onError: () => {
            if (!dead) setFailed(true)
          },
        },
      })
    })
    const timer = retry ? setTimeout(() => setAttempt((a) => a + 1), RETRY_MS) : 0
    return () => {
      dead = true
      clearTimeout(timer)
    }
  }, [probing, retry, attempt])

  return { frameRef, caught, failed, attempt }
}
