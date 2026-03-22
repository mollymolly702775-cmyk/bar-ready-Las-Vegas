import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <main>
      <Helmet>
        <title>Pricing — Bar Ready LV | Inspection Plans Las Vegas</title>
        <meta name="description" content="Flat-rate pricing for Mock Health and Safety Inspections. Monthly at $350/month or Annual at $3,900/year. Consultations always free." />
        <link rel="canonical" href="https://barreadylv.com/pricing" />
      </Helmet>
      {/* ── SECTION A — Hero (Split Comparison) ── */}
      <section className={styles.heroSection}>
        {/* Decorative LV atmosphere text */}
        <span className={styles.decoLasVegas} aria-hidden="true">LAS VEGAS</span>
        <span className={styles.decoBarReady} aria-hidden="true">BAR READY</span>

        <div className={styles.heroInner}>
          {/* Top label */}
          <p className={styles.heroLabel}>MOCK HEALTH &amp; SAFETY INSPECTIONS — LAS VEGAS</p>

          {/* Main headline */}
          <h1 className={styles.heroHeadline}>The Cost of Not Being Ready.</h1>
          <p className={styles.heroSubline}>vs. The Price of Peace of Mind.</p>

          {/* Split comparison cards */}
          <div className={styles.splitGrid}>

            {/* LEFT CARD — Red / Without */}
            <div className={styles.cardBad}>
              <span className={styles.badgeBad}>WITHOUT BAR READY LV</span>
              <h2 className={styles.splitCardHeadline}>Flying Blind.</h2>
              <ul className={styles.splitList}>
                <li className={styles.splitItem}>
                  <span className={styles.iconBad}>✕</span>
                  <span>Surprise closure — doors shut, revenue gone overnight</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconBad}>✕</span>
                  <span>Fines stacking up from violations you didn't know existed</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconBad}>✕</span>
                  <span>Public health score tanks on Yelp — customers go elsewhere</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconBad}>✕</span>
                  <span>Staff scrambling during a real inspection with no preparation</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconBad}>✕</span>
                  <span>License at risk from repeated or critical violations</span>
                </li>
              </ul>
              <div className={styles.cardDividerBad} />
            </div>

            {/* RIGHT CARD — Green / With */}
            <div className={styles.cardGood}>
              <span className={styles.badgeGood}>WITH BAR READY LV</span>
              <h2 className={styles.splitCardHeadline}>Always Ready.</h2>
              <ul className={styles.splitList}>
                <li className={styles.splitItem}>
                  <span className={styles.iconGood}>✓</span>
                  <span>Mock inspections catch violations before the real inspector does</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconGood}>✓</span>
                  <span>Zero surprise closures — our clients stay open and operating</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconGood}>✓</span>
                  <span>Clean public health score protects your reputation on Yelp</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconGood}>✓</span>
                  <span>Staff trained and confident — no panic when inspectors arrive</span>
                </li>
                <li className={styles.splitItem}>
                  <span className={styles.iconGood}>✓</span>
                  <span>Full Inspection Results Report delivered within 1–2 business days</span>
                </li>
              </ul>
              <div className={styles.cardDividerGood} />
            </div>

          </div>{/* /splitGrid */}

          {/* Pricing teaser */}
          <p className={styles.pricingTeaser}>PLANS STARTING AT $350/MONTH · ANNUAL PLAN $3,900/YEAR</p>

          {/* Free consultation strip */}
          <div className={styles.consultStrip}>
            <div className={styles.consultStripText}>
              <p className={styles.consultStripHeadline}>Consultations are always free.</p>
              <p className={styles.consultStripSub}>We'll tailor the right plan for your bar.</p>
            </div>
            <Link to="/contact" className={styles.consultStripBtn}>Schedule a Free Consultation</Link>
          </div>

        </div>{/* /heroInner */}
      </section>

      {/* ── SECTION C — Pricing Cards ── */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsInner}>
          <div className={styles.cardsGrid}>

            {/* Card 1 — Monthly */}
            <div className={styles.card}>
              <div className={styles.cardPlanLabel}>Monthly Plan</div>
              <div className={styles.cardPrice}>
                <span className={styles.cardPriceNum}>$350</span>
                <span className={styles.cardPricePer}>/month</span>
              </div>
              <p className={styles.cardDesc}>
                One Mock Health and Safety Inspection per month for a single bar location.
              </p>
              <ul className={styles.cardFeatures}>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  One inspection per month
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Single bar location
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Inspection Results Report
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Email delivery in 1–2 business days
                </li>
              </ul>
              <Link to="/contact" className={styles.cardBtnNavy}>Get Started</Link>
            </div>

            {/* Card 2 — Annual */}
            <div className={styles.cardFeatured}>
              <div className={styles.bestValueBadge}>Best Value</div>
              <div className={styles.cardPlanLabel}>Annual Plan</div>
              <div className={styles.cardPrice}>
                <span className={styles.cardPriceNum}>$3,900</span>
                <span className={styles.cardPricePer}>one-time</span>
              </div>
              <p className={styles.cardDesc}>
                Full year of Mock Health and Safety Inspections. One upfront payment, maximum peace of mind.
              </p>
              <ul className={styles.cardFeatures}>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  12 inspections per year
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Single bar location
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Inspection Results Reports
                </li>
                <li className={styles.cardFeature}>
                  <span className={styles.check}>✓</span>
                  Save $300 vs monthly
                </li>
              </ul>
              <Link to="/contact" className={styles.cardBtnGreen}>Get Started</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION D — Help Choosing ── */}
      <section className={styles.helpSection}>
        <div className={styles.helpInner}>
          <h2 className={styles.helpHeadline}>Not sure which plan is right for you?</h2>
          <p className={styles.helpBody}>
            Every bar is different. We're happy to talk through your situation and recommend the best fit. Reach out — consultations are always free.
          </p>
          <Link to="/contact" className={styles.helpLink}>Contact us →</Link>
        </div>
      </section>
    </main>
  )
}
