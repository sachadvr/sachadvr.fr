import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  languageDefinition,
  localizePath,
} from '@/i18n/config'
import { SITE, absoluteUrl } from '@/i18n/site'

interface SeoProps {
  /** Clés de traduction sous `seo.*`, ex. `home`. */
  page: string
  /** Chemin logique sans préfixe de langue, ex. `/cgu`. */
  path: string
  /** Variables d'interpolation pour le titre et la description. */
  values?: Record<string, string>
  noIndex?: boolean
  children?: React.ReactNode
}

const Seo = ({ page, path, values, noIndex = false, children }: SeoProps) => {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE

  const title = t(`seo.${page}.title`, values ?? {})
  const description = t(`seo.${page}.description`, values ?? {})
  const canonical = absoluteUrl(localizePath(path, language))
  const imageUrl = absoluteUrl(SITE.ogImage)

  return (
    <Helmet>
      <html lang={languageDefinition(language).hreflang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, follow" /> : null}
      {noIndex ? null : <link rel="canonical" href={canonical} />}

      {noIndex
        ? null
        : LANGUAGES.map(({ code, hreflang }) => (
            <link
              key={code}
              rel="alternate"
              hrefLang={hreflang}
              href={absoluteUrl(localizePath(path, code))}
            />
          ))}
      {noIndex ? null : (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(localizePath(path, DEFAULT_LANGUAGE))}
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(SITE.ogImageWidth)} />
      <meta property="og:image:height" content={String(SITE.ogImageHeight)} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={languageDefinition(language).ogLocale} />
      {LANGUAGES.filter(({ code }) => code !== language).map(({ code, ogLocale }) => (
        <meta key={code} property="og:locale:alternate" content={ogLocale} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SachaDvr" />
      <meta name="twitter:creator" content="@SachaDvr" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {children}
    </Helmet>
  )
}

export default Seo
