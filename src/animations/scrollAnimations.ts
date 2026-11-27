import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function animateSectionReveals(container: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const maskItems = container.querySelectorAll('[data-reveal-mask]')
    if (maskItems.length) {
      gsap.from(maskItems, {
        clipPath: 'inset(0 0 100% 0)',
        y: 18,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 84%',
          once: true,
        },
      })
    }

    const slideItems = container.querySelectorAll<HTMLElement>('[data-reveal-slide]')
    slideItems.forEach((item, index) => {
      const fromX = index % 2 === 0 ? -24 : 24
      gsap.from(item, {
        x: fromX,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: item,
          start: 'top 84%',
          once: true,
        },
      })
    })

    const items = container.querySelectorAll('[data-reveal]')
    if (items.length) {
      gsap.from(items, {
        y: 22,
        opacity: 0,
        duration: 0.58,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      })
    }
  })

  return () => mm.revert()
}
