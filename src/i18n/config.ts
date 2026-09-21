/**
 * Source de vérité unique pour l'i18n et le SEO multilingue.
 *
 * Le français est la langue par défaut et ne porte PAS de préfixe d'URL
 * (`/cgu`), les autres langues en portent un (`/en/cgu`, `/ja/cgu`, ...).
 */

export const DEFAULT_LANGUAGE = 'fr' as const

export interface LanguageDefinition {
  /** Code utilisé dans l'URL et par i18next. */
  code: string
  /** Valeur de l'attribut `hreflang` / `<html lang>`. */
  hreflang: string
  /** Valeur attendue par Open Graph (`og:locale`). */
  ogLocale: string
  /** Libellé natif affiché dans le sélecteur. */
  label: string
  /** Libellé court pour le bouton compact. */
  short: string
}

export const LANGUAGES: LanguageDefinition[] = [
  { code: 'fr', hreflang: 'fr-FR', ogLocale: 'fr_FR', label: 'Français', short: 'FR' },
  { code: 'en', hreflang: 'en', ogLocale: 'en_US', label: 'English', short: 'EN' },
  { code: 'es', hreflang: 'es', ogLocale: 'es_ES', label: 'Español', short: 'ES' },
  { code: 'zh', hreflang: 'zh-Hans', ogLocale: 'zh_CN', label: '简体中文', short: '中文' },
  { code: 'ja', hreflang: 'ja', ogLocale: 'ja_JP', label: '日本語', short: '日本' },
]

export const LANGUAGE_CODES = LANGUAGES.map(({ code }) => code)

export const LANGUAGE_STORAGE_KEY = 'sachadvr.lang'

/**
 * Densité d'information attendue par le marché de la langue active.
 *
 * Les utilisateurs sinophones et japonophones sont habitués à des interfaces
 * denses (Baidu, Taobao, JD.com, Yahoo! Japan, Rakuten) : plus de contenu visible
 * d'un coup, moins de divulgation progressive. Les langues latines gardent le
 * layout de référence, aéré.
 *
 * ⚠️ La densité ne touche QUE l'espacement, la taille de texte et la quantité
 * d'informations affichées simultanément. L'encre, les ombres et les rayons
 * restent strictement identiques dans toutes les langues. Seule la teinte
 * d'accent (`--accent`) varie légèrement par langue, cf. `applyDensity`.
 */
export const DENSE_LANGUAGES = ['zh', 'ja']

export type Density = 'comfortable' | 'compact'

export function densityFor(code: string | undefined): Density {
  return code && DENSE_LANGUAGES.includes(code) ? 'compact' : 'comfortable'
}

/** Pose `data-density` et `data-lang-accent` sur `<html>`, à côté de `lang`. */
export function applyDensity(code: string): void {
  document.documentElement.dataset.density = densityFor(code)
  document.documentElement.dataset.langAccent = isSupportedLanguage(code) ? code : DEFAULT_LANGUAGE
}

export function isSupportedLanguage(value: string | undefined): boolean {
  return !!value && LANGUAGE_CODES.includes(value)
}

export function languageDefinition(code: string): LanguageDefinition {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0]
}

/** Préfixe d'URL d'une langue : '' pour le français, '/en' sinon. */
export function languagePrefix(code: string): string {
  return code === DEFAULT_LANGUAGE ? '' : `/${code}`
}

/**
 * Préfixe un chemin applicatif ('/cgu') avec la langue courante.
 * Les URLs absolues et les ancres sont renvoyées telles quelles.
 */
export function localizePath(path: string, code: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  const prefix = languagePrefix(code)

  if (normalized === '/') return prefix || '/'
  return `${prefix}${normalized}`
}

/** Retire le préfixe de langue d'un pathname pour retrouver le chemin logique. */
export function stripLanguagePrefix(pathname: string): string {
  const match = /^\/([a-z]{2})(?=\/|$)/.exec(pathname)
  if (match && isSupportedLanguage(match[1]) && match[1] !== DEFAULT_LANGUAGE) {
    return pathname.slice(match[0].length) || '/'
  }
  return pathname || '/'
}
