import { motion } from 'framer-motion'
import { memo, type ReactNode } from 'react'

const c = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const i = {
  hidden: { opacity: 0, y: 20, rotateX: 18, z: -60 },
  show: { opacity: 1, y: 0, rotateX: 0, z: 0 },
}

export const Stagger = memo(function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={c} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} className={className}>
      {children}
    </motion.div>
  )
})

export const StaggerItem = memo(function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={i}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 800, transformOrigin: '50% 100%' }}
      className={className}
    >
      {children}
    </motion.div>
  )
})
