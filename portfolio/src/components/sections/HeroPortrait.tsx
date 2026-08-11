import { motion, useInView, useReducedMotion } from 'framer-motion'
import { memo, useRef } from 'react'
import { Tilt } from '../anim/Tilt'
import { HeroBackdrop } from './HeroBackdrop'

const SRC = '/profile.png'

export const HeroPortrait = memo(function HeroPortrait() {
  const wrap = useRef<HTMLDivElement>(null)
  const seen = useInView(wrap, { amount: 0.35, margin: '-8% 0px' })
  const reduce = useReducedMotion()

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[min(100%,320px)] sm:max-w-sm">
      {/* Earlier in the DOM than the Tilt, so it stacks behind the portrait
          without needing a z-index — the Tilt's transform makes its own
          stacking context. */}
      <HeroBackdrop />

      {/* Both rings live outside the Tilt. Inside it they would shear with the
          card and stop reading as a circle the portrait sits within. */}
      <motion.div
        aria-hidden
        className="halo-ring pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[110%] rounded-full"
        style={{ x: '-50%', y: '-50%' }}
        animate={seen && !reduce ? { opacity: [0.45, 0.75, 0.45], scale: [1, 1.03, 1] } : { opacity: 0.5 }}
        transition={{ duration: 6, repeat: seen && !reduce ? Infinity : 0, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="border-accent-line pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] rounded-full border border-dashed opacity-50"
        style={{ x: '-50%', y: '-50%' }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />

      <Tilt className="relative rounded-[1.5rem]" max={12} perspective={800} lift={28} glare>
        <motion.div
          aria-hidden
          className="bg-accent-soft absolute -inset-4 rounded-[2rem] blur-2xl"
          style={{ z: -80 }}
          animate={seen && !reduce ? { opacity: [0.5, 0.9, 0.5] } : { opacity: 0.4 }}
          transition={{ duration: 5, repeat: seen && !reduce ? Infinity : 0, ease: 'easeInOut' }}
        />
        <motion.div
          className="border-card bg-elevated depth-3 relative overflow-hidden rounded-[1.5rem] border p-1 ring-1 ring-[var(--ring-portrait)]"
          animate={seen && !reduce ? { y: [0, -10, 0] } : { y: 0 }}
          transition={{ duration: 4.5, repeat: seen && !reduce ? Infinity : 0, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        >
          <motion.img
            src={SRC}
            alt="Naveenkumar M"
            width={640}
            height={800}
            className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-top"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            loading="eager"
            decoding="async"
          />
          {/* Circuit texture over the photo, masked to the lower half so it
              never crosses the face. */}
          <div
            aria-hidden
            className="dot-matrix pointer-events-none absolute inset-0 opacity-40"
            style={{ maskImage: 'linear-gradient(to top, #000, transparent 55%)' }}
          />
        </motion.div>
        {/* Front plane. This can't live inside the card: `overflow-hidden` forces
            transform-style to flat, which would collapse any Z on its children. */}
        <div
          aria-hidden
          className="border-accent-line pointer-events-none absolute -inset-2 rounded-[1.75rem] border"
          style={{ transform: 'translateZ(55px)' }}
        />
      </Tilt>
    </div>
  )
})
