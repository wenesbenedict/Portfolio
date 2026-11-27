import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Layers, X } from 'lucide-react'
import type { ProjectItem } from '../../data/projects'

interface ProjectDossierModalProps {
  project: ProjectItem | null
  onClose: () => void
}

type DossierTab = 'overview' | 'architecture' | 'stack'

const DOSSIER_TABS: { id: DossierTab; label: string }[] = [
  { id: 'overview', label: '01. Overview & Problem' },
  { id: 'architecture', label: '02. Architecture' },
  { id: 'stack', label: '03. Features & Stack' },
]

const nodeBorderMap = {
  red: 'border-[var(--border-red)] text-[var(--accent-red)]',
  cyan: 'border-[var(--border-cyan)] text-[var(--accent-cyan)]',
  violet: 'border-[var(--border-violet)] text-[var(--accent-violet)]',
}

export function ProjectDossierModal({ project, onClose }: ProjectDossierModalProps) {
  const [activeTab, setActiveTab] = useState<DossierTab>('overview')
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setActiveTab('overview')
    setHoveredNodeId(null)
    setFailedImages({})
  }, [project?.id])

  useEffect(() => {
    if (!project) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const nextIdx =
      e.key === 'ArrowRight'
        ? (idx + 1) % DOSSIER_TABS.length
        : (idx - 1 + DOSSIER_TABS.length) % DOSSIER_TABS.length
    setActiveTab(DOSSIER_TABS[nextIdx].id)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-[1400] flex items-center justify-center bg-[rgba(4,4,9,0.82)] p-3 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-[rgba(245,242,234,0.18)] bg-[var(--bg-secondary)] shadow-[10px_10px_0_rgba(40,200,255,0.12)]">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 py-4 sm:px-7">
          <div>
            <p className="font-mono-tech text-[0.65rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
              PROJECT DOSSIER // {project.index} — {project.status}
            </p>
            <h3
              id="dossier-title"
              className="font-display mt-1 text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project dossier"
            className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-red)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dossier Tabs */}
        <div
          role="tablist"
          aria-label="Project dossier sections"
          className="flex gap-1 overflow-x-auto border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 pt-3 sm:px-7"
        >
          {DOSSIER_TABS.map((tab, idx) => {
            const selected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`font-mono-tech shrink-0 border-b-2 px-3.5 py-2.5 text-[0.68rem] uppercase tracking-[0.07em] transition-colors cursor-pointer ${
                  selected
                    ? 'border-[var(--accent-cyan)] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                  <p className="font-mono-tech mb-2 text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-red)]">
                    PROBLEM STATEMENT
                  </p>
                  <p className="text-sm leading-relaxed text-[#c6c4ce]">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                  <p className="font-mono-tech mb-2 text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
                    PROJECT OVERVIEW
                  </p>
                  <p className="text-sm leading-relaxed text-[#c6c4ce]">{project.overview}</p>
                </div>
              </div>

              {project.screenshots && project.screenshots.length > 0 && (
                <div>
                  <p className="font-mono-tech mb-3 text-[0.64rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    VERIFIED APPLICATION SCREENSHOTS
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.screenshots.map((shot) => (
                      <figure
                        key={shot.title}
                        className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
                      >
                        {failedImages[shot.url] ? (
                          <div className="font-mono-tech grid aspect-video place-items-center p-4 text-center text-xs text-[var(--text-quiet)]">
                            Screenshot preview unavailable offline ({shot.title})
                          </div>
                        ) : (
                          <img
                            src={shot.url}
                            alt={`${project.title} — ${shot.title}`}
                            loading="lazy"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [shot.url]: true }))
                            }
                            className="aspect-video w-full object-cover object-top"
                          />
                        )}
                        <figcaption className="font-mono-tech border-t border-[var(--border-subtle)] px-3 py-2 text-[0.62rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                          {shot.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="font-mono-tech flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.09em] text-[var(--text-secondary)]">
                  <Layers size={14} className="text-[var(--accent-cyan)]" />
                  SYSTEM DATA-FLOW PIPELINE
                </p>
                <span className="font-mono-tech text-[0.62rem] text-[var(--text-quiet)]">
                  HOVER A STAGE TO INSPECT
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {project.architecture.map((node, index) => {
                  const isHovered = hoveredNodeId === node.id
                  return (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className={`relative border bg-[var(--bg-primary)] p-4 transition-all duration-150 ${
                        isHovered
                          ? `${nodeBorderMap[node.accent]} -translate-y-1 shadow-[4px_4px_0_rgba(40,200,255,0.16)]`
                          : 'border-[var(--border-subtle)]'
                      }`}
                    >
                      <span className="font-mono-tech text-[0.6rem] text-[var(--text-quiet)]">
                        STAGE 0{index + 1}
                      </span>
                      <h4 className="font-display mt-2 text-sm font-semibold text-[var(--text-primary)]">
                        {node.label}
                      </h4>
                      <p className="font-mono-tech mt-1 text-[0.65rem] text-[var(--accent-cyan)]">
                        {node.sublabel}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                <p className="font-mono-tech mb-3 text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-cyan)]">
                  IMPLEMENTED FEATURES
                </p>
                <ul className="space-y-2.5 text-sm text-[#c6c4ce]">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="font-mono-tech mt-1 text-xs text-[var(--accent-red)]">
                        →
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                <p className="font-mono-tech mb-3 text-[0.64rem] uppercase tracking-[0.1em] text-[var(--accent-red)]">
                  TECHNOLOGY STACK
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech border border-[rgba(245,242,234,0.14)] bg-[var(--surface-card)] px-2.5 py-1 text-[0.68rem] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 py-3.5 sm:px-7">
          <span className="font-mono-tech text-[0.65rem] text-[var(--text-secondary)]">
            CATEGORY: {project.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--border-cyan)] bg-[rgba(40,200,255,0.08)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[rgba(40,200,255,0.16)]"
              >
                <span>View on GitHub</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="font-mono-tech text-[0.64rem] text-[var(--text-quiet)]">
                PRIVATE / OFFLINE REPOSITORY
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
