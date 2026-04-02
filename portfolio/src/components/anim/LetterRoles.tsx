import { motion } from 'framer-motion'
import { memo, useEffect, useMemo, useState } from 'react'
import { PROFILE } from '../../data/content'

const MS_PER_LETTER = 58

/** Types one letter at a time, then advances to the next role. */
export const LetterRoles = memo(function LetterRoles() {
  const roles = useMemo(() => [...PROFILE.roles], [])
  const [roleIdx, setRoleIdx] = useState(0)
  const [count, setCount] = useState(0)
  const full = roles[roleIdx] ?? ''
  const visible = useMemo(() => full.slice(0, count), [full, count])
  const letters = useMemo(() => Array.from(visible), [visible])

  useEffect(() => {
    if (count < full.length) {
      const t = window.setTimeout(() => setCount((c) => c + 1), MS_PER_LETTER)
      return () => clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setRoleIdx((i) => (i + 1) % roles.length)
      setCount(0)
    }, 2200)
    return () => clearTimeout(t)
  }, [count, full, roles.length])

  return (
    <span
      className="inline-flex min-h-[1.35em] flex-wrap items-end font-display text-xl font-semibold text-cyan-700 sm:text-2xl md:text-3xl dark:text-cyan-300/95"
      aria-live="polite"
    >
      {letters.map((ch, idx) => (
        <motion.span
          key={`${roleIdx}-${idx}`}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-0.5 bg-cyan-600 dark:bg-cyan-400"
        animate={{ opacity: [1, 0.15, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </span>
  )
})
