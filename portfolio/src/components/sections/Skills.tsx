import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { Tilt } from '../anim/Tilt'
import { SectionHead } from '../ui/SectionHead'
import { SKILLS } from '../../data/content'

/* One outline glyph per SKILLS group, in declaration order. */
const ICONS = [
  'M4 5h16v11H4zM8 20h8M12 16v4',
  'M4 7h16v4H4zM4 13h16v4H4zM7 9h.01M7 15h.01',
  'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  'M14.7 6.3a4 4 0 00-5.4 5.4l-6 6 2 2 6-6a4 4 0 005.4-5.4l-2.5 2.5-2-2 2.5-2.5z',
]

export const Skills = memo(function Skills() {
  const groups = useMemo(() => SKILLS, [])

  return (
    <section id="skills" className="border-theme relative scroll-mt-24 border-t px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Skills" title="Skills" lead="Stack I use across the product surface." />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 26, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 900, transformOrigin: '50% 100%' }}
              className="h-full"
            >
              <Tilt className="h-full rounded-xl" max={9} perspective={800} lift={16} glare>
                <div className="border-card bg-card depth-2 depth-hover accent-edge relative h-full overflow-hidden rounded-xl border p-6">
                  <span className="text-accent bg-accent-soft mb-5 grid h-11 w-11 place-items-center rounded-lg">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={ICONS[i % ICONS.length]} />
                    </svg>
                  </span>
                  <h3 className="text-heading font-display text-lg font-semibold">{g.title}</h3>
                  <ul className="text-body mt-4 space-y-2 text-sm">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-accent">▹</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})
