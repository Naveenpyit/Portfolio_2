import { memo } from 'react'

/** Corner texture patch. Positioning and size come from `className`. */
export const DotGrid = memo(function DotGrid({ className }: { className?: string }) {
  return <div aria-hidden className={`dot-matrix pointer-events-none absolute ${className ?? ''}`} />
})
