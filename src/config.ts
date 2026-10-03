// Site switches — the equivalents of the design reference's editor props.

/** 'auto' = live between LIVE.start and LIVE.end; 'on' / 'off' force it. */
export const LIVE_MODE: 'auto' | 'on' | 'off' = 'auto'

/**
 * YouTube URL or id of the announced live stream — shown as soon as the box appears.
 * Empty = only the channel below is used: "coming soon" poster until it really plays
 * (see LIVE.catchEnd).
 */
export const LIVE_URL: string = 'https://www.youtube.com/watch?v=ym_Euj7W8CM'

/**
 * Channel id (UC…) of the VBCSD YouTube channel, @hoiongdoanhnghiepvisuphatt244.
 * Plan B for LIVE_URL: the box switches to whatever this channel is broadcasting
 * when LIVE_URL breaks, or when the channel goes live while LIVE_URL still hasn't
 * started (i.e. they moved to another link). '' turns this off.
 */
export const LIVE_CHANNEL_ID = 'UCfMzGX7gxfZYVa9nAQHjgmA'

/** 'full' | 'subtle' | 'off'. prefers-reduced-motion always forces 'off'. */
export const MOTION: 'full' | 'subtle' | 'off' = 'full'

/** Auto-advance the history timeline every 5 s. */
export const HISTORY_AUTOPLAY = true

/** Countdown target (start of event day, Hanoi time). */
export const EVENT_START = '2026-10-05T00:00:00+07:00'

/** The hero shows the countdown / "today" pill until this moment. */
export const COUNTDOWN_HIDE_AFTER = '2026-10-08T00:00:00+07:00'

/** After this moment the pill reads "event has ended". */
export const EVENT_END = '2026-10-05T19:00:00+07:00'

/** URL of a file in public/, e.g. asset('images/logo.png'). Follows `base` in vite.config.ts. */
export const asset = (path: string) => import.meta.env.BASE_URL + path

/** Menu background (preloaded by the header so opening the menu doesn't stall). */
export const MENU_BG = asset('images/KV-VCSF-2026-02.jpg')

/** Section ids in page order — numbered 01–06 in the nav. */
export const SECTIONS = ['history', 'about', 'speakers', 'agenda', 'library', 'partners'] as const
export type SectionId = (typeof SECTIONS)[number]
