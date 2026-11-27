import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, profileData } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'

const SECTION_IDS = navItems.map((item) => item.id)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeId = useActiveSection(SECTION_IDS)

  useEffect(() => {
    let rafId = 0

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
      setScrollProgress(Math.min(1, Math.max(0, ratio)))
      rafId = 0
    }

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[1200] h-[2px] bg-[rgba(245,242,234,0.06)]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-cyan)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <header className="fixed inset-x-0 top-[2px] z-[1000] border-b border-[rgba(245,242,234,0.08)] bg-[rgba(8,8,16,0.88)] backdrop-blur-md">
        <div className="lab-container flex min-h-[74px] items-center justify-between gap-6">
          <a
            href="#home"
            className="inline-flex items-center gap-3"
            aria-label={`${profileData.name}, home`}
          >
            <span className="font-display grid h-[34px] w-[34px] -rotate-4 place-items-center border border-[var(--border-red)] bg-[var(--surface-card)] text-xs font-bold tracking-[-0.05em] text-[var(--accent-red)] shadow-[3px_3px_0_rgba(40,200,255,0.25)]">
              {profileData.monogram}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.94rem] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                {profileData.name}
              </span>
              <span className="font-mono-tech text-[0.6rem] uppercase tracking-[0.08em] text-[var(--text-quiet)]">
                CSE // AI &amp; ML
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative inline-flex items-center gap-1.5 py-1 text-[0.8rem] font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span
                    className={`font-mono-tech text-[0.62rem] transition-colors ${
                      isActive
                        ? 'text-[var(--accent-cyan)]'
                        : 'text-[var(--text-quiet)] group-hover:text-[var(--accent-cyan)]'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-cyan)] transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid h-11 w-11 place-items-center border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-[var(--border-subtle)] bg-[rgba(8,8,16,0.98)] px-4 pb-5 pt-2 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-[rgba(245,242,234,0.06)] py-3 text-sm font-medium ${
                    isActive ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-primary)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono-tech text-[0.65rem] text-[var(--text-quiet)]">
                    {item.index}
                  </span>
                </a>
              )
            })}
          </nav>
        )}
      </header>
    </>
  )
}
