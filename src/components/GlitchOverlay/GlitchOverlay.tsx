import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function triggerScreenGlitch() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('portfolio:glitch'))
}

export function GlitchOverlay() {
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(false)
  const lastTriggeredRef = useRef(0)

  useEffect(() => {
    if (reducedMotion) return

    let timeoutId: number | undefined

    const onGlitch = () => {
      const now = Date.now()
      // Throttle so rapid hovering feels crisp, never overwhelming
      if (now - lastTriggeredRef.current < 420) return
      lastTriggeredRef.current = now

      setActive(true)
      if (timeoutId) window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => setActive(false), 190)
    }

    window.addEventListener('portfolio:glitch', onGlitch)
    return () => {
      window.removeEventListener('portfolio:glitch', onGlitch)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [reducedMotion])

  if (reducedMotion || !active) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1900] overflow-hidden"
    >
      {/* Top chromatic slice */}
      <div
        className="absolute inset-x-0 top-[18%] h-[14vh] bg-[rgba(40,200,255,0.06)] mix-blend-screen"
        style={{ transform: 'translate3d(-6px, 0, 0)' }}
      />
      {/* Mid signal red slice */}
      <div
        className="absolute inset-x-0 top-[48%] h-[9vh] bg-[rgba(255,49,85,0.07)] mix-blend-screen"
        style={{ transform: 'translate3d(7px, 0, 0)' }}
      />
      {/* Bottom scanline */}
      <div
        className="absolute inset-x-0 top-[74%] h-[2px] bg-[rgba(40,200,255,0.45)]"
        style={{ transform: 'translate3d(-4px, 0, 0)' }}
      />
    </div>
  )
}
