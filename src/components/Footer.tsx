import React, { useState } from 'react'
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import LocalizedLink from '@/components/LocalizedLink'
import { SITE } from '@/i18n/site'

const SOCIAL_LINKS = [
  { href: `https://github.com/${SITE.githubUser}`, label: 'GitHub', Icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/sachadvr/',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
  },
  { href: 'https://twitter.com/SachaDvr', label: 'Twitter', Icon: FaTwitter },
  { href: 'https://instagram.com/sachadvr', label: 'Instagram', Icon: FaInstagram },
]

const NAV_LINKS = [
  { href: '#skills', key: 'nav.skills' },
  { href: '#work', key: 'nav.work' },
  { href: '#timeline', key: 'nav.timeline' },
  { href: '#contact', key: 'nav.contact' },
]

/** Pied de page : bande jaune, newsletter + colonnes, grille de réseaux sociaux. */
const Footer = () => {
  const { t } = useTranslation()
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
    event.currentTarget.reset()
  }

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="page-x pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-6">
            <span className="font-display text-2xl font-semibold uppercase tracking-[-0.04em]">
              SACHA<sup aria-hidden="true" className="text-[0.5em]">_</sup>DVR
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.05em]">
              {t('footer.newsletter.title')}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {t('footer.newsletter.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col justify-end gap-4">
            <div className="flex border border-ink">
              <input
                type="email"
                name="email"
                required
                placeholder={t('footer.newsletter.placeholder')}
                aria-label={t('footer.newsletter.placeholder')}
                className="h-[88px] w-full bg-transparent px-6 font-mono text-base text-accent-foreground outline-none placeholder:text-ink/50"
              />
              <button
                type="submit"
                className="mono-label shrink-0 border-l border-ink bg-ink px-8 text-crimson transition-colors duration-150 hover:bg-transparent hover:text-ink"
              >
                {t('footer.newsletter.submit')}
              </button>
            </div>
            {subscribed && (
              <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.05em]">
                <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-ink" />
                {t('footer.newsletter.done')}
              </p>
            )}
          </form>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-20">
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t('footer.tagline')}
          </p>

          <nav aria-label={t('footer.navTitle')}>
            <h3 className="mono-label text-ink/50">{t('footer.navTitle')}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <a href={href} className="font-mono text-sm font-semibold uppercase tracking-[0.05em] hover:text-ink/60">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.legalTitle')}>
            <h3 className="mono-label text-ink/50">{t('footer.legalTitle')}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { to: '/cgu', key: 'footer.cgu' },
                { to: '/cgv', key: 'footer.cgv' },
                { to: '/links', key: 'footer.links' },
              ].map(({ to, key }) => (
                <li key={to}>
                  <LocalizedLink to={to} className="font-mono text-sm font-semibold uppercase tracking-[0.05em] hover:text-ink/60">
                    {t(key)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="mono-label text-ink/50">{t('footer.socialsTitle')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center border border-ink bg-paper text-ink shadow-brutal-sm transition-transform duration-150 hover:-translate-y-[2px]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono-label text-ink/60">{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}

export default Footer