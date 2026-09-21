import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, languageDefinition, localizePath } from '@/i18n/config'
import { SITE, absoluteUrl } from '@/i18n/site'

const SKILLS = [
  'Symfony',
  'Vue 3',
  'TypeScript',
  'JavaScript',
  'React',
  'Doctrine ORM',
  'API Platform',
  'PostgreSQL',
  'MariaDB',
  'Docker',
  'Kubernetes',
  'AWS Lambda',
  'Cybersecurity',
  'Machine Learning',
]

interface BreadcrumbEntry {
  name: string
  path: string
}

interface StructuredDataProps {
  /** Ajoute le graphe `WebSite` (page d'accueil uniquement). */
  includeWebSite?: boolean
  breadcrumb?: BreadcrumbEntry[]
}

const StructuredData = ({ includeWebSite = false, breadcrumb }: StructuredDataProps) => {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE
  const hreflang = languageDefinition(language).hreflang

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.name,
    alternateName: SITE.shortName,
    jobTitle: t('person.jobTitle'),
    description: t('person.summary'),
    email: `mailto:${SITE.email}`,
    url: absoluteUrl(localizePath('/', language)),
    image: absoluteUrl(SITE.ogImage),
    nationality: { '@type': 'Country', name: SITE.country },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressCountry: SITE.countryCode,
    },
    knowsLanguage: ['fr', 'en'],
    knowsAbout: SKILLS,
    worksFor: { '@type': 'Organization', name: "Alice's Garden" },
    sameAs: SITE.sameAs,
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: `${SITE.shortName} — ${SITE.name}`,
    description: t('seo.home.description'),
    inLanguage: hreflang,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#person` },
  }

  const breadcrumbList = breadcrumb && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: absoluteUrl(localizePath(path, language)),
    })),
  }

  const graphs = [person, includeWebSite ? webSite : null, breadcrumbList ?? null].filter(Boolean)

  return (
    <Helmet>
      {graphs.map((graph, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(graph)}
        </script>
      ))}
    </Helmet>
  )
}

export default StructuredData
