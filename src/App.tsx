import { useMemo, useState } from 'react'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { Footer } from './components/Footer/Footer'
import { GlitchOverlay } from './components/GlitchOverlay/GlitchOverlay'
import { Navbar } from './components/Navbar/Navbar'
import { ProjectDossierModal } from './components/ProjectDossierModal/ProjectDossierModal'
import { projectsData } from './data/projects'
import { About } from './sections/About/About'
import { Certifications } from './sections/Certifications/Certifications'
import { Contact } from './sections/Contact/Contact'
import { Hero } from './sections/Hero/Hero'
import { Journey } from './sections/Journey/Journey'
import { SelectedWork } from './sections/SelectedWork/SelectedWork'
import { TechnicalArsenal } from './sections/TechnicalArsenal/TechnicalArsenal'

export function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  const activeProject = useMemo(
    () => projectsData.find((p) => p.id === activeProjectId) ?? null,
    [activeProjectId],
  )

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <GlitchOverlay />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About onInspectProject={(id) => setActiveProjectId(id)} />
        <TechnicalArsenal onInspectProject={(id) => setActiveProjectId(id)} />
        <SelectedWork onInspectProject={(id) => setActiveProjectId(id)} />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ProjectDossierModal
        project={activeProject}
        onClose={() => setActiveProjectId(null)}
      />
    </div>
  )
}

export default App
