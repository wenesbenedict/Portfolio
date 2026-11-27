import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { projectsData } from '../../data/projects'
import {
  arsenalDomains,
  devEnvironmentTools,
  techItems,
  type ArsenalDomainId,
} from '../../data/skills'

interface TechnicalArsenalProps {
  onInspectProject: (projectId: string) => void
}

interface ConnectionPath {
  id: string
  d: string
}

export function TechnicalArsenal({ onInspectProject }: TechnicalArsenalProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const techBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const projectRowRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const [activeDomain, setActiveDomain] = useState<ArsenalDomainId>('ai-ml')
  const [selectedTechId, setSelectedTechId] = useState<string>('python')
  const [paths, setPaths] = useState<ConnectionPath[]>([])

  useEffect(() => {
    if (!sectionRef.current) return
    return animateSectionReveals(sectionRef.current)
  }, [])

  const visibleTech = useMemo(() => {
    return techItems.filter((item) => item.domain === activeDomain)
  }, [activeDomain])

  const selectedTech = useMemo(() => {
    return (
      visibleTech.find((item) => item.id === selectedTechId) ??
      visibleTech[0] ??
      techItems[0]
    )
  }, [visibleTech, selectedTechId])

  const computePaths = useCallback(() => {
    const container = graphContainerRef.current
    const sourceEl = techBtnRefs.current[selectedTech.id]
    if (!container || !sourceEl) {
      setPaths([])
      return
    }

    const cRect = container.getBoundingClientRect()
    const sRect = sourceEl.getBoundingClientRect()
    const x1 = sRect.right - cRect.left
    const y1 = sRect.top + sRect.height / 2 - cRect.top

    const nextPaths: ConnectionPath[] = []
    for (const projId of selectedTech.projectIds) {
      const targetEl = projectRowRefs.current[projId]
      if (!targetEl) continue
      const tRect = targetEl.getBoundingClientRect()
      const x2 = tRect.left - cRect.left
      const y2 = tRect.top + tRect.height / 2 - cRect.top
      const cx = x1 + (x2 - x1) * 0.5
      nextPaths.push({
        id: `${selectedTech.id}-${projId}`,
        d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
      })
    }

    setPaths(nextPaths)
  }, [selectedTech])

  useLayoutEffect(() => {
    computePaths()
    const observer = new ResizeObserver(() => computePaths())
    if (graphContainerRef.current) observer.observe(graphContainerRef.current)
    window.addEventListener('resize', computePaths, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', computePaths)
    }
  }, [computePaths])

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      aria-labelledby="arsenal-title"
      className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-primary)] py-20 sm:py-28"
    >
      <div className="lab-container">
        <div data-reveal>
          <SectionHeading
            headingId="arsenal-title"
            index="02"
            kicker="Engineering domains & project links"
            title="Technical"
            highlight="Arsenal"
            aside="Choose an engineering domain, then select any technology to trace where it was applied in real builds."
          />
        </div>

        {/* 6 Engineering Domains Navigation */}
        <div
          data-reveal
          role="tablist"
          aria-label="Engineering domains"
          className="mb-10 grid grid-cols-1 gap-2 border-b border-[var(--border-subtle)] pb-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {arsenalDomains.map((domain) => {
            const isActive = activeDomain === domain.id
            return (
              <button
                key={domain.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveDomain(domain.id)
                  const firstInDomain = techItems.find((t) => t.domain === domain.id)
                  if (firstInDomain) setSelectedTechId(firstInDomain.id)
                }}
                className={`flex items-center justify-between border px-4 py-3 text-left transition-all duration-150 ${
                  isActive
                    ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.08)] text-[var(--text-primary)] shadow-[3px_3px_0_var(--accent-red)]'
                    : 'border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)] hover:border-[rgba(245,242,234,0.28)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="font-mono-tech text-[0.7rem] uppercase tracking-[0.06em]">
                  <span className="mr-2 text-[var(--accent-red)]">{domain.index}</span>
                  {domain.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Interactive Node-to-Project Graph */}
        <div
          ref={graphContainerRef}
          data-reveal
          className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
        >
          {/* SVG Connection Lines (Desktop) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
          >
            {paths.map((path) => (
              <g key={path.id}>
                <path
                  d={path.d}
                  fill="none"
                  stroke="rgba(40,200,255,0.48)"
                  strokeWidth="1.5"
                />
                <path
                  d={path.d}
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                  className="opacity-70"
                />
              </g>
            ))}
          </svg>

          {/* Left: Technologies in Selected Domain + Role Summary */}
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap gap-2.5">
              {visibleTech.map((tech) => {
                const isSelected = selectedTech.id === tech.id
                return (
                  <button
                    key={tech.id}
                    ref={(el) => {
                      techBtnRefs.current[tech.id] = el
                    }}
                    type="button"
                    data-cursor="node"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTechId(tech.id)}
                    className={`inline-flex items-center gap-2.5 border px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isSelected
                        ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.12)] text-[var(--text-primary)] shadow-[4px_4px_0_var(--accent-red)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[#c4c2cc] opacity-80 hover:border-[var(--border-cyan)] hover:opacity-100'
                    }`}
                  >
                    <span>{tech.name}</span>
                    <span className="font-mono-tech text-[0.62rem] text-[var(--accent-cyan)]">
                      {tech.projectIds.length}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="border-l-2 border-[var(--accent-red)] pl-4">
              <p className="font-mono-tech text-[0.62rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
                ACTIVE NODE // {selectedTech.name}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {selectedTech.role}
              </p>
            </div>
          </div>

          {/* Right: Verified Project Relationships */}
          <div className="relative z-10 space-y-2.5">
            <p className="font-mono-tech mb-2 text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
              PROJECT CONNECTIONS ({selectedTech.projectIds.length} / {projectsData.length})
            </p>

            {projectsData.map((project) => {
              const isConnected = selectedTech.projectIds.includes(project.id)
              return (
                <button
                  key={project.id}
                  ref={(el) => {
                    projectRowRefs.current[project.id] = el
                  }}
                  type="button"
                  data-cursor={isConnected ? 'inspect' : undefined}
                  onClick={() => onInspectProject(project.id)}
                  className={`group flex w-full items-center justify-between border px-4 py-3 text-left transition-all duration-200 ${
                    isConnected
                      ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.08)] text-[var(--text-primary)] shadow-[4px_4px_0_rgba(255,49,85,0.28)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-quiet)] opacity-35 hover:opacity-75'
                  }`}
                >
                  <div>
                    <span className="block text-sm font-semibold">{project.title}</span>
                    <span className="font-mono-tech text-[0.58rem] uppercase tracking-[0.06em] text-[var(--text-secondary)]">
                      {project.status}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className={
                      isConnected
                        ? 'text-[var(--accent-red)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        : 'text-[var(--text-quiet)]'
                    }
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Separate Development Environment & Tooling Strip */}
        <div
          data-reveal
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6"
        >
          <span className="font-mono-tech text-[0.64rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
            DEVELOPMENT ENVIRONMENT &amp; TOOLING
          </span>
          <div className="flex flex-wrap gap-2">
            {devEnvironmentTools.map((tool) => (
              <span
                key={tool}
                className="font-mono-tech border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-secondary)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
