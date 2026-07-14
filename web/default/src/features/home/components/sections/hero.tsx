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
import { Link } from '@tanstack/react-router'
import {
  AiSearch02Icon,
  ArrowRight01Icon,
  BookOpen01Icon,
  GitBranchIcon,
  Shield01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { resolveDocsUrl } from '@/lib/docs-url'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl = resolveDocsUrl(status?.docs_link as string | undefined)

  const renderDocsButton = () => {
    const className = 'h-10 rounded-full px-4 text-sm font-medium'
    const content = (
      <>
        <HugeiconsIcon icon={BookOpen01Icon} data-icon='inline-start' />
        <span>{t('Docs')}</span>
      </>
    )

    if (docsUrl.startsWith('http')) {
      return (
        <Button
          variant='outline'
          className={className}
          render={
            <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
          }
        >
          {content}
        </Button>
      )
    }

    return (
      <Button
        variant='outline'
        className={className}
        render={<Link to={docsUrl} />}
      >
        {content}
      </Button>
    )
  }

  return (
    <section className='bg-background text-foreground relative z-10 overflow-hidden px-4 pt-24 pb-12 sm:px-5 md:pt-40 md:pb-20'>
      <div className='mx-auto max-w-6xl'>
        <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
          <div
            className='landing-animate-fade-up border-border bg-card/80 text-muted-foreground mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium opacity-0 shadow-[0_10px_40px_-34px_rgb(0_0_0_/_0.65)]'
            style={{ animationDelay: '0ms' }}
          >
            <span>{t('OpenAI compatible')}</span>
            <span className='bg-muted-foreground/30 size-1 rounded-full' />
            <span>{t('Reliable routing')}</span>
            <span className='bg-muted-foreground/30 size-1 rounded-full' />
            <span>{t('Quota controls')}</span>
          </div>
          <h1
            className='landing-animate-fade-up max-w-4xl text-4xl leading-[1.04] font-semibold text-balance opacity-0 sm:text-6xl md:text-7xl'
            style={{ animationDelay: '60ms' }}
          >
            {t('One API for any model')}
          </h1>
          <p
            className='landing-animate-fade-up text-muted-foreground mt-5 max-w-2xl text-base leading-7 opacity-0 md:mt-6 md:text-lg md:leading-8'
            style={{ animationDelay: '120ms' }}
          >
            {t(
              'Access the best AI models from one account. Route requests, compare pricing, and monitor usage without rebuilding your app.'
            )}
          </p>

          <Link
            to='/pricing'
            className='landing-animate-fade-up border-border bg-card text-card-foreground hover:bg-muted/30 mt-7 flex min-h-16 w-full max-w-3xl items-center gap-3 rounded-2xl border px-4 py-4 text-left opacity-0 shadow-[0_18px_60px_-42px_rgb(0_0_0_/_0.8)] transition-colors sm:min-h-24 sm:items-start sm:gap-4 sm:rounded-[1.5rem] sm:px-6 sm:py-5 md:mt-9'
            style={{ animationDelay: '180ms' }}
          >
            <HugeiconsIcon
              icon={AiSearch02Icon}
              className='text-muted-foreground mt-0.5 size-5 shrink-0'
              aria-hidden='true'
            />
            <span className='text-muted-foreground flex-1 text-base sm:text-lg'>
              {t('Search models, providers, modalities...')}
            </span>
            <span className='bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-full'>
              <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden='true' />
            </span>
          </Link>

          <div
            className='landing-animate-fade-up mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 opacity-0 sm:mt-5'
            style={{ animationDelay: '240ms' }}
          >
            <Button
              variant='outline'
              className='h-10 rounded-full px-4 text-sm font-medium'
              render={<Link to='/pricing' />}
            >
              {t('Browse models')}
            </Button>
            {renderDocsButton()}
            {props.isAuthenticated ? (
              <Button
                className='h-10 rounded-full px-4 text-sm font-medium'
                render={<Link to='/dashboard' />}
              >
                {t('Go to Dashboard')}
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon='inline-end' />
              </Button>
            ) : (
              <Button
                className='h-10 rounded-full px-4 text-sm font-medium'
                render={<Link to='/sign-up' />}
              >
                {t('Start building')}
                <HugeiconsIcon icon={ArrowRight01Icon} data-icon='inline-end' />
              </Button>
            )}
            <Button
              variant='outline'
              className='h-10 rounded-full px-4 text-sm font-medium'
              render={<Link to='/rankings' />}
            >
              {t('Rankings')}
            </Button>
          </div>
        </div>

        <div
          className='landing-animate-fade-up mt-14 grid gap-5 opacity-0 md:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]'
          style={{ animationDelay: '320ms' }}
        >
          <HeroMediaPanel />
          <HeroSidePanel isAuthenticated={props.isAuthenticated} />
        </div>
      </div>
    </section>
  )
}

