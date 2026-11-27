import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { triggerScreenGlitch } from '../GlitchOverlay/GlitchOverlay'

type CursorMode =
  | 'default'
  | 'interactive'
  | 'glitch'
  | 'node'
  | 'inspect'
  | 'open'
  | 'copy'
  | 'explore'
  | 'connect'
  | 'read'

export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: -100, y: -100 })
  const magnetTargetRef = useRef<HTMLElement | null>(null)
  const lastGlitchElRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      setEnabled(false)
      return
    }
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let rafId = 0

    const resolveHoverAtPoint = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      if (!el) {
        magnetTargetRef.current = null
        lastGlitchElRef.current = null
        setMode('default')
        setLabel(null)
        return
      }

      const customTarget = el.closest<HTMLElement>('[data-cursor]')
      const interactiveEl = el.closest<HTMLElement>('a, button, [role="tab"], input, textarea')
      magnetTargetRef.current = el.closest<HTMLElement>('[data-magnetic]')

      if (customTarget?.dataset.cursor) {
        const nextMode = customTarget.dataset.cursor as CursorMode
        setMode(nextMode)
        setLabel(customTarget.dataset.cursor.toUpperCase())
        if (nextMode === 'glitch' && lastGlitchElRef.current !== customTarget) {
          lastGlitchElRef.current = customTarget
          triggerScreenGlitch()
        } else if (nextMode !== 'glitch') {
          lastGlitchElRef.current = null
        }
      } else if (interactiveEl) {
        lastGlitchElRef.current = null
        setMode('interactive')
        setLabel(null)
      } else {
        lastGlitchElRef.current = null
        setMode('default')
        setLabel(null)
      }
    }

    const tick = () => {
      const { x, y } = pointerRef.current
      let targetX = x
      let targetY = y

      if (magnetTargetRef.current) {
        const rect = magnetTargetRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        targetX = x + (cx - x) * 0.25
        targetY = y + (cy - y) * 0.25
      }

      ring.x += (targetX - ring.x) * 0.22
      ring.y += (targetY - ring.y) * 0.22

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }

      rafId = window.requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pointerRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
      resolveHoverAtPoint(e.clientX, e.clientY)
    }

    const onScroll = () => {
      const { x, y } = pointerRef.current
      if (x >= 0 && y >= 0) {
        resolveHoverAtPoint(x, y)
      }
    }

    const onPointerDown = () => setPressed(true)
    const onPointerUp = () => setPressed(false)
    const onMouseLeave = () => {
      setVisible(false)
      magnetTargetRef.current = null
      lastGlitchElRef.current = null
      setMode('default')
      setLabel(null)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = window.requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.cancelAnimationFrame(rafId)
    }
  }, [enabled])

  if (!enabled) return null

  const ringShapeClass =
    mode === 'glitch'
      ? '-mt-7 -ml-7 h-14 w-14 rounded-none border border-[var(--accent-red)] bg-[rgba(255,49,85,0.08)] shadow-[4px_0_0_rgba(40,200,255,0.6),-4px_0_0_rgba(255,49,85,0.5)]'
      : mode === 'node'
        ? '-mt-5 -ml-5 h-10 w-10 rotate-45 rounded-none border border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.08)]'
        : label
          ? '-mt-7 -ml-7 h-14 w-14 rounded-none border border-[var(--accent-cyan)] bg-[rgba(40,200,255,0.06)] shadow-[3px_3px_0_rgba(255,49,85,0.45)]'
          : mode === 'interactive'
            ? '-mt-5 -ml-5 h-10 w-10 rounded-full border border-[var(--accent-red)]'
            : '-mt-3.5 -ml-3.5 h-7 w-7 rounded-full border border-[rgba(245,242,234,0.38)]'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[2000] transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -mt-[3px] -ml-[3px] h-[6px] w-[6px] rounded-full ${
          pressed ? 'scale-150 bg-[var(--accent-red)]' : 'bg-[var(--accent-cyan)]'
        }`}
      />

      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center transition-[width,height,margin,border-color,border-radius,box-shadow] duration-150 ${ringShapeClass}`}
      >
        {label && mode !== 'node' && (
          <span className="font-mono-tech text-[0.52rem] font-semibold tracking-[0.12em] text-[var(--text-primary)]">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
