// Past editions, photo library and video library — from the design reference.

import { asset } from '../config'
import type { Locale } from './content'

const I = asset('images/')

export interface Year {
  year: string
  href: string
  image: string
  vi: string
  en: string
}

/** Newest first — this is also the left-to-right order of the timeline. */
export const YEARS: Year[] = [
  { year: '2025', href: 'https://vcsf.vbcsd.vn/', image: I + 'history/2025.jpg', vi: 'Phát triển bền vững trong kỷ nguyên mới: Biến khát vọng vươn mình thành hành động', en: 'Sustainable Development in a New Era: Turning Aspirations into Action' },
  { year: '2024', href: 'https://vcsf.vbcsd.vn/2024/HTML-VCCI-Landing-2024-Aug', image: I + 'history/2024-1.jpg', vi: 'Net Zero 2050: Bồi đắp niềm tin – Kiến tạo chuyển đổi', en: 'Net Zero 2050: Nurturing Trust – Creating Transformation' },
  { year: '2023', href: 'https://vcsf.vbcsd.vn/2023/', image: I + 'history/2023.jpg', vi: 'Cuộc đua xanh toàn cầu: Từ chiến lược đến thực hành kinh doanh bền vững', en: 'Global Green Race: From Strategy to Execution of Sustainable Business' },
  { year: '2022', href: 'https://vcsf.vbcsd.vn/2022/', image: I + 'history/2022.jpg', vi: 'Chuyển đổi, Tăng tốc, Bứt phá: Doanh nghiệp vững bền – Quốc gia thịnh vượng', en: 'Transform, Speed Up, Break Through: Sustainable Business – Prosperous Nation' },
  { year: '2021', href: 'https://vcsf.vbcsd.vn/2021/csi', image: I + 'history/2021-new.jpg', vi: 'Hướng tới thập kỷ phát triển bền vững tốt đẹp hơn: Không để ai bị bỏ lại phía sau', en: 'Toward a Better Decade of Sustainable Development: Leaving No One Behind' },
  { year: '2020', href: 'https://vcsf.vbcsd.vn/2020/', image: I + 'history/2020.jpg', vi: 'Phát triển bền vững trong thập niên mới: Biến thách thức thành cơ hội', en: 'Sustainable Development in the New Decade: Turning Challenges into Opportunities' },
]

// --- 05 Library ---

/** Poster for videos that have no YouTube id yet. */
export const VIDEO_POSTER = I + 'kv-vcsf-2026-01-original.jpg'

/** YouTube's own thumbnail (1280×720); `hqdefault` is the always-present fallback. */
export const ytThumb = (id: string, size: 'maxresdefault' | 'hqdefault' = 'maxresdefault') =>
  `https://i.ytimg.com/vi/${id}/${size}.jpg`

export const ALBUM_URL = 'https://vbcsd.vn/album.asp'
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@hoiongdoanhnghiepvisuphatt244'
/** All documents currently point to one shared folder (individual PDFs pending). */
export const DOCUMENTS_URL = 'https://drive.google.com/drive/folders/1AkbTogZPtPyeqUJ2xS4y3OYYRG3D-UqR'

export interface Photo {
  src: string
  alt: string
  /** CSS aspect-ratio of the tile in the photo strip */
  ar: string
}

// Source: vbcsd.vn/albumde.asp?id=48 (VCSF 2025 album) — real 2025 photos pending from the client.
export const PHOTOS: Photo[] = [
  { src: I + 'history/2023.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2025-gallery.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2022.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2021-new.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2020.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2021.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2025-gallery.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2023.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2024-1.jpg', alt: 'VCSF 2025', ar: '3/2' },
  { src: I + 'history/2025-gallery.jpg', alt: 'VCSF 2025', ar: '3/2' },
]

export interface Video {
  /** YouTube video id; '' shows the "Đang cập nhật" placeholder. */
  id: string
  title: Record<Locale, string>
}

export const VIDEOS: Video[] = [
  {
    id: '1wRxXT3qVP8',
    title: {
      vi: 'Diễn đàn Doanh nghiệp PTBV Việt Nam (VCSF) 2025',
      en: 'Vietnam Corporate Sustainability Forum (VCSF) 2025',
    },
  },
  {
    id: '',
    title: {
      vi: 'Diễn đàn Doanh nghiệp PTBV Việt Nam (VCSF) 2026',
      en: 'Vietnam Corporate Sustainability Forum (VCSF) 2026',
    },
  },
]
