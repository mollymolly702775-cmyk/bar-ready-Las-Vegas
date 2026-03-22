import { useState, useRef, useEffect } from 'react'
import styles from '../pages/HowItWorks.module.css'

const steps = [
  {
    num: 1,
    title: 'Discovery',
    desc: 'Client finds Bar Ready LV via Google Ads, Facebook Ads, or Instagram Ads. Our reach ensures you can find us exactly when you need us most.'
  },
  {
    num: 2,
    title: 'Booking',
    desc: 'Client books an appointment through our booking process. We make scheduling simple and stress-free so you can get started right away.'
  },
  {
    num: 3,
    title: 'Pre-Inspection Outreach',
    desc: 'We send a welcome email introducing Bar Ready LV and a detailed list of what the Mock Health and Safety Inspection covers — so you know exactly what to expect.'
  },
  {
    num: 4,
    title: 'Day-Of Confirmation',
    desc: 'We email and text you to confirm the appointment on the day of the inspection. No surprises, no confusion — just clear communication from our team.'
  },
  {
    num: 5,
    title: 'On-Site Inspection',
    desc: 'We meet you at your bar, walk through all services, and perform the full Mock Health and Safety Inspection. Thorough, professional, and minimally disruptive to your operations.'
  },
  {
    num: 6,
    title: 'Results Delivery',
    desc: 'We thank you and deliver detailed inspection results via email within 1–2 business days. Every finding is prioritized by urgency so you know what to address first.'
  },
  {
    num: 7,
    title: 'Retention',
    desc: "We confirm the next month's appointment and send a final thank-you message to close the loop. Ongoing compliance, month after month."
  }
]

const faqs = [
  {
    q: 'How long does a Mock Health and Safety Inspection take?',
    a: 'Most Mock Health and Safety Inspections take 1–2 hours depending on the size and layout of your venue. We work efficiently and thoroughly to minimize disruption to your operations.'
  },
  {
    q: 'What areas of my bar are covered?',
    a: 'We conduct a comprehensive review covering food handling and storage, sanitation, equipment maintenance, staff hygiene, temperature logs, and more — mirroring the standards used by actual health inspectors.'
  },
  {
    q: 'Do I need to close my bar during the inspection?',
    a: 'Not at all. Our Mock Health and Safety Inspections are designed to work around your schedule and operations. Many clients prefer to schedule during slower hours.'
  },
  {
    q: 'What happens after the inspection?',
    a: "You'll receive a detailed Inspection Results Report within 1–2 business days outlining every finding, prioritized by urgency, so you know exactly what to address first."
  },
  {
    q: 'Can I sign up for ongoing monthly inspections?',
    a: 'Yes — our Monthly Plan at $350/month keeps your bar consistently inspection-ready. We also offer an Annual Plan at $3,900 for maximum peace of mind and savings.'
  }
]

const inspectionDots = [
  {
    id: 1,
    left: '10%',
    top: '49%',
    title: 'Refrigeration Temperatures',
    info: 'All refrigeration units must maintain 41°F or below. SNHD inspectors probe internal temps — not just the dial reading.',
  },
  {
    id: 2,
    left: '45%',
    top: '32%',
    title: 'Bottle Labeling & Original Containers',
    info: 'All spirits must be in their original labeled containers. Refilling brand-name bottles with cheaper product is a critical violation.',
  },
  {
    id: 3,
    left: '50%',
    top: '82%',
    title: 'Food Contact Surface Sanitation',
    info: 'Bar tops and prep surfaces must be cleaned and sanitized every 4 hours minimum. Sanitizer concentration is tested on-site.',
  },
  {
    id: 4,
    left: '48%',
    top: '74%',
    title: 'Ice Handling & Contamination',
    info: 'Ice is considered a food. Scoops must be stored handle-up, never submerged. No direct hand contact with ice is permitted.',
  },
  {
    id: 5,
    left: '88%',
    top: '68%',
    title: 'Handwashing Station Compliance',
    info: 'Dedicated handwash sinks must be accessible, stocked with soap and paper towels, and used ONLY for handwashing — not dumping drinks or rinsing tools.',
  },
  {
    id: 6,
    left: '50%',
    top: '8%',
    title: 'Glassware Storage & Air Drying',
    info: 'Glasses must be inverted or stored to prevent contamination. Towel-drying glassware is a violation — air drying only.',
  },
  {
    id: 7,
    left: '23%',
    top: '93%',
    title: 'Floor, Drain & Pest Evidence',
    info: 'Inspectors check for standing water, grease buildup, drain covers, and any evidence of pest activity under and behind the bar.',
  },
  {
    id: 8,
    left: '72%',
    top: '26%',
    title: 'Employee Health & Food Handler Cards',
    info: 'All food handlers must have valid Southern Nevada Health District food handler cards on-site and available for review.',
  },
]

