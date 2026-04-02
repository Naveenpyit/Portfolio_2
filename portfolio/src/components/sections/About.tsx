import { memo } from 'react'
import { Reveal } from '../anim/Reveal'
import { PROFILE, socialUrls } from '../../data/content'

export const About = memo(function About() {
  const socials = socialUrls()

  return (
    <section id="about" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-heading font-display text-3xl font-bold sm:text-4xl">About Me</h2>
          <p className="text-body mt-6 max-w-3xl text-pretty leading-relaxed">{PROFILE.about}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border-social bg-social text-heading hover:border-cyan-500/60 inline-flex items-center rounded-full border px-4 py-2 text-sm"
            >
              https://www.linkedin.com/in/naveennk-fullstack-dev
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="border-social bg-social text-heading hover:border-cyan-500/60 inline-flex items-center rounded-full border px-4 py-2 text-sm"
            >
              https://github.com/Naveenpyit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
})
