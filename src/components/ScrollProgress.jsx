import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress
 * Thin gradient bar at the very top of the page that fills as you scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // spring makes it feel smooth rather than jerky
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping:   30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        height:         '3px',
        transformOrigin:'left',
        scaleX,
        background:     'linear-gradient(90deg, #06B6D4, #6366F1, #A855F7)',
        zIndex:         99999,
        boxShadow:      '0 0 10px rgba(6,182,212,0.7)',
        pointerEvents:  'none',
      }}
    />
  )
}
