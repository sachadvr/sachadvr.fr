import React, { Suspense, lazy } from 'react'

// Les jeux d'icônes Devicon/Simple Icons/VSCode pèsent ~35 ko dans le bundle
// d'entrée alors qu'ils ne sont rendus qu'une fois les dépôts GitHub reçus,
// donc après le LCP : ils sont chargés à la demande.
const LanguageIconSet = lazy(() => import('@/lib/language-icons-set'))

const HIDDEN_LANGUAGES = new Set(['Makefile', 'NSIS', 'Batchfile', 'EJS'])

export function isDisplayableLanguage(language: string): boolean {
  return !HIDDEN_LANGUAGES.has(language)
}

export function LanguageIcon({
  language,
  className,
}: {
  language: string
  className?: string
}): JSX.Element {
  return (
    <Suspense fallback={<span className={className} />}>
      <LanguageIconSet language={language} className={className} />
    </Suspense>
  )
}
