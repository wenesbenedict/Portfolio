import { useEffect, useRef, useState } from 'react'
import { animateHeroEntrance } from '../../animations/heroAnimations'
import { Button } from '../../components/Button/Button'
import { triggerScreenGlitch } from '../../components/GlitchOverlay/GlitchOverlay'
import { profileData } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ChromaticWordProps {
  word: string
  period?: boolean
  indentClass?: string
  isAccent?: boolean
  hoveredIndex: number | null
  index: number
  onHoverChange: (index: number | null) => void
}

function ChromaticWord({
  word,
  period = false,
  indentClass = '',
  isAccent = false,
  hoveredIndex,
  index,
  onHoverChange,
}: ChromaticWordProps) {
  const reducedMotion = useReducedMotion()
  const [isGlitching, setIsGlitching] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  const isHovered = hoveredIndex === index
  const isDimmed = hoveredIndex !== null && !isHovered

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    onHoverChange(index)
    if (reducedMotion) return
    setIsGlitching(true)
    triggerScreenGlitch()
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setIsGlitching(false)
    }, 240)
  }

  const handleMouseLeave = () => {
    onHoverChange(null)
    setIsGlitching(false)
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }

  return (
    <span className={`block ${indentClass}`}>
      <span
        data-hero-line
        data-cursor="glitch"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-block w-fit transition-opacity duration-200 ${
          isDimmed ? 'opacity-55' : 'opacity-100'
        }`}
      >
        {/* Chromatic split layers only mount during active hover glitch pulse */}
        {isGlitching && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 select-none text-[var(--accent-red)] opacity-85 mix-blend-screen"
              style={{ transform: 'translate3d(-7px, -2px, 0)' }}
            >
              {word}
              {period && '.'}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 select-none text-[var(--accent-cyan)] opacity-85 mix-blend-screen"
              style={{ transform: 'translate3d(7px, 2px, 0)' }}
            >
              {word}
              {period && '.'}
            </span>
          </>
        )}

        {/* Single Primary Ink Layer when idle */}
        <span
          className={`relative z-10 inline-block ${
            isAccent ? 'text-[var(--accent-red)]' : 'text-[var(--text-primary)]'
          }`}
        >
          {word}
          {period && <span className="text-[var(--accent-cyan)]">.</span>}
        </span>
      </span>
    </span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const depthLayerRef = useRef<HTMLDivElement>(null)
  const halftoneSpotlightRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const [roleIndex, setRoleIndex] = useState(0)
  const [isSwapping, setIsSwapping] = useState(false)
  const [hoveredWord, setHoveredWord] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    return animateHeroEntrance(sectionRef.current)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    let swapTimeout: number | undefined

    const interval = window.setInterval(() => {
      if (document.hidden) return
      setIsSwapping(true)
      swapTimeout = window.setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % profileData.roles.length)
        setIsSwapping(false)
      }, 180)
    }, 3600)

    return () => {
      window.clearInterval(interval)
      if (swapTimeout) window.clearTimeout(swapTimeout)
    }
  }, [reducedMotion])

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5

    if (depthLayerRef.current) {
      depthLayerRef.current.style.transform = `translate3d(${nx * -18}px, ${ny * -12}px, 0)`
    }
    if (halftoneSpotlightRef.current) {
      const mask = `radial-gradient(280px circle at ${px}% ${py}%, rgba(0,0,0,0.95), transparent 80%)`
      halftoneSpotlightRef.current.style.maskImage = mask
      halftoneSpotlightRef.current.style.webkitMaskImage = mask
    }
  }

  const handlePointerLeave = () => {
    setHoveredWord(null)
    if (depthLayerRef.current) {
      depthLayerRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="hero-title"
      className="relative z-10 flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-12"
    >
      {/* Interactive Depth & Halftone Spotlight Layer */}
      <div
        ref={depthLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-transform duration-300 ease-out"
      >
        <div
          className="tech-grid-bg absolute inset-0 opacity-28"
          style={{
            maskImage: 'radial-gradient(ellipse at 65% 42%, #000 18%, transparent 74%)',
          }}
        />
        <div
          ref={halftoneSpotlightRef}
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(var(--accent-cyan) 1.2px, transparent 1.5px), radial-gradient(var(--accent-red) 1.1px, transparent 1.5px)',
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0, 6px 6px',
            maskImage: 'radial-gradient(280px circle at 65% 45%, rgba(0,0,0,0.8), transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(280px circle at 65% 45%, rgba(0,0,0,0.8), transparent 80%)',
          }}
        />
      </div>

      {/* Top Metadata Strip */}
      <div className="lab-container flex flex-wrap items-center justify-between gap-4">
        <p
          data-hero-fade
          className="font-mono-tech inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]"
        >
          <span
            aria-hidden="true"
            className="h-[2px] w-[22px] bg-[var(--accent-cyan)] shadow-[4px_0_0_var(--accent-red)]"
          />
          {profileData.eyebrow}
        </p>

        <span
          data-hero-fade
          className="font-mono-tech hidden text-[0.64rem] uppercase tracking-[0.1em] text-[var(--text-quiet)] sm:inline-block"
        >
          SYSTEMS BUILDER // EXPLORER
        </span>
      </div>

      {/* Monumental Typographic Stage */}
      <div className="lab-container my-auto py-8 sm:py-10">
        <h1
          id="hero-title"
          className="font-display select-none text-[clamp(2.85rem,12.5vw,9.4rem)] font-bold leading-[0.86] tracking-[-0.055em]"
        >
          <ChromaticWord
            word="WENES"
            index={0}
            hoveredIndex={hoveredWord}
            onHoverChange={setHoveredWord}
          />
          <ChromaticWord
            word="BENEDICT"
            index={1}
            indentClass="md:pl-[9%]"
            hoveredIndex={hoveredWord}
            onHoverChange={setHoveredWord}
          />
          <ChromaticWord
            word="AC"
            period
            isAccent
            index={2}
            indentClass="md:pl-[22%]"
            hoveredIndex={hoveredWord}
            onHoverChange={setHoveredWord}
          />
        </h1>
      </div>

      {/* Bottom Anchor Rail */}
      <div className="lab-container border-t border-[var(--border-subtle)] pt-6">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-hero-fade className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono-tech border border-[var(--border-cyan)] bg-[rgba(40,200,255,0.08)] px-2.5 py-0.5 text-[0.64rem] uppercase tracking-[0.08em] text-[var(--accent-cyan)]">
                CURRENT FOCUS
              </span>
              <span
                className={`font-display text-lg font-semibold text-[var(--text-primary)] transition-all duration-180 sm:text-xl ${
                  isSwapping ? 'translate-y-1.5 opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                {profileData.roles[roleIndex]}
              </span>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-[#c4c2cc] sm:text-base">
              {profileData.heroIntro}
            </p>
          </div>

          <div data-hero-fade className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Button href="#projects" variant="primary" data-cursor="explore">
                Explore Work
              </Button>
              <Button href="#contact" variant="secondary" data-cursor="connect">
                Get in Touch
              </Button>
            </div>

            <p className="font-mono-tech inline-flex items-center gap-2 text-[0.66rem] text-[var(--text-secondary)]">
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] rounded-full bg-[var(--accent-cyan)]"
              />
              {profileData.availability}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
