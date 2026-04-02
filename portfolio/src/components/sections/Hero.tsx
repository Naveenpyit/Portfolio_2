import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { LetterRoles } from '../anim/LetterRoles'
import { PulseOrb } from '../anim/PulseOrb'
import { Stagger, StaggerItem } from '../anim/Stagger'
import { PROFILE, socialUrls } from '../../data/content'
import { HeroPortrait } from './HeroPortrait'

const Icon = ({ d }: { d: string }) => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d={d} />
  </svg>
)

export const Hero = memo(function Hero() {
  const stats = useMemo(() => PROFILE.stats, [])
  const s = useMemo(() => socialUrls(), [])

  const links = useMemo(
    () => [
      { href: s.linkedin, label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    ],
    [s.linkedin],
  )

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <PulseOrb className="left-[-20%] top-10 h-72 w-72 bg-cyan-500/20 dark:bg-cyan-500/30" />
      <PulseOrb className="right-[-10%] top-40 h-96 w-96 bg-violet-500/15 dark:bg-violet-600/25" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_minmax(240px,320px)] lg:items-center lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400/90"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-heading font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-violet-400">
              {PROFILE.name}
            </span>
          </motion.h1>
          <div className="mt-4 flex justify-center lg:justify-start">
            <LetterRoles />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-slate-400 lg:mx-0 mx-auto"
          >
            {PROFILE.headline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="border-social bg-social text-heading hover:border-cyan-500/60 hover:bg-nav-active inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition dark:hover:border-cyan-500/40"
              >
                <Icon d={l.icon} />
                {l.label}
              </a>
            ))}
          </motion.div>
          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((x) => (
              <StaggerItem key={x.label}>
                <div className="border-card bg-card rounded-2xl border p-4 text-left shadow-sm dark:bg-gradient-to-br dark:from-white/[0.07] dark:to-transparent dark:shadow-none">
                  <p className="text-heading font-display text-3xl font-bold">
                    {x.value}
                    <span className="text-lg text-cyan-600 dark:text-cyan-400">{x.suffix}</span>
                  </p>
                  <p className="text-muted-2 text-sm">{x.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroPortrait />
        </div>
      </div>
    </section>
  )
})
