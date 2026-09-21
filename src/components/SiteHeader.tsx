import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import LocalizedLink from '@/components/LocalizedLink'
import { SITE } from '@/i18n/site'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#skills', key: 'nav.skills' },
  { href: '#work', key: 'nav.work' },
  { href: '#timeline', key: 'nav.timeline' },
  { href: '#contact', key: 'nav.contact' },
]

/**
 * En-tête de site : bandeau jaune pleine largeur, ~120px de haut, barre de
 * navigation mono capitale à gauche, langue + GitHub à droite.
 */
const SiteHeader = () => {
  const { t } = useTranslation()

  return (
    <header className="section-crimson sticky top-0 z-50">
      <div className="container flex min-h-[52px] items-center justify-between gap-6 py-5 md:min-h-[50px]">
        <LocalizedLink
          to="/"
          className="flex items-center"
          aria-label={t('nav.backHome')}
        >
          <span className="font-display text-xl font-semibold uppercase tracking-[-0.04em]">
            SACHA<sup aria-hidden="true" className="text-[0.5em]">_</sup>DVR
          </span>
        </LocalizedLink>

        <nav aria-label={t('common.languageSwitcher')} className="flex items-center gap-10">
          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map(({ href, key }) => (
              <li key={href}>
                <a
                  href={href}
                  className="mono-label text-sm text-ink/80 transition-colors duration-150 hover:text-ink"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`https://github.com/${SITE.githubUser}`}
              target="_blank"
              rel="noreferrer"
              className="hidden grid h-10 w-10 place-items-center border border-ink bg-paper text-ink shadow-brutal-sm transition-transform duration-150 hover:-translate-y-[2px] md:grid"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <LanguageSwitcher className={cn('gap-1.5')} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader