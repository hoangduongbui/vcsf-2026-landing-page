import { HIDDEN_GROUPS, SP_GROUPS, speakerImage, type Speaker } from '../../data/speakers'
import { useLocale, useT } from '../../i18n/context'
import styles from './Speakers.module.css'

export function PersonPlaceholder({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
    </svg>
  )
}

export default function SpeakerCard({ speaker: s, onOpen }: { speaker: Speaker; onOpen: () => void }) {
  const t = useT()
  const { locale } = useLocale()
  const txt = s[locale]

  return (
    <button type="button" data-spcard="" className={styles.card} onClick={onOpen}>
      <span className={styles.cardMedia}>
        {s.img ? (
          <img src={speakerImage(s)} alt={txt.name} draggable={false} loading="lazy" />
        ) : (
          <span className={styles.placeholder}>
            <PersonPlaceholder size={56} />
            <span>{t.spUpdating}</span>
          </span>
        )}
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardText}>
          {!HIDDEN_GROUPS.includes(s.g) && <span className={styles.group}>{SP_GROUPS[locale][s.g]}</span>}
          <strong className={styles.name}>{txt.name}</strong>
          {txt.role ? (
            <span className={styles.role}>{txt.role}</span>
          ) : (
            <span className={styles.roleEmpty}>{t.spUpdating}</span>
          )}
          <span className={styles.org}>{s.org}</span>
        </span>
        <span className={styles.arrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      </span>
    </button>
  )
}
