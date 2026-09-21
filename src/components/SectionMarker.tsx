import React from 'react'

import { cn } from '@/lib/utils'

interface SectionMarkerProps {
  label: string
  className?: string
  children?: React.ReactNode
}

/**
 * Bandeau de section type « / CONSOLE ■ » : empanchement complet, étiquette mono
 * capitale à gauche, carré d'encre à droite. Épaisseur ~52px (compact : 40px).
 */
const SectionMarker = ({ label, className, children }: SectionMarkerProps) => {
  return (
    <div
      className={cn(
        'page-x flex min-h-[52px] items-center justify-between gap-4 border-t border-border',
        className
      )}
    >
      <span className="mono-label flex items-center gap-3">
        <span aria-hidden="true" className="text-ink/40">
          /
        </span>
        {label}
      </span>
      {children ?? <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-ink" />}
    </div>
  )
}

export default SectionMarker