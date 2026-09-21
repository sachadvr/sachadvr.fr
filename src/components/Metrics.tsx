import React from 'react'
import { useTranslation } from 'react-i18next'

import useRepositories from '@/hooks/useRepositories'
import SectionMarker from '@/components/SectionMarker'
import MetricTile from '@/components/MetricTile'

const ACTIVE_WINDOW_MS = 1000 * 60 * 60 * 24 * 30

/** Section Chiffres : intro asymétrique + grille de tuiles métriques (une jaune). */
const Metrics = () => {
  const { t } = useTranslation()
  const repositories = useRepositories()

  const totalRepos = repositories.length
  const activeRepos = repositories.filter(
    (repository) => Date.now() - new Date(repository.updated_at).getTime() < ACTIVE_WINDOW_MS
  ).length

  return (
    <section id="metrics" className="scroll-mt-20 border-b border-border md:scroll-mt-28">
      <SectionMarker label={t('sections.metrics')}>
        <span className="mono-label text-ink/40">04 / 04</span>
      </SectionMarker>

      <div className="page-x pt-16 lg:pt-24">
        <div className="grid items-end gap-8 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:pb-24">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.05em]">
            {t('metric.title')}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            {t('metric.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
        <MetricTile value={totalRepos || '—'} label={t('metric.total')} />
        <MetricTile value={activeRepos || '—'} label={t('metric.active')} accent />
        <MetricTile value="01" label={t('metric.master')} />
        <MetricTile value="48H" label={t('metric.delay')} />
      </div>
    </section>
  )
}

export default Metrics