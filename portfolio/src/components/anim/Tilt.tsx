import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { memo, useCallback, useRef, type PointerEvent, type ReactNode } from 'react'

const SPRING = { stiffness: 200, damping: 24, mass: 0.5 }

type Props = {
  children: ReactNode
  className?: string
  /** Peak rotation at the card edge, degrees. Big cards want less. */
  max?: number
  /** Vanishing-point distance. Lower = stronger perspective distortion. */
  perspective?: number
  /** How far the card rises toward the viewer while hovered, px. */
  lift?: number
  /** Cursor-tracking specular highlight across the surface. */
  glare?: boolean
}

/**
 * Rotates its child toward the pointer on two axes. Pointer position is kept
 * in motion values so the tilt never triggers a React render — the whole
 * interaction runs off the main thread's style pass.
 *
 * No-ops for reduced-motion users and for touch/pen input, where there is no
 * hover to track and the tilt would only fight the scroll.
 */
export const Tilt = memo(function Tilt({
  children,
  className,
  max = 8,
  perspective = 900,
  lift = 0,
  glare = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Normalized 0..1 pointer position within the element; 0.5/0.5 is centre.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hover = useMotionValue(0)

  const sx = useSpring(px, SPRING)
  const sy = useSpring(py, SPRING)
  const sh = useSpring(hover, SPRING)

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const z = useTransform(sh, [0, 1], [0, lift])
  const glareOpacity = useTransform(sh, [0, 1], [0, 1])
  const glareX = useTransform(sx, (v) => `${v * 100}%`)
  const glareY = useTransform(sy, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, var(--sheen), transparent 60%)`

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      px.set((e.clientX - r.left) / r.width)
      py.set((e.clientY - r.top) / r.height)
      hover.set(1)
    },
    [px, py, hover],
  )

  const onLeave = useCallback(() => {
    px.set(0.5)
    py.set(0.5)
    hover.set(0)
  }, [px, py, hover])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div className="flat-3d relative h-full rounded-[inherit]" style={{ rotateX, rotateY, z }}>
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
            style={{ opacity: glareOpacity, backgroundImage: glareBg }}
          />
        )}
      </motion.div>
    </div>
  )
})
