import React from 'react'

import LocalizedLink from '@/components/LocalizedLink'
import { cn } from '@/lib/utils'

type PillButtonVariant = 'dark' | 'crimson' | 'outline'
type PillButtonSize = 'md' | 'lg'

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant
  size?: PillButtonSize
  /** Route interne (préfixée par la langue active via `LocalizedLink`). */
  to?: string
  /** URL externe ou ancre `#...` (ancre hors vue-router → `<a>`). */
  href?: string
}

const VARIANTS: Record<PillButtonVariant, string> = {
  dark: 'bg-ink text-crimson hover:bg-accent hover:text-ink',
  crimson: 'bg-accent text-ink hover:bg-ink hover:text-crimson',
  outline: 'bg-transparent text-ink hover:bg-ink hover:text-crimson',
}

const SIZES: Record<PillButtonSize, string> = {
  md: 'h-16 px-9 text-sm',
  lg: 'h-[88px] px-10 text-base',
}

/**
 * Bouton pilule (rayon 999px). Survol : léger scale + inversion des couleurs,
 * fidèle au langage blacksmith. Rendu `<button>`, `<a>` ou `<Link>` selon `to`/`href`.
 */
const PillButton = React.forwardRef<HTMLElement, PillButtonProps>(
  ({ variant = 'dark', size = 'md', to, href, className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-3 rounded-pill border border-ink font-mono font-semibold uppercase tracking-[0.05em] transition-[transform,background-color,color] duration-150 hover:scale-[1.02] active:scale-100',
      VARIANTS[variant],
      SIZES[size],
      className
    )

    if (to) {
      return (
        <LocalizedLink to={to} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </LocalizedLink>
      )
    }

    if (href) {
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

PillButton.displayName = 'PillButton'

export default PillButton