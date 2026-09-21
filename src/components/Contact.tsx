import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { API_URL } from '@/config'
import { SITE } from '@/i18n/site'
import SectionMarker from '@/components/SectionMarker'
import RetroWindow from '@/components/RetroWindow'
import PillButton from '@/components/PillButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const STATUS_KEYS: Record<Exclude<SubmitStatus, 'idle'>, string> = {
  sending: 'contact.statusSending',
  sent: 'contact.statusSent',
  error: 'contact.statusError',
}

const STATUS_CLASSES: Record<Exclude<SubmitStatus, 'idle'>, string> = {
  sending: 'text-ink',
  sent: 'text-ink',
  error: 'text-destructive',
}

const Contact = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('sending')

    try {
      const response = await fetch(`${API_URL}/mail/sender`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('nom')?.toString() || '',
          from: formData.get('email')?.toString() || '',
          phone: formData.get('tel')?.toString() || '',
          text: formData.get('message')?.toString() || '',
        }),
      })

      if (!response.ok) throw new Error('Network response was not ok')

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-crimson scroll-mt-20 md:scroll-mt-28">
      <SectionMarker label={t('sections.contact')} className="border-t border-border">
        <span className="mono-label text-ink/50">
          ./send <span aria-hidden="true">→</span>
        </span>
      </SectionMarker>

      <div className="page-x py-16 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.05em]">
            {t('contact.heading')}
          </h2>
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-xl text-lg leading-relaxed">
              <Trans
                i18nKey="contact.intro"
                components={{
                  mail: <a href={`mailto:${SITE.email}`} className="bg-ink px-1 font-semibold text-crimson" />,
                }}
              />
            </p>
            <PillButton href={`mailto:${SITE.email}`} variant="dark">
              {SITE.email} <span aria-hidden="true">↗</span>
            </PillButton>
          </div>
        </div>

        <RetroWindow
          title="message.txt --send"
          meta="sachadvr · réponse < 48h"
          bodyClassName="p-6 md:p-10"
          className="mt-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nom" className="mono-label uppercase">
                  {t('contact.labelName')}
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder={t('contact.placeholderName')}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="mono-label uppercase">
                  {t('contact.labelEmail')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('contact.placeholderEmail')}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tel" className="mono-label uppercase">
                {t('contact.labelPhone')}
              </Label>
              <Input
                id="tel"
                name="tel"
                type="tel"
                placeholder={t('contact.placeholderPhone')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="mono-label uppercase">
                {t('contact.labelMessage')}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t('contact.placeholderMessage')}
                className="min-h-[160px]"
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <PillButton type="submit" variant="dark" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.statusSending') : t('contact.submit')}{' '}
                <span aria-hidden="true">→</span>
              </PillButton>
              <p className="terminal-prompt flex items-center gap-2 text-xs font-bold text-muted-foreground">
                {status === 'idle' ? (
                  <>
                    <span aria-hidden="true" className="h-2 w-2 animate-blink rounded-pill bg-ink" />
                    {t('contact.statusIdle')}
                  </>
                ) : (
                  <span className={STATUS_CLASSES[status]}>{t(STATUS_KEYS[status])}</span>
                )}
              </p>
            </div>
          </form>
        </RetroWindow>
      </div>
    </section>
  )
}

export default Contact