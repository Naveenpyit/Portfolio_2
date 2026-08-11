import { memo, useMemo } from 'react'
import { Reveal } from '../anim/Reveal'

type Props = {
  /** Small accent label above the heading. */
  eyebrow: string
  /** Rendered with its final word in the accent colour, matching the reference's
      two-tone headings. Single-word titles stay monotone — the eyebrow above
      already carries the accent, and colouring the lone word doubles it up. */
  title: string
  lead?: string
  className?: string
}

export const SectionHead = memo(function SectionHead({ eyebrow, title, lead, className }: Props) {
  const [head, tail] = useMemo(() => {
    const parts = title.trim().split(' ')
    if (parts.length < 2) return [title, null] as const
    const last = parts.pop() as string
    return [parts.join(' '), last] as const
  }, [title])

  return (
    <Reveal className={className}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-heading font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {head}
        {tail && (
          <>
            {' '}
            <span className="text-accent">{tail}</span>
          </>
        )}
      </h2>
      {lead && <p className="text-muted-2 mt-3 max-w-2xl">{lead}</p>}
    </Reveal>
  )
})
