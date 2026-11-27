import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, ExternalLink, FolderGit2 } from 'lucide-react'
import { animateSectionReveals } from '../../animations/scrollAnimations'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { projectsData, type ProjectItem } from '../../data/projects'

interface SelectedWorkProps {
  onInspectProject: (projectId: string) => void
}

const statusToneClasses: Record<ProjectItem['statusTone'], string> = {
  paused: 'border-[var(--border-red)] text-[var(--accent-red)]',
  completed: 'border-[var(--border-cyan)] text-[var(--accent-cyan)]',
  active: 'border-[var(--border-violet)] text-[var(--accent-violet)]',
  prototype: 'border-[rgba(245,242,234,0.24)] text-[var(--text-secondary)]',
}

const screenshotNotes: Record<string, string> = {
  Dashboard: 'Main task workspace showing active, completed, and failed task states.',
  'Login Page': 'JWT-authenticated sign-in flow connected to Express & MongoDB Atlas.',
  'History Page': 'Chronological task history view for auditing past task outcomes.',
  'Settings Page': 'User profile and account configuration backed by Mongoose.',
}

function FlagshipVisual({ project }: { project: ProjectItem }) {
  const [activeShotIndex, setActiveShotIndex] = useState(0)
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [polarMode, setPolarMode] = useState<'forecast' | 'optimize'>('forecast')
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  // 1. Task-Tracker: Real screenshot walkthrough
  if (project.screenshots && project.screenshots.length > 0) {
    const activeShot = project.screenshots[activeShotIndex] ?? project.screenshots[0]
    return (
      <div className="border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="font-mono-tech flex items-center justify-between border-b border-[var(--border-subtle)] px-3.5 py-2 text-[0.6rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
          <span>WALKTHROUGH // 0{activeShotIndex + 1} OF 0{project.screenshots.length}</span>
          <span className="text-[var(--accent-cyan)]">{activeShot.title}</span>
        </div>

        <div className="relative aspect-video overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          {failedImages[activeShot.url] ? (
            <div className="font-mono-tech grid h-full place-items-center p-4 text-center text-xs text-[var(--text-quiet)]">
              Screenshot preview unavailable offline ({activeShot.title})
            </div>
          ) : (
            <img
              key={activeShot.url}
              src={activeShot.url}
              alt={`${project.title} — ${activeShot.title}`}
              loading="lazy"
              onError={() =>
                setFailedImages((prev) => ({ ...prev, [activeShot.url]: true }))
              }
              className="h-full w-full object-cover object-top transition-opacity duration-300"
            />
          )}
        </div>

        <div className="space-y-3 p-3.5">
          <p className="text-xs text-[var(--text-secondary)]">
            {screenshotNotes[activeShot.title] ?? `Verified ${activeShot.title} view.`}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.screenshots.map((shot, idx) => (
              <button
                key={shot.title}
                type="button"
                data-cursor="node"
                onClick={() => setActiveShotIndex(idx)}
                className={`font-mono-tech border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.06em] transition-colors ${
                  idx === activeShotIndex
                    ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.12)] text-[var(--text-primary)]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                0{idx + 1} {shot.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 2. PolarGrid AI: Forecast -> Optimize interactive split
  if (project.id === 'polargrid-ai') {
    return (
      <div className="tech-grid-bg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5 sm:p-6">
        <div className="font-mono-tech mb-4 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
          <span>DUAL-STAGE ENGINE</span>
          <span className="text-[var(--accent-violet)]">ML → OPTIMIZATION</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-cursor="node"
            onClick={() => setPolarMode('forecast')}
            className={`border p-3 text-left transition-all ${
              polarMode === 'forecast'
                ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.1)] shadow-[3px_3px_0_var(--accent-red)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] opacity-70 hover:opacity-100'
            }`}
          >
            <span className="font-mono-tech block text-[0.56rem] text-[var(--accent-cyan)]">
              STAGE 01 // PREDICT
            </span>
            <span className="font-display mt-1 block text-sm font-bold text-[var(--text-primary)]">
              Demand Forecasting
            </span>
          </button>

          <button
            type="button"
            data-cursor="node"
            onClick={() => setPolarMode('optimize')}
            className={`border p-3 text-left transition-all ${
              polarMode === 'optimize'
                ? 'border-[var(--accent-red)] bg-[rgba(255,49,85,0.1)] shadow-[3px_3px_0_var(--accent-cyan)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] opacity-70 hover:opacity-100'
            }`}
          >
            <span className="font-mono-tech block text-[0.56rem] text-[var(--accent-red)]">
              STAGE 02 // SCHEDULE
            </span>
            <span className="font-display mt-1 block text-sm font-bold text-[var(--text-primary)]">
              CP-SAT Optimizer
            </span>
          </button>
        </div>

        <div className="mt-4 border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4">
          {polarMode === 'forecast' ? (
            <div className="space-y-2">
              <p className="font-mono-tech text-[0.62rem] uppercase text-[var(--accent-cyan)]">
                Pandas + Scikit-learn + XGBoost
              </p>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Processes polar station telemetry to forecast upcoming energy load and generation windows before scheduling begins.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-mono-tech text-[0.62rem] uppercase text-[var(--accent-red)]">
                Google OR-Tools (CP-SAT) + FastAPI + PostgreSQL
              </p>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Takes forecasted demand as constraints to compute optimal power allocation schedules, persisted in PostgreSQL and served to React.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 3. VisionGuard AI: Interactive 5-stage CV pipeline
  const activeStage = project.architecture[activeStageIndex] ?? project.architecture[0]

  return (
    <div className="tech-grid-bg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5 sm:p-6">
      <div className="font-mono-tech mb-4 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.1em] text-[var(--text-quiet)]">
        <span>CV PIPELINE EXPLORER</span>
        <span className="text-[var(--accent-red)]">STEP 0{activeStageIndex + 1} / 0{project.architecture.length}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {project.architecture.map((node, idx) => {
          const isSelected = idx === activeStageIndex
          return (
            <div key={node.id} className="flex items-center gap-2">
              <button
                type="button"
                data-cursor="node"
                onClick={() => setActiveStageIndex(idx)}
                className={`border px-3 py-2.5 text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.1)] shadow-[3px_3px_0_var(--accent-red)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[rgba(245,242,234,0.28)]'
                }`}
              >
                <span className="font-mono-tech block text-[0.55rem] text-[var(--text-quiet)]">
                  0{idx + 1}
                </span>
                <span className="font-display block text-xs font-semibold text-[var(--text-primary)]">
                  {node.label}
                </span>
              </button>
              {idx < project.architecture.length - 1 && (
                <ArrowRight size={13} className="text-[var(--text-quiet)]" aria-hidden="true" />
              )}
            </div>
          )
        })}
      </div>

      {activeStage && (
        <div className="mt-4 border-t border-[var(--border-subtle)] pt-3.5 text-xs leading-relaxed text-[var(--text-secondary)]">
          <span className="font-mono-tech mr-2 text-[var(--accent-cyan)]">
            [{activeStage.sublabel}]
          </span>
          Stage 0{activeStageIndex + 1} in the VisionGuard MVP architecture ({activeStage.label}).
        </div>
      )}
    </div>
  )
}

export function SelectedWork({ onInspectProject }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    return animateSectionReveals(sectionRef.current)
  }, [])

  const flagshipIds = new Set(['visionguard-ai', 'task-tracker', 'polargrid-ai'])
  const flagships = projectsData.filter((p) => flagshipIds.has(p.id))
  const explorations = projectsData.filter((p) => !flagshipIds.has(p.id))

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="relative z-10 border-t border-[rgba(245,242,234,0.08)] bg-[var(--bg-secondary)] py-20 sm:py-28"
    >
      <div className="lab-container">
        <div data-reveal-mask>
          <SectionHeading
            headingId="projects-title"
            index="03"
            kicker="Evidence of engineering"
            title="Selected"
            highlight="Work"
            aside="Explore how each system works interactively, or open a project dossier for full architecture and repository links."
          />
        </div>

        {/* Alternating Flagship Case-Study Bands */}
        <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
          {flagships.map((project, index) => {
            const reverseOnDesktop = index % 2 === 1
            return (
              <article
                key={project.id}
                data-reveal-slide
                className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`lg:col-span-6 ${reverseOnDesktop ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <FlagshipVisual project={project} />
                </div>

                <div
                  className={`lg:col-span-6 ${reverseOnDesktop ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono-tech text-xs text-[var(--accent-red)]">
                      {project.index}
                    </span>
                    <span className="font-mono-tech text-[0.65rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                      {project.category}
                    </span>
                    <span
                      className={`font-mono-tech border px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.06em] ${statusToneClasses[project.statusTone]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3
                    data-cursor="glitch"
                    className="glitch-hover font-display w-fit text-3xl font-bold tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl"
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#c2c0ca] sm:text-base">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 7).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech border border-[rgba(245,242,234,0.12)] px-2.5 py-0.5 text-[0.62rem] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-6">
                    <button
                      type="button"
                      data-cursor="inspect"
                      onClick={() => onInspectProject(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent-cyan)]"
                    >
                      <span>Open Project Dossier</span>
                      <ArrowUpRight size={15} className="text-[var(--accent-red)]" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="open"
                        className="font-mono-tech inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-cyan)]"
                      >
                        <FolderGit2 size={14} />
                        <span>Repository</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Exploratory & Internship Builds — Editorial Index Rows */}
        <div data-reveal className="mt-14">
          <p className="font-mono-tech mb-4 text-[0.66rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            FURTHER BUILDS // HACKATHONS, INTERNSHIPS &amp; HARDWARE
          </p>

          <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
            {explorations.map((project) => (
              <div
                key={project.id}
                className="group grid grid-cols-1 items-center gap-4 py-6 transition-colors hover:bg-[rgba(245,242,234,0.02)] md:grid-cols-[70px_1.1fr_1fr_auto] md:gap-6"
              >
                <span className="font-mono-tech text-xs text-[var(--accent-cyan)]">
                  {project.index}
                </span>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)]">
                    {project.title}
                  </h3>
                  <p className="font-mono-tech mt-1 text-[0.62rem] uppercase tracking-[0.06em] text-[var(--text-quiet)]">
                    {project.category} · {project.status}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.summary}
                </p>

                <button
                  type="button"
                  data-cursor="inspect"
                  onClick={() => onInspectProject(project.id)}
                  className="inline-flex items-center justify-self-start gap-1.5 border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] md:justify-self-end"
                >
                  <span>Dossier</span>
                  <ArrowUpRight size={14} className="text-[var(--accent-red)]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
