import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaChevronLeft,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaSnapchatGhost,
  FaYoutube,
  FaPinterest,
} from 'react-icons/fa'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import LocalizedLink from '@/components/LocalizedLink'
import ProfilePhoto from '@/components/ProfilePhoto'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import TerminalWindow from '@/components/TerminalWindow'
import { Button } from '@/components/ui/button'
import { SITE } from '@/i18n/site'

const SOCIAL_LINKS = [
  { href: 'https://github.com/sachadvr', label: 'GitHub', handle: '@sachadvr', Icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/sachadvr/',
    label: 'LinkedIn',
    handle: 'Sacha Duvivier',
    Icon: FaLinkedinIn,
  },
  { href: 'https://twitter.com/SachaDvr', label: 'Twitter', handle: '@SachaDvr', Icon: FaTwitter },
  {
    href: 'https://instagram.com/sachadvr',
    label: 'Instagram',
    handle: '@sachadvr',
    Icon: FaInstagram,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100010069578181',
    label: 'Facebook',
    handle: 'Sacha Duvivier',
    Icon: FaFacebookF,
  },
  {
    href: 'https://www.youtube.com/channel/UCNDLN4TdHwS_o1Z6SPiO15w',
    label: 'YouTube',
    handle: 'Sacha DVR',
    Icon: FaYoutube,
  },
  {
    href: 'https://www.snapchat.com/add/chacha151101?share_id=RjZDQjdG&locale=fr_FR',
    label: 'Snapchat',
    handle: 'chacha151101',
    Icon: FaSnapchatGhost,
  },
  {
    href: 'https://www.pinterest.fr/sachaduvivier/',
    label: 'Pinterest',
    handle: 'sachaduvivier',
    Icon: FaPinterest,
  },
]

const Links = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background bg-grid py-12">
      <Seo page="links" path="/links" />
      <StructuredData />

      <div className="container max-w-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm">
            <LocalizedLink to="/">
              <FaChevronLeft /> {t('common.back')}
            </LocalizedLink>
          </Button>
          <LanguageSwitcher />
        </div>

        <TerminalWindow title="~/links" bodyClassName="space-y-6">
          <div className="flex items-center gap-4">
            <ProfilePhoto className="h-20 w-20 rounded-soft border border-border object-cover shadow-brutal-sm" />
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight">{t('links.title')}</h1>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {SOCIAL_LINKS.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-box brutal-interactive flex items-center gap-3 px-4 py-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[0.5px]">
                      {label}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </div>
    </div>
  )
}

export default Links
