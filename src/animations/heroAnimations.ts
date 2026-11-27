import gsap from 'gsap'

export function animateHeroEntrance(container: HTMLElement) {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(container.querySelectorAll('[data-hero-line]'), {
      y: 26,
      opacity: 0,
      duration: 0.68,
      stagger: 0.1,
      clearProps: 'transform,opacity',
    })
      .from(
        container.querySelectorAll('[data-hero-fade]'),
        {
          y: 14,
          opacity: 0,
          duration: 0.52,
          stagger: 0.08,
          clearProps: 'transform,opacity',
        },
        '-=0.35',
      )
      .from(
        container.querySelector('[data-hero-stage]'),
        {
          y: 18,
          opacity: 0,
          duration: 0.65,
          clearProps: 'transform,opacity',
        },
        '-=0.45',
      )
  })

  return () => mm.revert()
}