const bottleCenters = [219, 284, 349, 414, 479, 544, 609, 674]

function DotHotspot({ dot, index }) {
  const [hovered, setHovered] = useState(false)
  const pingDelay = `${index * 0.3}s`

  const leftNum = parseFloat(dot.left)
  const topNum = parseFloat(dot.top)
  const isRightHalf = leftNum > 50
  const isBottomHalf = topNum > 50
  const translateDir = isBottomHalf ? '5px' : '-5px'

  const tooltipStyle = {
    opacity: hovered ? 1 : 0,
    pointerEvents: 'none',
    zIndex: 100,
  }

  if (isBottomHalf) {
    tooltipStyle.bottom = 'calc(100% + 14px)'
  } else {
    tooltipStyle.top = 'calc(100% + 14px)'
  }

  if (isRightHalf) {
    tooltipStyle.right = '0'
    tooltipStyle.transform = hovered ? 'translateY(0)' : `translateY(${translateDir})`
  } else {
    tooltipStyle.left = '0'
    tooltipStyle.transform = hovered ? 'translateY(0)' : `translateY(${translateDir})`
  }

  return (
    <div
      className={styles.dotWrapper}
      style={{ left: dot.left, top: dot.top }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(v => !v)}
      role="button"
      tabIndex={0}
      aria-label={dot.title}
    >
      <div
        className={styles.dotPing}
        style={{
          animationDelay: pingDelay,
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
      <div className={styles.dotCore} />
      <div className={styles.dotTooltip} style={tooltipStyle}>
        <p className={styles.tooltipTitle}>{dot.title}</p>
        <p className={styles.tooltipInfo}>{dot.info}</p>
      </div>
    </div>
  )
}

function StepCard({ step, index, isLast }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${index * 80}ms`
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add(styles.cardVisible)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={ref} className={`${styles.stepCard} ${isLast ? styles.stepCardLast : ''}`}>
      <div className={isLast ? styles.stepCardLastInner : undefined}>
        <span className={styles.stepCardNum}>{step.num}</span>
        <h3 className={styles.stepCardTitle}>{step.title}</h3>
        <p className={styles.stepCardDesc}>{step.desc}</p>
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`}>
      <button className={styles.faqQuestion} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`}>+</span>
      </button>
      <div
        className={styles.faqAnswer}
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
        ref={bodyRef}
      >
        <p className={styles.faqAnswerText}>{a}</p>
      </div>
    </div>
  )
}

export default function HowItWorksSteps() {
  return (
    <>
      {/* ===== WHAT WE LOOK FOR ===== */}
      <section className={styles.inspectSection}>
        <div className={styles.inspectContainer}>
          <h2 className={`${styles.inspectHeadline} fade-in`}>What We Look For</h2>
          <p className={`${styles.inspectSub} fade-in`}>
            Every dot is a checkpoint. Hover to see what Southern Nevada Health District inspectors evaluate.
          </p>

          <div className={styles.svgWrapper}>
            <svg
              viewBox="0 0 900 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              aria-hidden="true"
            >
              <rect x="0" y="0" width="900" height="480" fill="rgba(255,255,255,0.03)" rx="12" />
              <line x1="320" y1="8" x2="320" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <line x1="450" y1="8" x2="450" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <line x1="580" y1="8" x2="580" y2="36" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <rect x="270" y="36" width="360" height="8" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              {[310, 360, 450, 540, 590].map((cx, i) => (
                <g key={`gl${i}`}>
                  <line x1={cx} y1={44} x2={cx} y2={56} stroke="rgba(255,255,255,0.15)" strokeWidth={1.2} />
                  <path d={`M ${cx - 10} 56 L ${cx - 10} 72 Q ${cx} 82 ${cx + 10} 72 L ${cx + 10} 56`} stroke="rgba(255,255,255,0.2)" strokeWidth={1.2} fill="rgba(255,255,255,0.03)" />
                  <line x1={cx - 10} y1={56} x2={cx + 10} y2={56} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                </g>
              ))}
              <rect x="163" y="90" width="570" height="278" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <rect x="163" y="90" width="14" height="278" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <rect x="719" y="90" width="14" height="278" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <rect x="163" y="192" width="570" height="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <rect x="163" y="300" width="570" height="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              {bottleCenters.map((cx, i) => (
                <g key={`tb${i}`}>
                  <rect x={cx - 10} y={130} width={20} height={62} rx={3} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.3} />
                  <rect x={cx - 4} y={113} width={8} height={19} rx={2} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.3} />
                  <rect x={cx - 5} y={108} width={10} height={7} rx={1.5} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  <rect x={cx - 7} y={148} width={14} height={26} rx={1} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />
                </g>
              ))}
              {bottleCenters.map((cx, i) => (
                <g key={`mb${i}`}>
                  <rect x={cx - 10} y={236} width={20} height={64} rx={3} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.3} />
                  <rect x={cx - 4} y={217} width={8} height={21} rx={2} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.3} />
                  <rect x={cx - 5} y={211} width={10} height={8} rx={1.5} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                  <rect x={cx - 7} y={254} width={14} height={28} rx={1} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />
                </g>
              ))}
              <rect x="30" y="100" width="115" height="268" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
              <line x1="128" y1="205" x2="128" y2="262" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="196" x2="140" y2="196" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5,3" />
              <line x1="35" y1="280" x2="140" y2="280" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5,3" />
              <line x1="20" y1="375" x2="880" y2="375" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <line x1="30" y1="422" x2="870" y2="422" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
              <rect x="362" y="338" width="148" height="37" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="815" y1="255" x2="815" y2="298" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 802 265 Q 815 257 828 265" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="757" y="298" width="118" height="70" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <rect x="767" y="308" width="98" height="52" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <rect x="176" y="433" width="54" height="36" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
              <line x1="190" y1="433" x2="190" y2="469" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="206" y1="433" x2="206" y2="469" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="222" y1="433" x2="222" y2="469" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="176" y1="451" x2="230" y2="451" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>

            {inspectionDots.map((dot, i) => (
              <DotHotspot key={dot.id} dot={dot} index={i} />
            ))}
          </div>

          <div className={styles.inspectCallout}>
            <span className={styles.inspectCalloutLabel}>Just the Beginning</span>
            <p className={styles.inspectCalloutMain}>
              These are just a few of the major checkpoints we evaluate. A real Southern Nevada Health
              District inspection covers dozens of additional criteria — many of which bar owners don't
              know exist until it's too late.
            </p>
            <p className={styles.inspectCalloutSub}>
              Reach out to get the full picture. We'll walk you through our complete checklist and show
              you exactly what your bar could be flagged for.
            </p>
            <a href="/contact" className={styles.inspectCalloutLink}>
              Get the Full Checklist →
            </a>
          </div>

          <p className={styles.inspectNote}>
            Based on Southern Nevada Health District inspection criteria.
          </p>
        </div>
      </section>

      {/* ===== STEPS CARD GRID ===== */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsContainer}>
          <h2 className={`${styles.stepsHeadline} fade-in`}>Your Journey with Bar Ready LV</h2>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <StepCard
                key={step.num}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TAKE IT FURTHER — UNANNOUNCED INSPECTION ===== */}
      <section className={styles.unannouncedSection}>
        <div className={styles.unannouncedContainer}>
          <div className={`${styles.unannouncedHeader} fade-in`}>
            <h2 className={styles.unannouncedHeadline}>Take It Further</h2>
            <p className={styles.unannouncedSubheading}>For bars that want the real test.</p>
          </div>

          <div className={styles.unannouncedCard}>
            {/* LEFT: text */}
            <div className={styles.unannouncedLeft}>
              <span className={styles.unannouncedBadge}>Advanced Option</span>
              <h3 className={styles.unannouncedTitle}>Unannounced Mock Inspection</h3>
              <p className={styles.unannouncedBody}>
                SNHD inspectors don't call ahead — and neither will we. Schedule an unannounced Mock
                Health and Safety Inspection where we arrive at a random time, catching your staff
                exactly as a real inspector would find them. No preparation. No variables. Just the
                real picture of your bar's compliance at any given moment.
              </p>
              <p className={styles.unannouncedBody}>
                Bars that pass an unannounced mock inspection know they're truly protected — not just
                on their best day.
              </p>
              <a href="/contact" className={styles.unannouncedLink}>
                Inquire About Unannounced Inspections →
              </a>
            </div>

            {/* RIGHT: benefit chips */}
            <div className={styles.unannouncedRight}>
              <div className={styles.unannouncedChip}>
                <span className={styles.unannouncedChipIcon}>↑</span>
                <div>
                  <p className={styles.unannouncedChipLabel}>Revenue Protection</p>
                  <p className={styles.unannouncedChipSub}>Catch compliance gaps before they cost you closures and fines</p>
                </div>
              </div>
              <div className={styles.unannouncedChip}>
                <span className={styles.unannouncedChipIcon}>★</span>
                <div>
                  <p className={styles.unannouncedChipLabel}>Real Staff Accountability</p>
                  <p className={styles.unannouncedChipSub}>See exactly how your team performs without advance notice or preparation</p>
                </div>
              </div>
              <div className={styles.unannouncedChip}>
                <span className={styles.unannouncedChipIcon}>→</span>
                <div>
                  <p className={styles.unannouncedChipLabel}>Scale With Confidence</p>
                  <p className={styles.unannouncedChipSub}>Prove compliance standards hold across locations and at any hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY DELIVERABLES ===== */}
      <section className={styles.deliverablesSection}>
        <div className={styles.deliverablesContainer}>
          <h2 className={`${styles.deliverablesHeadline} fade-in`}>Key Deliverables</h2>
          <p className={`${styles.deliverablesSub} fade-in`}>
            Every Mock Health and Safety Inspection comes with clear, professional documentation.
          </p>
          <div className={styles.deliverablesGrid}>
            <div className={`${styles.deliverableCard} fade-in`}>
              <div className={styles.deliverableIcon}>📄</div>
              <h3 className={styles.deliverableTitle}>Invoice</h3>
              <p className={styles.deliverableText}>
                Provided per service. Clear, itemized, and delivered promptly so your records stay clean.
              </p>
            </div>
            <div className={`${styles.deliverableCard} fade-in`} style={{ transitionDelay: '100ms' }}>
              <div className={styles.deliverableIcon}>📋</div>
              <h3 className={styles.deliverableTitle}>Inspection Results Report</h3>
              <p className={styles.deliverableText}>
                Delivered by email within 1–2 business days following your Mock Health and Safety Inspection. Detailed, actionable, and easy to understand.
              </p>
            </div>
            <div className={`${styles.deliverableCard} fade-in`} style={{ transitionDelay: '200ms' }}>
              <div className={styles.deliverableIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 8C18 8 14 10 14 18C14 26 18 28 18 28" stroke="#5bc983" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M30 8C30 8 34 10 34 18C34 26 30 28 30 28" stroke="#5bc983" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M10 18H38" stroke="#5bc983" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 28V40" stroke="#5bc983" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 34L24 40L30 34" stroke="#5bc983" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="18" r="3" stroke="#5bc983" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className={styles.deliverableTitle}>Results Walkthrough Call</h3>
              <p className={styles.deliverableText}>
                After your report is delivered, we schedule a dedicated call to walk through every
                finding together — what needs immediate attention, what you're already doing right,
                and exactly what to fix before a real inspector shows up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={`${styles.faqHeadline} fade-in`}>Frequently Asked Questions</h2>
          <div className={`${styles.faqList} fade-in`}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
