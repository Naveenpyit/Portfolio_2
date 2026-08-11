import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'

const CELL = 48

/** Ladder backdrop — 48px rule lines masked to a radial fade, drifting one cell per cycle. */
export const GridLines = memo(function GridLines({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`grid-lines pointer-events-none absolute inset-0 ${className ?? ''}`}
      animate={reduce ? undefined : { backgroundPosition: ['0px 0px', `${CELL}px ${CELL}px`] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
    />
  )
})
