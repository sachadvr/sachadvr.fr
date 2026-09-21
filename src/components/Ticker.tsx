import React from 'react'
import { useTranslation } from 'react-i18next'

import useRepositories from '@/hooks/useRepositories'
import Marquee from '@/components/Marquee'

const ACTIVE_WINDOW_MS = 1000 * 60 * 60 * 24 * 30

/**
 * Bandeau ticker séparateur : fond jaune, badges d'encre, contenu marquee.
 * Les deux premiers items portent des chiffres réels (dépôts GitHub actifs /
 * au total) ; le reste est statique.
 */
const Ticker = () => {
  const { t } = useTranslation()
  const repositories = useRepositories()

  const totalRepos = repositories.length
  const activeRepos = repositories.filter(
    (repository) => Date.now() - new Date(repository.updated_at).getTime() < ACTIVE_WINDOW_MS
  ).length

  const stats = [
    { chip: `${t('ticker.active')} ${activeRepos || '—'}`, label: t('ticker.projectsActif') },
    { chip: `${t('ticker.total')} ${totalRepos || '—'}`, label: t('ticker.projectsTotal') },
    { chip: t('ticker.master'), label: t('ticker.masterLabel') },
    { chip: t('ticker.location'), label: t('ticker.locationLabel') },
    { chip: t('ticker.delay'), label: t('ticker.delayLabel') },
  ]

  return (
    <div className="border-b-2 border-border bg-accent text-accent-foreground">
      <div className="page-x py-6">
        <Marquee duration={22} gapClass="gap-x-10">
          <span className="flex items-center gap-10">
            {stats.map(({ chip, label }) => (
              <span key={label} className="flex shrink-0 items-center gap-3">
                <span className="ticker-chip">{chip}</span>
                <span className="mono-label">{label}</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </div>
  )
}

export default Ticker