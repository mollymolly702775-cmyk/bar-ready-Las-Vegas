import { useState, useRef, useCallback, useEffect } from 'react'
import styles from '../pages/Home.module.css'

const steps = [
  {
    num: '01', label: 'Discovery',
    title: 'You Find Bar Ready LV',
    desc: 'Bars and restaurants across Las Vegas discover Bar Ready LV through targeted advertising — reaching owners right when compliance is on their minds.',
    pts: [
      'Google, Facebook & Instagram ad campaigns',
      'Laser-focused on Las Vegas hospitality operators',
      'Clear message: protect your bar before the real inspector arrives'
    ]
  },
  {
    num: '02', label: 'Booking',
    title: 'Book Your Inspection',
    desc: "Scheduling is fast and simple. Pick your date, confirm your bar location, and you're locked in. No complicated back-and-forth — just a confirmed appointment.",
    pts: [
      'Quick, straightforward booking process',
      'Flexible scheduling around your operating hours',
      'Immediate booking confirmation provided'
    ]
  },
  {
    num: '03', label: 'Pre-Inspection Outreach',
    title: 'We Prepare You Ahead of Time',
    desc: "Before we ever arrive, you'll receive a detailed welcome email introducing Bar Ready LV and a full outline of everything your Mock Health and Safety Inspection will cover.",
    pts: [
      'Welcome email with company overview and background',
      'Detailed document listing every area of inspection coverage',
      'Sets clear expectations so there are no day-of surprises'
    ]
  },
  {
    num: '04', label: 'Day-Of Confirmation',
    title: 'Day-Of Check-In',
    desc: 'On the morning of your inspection, we reach out via both email and text to confirm the appointment time and location. No no-shows, no last-minute confusion.',
    pts: [
      'Email and SMS appointment confirmation sent same morning',
      'Time and location verified with the client',
      'Any remaining questions addressed before we arrive'
    ]
  },
  {
    num: '05', label: 'On-Site Inspection',
    title: 'We Come to Your Bar',
    desc: 'Our team arrives on-site and performs the full Mock Health and Safety Inspection — walking through every area, system, and compliance point exactly as a real health inspector would.',
    pts: [
      'Full on-site visit at your bar or restaurant',
      'Comprehensive inspection walkthrough of all compliance areas',
      'Real health inspection standards and criteria applied',
      'Every risk area assessed and documented thoroughly'
    ]
  },
  {
    num: '06', label: 'Results Delivery',
    title: 'Get Your Detailed Report',
    desc: 'After the inspection, you receive a thorough Inspection Results Report delivered to your inbox within 1–2 business days — complete with findings and actionable corrections.',
    pts: [
      'Detailed Inspection Results Report delivered via email',
      'Delivered within 1–2 business days after the inspection',
      'Clear violation findings organized by risk level',
      'Actionable steps for correcting every issue identified'
    ]
  },
  {
    num: '07', label: 'Retention',
    title: 'Stay Protected. Month After Month.',
    desc: "We confirm your next month's inspection and close out with a thank-you message — keeping your compliance calendar on track and your bar protected on an ongoing basis.",
    pts: [
      'Next monthly inspection appointment confirmed',
      'Final thank-you and follow-up message sent',
      'Consistent monthly cadence keeps you perpetually protected',
      'Long-term compliance partnership established with your bar'
    ]
  }
]

export default function HowItWorksCarousel() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % 7)
    }, 4200)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const pick = (i) => {
    setActive(i)
    resetTimer()
  }

  const step = steps[active]

  return (
    <div
      className={styles.hiwLayout}
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={resetTimer}
    >
      {/* Step nav */}
      <div className={styles.snav}>
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={[
              styles.snavItem,
              i === active ? styles.snavItemActive : '',
              i < active ? styles.snavItemDone : ''
            ].join(' ')}
            onClick={() => pick(i)}
          >
            <div className={styles.snum}>{i < active ? '✓' : s.num}</div>
            <div className={styles.slabel}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Step detail */}
      <div className={styles.sdetail}>
        <div className={styles.sbig}>{step.num}</div>
        <div className={styles.scontent} key={active}>
          <div className={styles.sbadge}>Step {step.num} of 07</div>
          <div className={styles.stitle}>{step.title}</div>
          <div className={styles.sdesc}>{step.desc}</div>
          <div className={styles.spts}>
            {step.pts.map((pt, i) => (
              <div key={i} className={styles.spt}>{pt}</div>
            ))}
          </div>
        </div>
        <div className={styles.sprog}>
          {steps.map((_, i) => (
            <div
              key={i}
              className={`${styles.pdot} ${i === active ? styles.pdotActive : ''}`}
              onClick={() => pick(i)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