function HeroMediaPanel() {
  const { t } = useTranslation()

  return (
    <Link
      to='/pricing'
      className='border-border bg-card text-card-foreground group hover:bg-muted/20 flex min-h-[300px] min-w-0 flex-col overflow-hidden rounded-lg border transition-colors sm:min-h-[360px] md:min-h-[440px]'
    >
      <div className='flex items-center justify-between border-b px-5 py-4'>
        <span className='text-sm font-medium'>{t('Models & Routing')}</span>
        <span className='text-muted-foreground font-mono text-xs'>/v1</span>
      </div>
      <div className='flex flex-1 p-3 sm:p-4'>
        <img
          src='/home/model-routing-preview.svg'
          alt={t('Models & Routing')}
          className='border-border bg-muted/20 h-full min-h-[220px] w-full min-w-0 rounded-lg border object-contain sm:min-h-[284px]'
          decoding='async'
          fetchPriority='high'
          loading='eager'
        />
      </div>
    </Link>
  )
}

function HeroSidePanel(props: Pick<HeroProps, 'isAuthenticated'>) {
  const { t } = useTranslation()
  const protectedHref = (path: string) =>
    props.isAuthenticated
      ? path
      : `/sign-in?redirect=${encodeURIComponent(path)}`
  const previews = [
    {
      src: '/home/channel-health-preview.svg',
      title: t('Channels'),
      meta: '99.99%',
      href: protectedHref('/channels'),
      icon: GitBranchIcon,
    },
    {
      src: '/home/usage-logs-preview.svg',
      title: t('Usage Logs'),
      meta: '$428',
      href: protectedHref('/usage-logs'),
      icon: Shield01Icon,
    },
  ]

  return (
    <div className='grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-1'>
      {previews.map((preview, index) => (
        <a
          key={preview.src}
          href={preview.href}
          className='border-border bg-card text-card-foreground group hover:bg-muted/20 flex min-h-[190px] min-w-0 flex-col overflow-hidden rounded-lg border transition-colors sm:min-h-[210px]'
        >
          <div className='flex items-center justify-between border-b px-4 py-3'>
            <span className='flex items-center gap-2 text-sm font-medium'>
              <HugeiconsIcon
                icon={preview.icon}
                className='text-muted-foreground'
                aria-hidden='true'
              />
              {preview.title}
            </span>
            <span className='text-muted-foreground font-mono text-xs'>
              {preview.meta}
            </span>
          </div>
          <div className='flex min-h-0 flex-1 p-3'>
            <img
              src={preview.src}
              alt={preview.title}
              className='border-border bg-muted/20 aspect-[4/3] w-full min-w-0 rounded-lg border object-contain'
              decoding='async'
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
          <div className='text-muted-foreground flex items-center gap-1 px-4 pb-3 text-xs'>
            <span>{t('View details')}</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className='transition-transform group-hover:translate-x-0.5'
              aria-hidden='true'
            />
          </div>
        </a>
      ))}
    </div>
  )
}
