import React from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /** Durée d'un tour complet (aller-retour masqué), en secondes. */
  duration?: number
  /** Espacement horizontal entre les items. */
  gapClass?: string
}

/**
 * Marquee infini : le contenu est rendu deux fois de suite et la piste
 * glisse de `-50%` (`animate-marquee`), ce qui donne une boucle sans couture.
 */
const Marquee = ({ children, className, duration = 28, gapClass = 'gap-x-8' }: MarqueeProps) => {
  const group = (ariaHidden?: boolean) => (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {children}
    </div>
  )

  return (
    <div className={cn('marquee-mask w-full', className)}>
      <div
        className={cn('flex w-max animate-marquee items-center', gapClass)}
        style={{ animationDuration: `${duration}s` }}
      >
        {group()}
        {group(true)}
      </div>
    </div>
  )
}

export default Marquee