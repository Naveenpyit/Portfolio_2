import { motion } from 'framer-motion'
import { memo, useCallback, useMemo, useState } from 'react'
import { Reveal } from '../anim/Reveal'
import { PROJECTS, type ProjectItem } from '../../data/content'

const gradients = [
  'from-slate-200 to-slate-100 dark:from-[#1e214d] dark:to-[#0c0e2e]',
  'from-amber-100 to-slate-100 dark:from-amber-900/40 dark:to-slate-950',
  'from-orange-100 to-slate-100 dark:from-orange-500/20 dark:to-slate-950',
  'from-emerald-100 to-slate-100 dark:from-emerald-900/30 dark:to-slate-950',
  'from-emerald-100 to-blue-100 dark:from-emerald-600/25 dark:to-blue-950',
  'from-rose-100 to-slate-100 dark:from-rose-600/25 dark:to-slate-950',
]

const Card = memo(function Card({ p, i }: { p: ProjectItem; i: number }) {
  const [ok, setOk] = useState(true)
  const g = gradients[i % gradients.length]
  const onErr = useCallback(() => setOk(false), [])

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 3) * 0.06 }}
      className="border-card bg-card group overflow-hidden rounded-2xl border shadow-sm dark:shadow-none"
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-linear-to-br ${g}`}>
        {ok ? (
          <img src={p.image} alt="" className="h-full w-full object-contain object-top transition duration-500 group-hover:scale-[1.02]" onError={onErr} loading="lazy" />
        ) : (
          <div className="text-muted-2 flex h-full items-center justify-center p-6 text-center font-display text-sm dark:text-white/40">
            Add screenshot → {p.image}
          </div>
        )}
        {p.status && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/70 px-2 py-0.5 text-xs text-cyan-100 backdrop-blur dark:bg-black/50 dark:text-cyan-200">
            {p.status}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-heading font-display text-lg font-semibold">{p.title}</h3>
        <ul className="text-body mt-3 list-inside list-disc space-y-1 text-sm">
          {p.bullets.map((b, j) => (
            <li key={j} className="text-pretty marker:text-cyan-600 dark:marker:text-cyan-500/60">
              {b}
            </li>
          ))}
        </ul>
        <p className="text-muted-2 mt-3 text-xs uppercase tracking-wider">{p.stack}</p>
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Visit project →
          </a>
        )}
      </div>
    </motion.article>
  )
})

export const Projects = memo(function Projects() {
  const list = useMemo(() => PROJECTS, [])
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-heading font-display text-3xl font-bold sm:text-4xl">Projects</h2>
          <p className="text-muted-2 mt-2 max-w-2xl">
            Selected work — place images in{' '}
            <code className="text-cyan-700 dark:text-cyan-500/80">public/projects/1.png</code> …{' '}
            <code className="text-cyan-700 dark:text-cyan-500/80">6.png</code>.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {list.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
})
