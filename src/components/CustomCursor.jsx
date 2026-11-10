import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor
 * - Small sharp dot that sits exactly on the pointer (no lag)
 * - Larger soft ring that trails behind with a spring delay
 * - Both scale up when hovering a clickable element
 * - Hides the native OS cursor via CSS on <body>
 */
export default function CustomCursor() {
  const [hovered,  setHovered]  = useState(false)
  const [visible,  setVisible]  = useState(false)

  // Raw mouse position (instant)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Trailing ring — springy follow
  const springCfg = { damping: 28, stiffness: 280, mass: 0.5 }
  const ringX = useSpring(rawX, springCfg)
  const ringY = useSpring(rawY, springCfg)

  useEffect(() => {
    // Hide native cursor globally
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Detect hoverable elements to scale up cursor
    const onOver = (e) => {
      const t = e.target
      const clickable = t.closest('a, button, [role="button"], input, textarea, select, label')
      setHovered(!!clickable)
    }

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, visible])

  if (!visible) return null

  return (
    <>
      {/* ── Trailing ring ─────────────────────────────────────────────── */}
      <motion.div
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          x:            ringX,
          y:            ringY,
          translateX:   '-50%',
          translateY:   '-50%',
          width:        hovered ? '48px' : '36px',
          height:       hovered ? '48px' : '36px',
          borderRadius: '50%',
          border:       '1.5px solid rgba(6,182,212,0.55)',
          background:   hovered
            ? 'rgba(6,182,212,0.08)'
            : 'transparent',
          boxShadow:    hovered
            ? '0 0 16px rgba(6,182,212,0.4), 0 0 32px rgba(168,85,247,0.25)'
            : '0 0 8px rgba(6,182,212,0.2)',
          pointerEvents:'none',
          zIndex:       99998,
          transition:   'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        }}
      />

      {/* ── Sharp centre dot ──────────────────────────────────────────── */}
      <motion.div
        style={{
          position:     'fixed',
          top:          0,
          left:         0,
          x:            rawX,
          y:            rawY,
          translateX:   '-50%',
          translateY:   '-50%',
          width:        hovered ? '10px' : '7px',
          height:       hovered ? '10px' : '7px',
          borderRadius: '50%',
          background:   hovered
            ? 'linear-gradient(135deg, #06B6D4, #A855F7)'
            : '#06B6D4',
          boxShadow:    hovered
            ? '0 0 12px rgba(6,182,212,0.9), 0 0 24px rgba(168,85,247,0.6)'
            : '0 0 8px rgba(6,182,212,0.8)',
          pointerEvents:'none',
          zIndex:       99999,
          transition:   'width 0.15s ease, height 0.15s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
