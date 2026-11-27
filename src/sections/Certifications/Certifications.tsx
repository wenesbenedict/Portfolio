import { useEffect, useRef } from 'react'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { certificationsData } from '../../data/certifications'

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    return animateSectionReveals(sectionRef.current)
  }, [])

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-labelledby="certifications-title"
      className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-secondary)] py-20 sm:py-24"
    >
      <div className="lab-container">
        <div data-reveal>
          <SectionHeading
            headingId="certifications-title"
            index="05"
            kicker="Verified credentials"
            title="Certifications"
            aside="Foundational credentials completed across web standards and cloud computing."
          />
        </div>

        {/* Minimalist Verification Ledger (Zero Card Grid) */}
        <div
          data-reveal
          className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]"
        >
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="group grid grid-cols-1 items-center gap-3 py-5 transition-colors hover:bg-[rgba(245,242,234,0.02)] sm:grid-cols-[72px_1.2fr_1fr_auto] sm:gap-6"
            >
              <span className="font-mono-tech text-xs text-[var(--accent-red)]">
                {cert.index} // {cert.code}
              </span>

              <h3 className="font-display text-lg font-bold tracking-[-0.03em] text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] sm:text-xl">
                {cert.title}
              </h3>

              <span className="text-sm text-[var(--text-secondary)]">{cert.issuer}</span>

              <span className="font-mono-tech text-xs uppercase tracking-[0.06em] text-[var(--accent-cyan)] sm:text-right">
                {cert.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
