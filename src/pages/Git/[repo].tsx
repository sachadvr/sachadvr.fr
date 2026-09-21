import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaChevronLeft, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import 'github-markdown-css/github-markdown-light.css'

import { API_URL } from '@/config'
import { SITE } from '@/i18n/site'
import Footer from '@/components/Footer'
import LocalizedLink from '@/components/LocalizedLink'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import MarkdownViewer from '@/components/MarkdownViewver'
import TerminalWindow from '@/components/TerminalWindow'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

interface Repository {
  name: string
  description: string | null
}

const Git = () => {
  const { t } = useTranslation()
  const { repoName } = useParams()
  const [repository, setRepository] = useState<Repository | null>(null)
  const [readme, setReadme] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    fetch(`https://raw.githubusercontent.com/sachadvr/${repoName}/master/README.md`)
      .then((response) => response.text())
      .then((content) => {
        if (cancelled) return
        setReadme(content === '404: Not Found' ? t('repo.noReadme') : content)
      })
      .catch(() => undefined)

    fetch(`${API_URL}/repos`)
      .then((response) => response.json())
      .then((repositories: Repository[]) => {
        if (cancelled) return
        setRepository(repositories.find(({ name }) => name === repoName) ?? null)
        setIsLoading(false)
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [repoName, t])

  const githubUrl = `https://github.com/${SITE.githubUser}/${repoName}`

  return (
    <>
      <Seo page="repo" path={`/git/${repoName}`} values={{ repo: repoName ?? '' }} />
      <StructuredData
        breadcrumb={[
          { name: t('seo.home.title'), path: '/' },
          { name: repoName ?? '', path: `/git/${repoName}` },
        ]}
      />

      <div className="min-h-screen bg-background bg-grid py-12">
        <div className="container max-w-4xl space-y-6">
          <Button asChild variant="outline" size="sm">
            <LocalizedLink to="/">
              <FaChevronLeft /> {t('common.backHome')}
            </LocalizedLink>
          </Button>

          {isLoading && (
            <p className="terminal-prompt text-sm text-muted-foreground">
              {t('repo.loading', { repo: repoName })}
              <span className="ml-1 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent" />
            </p>
          )}

          {!isLoading && !repository && (
            <TerminalWindow title="stderr">
              <p className="text-sm text-destructive">
                {t('repo.notFound', { repo: repoName })}
              </p>
            </TerminalWindow>
          )}

          {repository && (
            <>
              <SectionHeading command={`git show ${repository.name}`} title={repository.name} />

              <TerminalWindow title="~/metadata" bodyClassName="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {repository.description || t('repo.noDescription')}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild>
                    <a href={githubUrl} target="_blank" rel="noreferrer">
                      <FaGithub /> {t('repo.openGithub')}
                    </a>
                  </Button>
                  <iframe
                    title={t('repo.starsTitle', { repo: repository.name })}
                    src={`https://ghbtns.com/github-btn.html?user=${SITE.githubUser}&repo=${repository.name}&type=star&count=true`}
                    frameBorder="0"
                    scrolling="0"
                    width="170"
                    height="20"
                  />
                </div>
              </TerminalWindow>

              <TerminalWindow title="README.md">
                <MarkdownViewer markdown={readme} />
              </TerminalWindow>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Git
