import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { Trans, useTranslation } from 'react-i18next'

import { languagesAtom } from '@/store/state'
import { LanguageIcon, isDisplayableLanguage } from '@/lib/language-icons'
import SectionMarker from '@/components/SectionMarker'
import FeatureGrid, { FeatureCell } from '@/components/FeatureGrid'
import RetroWindow from '@/components/RetroWindow'
import DotSurface from '@/components/DotSurface'
import { RirekishoField } from '@/components/Rirekisho'
import { SITE } from '@/i18n/site'

const FEATURES = (t: (key: string) => string) => [
  { index: '01', title: t('whoami.techFrontend'), value: t('whoami.techFrontendValue') },
  { index: '02', title: t('whoami.techDevops'), value: t('whoami.techDevopsValue'), accent: true },
  { index: '03', title: t('rirekisho.fieldInterests'), value: t('whoami.techInterests') },
]

/**
 * Section « Compétences » : marqueur de section, grille de fonctionnalités à
 * bordures connectées (une cellule jaune) et fenêtre rétro contenant les
 * mentions du rirekisho (formation + stack).
 */
const WhoAmi = () => {
  const { t } = useTranslation()
  const [languages] = useAtom(languagesAtom)

  const displayableLanguages = Array.from(new Set(languages)).filter(isDisplayableLanguage)

  return (
    <section id="skills" className="scroll-mt-20 border-b border-border md:scroll-mt-28">
      <SectionMarker label={t('sections.skills')}>
        <span className="mono-label text-ink/40">03 / 03</span>
      </SectionMarker>

      <div className="page-x py-16 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.05em]">
            {t('whoami.title')}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            <Trans
              i18nKey="whoami.bio"
              components={{ b: <strong className="text-foreground" /> }}
            />
          </p>
        </div>

        <FeatureGrid className="mt-12">
          {FEATURES(t).map(({ index, title, value, accent }) => (
            <FeatureCell key={index} accent={accent}>
              <div className="flex min-h-[240px] flex-col gap-4 p-8">
                <span className="mono-label text-ink/50">
                  {index} / 03<span aria-hidden="true"> ▸</span>
                </span>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{value}</p>
              </div>
              <div className="relative mt-auto flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden border-t border-border">
                <DotSurface className="absolute inset-0" dense={!accent} sparse={accent} />
                <span className="relative self-end p-6 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-ink/50">
                  {accent ? 'deploy: ok' : `module::${index}`}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative m-8 mt-auto self-start border border-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.05em] ${
                    accent ? 'bg-ink text-crimson' : 'bg-paper'
                  }`}
                >
                  {index === '01' && 'symfony · api platform · aws'}
                  {index === '02' && 'vue 3 · docker · k8s'}
                  {index === '03' && <>py &gt; import cyber_security_ia</>}
                </span>
              </div>
            </FeatureCell>
          ))}
        </FeatureGrid>

        <RetroWindow
          title="rirekisho.yaml"
          meta={t('rirekisho.sheetSkills')}
          className="mt-6"
          bodyClassName="p-0"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
              <RirekishoField label={t('rirekisho.fieldStack')} grow className="py-4">
                {displayableLanguages.length === 0 ? (
                  <p className="terminal-prompt text-sm text-muted-foreground">
                    {t('whoami.stackLoading')}
                    <span className="ml-1 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent" />
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {displayableLanguages.map((language) => (
                      <li key={language} className="tech-label px-2 py-1">
                        <LanguageIcon language={language} className="h-3.5 w-3.5 text-primary" />
                        {language}
                      </li>
                    ))}
                  </ul>
                )}
              </RirekishoField>
              <div className="flex flex-col gap-2 border-t border-border p-5 font-mono text-xs leading-relaxed">
                <p className="terminal-prompt text-muted-foreground">
                  whoami <span className="ml-1 inline-block h-3 w-2 translate-y-[2px] animate-blink bg-ink" />
                </p>
                <p className="pl-4 text-foreground">✓ {t('person.jobTitle')}</p>
                <p className="terminal-prompt text-muted-foreground">
                  pwd <span aria-hidden="true" />
                </p>
                <p className="pl-4 text-foreground">
                  /home/sachadvr/{t('common.city').toLowerCase()}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <RirekishoField label={t('rirekisho.fieldStatus')}>
                <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.05em]">
                  {t('hero.disclaimer')}
                </p>
              </RirekishoField>
              <RirekishoField label={t('rirekisho.fieldEmail')}>
                <a href={`mailto:${SITE.email}`} className="highlight-blue font-mono text-sm">
                  {SITE.email}
                </a>
              </RirekishoField>
              <RirekishoField label={t('rirekisho.fieldLinks')} grow className="p-4">
                <a
                  href={`https://github.com/${SITE.githubUser}`}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-box brutal-interactive grid h-11 w-11 place-items-center"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </RirekishoField>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  )
}

export default WhoAmi