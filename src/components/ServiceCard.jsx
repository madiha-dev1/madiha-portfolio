import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiWordpress, SiShopify, SiReact,
} from 'react-icons/si'
import {
  FiLayout, FiMonitor, FiTool, FiArrowRight,
} from 'react-icons/fi'

// ── icon map ──────────────────────────────────────────────────────────────────
const ICONS = {
  wordpress:   { el: SiWordpress,  color: '#21759B' },
  shopify:     { el: SiShopify,    color: '#96BF48' },
  react:       { el: SiReact,      color: '#61DAFB' },
  design:      { el: FiLayout,     color: '#A855F7' },
  portfolio:   { el: FiMonitor,    color: '#06B6D4' },
  maintenance: { el: FiTool,       color: '#F59E0B' },
}

const REDUCED = typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * ServiceCard
 * Glassmorphism card with:
 *  - 3D tilt toward mouse (max 8 deg)
 *  - spotlight radial glow following cursor inside card
 *  - diagonal shine sweep on hover
 *  - animated gradient border glow
 *  - icon float + rotate on hover
 */
export default function ServiceCard({ service, index, offsetDown = false }) {
  const cardRef  = useRef(null)
  const [tilt,   setTilt]   = useState({ x: 0, y: 0 })
  const [spot,   setSpot]   = useState({ x: 50, y: 50, show: false })
  const [hov,    setHov]    = useState(false)
  const [shine,  setShine]  = useState(false)

  const { el: Icon, color } = ICONS[service.icon] || { el: FiMonitor, color: '#06B6D4' }

  const onMove = (e) => {
    if (REDUCED) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx   = e.clientX - rect.left
    const cy   = e.clientY - rect.top
    const pctX = cx / rect.width
    const pctY = cy / rect.height
    // tilt: map 0-1 → -8 to +8 degrees
    setTilt({ x: (pctY - 0.5) * -16, y: (pctX - 0.5) * 16 })
    setSpot({ x: pctX * 100, y: pctY * 100, show: true })
  }

  const onEnter = () => {
    setHov(true)
    setShine(true)
    // reset shine after animation (600ms)
    setTimeout(() => setShine(false), 650)
  }

  const onLeave = () => {
    setHov(false)
    setTilt({ x: 0, y: 0 })
    setSpot(s => ({ ...s, show: false }))
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        /* offset middle column down on desktop — handled by parent */
        position:      'relative',
        borderRadius:  '20px',
        padding:       '2px',                  /* space for gradient border */
        background:    hov
          ? 'linear-gradient(135deg,#06B6D4,#6366F1,#A855F7)'
          : 'linear-gradient(135deg,rgba(6,182,212,0.3),rgba(168,85,247,0.3))',
        boxShadow:     hov
          ? '0 20px 60px rgba(0,0,0,0.45), 0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(168,85,247,0.15)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform:     REDUCED ? 'none'
          : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? '-6px' : '0'})`,
        transition:    'transform 0.15s ease, box-shadow 0.3s ease, background 0.3s ease',
        cursor:        'default',
        marginTop:     offsetDown ? '40px' : '0',
      }}
    >
      {/* ── inner glass surface ─────────────────────────────────────────── */}
      <div style={{
        borderRadius:  '18px',
        padding:       '32px 28px',
        background:    'rgba(8,15,28,0.75)',
        backdropFilter:'blur(16px)',
        position:      'relative',
        overflow:      'hidden',
        height:        '100%',
      }}>

        {/* spotlight glow following cursor */}
        {spot.show && (
          <div style={{
            position:   'absolute',
            inset:      0,
            background: `radial-gradient(circle 180px at ${spot.x}% ${spot.y}%, rgba(6,182,212,0.13) 0%, transparent 70%)`,
            pointerEvents:'none',
            borderRadius:'18px',
            transition: 'background 0.05s',
          }} />
        )}

        {/* diagonal shine sweep */}
        <motion.div
          animate={shine ? { x: ['−100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            top:        0,
            left:       0,
            width:      '50%',
            height:     '100%',
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)',
            transform:  'skewX(-15deg)',
            pointerEvents:'none',
            zIndex:     1,
          }}
        />

        {/* faded number badge */}
        <div style={{
          position:   'absolute',
          top:        '12px',
          right:      '16px',
          fontSize:   '4.5rem',
          fontWeight: 900,
          fontFamily: "'Outfit',sans-serif",
          lineHeight: 1,
          background: 'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(168,85,247,0.12))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
          userSelect: 'none',
          pointerEvents:'none',
        }}>
          {service.id}
        </div>

        {/* icon */}
        <motion.div
          animate={hov && !REDUCED
            ? { y: -6, rotate: 8 }
            : { y: 0,  rotate: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          '52px',
            height:         '52px',
            borderRadius:   '14px',
            background:     `linear-gradient(135deg,${color}22,${color}11)`,
            border:         `1px solid ${color}44`,
            fontSize:       '1.5rem',
            color:          hov ? color : '#94A3B8',
            transition:     'color 0.3s',
            marginBottom:   '20px',
            position:       'relative',
            zIndex:         2,
            boxShadow:      hov ? `0 0 20px ${color}55` : 'none',
          }}
        >
          <Icon />
        </motion.div>

        {/* title */}
        <h3 style={{
          fontFamily: "'Outfit',sans-serif",
          fontWeight: 700,
          fontSize:   '1.05rem',
          color:      '#F1F5F9',
          margin:     '0 0 10px',
          position:   'relative', zIndex: 2,
        }}>
          {service.title}
        </h3>

        {/* description */}
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          color:      '#64748B',
          fontSize:   '0.875rem',
          lineHeight: 1.7,
          margin:     '0 0 24px',
          position:   'relative', zIndex: 2,
        }}>
          {service.desc}
        </p>

        {/* learn more link */}
        <a
          href={service.href}
          onClick={e => {
            e.preventDefault()
            document.querySelector(service.href)?.scrollIntoView({ behavior: 'smooth' })
          }}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '6px',
            fontFamily:     "'Outfit',sans-serif",
            fontWeight:     600,
            fontSize:       '0.85rem',
            textDecoration: 'none',
            background:     'linear-gradient(90deg,#06B6D4,#A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            position:       'relative', zIndex: 2,
          }}
        >
          Learn More
          <motion.span
            animate={hov ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display:'inline-flex', color:'#06B6D4' }}
          >
            <FiArrowRight size={15} />
          </motion.span>
        </a>

      </div>
    </motion.div>
  )
}
