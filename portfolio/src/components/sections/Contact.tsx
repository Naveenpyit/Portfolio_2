import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { memo, useCallback, useRef } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  setContactErrorMessage,
  setContactField,
  setContactStatus,
  type ContactField,
} from '../../features/contactSlice'
import { DotGrid } from '../anim/DotGrid'
import { Reveal } from '../anim/Reveal'
import { SectionHead } from '../ui/SectionHead'
import { PROFILE, socialUrls } from '../../data/content'

const fields: { key: ContactField; label: string; type?: string; rows?: number; half?: boolean }[] = [
  { key: 'name', label: 'Name', half: true },
  { key: 'company', label: 'Company Name', half: true },
  { key: 'email', label: 'Email', type: 'email', half: true },
  { key: 'subject', label: 'Subject', half: true },
  { key: 'message', label: 'Content', rows: 5 },
]

const fieldClass =
  'border-card bg-input-field text-heading focus:border-accent mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition'

const Row = ({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) => (
  <a
    href={href}
    target={href.startsWith('mailto:') ? undefined : '_blank'}
    rel="noreferrer"
    className="group flex items-start gap-3.5"
  >
    <span className="text-accent bg-accent-soft grid h-10 w-10 shrink-0 place-items-center rounded-lg">
      <svg
        className="h-[18px] w-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={icon} />
      </svg>
    </span>
    <span className="min-w-0">
      <span className="text-muted-2 block text-xs uppercase tracking-[0.16em]">{label}</span>
      <span className="text-heading group-hover:text-accent block truncate text-sm transition">{value}</span>
    </span>
  </a>
)

const MAIL = 'M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5v-13zm1.8.2L12 12l8.2-6.3'
const LINK = 'M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7'
const CODE = 'M9 18l-6-6 6-6M15 6l6 6-6 6'

export const Contact = memo(function Contact() {
  const dispatch = useAppDispatch()
  const c = useAppSelector((s) => s.contact)
  const snap = useRef(c)
  snap.current = c

  const onChange = useCallback(
    (key: ContactField, value: string) => dispatch(setContactField({ key, value })),
    [dispatch],
  )

  const waHref = useCallback(() => {
    const f = snap.current
    const n = socialUrls().whatsappE164
    if (!n) return '#'
    const t = `Name: ${f.name}\nCompany: ${f.company}\nEmail: ${f.email}\nSubject: ${f.subject}\n\n${f.message}`
    return `https://wa.me/${n}?text=${encodeURIComponent(t)}`
  }, [])

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const f = snap.current
      dispatch(setContactStatus('sending'))
      const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if (!sid || !tid || !pk) {
        dispatch(setContactErrorMessage('Missing EmailJS env keys. Add them to .env and restart dev server.'))
        dispatch(setContactStatus('error'))
        return
      }
      try {
        await emailjs.send(
          sid,
          tid,
          {
            from_name: f.name, // template key
            company_name: f.company, // template key
            from_email: f.email, // template key
            subject: f.subject,
            message: f.message,
            reply_to: f.email,
          },
          { publicKey: pk },
        )
        dispatch(setContactStatus('success'))
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'EmailJS request failed. Check Service/Template/Public key.'
        dispatch(setContactErrorMessage(msg))
        dispatch(setContactStatus('error'))
      }
    },
    [dispatch],
  )

  const s = socialUrls()

  return (
    <section id="contact" className="border-theme relative scroll-mt-24 overflow-hidden border-t px-4 py-24 sm:px-6">
      <DotGrid className="bottom-8 left-4 hidden h-44 w-44 opacity-50 lg:block" />
      <div
        aria-hidden
        className="bg-accent-soft pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        {/* Three columns at lg, as in the reference: pitch, form, direct routes.
            Below lg they stack — the form needs the full width for its 2-up rows. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10">
          {/* ---- Left: the pitch ---- */}
          <SectionHead
            eyebrow="Get In Touch"
            title="Let's Build Something Amazing Together"
            lead="Send me a message directly using Email and Whatsapp."
          />

          {/* ---- Centre: form ---- */}
          <motion.form
            onSubmit={onSubmit}
            className="border-card bg-card depth-3 rounded-xl border p-6 sm:p-8"
            initial={{ opacity: 0, y: 24, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((fd) => (
                <label
                  key={fd.key}
                  className={`text-muted-2 block text-left text-xs uppercase tracking-[0.16em] ${
                    fd.half ? '' : 'sm:col-span-2'
                  }`}
                >
                  {fd.label}
                  {fd.rows ? (
                    <textarea
                      required={fd.key !== 'company'}
                      rows={fd.rows}
                      className={fieldClass}
                      value={c[fd.key]}
                      onChange={(e) => onChange(fd.key, e.target.value)}
                    />
                  ) : (
                    <input
                      required={fd.key === 'name' || fd.key === 'email' || fd.key === 'subject'}
                      type={fd.type ?? 'text'}
                      className={fieldClass}
                      value={c[fd.key]}
                      onChange={(e) => onChange(fd.key, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={c.status === 'sending'}
                className="btn-accent inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider"
              >
                {c.status === 'sending' ? 'Sending…' : 'Send email'} <span aria-hidden>→</span>
              </button>
              <a
                href={waHref()}
                target="_blank"
                rel="noreferrer"
                className="btn-outline inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider"
              >
                Send via WhatsApp
              </a>
            </div>

            {c.status === 'success' && (
              <p className="text-accent mt-4 text-sm">Message sent. I’ll get back to you soon.</p>
            )}
            {c.status === 'error' && (
              <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
                Could not send. {c.errorMessage || 'Check EmailJS config and template variables.'}
              </p>
            )}
            <p className="text-muted-2 mt-4 text-xs">Direct: {PROFILE.email}</p>
          </motion.form>

          {/* ---- Right: direct routes ---- */}
          <Reveal>
            <div className="border-card bg-card depth-2 space-y-6 rounded-xl border p-6">
              <Row icon={MAIL} label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
              <Row icon={LINK} label="LinkedIn" value="naveennk-fullstack-dev" href={s.linkedin} />
              <Row icon={CODE} label="GitHub" value="Naveenpyit" href={s.github} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
})
