import { profileData } from '../../data/profile'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[#07070d]">
      <div className="lab-container flex min-h-[92px] flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
        <a href="#home" className="inline-flex items-center gap-2.5">
          <span className="font-display grid h-8 w-8 -rotate-4 place-items-center border border-[var(--border-red)] text-xs font-bold text-[var(--accent-red)]">
            {profileData.monogram}
          </span>
          <span className="font-display text-sm font-semibold text-[var(--text-primary)]">
            {profileData.name}
          </span>
        </a>

        <p className="text-xs text-[var(--text-quiet)]">
          B.Tech CSE (AI &amp; ML) <span className="px-1 text-[var(--accent-red)]">·</span>{' '}
          Computer Vision <span className="px-1 text-[var(--accent-red)]">·</span> Software
          Development
        </p>

        <span className="font-mono-tech text-[0.62rem] text-[var(--text-quiet)]">
          © 2026 {profileData.name}
        </span>
      </div>
    </footer>
  )
}
