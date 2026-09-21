import React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

/**
 * Primitives du gabarit « rirekisho » (履歴書, le CV administratif japonais) réinterprété
 * en neo-brutalism : une feuille encadrée, des lignes de champs libellées à gauche et des
 * tableaux chronologiques à trois colonnes fines (年 / 月 / intitulé).
 *
 * Les idéogrammes japonais sont purement décoratifs (`aria-hidden`) et sont masqués quand
 * l'interface est déjà en japonais, sinon le libellé apparaîtrait deux fois.
 *
 * Les classes `rk-*` n'ont aucun style propre : ce sont les points d'accroche de la densité
 * par langue (`[data-density="compact"]` dans `index.scss`, cf. DESIGN.md § 8).
 */

interface SheetProps {
  /** Titre du document, en gros, à gauche (l'équivalent du 履歴書 calligraphié). */
  title: string
  /** Idéogrammes affichés à côté du titre. */
  jpTitle?: string
  /** Mention alignée à droite de l'en-tête (date, compteur, statut…). */
  aside?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Taille du titre : `lg` pour la feuille d'identité, `sm` pour les feuilles de section. */
  size?: 'sm' | 'lg'
}

export const RirekishoSheet = ({
  title,
  jpTitle,
  aside,
  children,
  className,
  size = 'sm',
}: SheetProps) => {
  const { i18n } = useTranslation()
  const showJp = Boolean(jpTitle) && i18n.language !== 'ja'

  return (
    <div className={cn('window-box', className)}>
      <div className="rk-sheet-head flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-border px-4 py-4 sm:px-6">
        <p className="flex flex-wrap items-baseline gap-3">
          {showJp && (
            <span
              aria-hidden="true"
              className={cn(
                'font-display font-semibold tracking-tighter',
                size === 'lg' ? 'text-3xl sm:text-5xl' : 'text-xl'
              )}
            >
              {jpTitle}
            </span>
          )}
          <span
            className={cn(
              'font-display font-medium uppercase tracking-[0.5px]',
              showJp ? 'text-xs text-muted-foreground' : 'text-base sm:text-lg'
            )}
          >
            {title}
          </span>
        </p>
        {aside && (
          <span className="font-display text-[10px] font-medium uppercase tracking-[0.5px] text-muted-foreground">
            {aside}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

interface FieldProps {
  label: string
  children: React.ReactNode
  className?: string
  /** Étire la ligne pour absorber la hauteur restante de la colonne. */
  grow?: boolean
}

/**
 * Une ligne du formulaire : libellé mono en capitales à gauche, valeur à droite.
 * Empilée en mobile, en deux colonnes à partir de `sm`.
 */
export const RirekishoField = ({ label, children, className, grow }: FieldProps) => {
  return (
    <div
      className={cn(
        'rk-field grid border-b border-border last:border-b-0 sm:grid-cols-[10.5rem_minmax(0,1fr)]',
        grow && 'grow'
      )}
    >
      <div className="rk-field-label flex items-center gap-2 border-b border-border bg-secondary px-4 py-2 font-mono text-[10px] font-medium uppercase leading-[1.4] tracking-[0.5px] sm:border-b-0 sm:border-r sm:py-4">
        <span>{label}</span>
      </div>
      <div className={cn('rk-field-value px-4 py-3 sm:py-4', className)}>{children}</div>
    </div>
  )
}

const LOG_COLUMNS_3 = 'grid-cols-[3.25rem_2.75rem_minmax(0,1fr)] sm:grid-cols-[5rem_4rem_minmax(0,1fr)]'
const LOG_COLUMNS_4 =
  'grid-cols-[2.75rem_2.25rem_minmax(0,1fr)_4.5rem] sm:grid-cols-[4.5rem_3.5rem_minmax(0,1fr)_8rem]'

/** Le gabarit de colonnes du tableau, partagé par l'en-tête et chacune de ses lignes. */
const LogColumnsContext = React.createContext(LOG_COLUMNS_3)

interface LogProps {
  yearLabel: string
  monthLabel: string
  entryLabel: string
  /** Libellé de la 4e colonne. Fourni uniquement en densité compacte (cf. DESIGN.md § 8). */
  metaLabel?: string
  children: React.ReactNode
}

/**
 * Le tableau chronologique du rirekisho (学歴 / 職歴) : deux colonnes fines année/mois et
 * une colonne d'intitulé. Les colonnes restent fines en mobile, comme sur le papier.
 */
export const RirekishoLog = ({
  yearLabel,
  monthLabel,
  entryLabel,
  metaLabel,
  children,
}: LogProps) => {
  const columns = metaLabel ? LOG_COLUMNS_4 : LOG_COLUMNS_3

  return (
    <LogColumnsContext.Provider value={columns}>
      <div>
        <div
          className={cn(
            'rk-log-head grid border-b border-border bg-secondary font-mono text-[10px] font-medium uppercase leading-none tracking-[0.5px]',
            columns
          )}
        >
          <span className="rk-log-cell border-r border-border px-3 py-2">{yearLabel}</span>
          <span className="rk-log-cell border-r border-border px-3 py-2">{monthLabel}</span>
          <span className="rk-log-cell px-3 py-2">{entryLabel}</span>
          {metaLabel && (
            <span className="rk-log-cell border-l border-border px-3 py-2">{metaLabel}</span>
          )}
        </div>
        <ul>{children}</ul>
      </div>
    </LogColumnsContext.Provider>
  )
}

interface LogRowProps {
  year: string
  month: string
  /** Contenu de la 4e colonne, à fournir quand le tableau en déclare une. */
  meta?: React.ReactNode
  children: React.ReactNode
}

export const RirekishoLogRow = ({ year, month, meta, children }: LogRowProps) => {
  const columns = React.useContext(LogColumnsContext)

  return (
    <li className={cn('grid border-b border-border last:border-b-0', columns)}>
      <span className="rk-log-cell border-r border-border px-3 py-4 font-mono text-xs font-medium tabular-nums">
        {year}
      </span>
      <span className="rk-log-cell border-r border-border px-3 py-4 font-mono text-xs font-medium tabular-nums">
        {month}
      </span>
      <div className="min-w-0">{children}</div>
      {meta && (
        <div className="rk-log-cell flex min-w-0 flex-col justify-center gap-1 border-l border-border px-3 py-4">
          {meta}
        </div>
      )}
    </li>
  )
}
