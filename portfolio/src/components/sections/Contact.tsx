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
import { Reveal } from '../anim/Reveal'
import { PROFILE, socialUrls } from '../../data/content'

const fields: { key: ContactField; label: string; type?: string; rows?: number }[] = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company Name' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'subject', label: 'Subject' },
  { key: 'message', label: 'Content', rows: 4 },
]

const fieldClass =
  'border-card bg-input-field text-heading mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:border-cyan-500/60 dark:focus:border-cyan-500/50'

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

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-heading font-display text-3xl font-bold sm:text-4xl">Contact Me</h2>
          <p className="text-muted-2 mt-2">Send me a message directly using EmailJS.</p>
        </Reveal>
        <motion.form
          onSubmit={onSubmit}
          className="border-card bg-card mx-auto mt-10 max-w-xl space-y-4 rounded-2xl border p-6 shadow-sm sm:p-8 dark:shadow-none"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {fields.map((fd) => (
            <label key={fd.key} className="text-muted-2 block text-left text-sm">
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
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={c.status === 'sending'}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {c.status === 'sending' ? 'Sending…' : 'Send email'}
            </button>
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="border-social text-heading hover:border-cyan-500/60 rounded-full border px-6 py-2.5 text-sm dark:hover:border-cyan-500/40"
            >
              Send via WhatsApp
            </a>
          </div>
          {c.status === 'success' && <p className="text-sm text-emerald-600 dark:text-emerald-400">Message sent. I’ll get back to you soon.</p>}
          {c.status === 'error' && (
            <p className="text-sm text-rose-600 dark:text-rose-400">
              Could not send. {c.errorMessage || 'Check EmailJS config and template variables.'}
            </p>
          )}
          <p className="text-muted-2 text-xs">Direct: {PROFILE.email}</p>
        </motion.form>
      </div>
    </section>
  )
})
