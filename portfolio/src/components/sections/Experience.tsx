import { memo, useMemo } from 'react'
import { Reveal } from '../anim/Reveal'
import { EXPERIENCE } from '../../data/content'

export const Experience = memo(function Experience() {
  const rows = useMemo(() => [...EXPERIENCE], [])
  return (
    <section id="experience" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-heading font-display text-3xl font-bold sm:text-4xl">Experience</h2>
        </Reveal>
        <div className="relative mt-10 space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:to-transparent md:before:left-3">
          {rows.map((e, i) => (
            <Reveal key={e.title + String(i)} className="relative pl-8 md:pl-12">
              <span className="bg-page absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-cyan-500/50 md:left-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </span>
              <div className="border-card bg-card rounded-2xl border p-6 shadow-sm dark:shadow-none">
                <h3 className="text-heading font-display text-xl font-semibold">{e.title}</h3>
                {(e.company || e.duration || e.role) && (
                  <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-400/90">
                    {[e.company, e.duration, e.role].filter(Boolean).join(' · ')}
                  </p>
                )}
                <p className="text-body mt-3 text-pretty">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
})
