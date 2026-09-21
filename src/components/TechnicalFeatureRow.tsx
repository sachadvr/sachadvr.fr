import React from 'react'

import { cn } from '@/lib/utils'

interface TechnicalFeatureRowProps {
  index: string
  title: string
  className?: string
  children: React.ReactNode
}

/**
 * Rangée technique numérotée : index mono `■ 01` sur colonne 100–120px, puis
 * titre + description. Séparateur horizontal à 45% (régle dure) ou pleine encre.
 */
const TechnicalFeatureRow = ({
  index,
  title,
  className,
  children,
}: TechnicalFeatureRowProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[100px_1fr] gap-4 border-b border-border/45 py-8 md:grid-cols-[120px_1fr] md:gap-10',
        className
      )}
    >
      <span className="mono-label pt-1" aria-hidden="true">
        {index}
      </span>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-display font-semibold tracking-[-0.04em]">{title}</h3>
        <div className="max-w-prose text-lg leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

export default TechnicalFeatureRow