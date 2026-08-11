import { motion, type HTMLMotionProps } from 'framer-motion'
import { memo, type ReactNode } from 'react'

type P = { children: ReactNode; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>

/**
 * Enters by rotating up off its own X axis rather than sliding. `transformPerspective`
 * applies the vanishing point to this element's own transform, so no ancestor
 * needs a `perspective` — the rotation reads as depth instead of a squash.
 */
export const Reveal = memo(function Reveal({ children, className, ...p }: P) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
      className={className}
      {...p}
    >
      {children}
    </motion.div>
  )
})
