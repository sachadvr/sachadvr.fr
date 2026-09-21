import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from '@/i18n/config'
import { SITE } from '@/i18n/site'
import fr from '@/i18n/locales/fr.json'

// Le français est la langue de repli : il doit être présent dès le premier rendu,
// sinon un `changeLanguage` vers une traduction pas encore chargée afficherait des clés nues.
const LAZY_LOCALES: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('@/i18n/locales/en.json'),
  es: () => import('@/i18n/locales/es.json'),
  zh: () => import('@/i18n/locales/zh.json'),
  ja: () => import('@/i18n/locales/ja.json'),
}

// Pas de plugin de détection : `main.tsx` (préfixe d'URL) et `LanguageLayout`
// (localStorage puis navigateur) décident de la langue et appellent
// `activateLanguage`, qui écrasait systématiquement le résultat du plugin.
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGE_CODES,
    // 'zh-CN' / 'ja-JP' envoyés par le navigateur doivent retomber sur 'zh' / 'ja'
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
      defaultVariables: {
        countryCode: SITE.countryCode,
        email: SITE.email,
      },
    },
  })

/**
 * Charge le bundle de traduction d'une langue puis l'active. Chaque locale non
 * française est un chunk séparé, téléchargé seulement quand la langue est demandée.
 */
export async function activateLanguage(code: string): Promise<void> {
  const loadLocale = LAZY_LOCALES[code]

  if (loadLocale && !i18n.hasResourceBundle(code, 'translation')) {
    const { default: translation } = await loadLocale()
    i18n.addResourceBundle(code, 'translation', translation)
  }

  if (i18n.resolvedLanguage !== code) await i18n.changeLanguage(code)
}

export default i18n
