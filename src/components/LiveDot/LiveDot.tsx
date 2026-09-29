import styles from './LiveDot.module.css'

/** Pulsing "live" dot: red on dark backgrounds, white on the red CTA. */
export default function LiveDot({ variant = 'red' }: { variant?: 'red' | 'white' }) {
  return <span className={`${styles.dot} ${styles[variant]}`} aria-hidden="true" />
}
