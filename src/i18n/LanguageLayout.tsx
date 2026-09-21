import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { activateLanguage } from '@/i18n'
import { applyDensity, languageDefinition } from '@/i18n/config'

interface LanguageLayoutProps {
  language: string
}

/**
 * Racine d'un arbre de routes pour une langue donnée. Synchronise i18next, l'attribut
 * `lang` du document et sa densité d'affichage (cf. `applyDensity`).
 *
 * La résolution de la langue préférée (URL > localStorage > navigateur) et la
 * réécriture d'URL sur la racine nue se font avant le premier rendu, dans
 * main.tsx : ce composant n'a plus à rediriger après coup (ça causait un flash
 * français puis un layout shift au changement de route).
 */
const LanguageLayout = ({ language }: LanguageLayoutProps) => {
  useEffect(() => {
    activateLanguage(language)
    document.documentElement.lang = languageDefinition(language).hreflang
    applyDensity(language)
  }, [language])

  return <Outlet />
}

export default LanguageLayout
