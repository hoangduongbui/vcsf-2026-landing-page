import { COUNTDOWN_HIDE_AFTER, LIVE_MODE, LIVE_URL } from '../config'
import { LIVE, ytId } from '../data/content'
import { useNow } from './useNow'

const ms = (iso: string) => new Date(iso).getTime()

/** Live-stream state shared by the hero CTA and the #live section. */
export function useLive() {
  const now = useNow()
  const liveOn =
    LIVE_MODE === 'on' || (LIVE_MODE === 'auto' && now >= ms(LIVE.start) && now < ms(LIVE.end))
  const id = ytId(LIVE_URL)

  return {
    liveOn,
    /** Countdown pill is shown when not live and before COUNTDOWN_HIDE_AFTER. */
    liveOff: !liveOn && now < ms(COUNTDOWN_HIDE_AFTER),
    videoId: id,
    embedUrl: id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1` : '',
    watchUrl: id ? `https://www.youtube.com/watch?v=${id}` : '',
    now,
  }
}
