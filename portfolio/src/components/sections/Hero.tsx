import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { memo, useCallback, useMemo, useRef } from 'react'
import { DotGrid } from '../anim/DotGrid'
import { GridLines } from '../anim/GridLines'
import { LetterRoles } from '../anim/LetterRoles'
import { PulseOrb } from '../anim/PulseOrb'
import { Stagger, StaggerItem } from '../anim/Stagger'
import { PROFILE, socialUrls } from '../../data/content'
import { CodeCard } from './CodeCard'
import { HeroPortrait } from './HeroPortrait'

const Glyph = ({ d, filled = true }: { d: string; filled?: boolean }) => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? undefined : 'currentColor'}
    strokeWidth={filled ? undefined : 1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={d} />
  </svg>
)

const LINKEDIN =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
const GITHUB =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
const MAIL = 'M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5v-13zm1.8.2L12 12l8.2-6.3'

/* Outline glyphs for the stat rail, in the order PROFILE.stats declares them. */
const STAT_ICONS = [
  'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'M4 6h16M4 12h10M4 18h7M17 15l3 3-3 3',
  'M9 18l-6-6 6-6M15 6l6 6-6 6',
  'M4 5h16v11H4zM8 20h8M12 16v4',
]

export const Hero = memo(function Hero() {
  const stats = useMemo(() => PROFILE.stats, [])
  const s = useMemo(() => socialUrls(), [])
  const section = useRef<HTMLElement>(null)
  const resumeRef = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()

  // Backdrop layers scroll at their own rates, so the hero gains depth on the
  // way out instead of moving as one flat sheet.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80])
  const orbNearY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 170])
  const orbFarY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90])

  const toProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const onResume = useCallback(() => resumeRef.current?.click(), [])

  const socials = useMemo(
    () => [
      { href: s.github, label: 'GitHub', d: GITHUB, filled: true },
      { href: s.linkedin, label: 'LinkedIn', d: LINKEDIN, filled: true },
      { href: `mailto:${PROFILE.email}`, label: 'Email', d: MAIL, filled: false },
    ],
    [s.github, s.linkedin],
  )

  return (
    <section ref={section} id="home" className="relative overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: gridY }}>
        <GridLines />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: orbFarY }}>
        <PulseOrb className="bg-accent-soft left-[-15%] top-16 h-80 w-80" />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: orbNearY }}>
        <PulseOrb className="bg-accent-soft right-[-12%] top-52 h-96 w-96" />
      </motion.div>
      <DotGrid className="left-2 top-40 hidden h-40 w-24 opacity-70 lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_auto] lg:gap-12">
        {/* ---- Copy ---- */}
        <div className="min-w-0 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent mb-4 font-mono text-sm tracking-wide"
          >
            &lt;Portfolio /&gt;
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 900, transformOrigin: '50% 100%' }}
            className="text-heading font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl"
          >
            {/* Needs its own leading — the h1's 0.95 would clip its descenders. */}
            <span className="text-muted-2 block text-lg font-medium leading-normal tracking-normal sm:text-xl">
              Hi, I&apos;m
            </span>
            <span className="mt-2 block">
              Naveenkumar <span className="text-accent">M</span>
            </span>
          </motion.h1>
          <div className="mt-4 flex justify-center lg:justify-start">
            <LetterRoles />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-body mx-auto mt-6 max-w-2xl text-pretty lg:mx-0"
          >
            {PROFILE.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <button
              type="button"
              onClick={toProjects}
              className="btn-accent inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              View My Work <span aria-hidden>→</span>
            </button>
            <a ref={resumeRef} href="/NaveenResume.pdf.pdf" download className="sr-only" aria-hidden>
              resume
            </a>
            <button
              type="button"
              onClick={onResume}
              className="btn-outline inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              Download CV <span aria-hidden>↓</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-3 lg:justify-start"
          >
            {socials.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={l.label}
                className="border-social bg-social text-muted-2 hover:text-accent hover:border-accent depth-1 grid h-11 w-11 place-items-center rounded-lg border transition"
              >
                <Glyph d={l.d} filled={l.filled} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ---- Portrait + code card ----
             The card only leaves the flow at lg, where the grid finally has a
             third column to hold it. Below that the hero is a single stack, so
             an absolute card would drop straight onto the stat rail. The lg
             padding reserves the band it overhangs into. */}
        <div className="relative lg:pb-14">
          <HeroPortrait />
          <CodeCard className="mx-auto mt-6 max-w-xs lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-64" />
        </div>

        {/* ---- Stat rail. Vertical on desktop as in the reference; folds to a
             2-up grid below lg so it never squeezes the portrait. ---- */}
        <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:flex lg:flex-col lg:gap-8">
          {stats.map((x, i) => (
            <StaggerItem key={x.label}>
              <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
                <span className="text-accent border-accent-line mb-1 grid h-11 w-11 place-items-center rounded-full border">
                  <Glyph d={STAT_ICONS[i % STAT_ICONS.length]} filled={false} />
                </span>
                <p className="text-heading font-display text-2xl font-bold">
                  {x.value}
                  <span className="text-accent">{x.suffix}</span>
                </p>
                <p className="text-muted-2 text-xs uppercase tracking-wider">{x.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
})
