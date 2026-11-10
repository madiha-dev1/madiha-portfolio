import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

/**
 * useScrollAnimation
 * Returns { ref, controls } — attach ref to the wrapper element,
 * use controls in a motion.div's animate prop.
 *
 * @param {number} threshold  0–1, how much of element must be visible (default 0.15)
 * @param {boolean} once      animate only once (default true)
 */
export function useScrollAnimation(threshold = 0.15, once = true) {
  const ref      = useRef(null)
  const controls = useAnimation()
  const inView   = useInView(ref, { amount: threshold, once })

  useEffect(() => {
    if (inView) controls.start('visible')
    else if (!once) controls.start('hidden')
  }, [inView, controls, once])

  return { ref, controls }
}
