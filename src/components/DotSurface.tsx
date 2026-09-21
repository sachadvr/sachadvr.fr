import React from 'react'

import { cn } from '@/lib/utils'

interface DotSurfaceProps {
  className?: string
  dense?: boolean
  sparse?: boolean
  sparseLg?: boolean
  children?: React.ReactNode
}

/**
 * Surface de points (motif technique blacksmith). Densité par défaut 12px,
 * `dense` 6px, `sparse` 20px, `sparseLg` 24px. Accessibilité : décoratif pur.
 */
const DotSurface = ({ className, dense, sparse, sparseLg, children }: DotSurfaceProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'dot-surface',
        dense && 'dot-surface--dense',
        sparse && 'dot-surface--sparse',
        sparseLg && 'dot-surface--sparse-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

export default DotSurface