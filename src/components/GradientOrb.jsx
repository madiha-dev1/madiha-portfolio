import { motion } from 'framer-motion'

/**
 * GradientOrb
 * Slow-floating blurred colour blob for background depth.
 * Respects prefers-reduced-motion.
 */
export default function GradientOrb({ color = '#06B6D4', size = 400, top, left, right, bottom, opacity = 0.18, delay = 0 }) {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.div
      aria-hidden="true"
      animate={reduced ? {} : {
        y:     [0, -30, 0],
        x:     [0,  18, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{ duration: 9 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position:     'absolute',
        top, left, right, bottom,
        width:        size,
        height:       size,
        borderRadius: '50%',
        background:   `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter:       'blur(80px)',
        opacity,
        pointerEvents:'none',
        zIndex:       0,
      }}
    />
  )
}
