import { motion } from 'framer-motion'
import { memo, useCallback, useMemo, useState } from 'react'
import { Tilt } from '../anim/Tilt'
import { SectionHead } from '../ui/SectionHead'
import { PROJECTS, type ProjectItem } from '../../data/content'

/* Near-black backdrops with a warm lean — vary tone, never hue.
   Screenshots stay the loudest thing on the card. */
const gradients = [
  'from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-black',
  'from-orange-100 to-neutral-100 dark:from-orange-950/40 dark:to-black',
  'from-neutral-100 to-orange-50 dark:from-neutral-900 dark:to-orange-950/20',
  'from-neutral-200 to-neutral-50 dark:from-neutral-900/80 dark:to-black',
  'from-orange-50 to-neutral-200 dark:from-orange-950/30 dark:to-neutral-950',
  'from-neutral-200 to-orange-100 dark:from-neutral-900 dark:to-orange-950/25',
]

const Card = memo(function Card({ p, i }: { p: ProjectItem; i: number }) {
  const [ok, setOk] = useState(true)
  const g = gradients[i % gradients.length]
  const onErr = useCallback(() => setOk(false), [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 3) * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
      className="h-full"
    >
      {/* Wide cards need a small `max` — the same angle that flatters a 160px
          stat tile shears a 600px card badly at its far corner. */}
      <Tilt className="h-full rounded-xl" max={7} perspective={1100} lift={18} glare>
        <article className="border-card bg-card depth-2 depth-hover accent-edge group relative flex h-full flex-col overflow-hidden rounded-xl border">
          <div className={`relative aspect-[16/10] overflow-hidden bg-linear-to-br ${g}`}>
            {ok ? (
              <img
                src={p.image}
                alt=""
                className="h-full w-full object-contain object-top transition duration-500 group-hover:scale-[1.03]"
                onError={onErr}
                loading="lazy"
              />
            ) : (
              <div className="text-muted-2 font-mono flex h-full items-center justify-center p-6 text-center text-xs">
                Add screenshot → {p.image}
              </div>
            )}
            {p.status && (
              <span className="border-accent-line bg-page/80 text-accent absolute right-3 top-3 rounded-md border px-2 py-0.5 text-[11px] font-medium backdrop-blur">
                {p.status}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-heading font-display text-lg font-semibold">{p.title}</h3>
            <ul className="text-body marker-accent mt-3 list-inside list-disc space-y-1 text-sm">
              {p.bullets.map((b, j) => (
                <li key={j} className="text-pretty">
                  {b}
                </li>
              ))}
            </ul>
            <p className="text-muted-2 mt-4 font-mono text-xs tracking-wide">{p.stack}</p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-accent-strong mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition"
              >
                Visit project <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </article>
      </Tilt>
    </motion.div>
  )
})

export const Projects = memo(function Projects() {
  const list = useMemo(() => PROJECTS, [])

  return (
    <section id="projects" className="border-theme relative scroll-mt-24 border-t px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Featured Projects" title="Projects" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
})
