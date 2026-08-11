import { memo, useMemo } from 'react'
import { Reveal } from '../anim/Reveal'
import { Tilt } from '../anim/Tilt'
import { SectionHead } from '../ui/SectionHead'
import { EXPERIENCE, type ExperienceItem } from '../../data/content'

const Card = memo(function Card({ e }: { e: ExperienceItem }) {
  const meta = [e.company, e.duration, e.role].filter(Boolean).join(' · ')

  return (
    // These carry long paragraphs, so the tilt stays near-subliminal — enough
    // to feel like a surface, not enough to make reading it a moving target.
    <Tilt className="h-full rounded-xl" max={4} perspective={1400} lift={12}>
      <div className="border-card bg-card depth-2 depth-hover accent-edge relative h-full overflow-hidden rounded-xl border p-5 sm:p-6">
        <h4 className="text-heading font-display text-lg font-semibold">{e.title}</h4>
        {meta && <p className="text-accent mt-1 text-sm">{meta}</p>}
        <p className="text-body mt-3 text-pretty">{e.body}</p>
        {e.domains && (
          <>
            <p className="text-muted-2 mt-5 text-xs uppercase tracking-[0.18em]">Domains delivered</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {e.domains.map((d) => (
                <li
                  key={d}
                  className="border-social bg-page text-body rounded-md border px-3 py-1 text-xs"
                >
                  {d}
                </li>
              ))}
            </ul>
          </>
        )}
        {e.stack && (
          <p className="text-muted-2 mt-4 font-mono text-xs tracking-wide">{e.stack}</p>
        )}
      </div>
    </Tilt>
  )
})

export const Experience = memo(function Experience() {
  const groups = useMemo(() => EXPERIENCE, [])

  return (
    <section id="experience" className="border-theme relative scroll-mt-24 border-t px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Experience"
          title="Experience"
          lead="What I build with, and how I decide what to build."
        />

        <div className="relative mt-14 space-y-14 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--accent-line)] before:to-transparent md:before:left-3">
          {groups.map((g) => (
            <Reveal key={g.category} className="relative pl-8 md:pl-12">
              <span className="bg-page border-accent absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border md:left-1">
                <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              </span>
              <h3 className="text-heading font-display text-xl font-bold tracking-tight sm:text-2xl">
                {g.category}
              </h3>
              <p className="text-muted-2 mt-1 text-sm">{g.summary}</p>
              <div className={`mt-6 grid gap-5 ${g.items.length > 1 ? 'lg:grid-cols-2' : ''}`}>
                {g.items.map((e) => (
                  <Card key={e.title} e={e} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
})
