import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { aboutData } from '../../data/profile'
import { projectsData } from '../../data/projects'

interface AboutProps {
  onInspectProject: (projectId: string) => void
}

const principleProjectMap: Record<number, string[]> = {
  0: ['student-wellbeing', 'task-tracker'],
  1: ['visionguard-ai', 'polargrid-ai'],
  2: ['agricell-ai', 'iot-embedded'],
}

const accentBorderMap = {
  red: 'border-l-[var(--accent-red)]',
  cyan: 'border-l-[var(--accent-cyan)]',
  violet: 'border-l-[var(--accent-violet)]',
}

export function About({ onInspectProject }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current) return
    return animateSectionReveals(sectionRef.current)
  }, [])

  const activePanel = aboutData.panels[activeIndex] ?? aboutData.panels[0]
  const evidenceProjects = projectsData.filter((p) =>
    (principleProjectMap[activeIndex] ?? []).includes(p.id),
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
      className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-secondary)] py-20 sm:py-28"
    >
      <div className="lab-container">
        <div data-reveal>
          <SectionHeading
            headingId="about-title"
            index="01"
            kicker="Systems builder & explorer"
            title="About"
            highlight="me"
          />
        </div>

        {/* Asymmetric Editorial Manifesto */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div
            data-reveal
            className={`relative border-l-2 pl-6 transition-colors duration-300 ${accentBorderMap[activePanel.accent]}`}
          >
            <p className="font-mono-tech mb-3 text-[0.64rem] uppercase tracking-[0.12em] text-[var(--accent-cyan)]">
              {aboutData.statementLabel}
            </p>
            <blockquote className="font-display m-0 text-3xl font-bold leading-[1.05] tracking-[-0.05em] text-[var(--text-primary)] sm:text-5xl">
              {aboutData.statementLead}{' '}
              <span className="text-[var(--text-secondary)]">{aboutData.statementHighlight}</span>
            </blockquote>
          </div>

          <div data-reveal>
            <div className="space-y-4 text-base leading-[1.82] text-[#c2c0ca]">
              {aboutData.paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3">
              {aboutData.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono-tech text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Interactive 3-Row Principle Switcher with Project Evidence */}
        <div data-reveal className="mt-14 border-t border-[var(--border-subtle)]">
          {aboutData.panels.map((panel, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={panel.index}
                className="border-b border-[var(--border-subtle)] transition-colors duration-200"
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                  data-cursor="read"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--accent-cyan)]"
                >
                  <div className="flex flex-wrap items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono-tech text-xs uppercase tracking-[0.1em] ${
                        isActive ? 'text-[var(--accent-red)]' : 'text-[var(--text-quiet)]'
                      }`}
                    >
                      {panel.index}
                    </span>
                    <span className="font-display text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                      {panel.title}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs text-[var(--accent-cyan)]">
                    {isActive ? 'ACTIVE' : '+'}
                  </span>
                </button>

                {isActive && (
                  <div className="space-y-4 pb-6 pl-0 sm:pl-24">
                    <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                      {panel.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono-tech text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
                        EVIDENCE IN WORK:
                      </span>
                      {evidenceProjects.map((proj) => (
                        <button
                          key={proj.id}
                          type="button"
                          data-cursor="inspect"
                          onClick={() => onInspectProject(proj.id)}
                          className="font-mono-tech inline-flex items-center gap-1.5 border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-xs text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight size={13} className="text-[var(--accent-red)]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
