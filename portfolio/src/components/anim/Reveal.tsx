import { motion, type HTMLMotionProps } from 'framer-motion'
import { memo, type ReactNode } from 'react'

type P = { children: ReactNode; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>

export const Reveal = memo(function Reveal({ children, className, ...p }: P) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...p}
    >
      {children}
    </motion.div>
  )
})
