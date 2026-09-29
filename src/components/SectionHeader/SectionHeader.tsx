import styles from './SectionHeader.module.css'

interface Props {
  num: string
  kicker: string
  title: string
  /** 'light' = blue on light backgrounds, 'dark' = aqua on blue backgrounds */
  tone?: 'light' | 'dark'
  /** Reveal kicker and title separately (0 / 80ms) instead of as one block. */
  split?: boolean
}

/** Numbered section heading: "01 —— KICKER" + large title. */
export default function SectionHeader({ num, kicker, title, tone = 'light', split = false }: Props) {
  const reveal = split ? { 'data-reveal': '' } : {}
  return (
    <>
      <div {...reveal} className={`${styles.kicker} ${styles[tone]}`}>
        <span>{num}</span>
        <span className={styles.rule} />
        <span>{kicker}</span>
      </div>
      <h2 {...reveal} data-delay={split ? '80' : undefined} className={`${styles.title} ${styles[tone]}`}>
        {title}
      </h2>
    </>
  )
}
