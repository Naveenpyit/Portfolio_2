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
    <header className="border-theme depth-2 fixed inset-x-0 top-0 z-50 border-b bg-header backdrop-blur-xl">
      <motion.div className="bar-accent h-0.5 origin-left" style={{ scaleX: bar }} />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navTo('home')}
          className="flex cursor-pointer items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="btn-accent font-display grid h-8 w-8 place-items-center rounded-lg text-sm font-bold">
            NM
          </span>
          <span className="text-heading font-display text-lg font-semibold tracking-tight">Portfolio</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => navTo(id)}
              className={`relative cursor-pointer px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeId === id ? 'text-accent' : 'text-muted-2 hover:text-heading'
              }`}
            >
              {label}
              {/* One shared element slides between items rather than each item
                  fading its own bar — the travel is what marks the change. */}
              {activeId === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="bg-accent absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTheme}
            className="text-heading border-social hover:border-accent hover:text-accent cursor-pointer rounded-lg border p-2 transition"
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
            className="border-accent text-accent hover:bg-accent-soft hidden cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition sm:inline-flex"
          >
            Download CV <span aria-hidden>↓</span>
          </button>
          <button
            type="button"
            className="text-heading cursor-pointer rounded-lg p-2 md:hidden"
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
              <button
                key={id}
                type="button"
                className={`rounded-lg py-2 text-left text-sm font-semibold uppercase tracking-wider ${
                  activeId === id ? 'text-accent' : 'text-heading'
                }`}
                onClick={() => navTo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
})
