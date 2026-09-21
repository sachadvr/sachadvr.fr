import React from 'react'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  command: string
  title: string
  className?: string
  /** Classes du curseur clignotant, pour qu'il reste visible hors du fond clair. */
  cursorClassName?: string
}

const SectionHeading = ({ command, title, className, cursorClassName }: SectionHeadingProps) => {
  return (
    <div className={cn('section-heading mb-8 flex flex-col gap-3', className)}>
      <span className="section-label">
        <span aria-hidden="true">$</span> {command}
      </span>
      <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        {title}
        <span
          aria-hidden="true"
          className={cn(
            'ml-1 inline-block h-7 w-3 translate-y-[2px] animate-blink bg-accent align-baseline',
            cursorClassName
          )}
        />
      </h2>
    </div>
  )
}

export default SectionHeading
