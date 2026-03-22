import { useState, useRef, useEffect } from 'react'
import styles from '../pages/Home.module.css'

export default function SlotMachine() {
  // Symbol sequence: 7, ♠, ♥, BAR, ♦, ♣  (index 3 = BAR = winning symbol)
  const SEQ = ['7', '♠', '♥', 'BAR', '♦', '♣']
  const STRIP = Array.from({length: 36}, (_, i) => SEQ[i % 6])
  const SH = 52           // symbol cell height px
  const WIN_Y = 84        // strip top y; win line at 84+52+26=162
  const END_T = 1352      // translateY → BAR at center row (27*52-52=1352)

  const [won, setWon]           = useState(false)
  const [flashing, setFlashing] = useState(false)
  const [leverActive, setLeverActive] = useState(false)
  const r1 = useRef(null), r2 = useRef(null), r3 = useRef(null)
  const spinningRef = useRef(false)
  const timerRef = useRef(null)

  useEffect(() => {
    function runSpin() {
      if (spinningRef.current) return
      spinningRef.current = true
      setWon(false)
      setFlashing(false)
      setLeverActive(true)

      const reels = [r1.current, r2.current, r3.current]
      reels.forEach(el => {
        if (!el) return
        el.style.transition = 'none'
        el.style.transform = 'translateY(0)'
        void el.offsetHeight
      })
      ;[1800, 2200, 2600].forEach((dur, i) => {
        if (!reels[i]) return
        reels[i].style.transition = `transform ${dur}ms ease-out`
        reels[i].style.transform = `translateY(-${END_T}px)`
      })

      setTimeout(() => setLeverActive(false), 900)
      setTimeout(() => {
        setWon(true)
        setFlashing(true)
        setTimeout(() => setFlashing(false), 840)
        setTimeout(() => {
          spinningRef.current = false
          timerRef.current = setTimeout(runSpin, 5000)
        }, 1500)
      }, 2750)
    }

    timerRef.current = setTimeout(runSpin, 1500)
    return () => clearTimeout(timerRef.current)
  }, []) // eslint-disable-line

  const sym = (s, cx, cy) => {
    if (s === '7')  return <text x={cx} y={cy+10} textAnchor="middle" fontSize="26" fontWeight="800" fontFamily="'Plus Jakarta Sans',sans-serif" fill="#5bc983">7</text>
    if (s === '♠')  return <text x={cx} y={cy+9}  textAnchor="middle" fontSize="23" fill="rgba(255,255,255,0.9)">♠</text>
    if (s === '♥')  return <text x={cx} y={cy+9}  textAnchor="middle" fontSize="23" fill="#ef4444">♥</text>
    if (s === '♦')  return <text x={cx} y={cy+9}  textAnchor="middle" fontSize="23" fill="#5bc983">♦</text>
    if (s === '♣')  return <text x={cx} y={cy+9}  textAnchor="middle" fontSize="23" fill="rgba(255,255,255,0.9)">♣</text>
    return (
      <g>
        <rect x={cx-19} y={cy-12} width="38" height="24" rx="3" fill="#061b2d" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
        <text x={cx} y={cy+5} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="'Plus Jakarta Sans',sans-serif" fill="#ffffff" letterSpacing="1">BAR</text>
      </g>
    )
  }

  const reelStrip = (cx, ref) => (
    <g ref={ref}>
      {STRIP.map((s, i) => (
        <g key={i}>{sym(s, cx, WIN_Y + i * SH + SH / 2)}</g>
      ))}
    </g>
  )

  const CX = [59, 134, 209]
  const wl = flashing ? '#5bc983' : 'rgba(91,201,131,0.5)'

  return (
    <svg viewBox="0 0 320 310" xmlns="http://www.w3.org/2000/svg" className={styles.slotSvg}>
      <defs>
        <clipPath id="rc1"><rect x="23" y="84" width="72" height="156"/></clipPath>
        <clipPath id="rc2"><rect x="98" y="84" width="72" height="156"/></clipPath>
        <clipPath id="rc3"><rect x="173" y="84" width="72" height="156"/></clipPath>
        <clipPath id="inspClip"><rect x="36" y="256" width="198" height="28"/></clipPath>
      </defs>

      {/* ── CABINET BODY ── */}
      <path d="M 16,10 L 254,10 L 249,302 L 21,302 Z"
        fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M 20,15 L 250,15 L 245,298 L 25,298 Z"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

      {/* ── CORNER RIVETS ── */}
      <circle cx="24"  cy="23" r="3.5" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <circle cx="246" cy="23" r="3.5" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <circle cx="242" cy="290" r="3.5" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <circle cx="28"  cy="290" r="3.5" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

      {/* ── SIDE STRIPE LINES ── */}
      {[0,1,2].map(i => (
        <g key={i}>
          <line x1="17" y1={148+i*44} x2="23" y2={148+i*44} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="247" y1={148+i*44} x2="253" y2={148+i*44} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        </g>
      ))}

      {/* ── HEADER PANEL — Neon Sign Marquee ── */}
      <rect x="18" y="12" width="234" height="65" rx="10"
        fill="rgba(91,201,131,0.07)" stroke="#5bc983" strokeWidth="1.5"
        className={styles.neonSignBorder}/>
      <rect x="20" y="14" width="230" height="61" rx="8"
        fill="none" stroke="#5bc983" strokeWidth="0.5" strokeOpacity="0.28"/>
      <rect x="208" y="20" width="22" height="7" rx="3.5"
        fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <text x="135" y="46" textAnchor="middle"
        fontFamily="'Bebas Neue',sans-serif" fontSize="30" fontWeight="700" letterSpacing="3"
        fill="#5bc983" className={styles.neonSignText}>BAR READY</text>
      <line x1="32" y1="54" x2="238" y2="54"
        stroke="#5bc983" strokeOpacity="0.28" strokeWidth="0.75"/>
      <text x="135" y="67" textAnchor="middle"
        fontFamily="'Bebas Neue',sans-serif" fontSize="11" fontWeight="700" letterSpacing="5"
        fill="#5bc983" className={styles.neonSignText}>LAS VEGAS</text>
      <line x1="18" y1="79" x2="252" y2="79" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

      {/* ── REEL WINDOW ── */}
      <rect x="20" y="81" width="230" height="164" rx="10"
        fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.38)" strokeWidth="2.5"/>
      <rect x="23" y="84" width="224" height="156" rx="8"
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <rect x="24" y="84" width="222" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
      <line x1="95"  y1="81" x2="95"  y2="245" stroke="rgba(255,255,255,0.28)" strokeWidth="2"/>
      <line x1="173" y1="81" x2="173" y2="245" stroke="rgba(255,255,255,0.28)" strokeWidth="2"/>

      {/* ── ANIMATED REELS ── */}
      <g clipPath="url(#rc1)">{reelStrip(CX[0], r1)}</g>
      <g clipPath="url(#rc2)">{reelStrip(CX[1], r2)}</g>
      <g clipPath="url(#rc3)">{reelStrip(CX[2], r3)}</g>

      {/* ── WIN LINE — center of 3-row window ── */}
      <polygon points="20,162 30,156 30,168" fill={wl}
        className={flashing ? styles.winLineFlashing : ''}/>
      <polygon points="250,162 240,156 240,168" fill={wl}
        className={flashing ? styles.winLineFlashing : ''}/>
      <line x1="30" y1="162" x2="240" y2="162"
        stroke={wl} strokeWidth={flashing ? '2.5' : '1.5'} strokeDasharray="5 3"
        className={flashing ? styles.winLineFlashing : ''}/>

      {/* ── INSPECTION PANEL — replaces button row ── */}
      <rect x="20" y="253" width="230" height="34" rx="8"
        fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      <rect x="22" y="255" width="226" height="30" rx="6"
        fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {/* placeholder dots — instant-visible when not won */}
      <text x="135" y="274" textAnchor="middle"
        fontFamily="'Bebas Neue',sans-serif" fontSize="14" letterSpacing="4"
        fill="rgba(255,255,255,0.25)"
        clipPath="url(#inspClip)"
        style={{opacity: won ? 0 : 1, transition: won ? 'opacity 0.4s ease' : 'none'}}>· · · · ·</text>
      {/* win text — fades in on win, resets instantly on next spin */}
      <text x="135" y="274" textAnchor="middle"
        fontFamily="'Bebas Neue',sans-serif" fontSize="13" letterSpacing="2"
        fill="#5bc983"
        clipPath="url(#inspClip)"
        style={{
          opacity: won ? 1 : 0,
          transition: won ? 'opacity 0.4s ease' : 'none',
          filter: 'drop-shadow(0 0 6px rgba(91,201,131,0.9)) drop-shadow(0 0 14px rgba(91,201,131,0.5))'
        }}>INSPECTION READY ✓</text>

      {/* ── MACHINE FEET ── */}
      <rect x="26" y="291" width="34" height="8" rx="4"
        fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <rect x="210" y="291" width="34" height="8" rx="4"
        fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>

      {/* ── PULL LEVER (purely decorative — no click) ── */}
      <rect x="254" y="267" width="22" height="10" rx="5"
        fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5"/>
      <g className={leverActive ? styles.leverPulling : ''}
         style={{transformOrigin: '265px 267px'}}>
        <rect x="261" y="105" width="8" height="147" rx="4"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"/>
        <circle cx="265" cy="94" r="18"
          fill="rgba(255,255,255,0.58)" stroke="rgba(255,255,255,0.78)" strokeWidth="1.5"/>
        <circle cx="259" cy="88" r="6" fill="rgba(255,255,255,0.46)"/>
        <circle cx="271" cy="101" r="4" fill="rgba(0,0,0,0.16)"/>
      </g>
    </svg>
  )
}
