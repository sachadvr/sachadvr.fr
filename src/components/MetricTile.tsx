import React from 'react'

import { cn } from '@/lib/utils'

interface MetricTileProps {
  /** Valeur en gros (70–120px, tabular). */
  value: React.ReactNode
  label: string
  accent?: boolean
  className?: string
}

/**
 * Tuile métrique : chiffre énorme ligne .9, label discret en-dessous.
 * `accent` pose la cellule en jaune (une par grille).
 */
const MetricTile = ({ value, label, accent = false, className }: MetricTileProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 border-b border-r border-border p-8 md:p-12',
        accent && 'bg-accent text-accent-foreground',
        className
      )}
    >
      <span className="font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em] tabular-nums">
        {value}
      </span>
      <span className="mono-label">{label}</span>
    </div>
  )
}

export default MetricTile