import { motion } from 'framer-motion'
import { memo } from 'react'
import { CODE_LINES, type CodeToken } from '../../data/content'

const tone: Record<NonNullable<CodeToken['kind']>, string> = {
  kw: 'text-accent',
  prop: 'text-heading',
  str: 'text-accent-strong',
  punc: 'text-muted-2',
}

/* `overflow-hidden` is a guard, not the layout: CODE_LINES is sized to fit the
   card. Without it an over-long line escapes the border and runs over whatever
   sits behind, because the lines render `whitespace-pre` and never wrap. */
export const CodeCard = memo(function CodeCard({ className }: { className?: string }) {
  return (
    <motion.div
      className={`border-card bg-elevated depth-3 overflow-hidden rounded-xl border p-4 font-mono text-[11px] leading-relaxed sm:text-xs ${className ?? ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {CODE_LINES.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line.map((t, j) => (
            <span key={j} className={t.kind ? tone[t.kind] : 'text-body'}>
              {t.text}
            </span>
          ))}
        </div>
      ))}
      <div className="text-muted-2 mt-2">{'</>'}</div>
    </motion.div>
  )
})
