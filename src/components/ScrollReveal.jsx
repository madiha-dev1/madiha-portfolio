import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * ScrollReveal
 * Wrap any section/block in this — it fades + slides in when scrolled into view.
 *
 * Props:
 *   direction  'up' | 'down' | 'left' | 'right'  (default 'up')
 *   delay      number in seconds                  (default 0)
 *   duration   number in seconds                  (default 0.7)
 *   distance   px to travel                       (default 48)
 *   threshold  0–1 viewport visibility            (default 0.12)
 *   className  extra class string
 */
export default function ScrollReveal({
  children,
  direction  = 'up',
  delay      = 0,
  duration   = 0.7,
  distance   = 48,
  threshold  = 0.12,
  className  = '',
  style      = {},
}) {
  const { ref, controls } = useScrollAnimation(threshold)

  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'down' || direction === 'right' ? -1 : 1

  const variants = {
    hidden:  { opacity: 0, [axis]: sign * distance },
    visible: {
      opacity: 1,
      [axis]:  0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
