import { asset } from '../../config'
import { PARTNERS } from '../../data/partners'
import { useViewport } from '../../hooks/useViewport'
import { useLocale, useT } from '../../i18n/context'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Partners.module.css'

/** Per-tier layout, indexed like PARTNERS: Strategic, Platinum, Gold, Bronze. */
const TIER = {
  cols: {
    wide: ['repeat(4,minmax(0,1fr))', 'minmax(0,calc((100% - 42px)/4))', 'repeat(6,minmax(0,1fr))', 'repeat(5,minmax(0,1fr))'],
    // Platinum shares Strategic's 2-column grid so its single logo lines up with the column above.
    narrow: ['repeat(2,minmax(0,1fr))', 'repeat(2,minmax(0,1fr))', 'repeat(3,minmax(0,1fr))', 'repeat(3,minmax(0,1fr))'],
  },
  height: { wide: ['120px', '100px', '80px', '64px'], narrow: ['104px', '96px', '72px', '60px'] },
  pad: { wide: ['16px 22px', '14px 22px', '12px 16px', '10px 14px'], narrow: ['14px', '14px', '10px', '8px'] },
  /** Tier dot: aqua (strategic), platinum, gold, bronze */
  dot: [
    'linear-gradient(135deg,#5FE0F0 0%,#1FA2F2 45%,#0A4FE6 100%)',
    'linear-gradient(135deg,#FFFFFF 0%,#D5DCE4 45%,#8C98A6 100%)',
    'linear-gradient(135deg,#FFE9A3 0%,#E0AE2A 55%,#A87700 100%)',
    'linear-gradient(135deg,#F3C7A0 0%,#C07A45 55%,#7A4521 100%)',
  ],
}

export default function Partners() {
  const t = useT()
  const { locale } = useLocale()
  const { narrow } = useViewport()
  const size = narrow ? 'narrow' : 'wide'

  return (
    <section id="partners" data-sec="partners" className={styles.section}>
      <div className="container">
        <div data-reveal="">
          <SectionHeader num="06" kicker="VCSF 2026" title={t.partners} />
        </div>
        <div className={styles.tiers}>
          {PARTNERS.map((tier, i) => (
            <div key={tier.en} data-reveal="" className={styles.tier}>
              <div className={styles.label}>
                <span className={styles.dot} style={{ background: TIER.dot[i] }} />
                {tier[locale]}
              </div>
              <div
                className={styles.grid}
                style={{ gridTemplateColumns: TIER.cols[size][i], gap: narrow ? '10px' : '14px' }}
              >
                {tier.logos.map((lg) => (
                  <div key={lg.id} className={styles.logo} style={{ height: TIER.height[size][i], padding: TIER.pad[size][i] }}>
                    <img src={asset(`images/partners/${lg.id}.png`)} alt={lg[locale]} title={lg[locale]} loading="lazy" style={{ height: lg.hf }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
