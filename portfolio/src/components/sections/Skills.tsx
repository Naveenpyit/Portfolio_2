import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import { Reveal } from '../anim/Reveal'
import { SKILLS } from '../../data/content'

export const Skills = memo(function Skills() {
  const groups = useMemo(() => SKILLS, [])
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-heading font-display text-3xl font-bold sm:text-4xl">Skills</h2>
          <p className="text-muted-2 mt-2">Stack I use across the product surface.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/[0.03] p-6 shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-cyan-300">{g.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-cyan-950 dark:text-cyan-500/80">▹</span>
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})
