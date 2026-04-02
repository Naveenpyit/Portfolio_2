import { motion } from 'framer-motion'
import { memo } from 'react'

export const PulseOrb = memo(function PulseOrb({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ''}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
})
