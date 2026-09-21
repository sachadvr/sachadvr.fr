import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown } from 'react-icons/fa'

import Marquee from '@/components/Marquee'
import PillButton from '@/components/PillButton'
import ProfilePhoto from '@/components/ProfilePhoto'
import { SITE } from '@/i18n/site'

const STACK = [
  'Symfony',
  'Vue 3',
  'TypeScript',
  'React',
  'PHP',
  'API Platform',
  'Docker',
  'Kubernetes',
  'AWS',
  'PostgreSQL',
  'MariaDB',
  'CI/CD',
]

/** Disque photo (équivalent du badge de conformité blacksmith). */
const HeroBadge = () => {
  const { t } = useTranslation()

  return (
    <></>
  )
}

/**
 * Héro compact, orienté lecture rapide : photo + dispo, nom, ligne de poste,
 * pitch court, CTA + email — tout dans le premier écran, sans terminal qui
 * doublerait l'information.
 */
const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="section-crimson overflow-hidden">
      <div className="page-x flex flex-col gap-8 pt-10 lg:gap-10 lg:pt-14">
        <div className="flex items-start justify-between gap-6">
          <HeroBadge />
          <p className="mono-label mt-2 hidden text-right text-ink/60 md:block">
            {t('hero.kicker')}
            <span aria-hidden="true" className="ml-3 inline-block h-2 w-2 animate-blink bg-ink" />
          </p>
        </div>

        <h1 className="font-display text-[clamp(2.25rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]">
          Sacha
          <span className="relative ml-[0.08em] inline-block self-center bg-ink px-[0.1em] text-crimson">
            Duvivier
            <span aria-hidden="true" className="ml-[0.05em] text-[0.22em] align-super">
            </span>
          </span>
        </h1>

        <p className="max-w-2xl font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.05em] text-ink/80 md:text-sm">
          {t('hero.role')}
        </p>

        <p className="highlight-code w-fit">
          {t('hero.codeLine1')}
          <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[2px] animate-blink bg-ink" />
        </p>

        <div className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">{t('hero.lead')}</p>
          <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
            <PillButton to="/links" size="md" variant="dark">
              {t('hero.ctaContact')} <span aria-hidden="true">→</span>
            </PillButton>
            <PillButton href="#work" size="md" variant="outline">
              {t('hero.ctaPortfolio')}
            </PillButton>
            <a
              href={`mailto:${SITE.email}`}
              className="highlight-blue font-mono text-sm"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/20">
        <div className="page-x flex items-center gap-6 py-5">
          <span className="mono-label hidden shrink-0 text-ink/60 lg:inline">{t('hero.marqueeTitle')}</span>
          <Marquee duration={26} gapClass="gap-x-3">
            <span className="flex items-center gap-3">
              {STACK.map((tech) => (
                <span key={tech} className="border border-ink bg-paper px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.05em]">
                  {tech}
                </span>
              ))}
            </span>
          </Marquee>
          <a href="#skills" className="hidden shrink-0 flex-col items-center gap-1 text-ink hover:text-ink lg:flex">
            <span className="mono-label text-ink/60">{t('hero.scroll')}</span>
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-ink bg-paper">
              <FaAngleDown />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero