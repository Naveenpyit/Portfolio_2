import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import { DotGrid } from '../anim/DotGrid'
import { Reveal } from '../anim/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { PROFILE, socialUrls } from '../../data/content'

export const About = memo(function About() {
  const socials = socialUrls()
  const reduce = useReducedMotion()

  return (
    <section id="about" className="border-theme relative scroll-mt-24 overflow-hidden border-t px-4 py-24 sm:px-6">
      <DotGrid className="right-4 top-16 hidden h-40 w-40 opacity-60 lg:block" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          {/* Decorative panel standing in for the reference's hero graphic. It
              carries no copy, so nothing here has to be maintained. */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <motion.div
                aria-hidden
                className="border-accent-line absolute inset-6 rounded-full border border-dashed"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                aria-hidden
                className="bg-accent-soft absolute inset-16 rounded-full blur-2xl"
                animate={reduce ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="dot-matrix absolute inset-0 rounded-3xl opacity-50" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="border-card bg-elevated depth-3 text-accent font-mono grid h-24 w-24 place-items-center rounded-2xl border text-xl">
                  &lt;/&gt;
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHead eyebrow="About" title="About Me" />
            <Reveal>
              <p className="text-body mt-8 max-w-3xl whitespace-pre-line text-pretty leading-relaxed">
                {PROFILE.about}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline depth-1 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
                >
                  LinkedIn <span aria-hidden>↗</span>
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline depth-1 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
})
