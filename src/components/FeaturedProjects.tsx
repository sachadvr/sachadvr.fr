import React from 'react'
import { FaGithub, FaStar } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import useDensity from '@/hooks/useDensity'
import { portfolioAtom, type RepositoryWithLanguages } from '@/store/state'
import { LanguageIcon, isDisplayableLanguage } from '@/lib/language-icons'
import SectionMarker from '@/components/SectionMarker'
import DotSurface from '@/components/DotSurface'
import PillButton from '@/components/PillButton'
import LocalizedLink from '@/components/LocalizedLink'
import { SITE } from '@/i18n/site'

const FEATURED_COUNT = { comfortable: 3, compact: 4 }

function mainLanguage(project: RepositoryWithLanguages): string {
  const languages = Object.keys(project.languages || {}).filter(isDisplayableLanguage)
  return project.language || languages[0] || 'Code'
}

function byPopularityThenFreshness(
  a: RepositoryWithLanguages,
  b: RepositoryWithLanguages
): number {
  const starGap = (b.stargazers_count || 0) - (a.stargazers_count || 0)
  if (starGap !== 0) return starGap
  return new Date(b.pushed_at || 0).getTime() - new Date(a.pushed_at || 0).getTime()
}

/** Grille éditoriale en base 6 : 4+2 (une principale + une étroite), puis le
 *  reste en 6, 3+3… La ligne est toujours pleine — pas de colonnes vides. */
const CELL_SPANS: Record<number, string[]> = {
  3: ['md:col-span-4', 'md:col-span-2', 'md:col-span-6'],
  4: ['md:col-span-4', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3'],
}

const FeaturedProjects = () => {
  const { t } = useTranslation()
  const density = useDensity()
  const [portfolio] = useAtom(portfolioAtom)

  const featured = [...portfolio]
    .sort(byPopularityThenFreshness)
    .slice(0, FEATURED_COUNT[density])

  return (
    <section id="work" className="scroll-mt-20 border-b border-border md:scroll-mt-28">
      <SectionMarker label={t('sections.work')}>
        <span className="mono-label text-ink/40">
          0{featured.length} / 0{featured.length}
        </span>
      </SectionMarker>

      {featured.length === 0 ? (
        <div className="page-x py-16">
          <p className="terminal-prompt text-sm text-muted-foreground">
            {t('featured.loading')}
            <span className="ml-1 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent" />
          </p>
        </div>
      ) : (
        <div className="page-x pb-16 pt-24 lg:pb-24">
          <div className="grid grid-cols-1 border-t border-l border-border md:grid-cols-6">
            {featured.map((project, index) => {
              const spans = CELL_SPANS[featured.length] ?? ['md:col-span-6']
              return (
                <article
                  key={project.name}
                  className={cn('flex flex-col border-b border-r border-border', spans[index])}
                >
                <LocalizedLink
                  to={`/git/${project.name}`}
                  className="group flex h-full flex-col"
                  aria-label={project.description || project.name}
                >
                  <div
                    className={cn(
                      'relative flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden border-b border-border p-8',
                      index === 0 && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <DotSurface
                      className={cn('absolute inset-0', index === 0 ? 'opacity-40' : 'opacity-60')}
                      sparse={index === 0}
                      dense={index !== 0}
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="mono-label">
                        0{index + 1} / 0{featured.length}
                      </span>
                      {index === 0 && (
                        <span className="border border-ink bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-crimson">
                          {t('featured.labelMain')}
                        </span>
                      )}
                    </div>
                    <div className="relative flex flex-col gap-3">
                      <h3 className="max-w-md font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-4xl">
                        {project.description || project.name}
                      </h3>
                      <span className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.05em] tabular-nums">
                        <FaStar className="shrink-0" />
                        {project.stargazers_count || 0} {t('featured.stars')}
                        <span aria-hidden="true" className="ml-auto transition-transform duration-150 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-8 py-4">
                    <span className="truncate font-mono text-[11px]">
                      <span className="border border-border bg-paper px-2 py-1">{t('featured.clone', { repo: project.name })}</span>
                    </span>
                    <span className="tech-label shrink-0">
                      <LanguageIcon language={mainLanguage(project)} className="h-3.5 w-3.5 text-primary" />
                      {mainLanguage(project)}
                    </span>
                  </div>
                </LocalizedLink>
              </article>
            )
          })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PillButton href="#timeline" variant="outline">
              {t('featured.allProjects')} <span aria-hidden="true">→</span>
            </PillButton>
            <a
              href={`https://github.com/${SITE.githubUser}`}
              target="_blank"
              rel="noreferrer"
              className="mono-label hidden items-center gap-2 text-ink/60 hover:text-ink sm:inline-flex"
            >
              <FaGithub /> github.com/{SITE.githubUser}
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturedProjects