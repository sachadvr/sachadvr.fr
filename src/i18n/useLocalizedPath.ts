import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LANGUAGE, localizePath } from '@/i18n/config'

/** Renvoie une fonction qui préfixe un chemin applicatif avec la langue active. */
export function useLocalizedPath() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE

  return useCallback((path: string) => localizePath(path, language), [language])
}
