interface SectionHeadingProps {
  headingId?: string
  index: string
  kicker: string
  title: string
  highlight?: string
  aside?: string
}

export function SectionHeading({
  headingId,
  index,
  kicker,
  title,
  highlight,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono-tech mb-2.5 flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          <span className="text-[var(--accent-red)]">{index}</span>
          <span>//</span>
          <span>{kicker}</span>
        </p>
        <h2
          id={headingId}
          className="font-display text-4xl font-bold tracking-[-0.055em] leading-[1.02] text-[var(--text-primary)] sm:text-5xl"
        >
          {title}{' '}
          {highlight && <span className="text-[var(--accent-cyan)]">{highlight}</span>}
        </h2>
      </div>
      {aside && (
        <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
          {aside}
        </p>
      )}
    </div>
  )
}
