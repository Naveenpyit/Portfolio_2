import { motion } from 'framer-motion'
import { memo, type ReactNode } from 'react'

const c = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const i = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

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
    <motion.div variants={i} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
})
