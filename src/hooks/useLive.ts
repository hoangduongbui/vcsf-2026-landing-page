import { COUNTDOWN_HIDE_AFTER, LIVE_CHANNEL_ID, LIVE_MODE, LIVE_URL } from '../config'
import { LIVE, ytId } from '../data/content'
import { useNow } from './useNow'

const ms = (iso: string) => new Date(iso).getTime()
/** `enablejsapi` + `origin` let useLiveProbe watch the player. */
const params = () =>
  `autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`

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
    /** The announced stream (LIVE_URL). */
    embedUrl: id ? `https://www.youtube.com/embed/${id}?${params()}` : '',
    watchUrl: id ? `https://www.youtube.com/watch?v=${id}` : '',
    /** Whatever the channel is broadcasting — YouTube resolves the video itself. */
    channelUrl: LIVE_CHANNEL_ID
      ? `https://www.youtube.com/embed/live_stream?channel=${LIVE_CHANNEL_ID}&${params()}`
      : '',
    channelWatchUrl: LIVE_CHANNEL_ID ? `https://www.youtube.com/channel/${LIVE_CHANNEL_ID}/live` : '',
    /** Until LIVE.catchEnd a channel stream that isn't playing yet stays behind the poster. */
    catching: liveOn && now < ms(LIVE.catchEnd),
    now,
  }
}
