import type { CSSProperties } from 'react'
import { FACEBOOK_URL, YOUTUBE_CHANNEL_URL } from '../../data/archive'
import { useT } from '../../i18n/context'
import styles from './SocialLinks.module.css'

/** Round Facebook + YouTube buttons, shared by the footer and the menu. */
export default function SocialLinks({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const t = useT()

  return (
    <div className={`${styles.social} ${className}`} style={style} aria-label={t.social}>
      <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.btn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
          <path d="M8.17526 14.0625H5V9.46875H8.17526V7.5C8.17526 2.39062 10.5326 0 15.6804 0C16.6426 0 18.3265 0.1875 19 0.375V4.54688C18.6632 4.5 18.0378 4.5 17.2199 4.5C14.7182 4.5 13.756 5.4375 13.756 7.82812V9.46875H18.7595L17.8935 14.0625H13.756V24H8.17526V14.0625Z" />
        </svg>
      </a>
      <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.btn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
          <path d="M23.4735 6.54167C24 8.29167 24 12.0417 24 12.0417C24 12.0417 24 15.75 23.4735 17.5417C23.2102 18.5417 22.3766 19.2917 21.3675 19.5417C19.4808 20 12.0219 20 12.0219 20C12.0219 20 4.5192 20 2.63254 19.5417C1.6234 19.2917 0.789762 18.5417 0.526508 17.5417C0 15.75 0 12.0417 0 12.0417C0 12.0417 0 8.29167 0.526508 6.54167C0.789762 5.54167 1.6234 4.75 2.63254 4.5C4.5192 4 12.0219 4 12.0219 4C12.0219 4 19.4808 4 21.3675 4.5C22.3766 4.75 23.2102 5.54167 23.4735 6.54167ZM9.5649 15.4167L15.7952 12.0417L9.5649 8.66667V15.4167Z" />
        </svg>
      </a>
    </div>
  )
}
