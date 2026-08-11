import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'

/* Right-angle traces running outward from the portrait, PCB style. Drawn in a
   400x400 space centred on 200,200 so they radiate evenly. */
const TRACES = [
  'M58,132 H104 V92 H148',
  'M342,132 H296 V92 H252',
  'M58,268 H104 V308 H148',
  'M342,268 H296 V308 H252',
  'M200,14 V54',
  'M200,346 V386',
  'M14,200 H54',
  'M346,200 H386',
  'M92,58 L126,92',
  'M308,58 L274,92',
  'M92,342 L126,308',
  'M308,342 L274,308',
]

/* Node pads at the outer end of each trace. */
const NODES = [
  [58, 132],
  [342, 132],
  [58, 268],
  [342, 268],
  [200, 14],
  [200, 346],
  [14, 200],
  [386, 200],
  [92, 58],
  [308, 58],
  [92, 342],
  [308, 342],
]

/* Fixed, not random: StrictMode renders twice and the React Compiler may
   re-run the body, so generated positions would jump between passes. */
const EMBERS = [
  { x: 18, y: 74, d: 0, s: 5.5 },
  { x: 31, y: 22, d: 1.4, s: 6.8 },
  { x: 46, y: 88, d: 2.9, s: 6.1 },
  { x: 62, y: 12, d: 0.7, s: 7.4 },
  { x: 73, y: 61, d: 3.6, s: 5.9 },
  { x: 84, y: 34, d: 2.1, s: 6.5 },
  { x: 9, y: 45, d: 4.3, s: 7.1 },
  { x: 91, y: 79, d: 1.9, s: 6.3 },
]

export const HeroBackdrop = memo(function HeroBackdrop() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Fire field. Blurred, so it can run wider than the crisp layers without
          reading as an element that collides with the columns beside it. */}
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[165%] rounded-full"
        style={{
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgb(255 150 40 / 0.34) 0%, rgb(255 92 0 / 0.22) 30%, rgb(200 40 0 / 0.10) 52%, transparent 70%)',
          filter: 'blur(22px)',
        }}
        animate={reduce ? undefined : { opacity: [0.75, 1, 0.85, 1, 0.75], scale: [1, 1.04, 0.99, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hot core, tight to the subject. */}
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[95%] rounded-full"
        style={{
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgb(255 190 90 / 0.28) 0%, rgb(255 107 26 / 0.14) 45%, transparent 68%)',
          filter: 'blur(14px)',
        }}
        animate={reduce ? undefined : { opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Circuitry. Held to 125% so the crisp lines stay inside the column
          gutter — unlike the blurred layers, these read as hard edges if they
          cross into the copy beside them. */}
      <svg
        viewBox="0 0 400 400"
        className="text-accent absolute left-1/2 top-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 opacity-45"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="square">
          {TRACES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0.15 }}
              animate={reduce ? undefined : { pathLength: 1, opacity: [0.25, 0.7, 0.25] }}
              transition={{
                pathLength: { duration: 1.4, delay: 0.3 + i * 0.07, ease: 'easeOut' },
                opacity: { duration: 3.5, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          ))}
          <circle cx="200" cy="200" r="168" strokeDasharray="3 10" opacity="0.5" />
          <circle cx="200" cy="200" r="188" strokeDasharray="1 16" opacity="0.35" />
        </g>
        <g fill="currentColor">
          {NODES.map(([cx, cy]) => (
            <rect key={`${cx}-${cy}`} x={cx - 2.5} y={cy - 2.5} width="5" height="5" opacity="0.8" />
          ))}
        </g>
      </svg>

      {/* Embers drifting up through the field. */}
      {!reduce &&
        EMBERS.map((e) => (
          <motion.span
            key={`${e.x}-${e.y}`}
            className="bg-accent absolute h-1 w-1 rounded-full"
            style={{ left: `${e.x}%`, top: `${e.y}%` }}
            animate={{ y: [0, -46, -92], opacity: [0, 0.9, 0], scale: [0.6, 1, 0.4] }}
            transition={{ duration: e.s, delay: e.d, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
    </div>
  )
})
