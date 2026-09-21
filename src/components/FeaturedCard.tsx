import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

import { cn } from '@/lib/utils'
import LocalizedLink from '@/components/LocalizedLink'

interface FeaturedCardProps {
  to: string
  label: string
  title: string
  icon: React.ReactNode
  media?: React.ReactNode
  meta?: React.ReactNode
  className?: string
}

const FeaturedCard = ({ to, label, title, icon, media, meta, className }: FeaturedCardProps) => {
  return (
    <LocalizedLink
      to={to}
      className={cn(
        'dotted-box dotted-interactive group flex h-full flex-col overflow-hidden',
        className
      )}
    >
      {media}

      <div className="featured-card-body flex flex-1 flex-col p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-soft border border-border bg-secondary text-primary [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </span>

        <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.5px] text-muted-foreground">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-accent" />
          {label}
        </span>

        <h3 className="flex-1 text-xl font-bold uppercase leading-[1.05] tracking-tight">{title}</h3>

        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">{meta}</div>
          <FaArrowRight className="shrink-0 transition-transform duration-150 group-hover:translate-x-1" />
        </div>
      </div>
    </LocalizedLink>
  )
}

export default FeaturedCard
