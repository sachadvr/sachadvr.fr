import React, { useEffect } from 'react'
import { FaArrowRight, FaStar } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { API_URL } from '@/config'
import useDensity from '@/hooks/useDensity'
import useRepositories from '@/hooks/useRepositories'
import { languagesAtom, portfolioAtom } from '@/store/state'
import { LanguageIcon, isDisplayableLanguage } from '@/lib/language-icons'
import LocalizedLink from '@/components/LocalizedLink'
import SectionMarker from '@/components/SectionMarker'
import ComparisonTable from '@/components/ComparisonTable'
import { cn } from '@/lib/utils'

const COLUMNS = 'minmax(88px,112px) minmax(64px,80px) minmax(0,1fr) minmax(160px,220px)'

interface TimestampedRepository {
  name: string
  created_at?: string
  pushed_at?: string
}

/** Date d'entrée du projet dans le CV : sa création sur GitHub, pas son dernier push. */
function creationDate(project: TimestampedRepository): Date {
  return new Date(project.created_at || project.pushed_at || 0)
}

/** Parcours = tableau de comparaison : année / mois / intitulé / activité. */
const Portfolio = () => {
  const { t } = useTranslation()
  const density = useDensity()
  const [portfolio, setPortfolio] = useAtom(portfolioAtom)
  const [, setLanguages] = useAtom(languagesAtom)
  const repositories = useRepositories()

  useEffect(() => {
    if (repositories.length === 0) return undefined

    let cancelled = false

    async function fetchPortfolio() {
      const languagesPerRepository: Record<string, number>[] = await Promise.all(
        repositories.map(async (repository) =>
          (await fetch(`${API_URL}/repos/${repository.name}/languages`)).json()
        )
      )

      if (cancelled) return

      setLanguages([
        ...new Set(languagesPerRepository.flatMap((languages) => Object.keys(languages))),
      ])
      setPortfolio(
        repositories.map((repository, index) => ({
          ...repository,
          languages: languagesPerRepository[index],
        }))
      )
    }

    fetchPortfolio().catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [repositories, setLanguages, setPortfolio])

  const chronological = [...portfolio].sort(
    (a, b) => creationDate(b).getTime() - creationDate(a).getTime()
  )

  // La colonne « activité » (stars + dernier push) n'est visible qu'à partir de lg.
  const isWide = density === 'comfortable'

  return (
    <section id="timeline" className="scroll-mt-20 border-b border-border bg-secondary/40 md:scroll-mt-28">
      <SectionMarker label={t('sections.timeline')}>
        <span className="mono-label text-ink/40">
          {chronological.length} {t('rirekisho.entries')}
        </span>
      </SectionMarker>

      {chronological.length === 0 ? (
        <div className="page-x py-16">
          <p className="terminal-prompt text-sm text-muted-foreground">
            {t('portfolio.loading')}
            <span className="ml-1 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent" />
          </p>
        </div>
      ) : (
        <div className="page-x py-16 lg:py-24">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.05em]">
              {t('portfolio.title')}
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              {isWide ? t('portfolio.subtitle') : t('portfolio.subtitleCompact')}
            </p>
          </div>

          <div className="mt-12">
            <ComparisonTable
              columns={COLUMNS}
              hiddenHeaderIndexes={[3]}
              headers={[
                t('rirekisho.colYear'),
                t('rirekisho.colMonth'),
                t('rirekisho.colEntry'),
                t('rirekisho.colActivity'),
              ]}
            >
              {chronological.map((project) => {
                const createdAt = creationDate(project)
                const lastPush = new Date(project.pushed_at || project.created_at)

                return (
                  <div
                    key={project.name}
                    className={cn(
                      'grid items-start gap-x-2 border-b border-border/45 py-5 md:gap-x-4',
                      'grid-cols-[minmax(88px,112px)_minmax(64px,80px)_minmax(0,1fr)]',
                      'lg:grid-cols-[minmax(88px,112px)_minmax(64px,80px)_minmax(0,1fr)_minmax(160px,220px)]'
                    )}
                  >
                    <span className="mono-label pt-1 text-ink/60" aria-hidden="true">
                      {String(createdAt.getFullYear())}
                    </span>
                    <span className="mono-label pt-1 text-ink/60" aria-hidden="true">
                      {String(createdAt.getMonth() + 1).padStart(2, '0')}
                    </span>

                    <LocalizedLink
                      to={`/git/${project.name}`}
                      className="group flex flex-col gap-2 px-1 py-0.5 transition-colors duration-100 hover:bg-secondary"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="truncate font-mono text-sm font-semibold uppercase tracking-[0.05em]">
                          {project.name}
                        </span>
                        <FaArrowRight className="shrink-0 transition-transform duration-150 group-hover:translate-x-1" />
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {project.description || t('portfolio.noDescription')}
                      </span>
                      <span className="flex flex-wrap items-center gap-2">
                        {Object.keys(project.languages)
                          .filter(isDisplayableLanguage)
                          .slice(0, 3)
                          .map((language) => (
                            <span key={language} className="tech-label">
                              <LanguageIcon
                                language={language}
                                className="h-3.5 w-3.5 text-primary"
                              />
                              {language}
                            </span>
                          ))}
                      </span>
                    </LocalizedLink>

                    <span className="hidden flex-col items-end justify-center gap-1 lg:flex">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] tabular-nums">
                        <FaStar className="h-2.5 w-2.5 shrink-0" />
                        {project.stargazers_count || 0}
                      </span>
                      <time className="font-mono text-[10px] tracking-[0.05em] tabular-nums text-muted-foreground">
                        {lastPush.getFullYear()}.
                        {String(lastPush.getMonth() + 1).padStart(2, '0')}
                      </time>
                    </span>
                  </div>
                )
              })}
            </ComparisonTable>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio