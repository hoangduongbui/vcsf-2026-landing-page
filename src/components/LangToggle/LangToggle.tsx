import { useLocale } from '../../i18n/context'
import styles from './LangToggle.module.css'

/** VI / EN pill used in the header and in the mobile menu. */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  return (
    <div className={`${styles.toggle} ${className}`}>
      {(['vi', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          className={locale === l ? styles.active : undefined}
          aria-pressed={locale === l}
          onClick={() => setLocale(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
