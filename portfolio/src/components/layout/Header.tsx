import { motion, useScroll, useSpring } from 'framer-motion'
import { memo, useCallback, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMenuOpen, toggleTheme } from '../../features/uiSlice'
import { NAV } from '../../data/content'

const Sun = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const Moon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

export const Header = memo(function Header() {
  const dispatch = useAppDispatch()
  const { menuOpen, activeId, theme } = useAppSelector((s) => s.ui)
  const resumeRef = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  const navTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      dispatch(setMenuOpen(false))
    },
    [dispatch],
  )

  const onResume = useCallback(() => resumeRef.current?.click(), [])
  const onTheme = useCallback(() => dispatch(toggleTheme()), [dispatch])

  const items = useMemo(() => NAV, [])

  return (
    <header className="border-theme fixed inset-x-0 top-0 z-50 border-b bg-header backdrop-blur-xl">
      <motion.div className="h-0.5 origin-left bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ scaleX: bar }} />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button type="button" onClick={() => navTo('home')} className="text-heading font-display text-lg font-semibold tracking-tight">
          Portfolio
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {items.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => navTo(id)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${activeId === id ? 'bg-nav-active text-heading' : 'text-muted-2 hover:text-heading'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTheme}
            className="text-heading border-theme cursor-pointer hover:bg-nav-active rounded-full border p-2 transition-all duration-700"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a ref={resumeRef} href="/NaveenResume.pdf.pdf" download className="sr-only" aria-hidden>
            resume
          </a>
          <button
            type="button"
            onClick={onResume}
            className="rounded-full cursor-pointer bg-linear-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          >
            Download CV
          </button>
          <button
            type="button"
            className="text-heading rounded-lg p-2 md:hidden cursor-pointer"
            aria-label="Menu"
            onClick={() => dispatch(setMenuOpen(!menuOpen))}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="my-1 block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-theme bg-menu-mobile border-t px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {items.map(({ id, label }) => (
              <button key={id} type="button" className="text-heading rounded-lg py-2 text-left" onClick={() => navTo(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
})
