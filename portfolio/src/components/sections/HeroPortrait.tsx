import { motion, useInView } from 'framer-motion'
import { memo, useRef } from 'react'

const SRC = '/profile.png'

export const HeroPortrait = memo(function HeroPortrait() {
  const wrap = useRef<HTMLDivElement>(null)
  const seen = useInView(wrap, { amount: 0.35, margin: '-8% 0px' })

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[min(100%,320px)] sm:max-w-sm">
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/25 via-violet-500/15 to-transparent blur-2xl"
        animate={seen ? { opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] } : { opacity: 0.35 }}
        transition={{ duration: 5, repeat: seen ? Infinity : 0, ease: 'easeInOut' }}
      />
      <motion.div
        className="border-card bg-card relative overflow-hidden rounded-[1.75rem] border p-1 shadow-xl shadow-slate-300/40 ring-1 ring-[var(--ring-portrait)] dark:shadow-cyan-500/10"
        animate={seen ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 4.5, repeat: seen ? Infinity : 0, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src={SRC}
          alt="Naveenkumar M"
          width={640}
          height={800}
          className="aspect-[4/5] w-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </div>
  )
})
