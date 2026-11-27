import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { journeyData } from '../../data/journey'

gsap.registerPlugin(ScrollTrigger)

const markerColorMap = {
  red: 'bg-[var(--accent-red)] shadow-[0_0_0_1px_var(--accent-red)]',
  cyan: 'bg-[var(--accent-cyan)] shadow-[0_0_0_1px_var(--accent-cyan)]',
  violet: 'bg-[var(--accent-violet)] shadow-[0_0_0_1px_var(--accent-violet)]',
}

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanReveals = sectionRef.current ? animateSectionReveals(sectionRef.current) : undefined

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!spineRef.current || !sectionRef.current) return
      gsap.from(spineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    })

    return () => {
      cleanReveals?.()
      mm.revert()
    }
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-labelledby="journey-title"
      className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-primary)] py-20 sm:py-28"
    >
      <div className="lab-container grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            headingId="journey-title"
            index="04"
            kicker="Education & milestones"
            title="My"
            highlight="Journey"
          />
          <p className="-mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
            Verified academic background, internship builds, Smart India Hackathon participation, and technical certifications.
          </p>
        </div>

        <div className="relative pl-7">
          <div
            ref={spineRef}
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-[5px] w-[1px] bg-gradient-to-b from-[var(--accent-red)] via-[var(--accent-cyan)] to-[rgba(40,200,255,0.12)]"
          />

          <div className="space-y-4">
            {journeyData.map((entry) => (
              <article
                key={entry.id}
                data-reveal
                className="relative border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface-card)] to-[rgba(14,14,23,0.92)] p-6"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-7 -left-[27px] h-3 w-3 rounded-full border-2 border-[var(--bg-primary)] ${markerColorMap[entry.accent]}`}
                />
                <div className="font-mono-tech mb-2 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
                  <span>{entry.type}</span>
                  {entry.period && <span className="text-[var(--text-quiet)]">{entry.period}</span>}
                </div>
                <h3 className="font-display text-xl font-bold tracking-[-0.035em] text-[var(--text-primary)]">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
