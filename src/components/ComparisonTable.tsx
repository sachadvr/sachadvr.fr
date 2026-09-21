import React from 'react'

import { cn } from '@/lib/utils'

interface ComparisonTableProps {
  /** Colonne → template CSS grid (ex. `minmax(90px,100px) minmax(0,1fr)`). */
  columns: `repeat(${string})` | string
  /** Libellés d'en-tête (mono capitales). */
  headers: string[]
  /** Index des en-têtes masqués sous `lg` (permet de cacher une colonne
   *  « activité » qui n'existe pas en version mobile). */
  hiddenHeaderIndexes?: number[]
  className?: string
  rowClassName?: string
  children: React.ReactNode
}

/**
 * Tableau de comparaison pleine largeur : sommet `1px` d'encre, en-tête mono
 * capitale, lignes séparées à 45%, bordures vertes connectées. Template grid
 * passé en props pour laisser chaque usage choisir ses proportions.
 */
const ComparisonTable = ({
  columns,
  headers,
  hiddenHeaderIndexes = [],
  className,
  rowClassName,
  children,
}: ComparisonTableProps) => {
  return (
    <div className={cn('border-t border-border', className)}>
      <div
        aria-hidden="true"
        className={cn('grid border-b border-border', rowClassName, 'px-1')}
        style={{ gridTemplateColumns: columns }}
      >
        {headers.map((header, index) => (
          <span
            key={header}
            className={cn('mono-label py-4 pr-4 first:pl-0', hiddenHeaderIndexes.includes(index) && 'hidden lg:inline')}
          >
            {header}
          </span>
        ))}
      </div>
      {children}
    </div>
  )
}

/** Coche circulaire jaune (statut OK d'un tableau de comparaison). */
const Check = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-pill bg-crimson text-ink', className)}
  >
    <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  </span>
)

export { Check }
export default ComparisonTable