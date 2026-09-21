import React from 'react'

import { cn } from '@/lib/utils'

interface FeatureGridProps {
  className?: string
  cols?: 2 | 3 | 4
  children: React.ReactNode
}

/**
 * Grille de fonctionnalités à bordures connectées : bordure haute + gauche
 * sur la grille, bordures droite + basse sur chaque cellule (pas de double
 * trait). Colonnes : 2/3/4 sur ≥md, 1 sur mobile.
 */
const FeatureGrid = ({ className, cols = 3, children }: FeatureGridProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 border-t border-l border-border',
        cols === 2 && 'md:grid-cols-2',
        cols === 3 && 'md:grid-cols-3',
        cols === 4 && 'md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface FeatureCellProps {
  className?: string
  accent?: boolean
  children: React.ReactNode
}

/** Cellule de la grille : bordure droite + basse, cellule optionnelle en
 *  jaune (`accent`, unique par grille). */
const FeatureCell = ({ className, accent = false, children }: FeatureCellProps) => {
  return (
    <div
      className={cn(
        'flex flex-col border-b border-r border-border',
        accent && 'bg-accent text-accent-foreground',
        className
      )}
    >
      {children}
    </div>
  )
}

export { FeatureCell }
export default FeatureGrid