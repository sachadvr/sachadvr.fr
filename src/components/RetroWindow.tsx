import React from 'react'

import { cn } from '@/lib/utils'

interface RetroWindowProps {
  title: string
  meta?: string
  accent?: boolean
  noShadow?: boolean
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}

/**
 * Fausse fenêtre rétro : trois points d'encre dans une barre de titre d'un
 * pouce (~50px), ombre dure 9px, bordure 1px, aucun rayon. `accent` inverse
 * le corps en jaune (variante héro), `noShadow` retire l'ombre (bandeaux).
 */
const RetroWindow = ({
  title,
  meta,
  accent = false,
  noShadow = false,
  className,
  bodyClassName,
  children,
}: RetroWindowProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-window border border-border bg-card text-card-foreground',
        accent && 'bg-accent text-accent-foreground',
        noShadow ? 'shadow-none' : 'shadow-brutal',
        className
      )}
    >
      <div className={cn('window-chrome min-h-[50px] px-4', accent && 'bg-panel')}>
        <span aria-hidden="true" className="flex items-center gap-2.5">
          <span className="window-chrome-dot" />
          <span className="window-chrome-dot" />
          <span className="window-chrome-dot" />
        </span>
        <span className="mono-label truncate" title={title}>
          {title}
        </span>
        {meta && <span className="mono-label ml-auto hidden shrink-0 text-muted-foreground sm:inline">{meta}</span>}
      </div>
      <div className={cn('h-full', bodyClassName)}>{children}</div>
    </div>
  )
}

export default RetroWindow