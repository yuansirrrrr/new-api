/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  Activity03Icon,
  ArrowRight01Icon,
  CreditCardIcon,
  DashboardBrowsingIcon,
  GitBranchIcon,
  Key01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface OperationsShowcaseProps {
  isAuthenticated?: boolean
}

export function OperationsShowcase(props: OperationsShowcaseProps) {
  const { t } = useTranslation()
  const protectedHref = (path: string) =>
    props.isAuthenticated
      ? path
      : `/sign-in?redirect=${encodeURIComponent(path)}`

  const entries = [
    {
      title: t('API Keys'),
      desc: t('Issue, rotate, and scope user keys.'),
      href: protectedHref('/keys'),
      icon: Key01Icon,
      meta: 'dr-••••••',
    },
    {
      title: t('Usage Logs'),
      desc: t('Inspect latency, tokens, status, and cost.'),
      href: protectedHref('/usage-logs'),
      icon: Activity03Icon,
      meta: '142ms',
    },
    {
      title: t('Channels'),
      desc: t('Monitor upstream health and priorities.'),
      href: protectedHref('/channels'),
      icon: GitBranchIcon,
      meta: '99.99%',
    },
    {
      title: t('Wallet'),
      desc: t('Review balance, top-ups, and quota.'),
      href: protectedHref('/wallet'),
      icon: CreditCardIcon,
      meta: '$428',
    },
  ]

  return (
    <section className='border-border bg-background text-foreground relative z-10 border-t px-5 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-start'>
          <AnimateInView>
            <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
              {t('Operational console')}
            </p>
            <h2 className='max-w-2xl text-3xl leading-tight font-semibold md:text-5xl'>
              {t('One place to operate the gateway.')}
            </h2>
            <p className='text-muted-foreground mt-5 max-w-xl text-sm leading-7 md:text-base'>
              {t(
                'Create keys, inspect requests, tune fallback, and keep every model under a clean operational rhythm.'
              )}
            </p>

            <a
              href={protectedHref('/dashboard')}
              className='border-border bg-card hover:bg-muted/30 mt-8 inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors'
            >
              <HugeiconsIcon
                icon={DashboardBrowsingIcon}
                data-icon='inline-start'
              />
              {t('Go to Dashboard')}
              <HugeiconsIcon icon={ArrowRight01Icon} data-icon='inline-end' />
            </a>
          </AnimateInView>

          <AnimateInView delay={120} animation='scale-in'>
            <div className='border-border bg-card overflow-hidden rounded-lg border shadow-[0_24px_70px_-54px_rgb(0_0_0_/_0.75)]'>
              <div className='border-border flex items-center justify-between border-b px-5 py-4'>
                <div>
                  <p className='text-sm font-semibold'>{t('Route health')}</p>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {t('Healthy channels')}
                  </p>
                </div>
                <span className='bg-primary text-primary-foreground rounded-full px-3 py-1 font-mono text-xs'>
                  {t('Failover ready')}
                </span>
              </div>

              <div className='bg-border grid gap-px md:grid-cols-2'>
                <MetricPanel label={t('Requests today')} value='18.4K' />
                <MetricPanel label={t('Cost today')} value='$428.17' />
              </div>

              <div className='bg-border grid gap-px md:grid-cols-2'>
                {entries.map((entry) => (
                  <a
                    key={entry.title}
                    href={entry.href}
                    className='bg-card hover:bg-muted/30 group flex min-h-40 flex-col justify-between p-5 transition-colors'
                  >
                    <div className='flex items-start justify-between gap-4'>
                      <span className='bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-md'>
                        <HugeiconsIcon icon={entry.icon} aria-hidden='true' />
                      </span>
                      <span className='text-muted-foreground font-mono text-xs'>
                        {entry.meta}
                      </span>
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold'>{entry.title}</h3>
                      <p className='text-muted-foreground mt-2 text-xs leading-6'>
                        {entry.desc}
                      </p>
                      <span className='text-muted-foreground mt-4 inline-flex items-center gap-1 text-xs font-medium'>
                        {t('View details')}
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          className='transition-transform group-hover:translate-x-0.5'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}

function MetricPanel(props: { label: string; value: string }) {
  return (
    <div className='bg-card px-5 py-6'>
      <p className='text-muted-foreground text-xs'>{props.label}</p>
      <p className='mt-2 font-mono text-3xl font-semibold tabular-nums'>
        {props.value}
      </p>
    </div>
  )
}
