import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'secondary'

interface BaseProps {
  variant?: Variant
  children: ReactNode
  showArrow?: boolean
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export function Button({
  variant = 'primary',
  children,
  showArrow = true,
  className = '',
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const baseStyles =
    'group inline-flex items-center justify-center gap-3 min-h-[48px] px-5 py-3 text-sm font-semibold border transition-all duration-200 cursor-pointer'

  const variantStyles =
    variant === 'primary'
      ? 'bg-[var(--accent-red)] border-transparent text-[var(--text-primary)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--accent-cyan)]'
      : 'bg-[var(--surface-card)] border-[rgba(245,242,234,0.22)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(255,49,85,0.45)]'

  const combined = `${baseStyles} ${variantStyles} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  if ('href' in props && props.href !== undefined) {
    return (
      <a data-magnetic className={combined} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      data-magnetic
      className={combined}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
