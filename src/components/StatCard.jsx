import { useEffect, useRef, useState } from 'react'
import { useInView }                    from 'framer-motion'

/**
 * StatCard
 * Glass-style card with a count-up number animation when it enters the viewport.
 */
export default function StatCard({ number, suffix = '', label }) {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  // count-up: runs once when card enters view
  useEffect(() => {
    if (!inView) return
    const duration  = 1600          // total ms
    const steps     = 60
    const increment = number / steps
    let   current   = 0
    let   step      = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(parseFloat(current.toFixed(1)))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, number])

  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:         '1 1 140px',
        padding:      '24px 28px',
        borderRadius: '16px',
        background:   hov
          ? 'rgba(6,182,212,0.10)'
          : 'rgba(255,255,255,0.04)',
        border:       `1px solid ${hov ? 'rgba(6,182,212,0.45)' : 'rgba(255,255,255,0.08)'}`,
        backdropFilter:'blur(10px)',
        boxShadow:    hov
          ? '0 0 28px rgba(6,182,212,0.25), 0 0 56px rgba(168,85,247,0.15)'
          : '0 4px 24px rgba(0,0,0,0.2)',
        transition:   'all 0.3s ease',
        cursor:       'default',
        textAlign:    'left',
      }}
    >
      {/* number */}
      <div style={{
        fontSize:   'clamp(2rem, 3.5vw, 2.8rem)',
        fontWeight: 800,
        fontFamily: "'Outfit', sans-serif",
        lineHeight: 1,
        background: 'linear-gradient(90deg,#06B6D4,#A855F7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor:  'transparent',
        backgroundClip:       'text',
      }}>
        {count}{suffix}
      </div>

      {/* label */}
      <div style={{
        color:      '#94A3B8',
        fontSize:   '0.875rem',
        fontWeight: 500,
        marginTop:  '6px',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {label}
      </div>
    </div>
  )
}
