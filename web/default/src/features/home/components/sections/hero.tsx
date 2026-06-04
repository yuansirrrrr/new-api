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
import { ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const modelCards = [
    {
      provider: 'OpenAI',
      model: 'GPT-4o',
      meta: t('Fast reasoning'),
      price: '$2.50/M',
    },
    {
      provider: 'Anthropic',
      model: 'Claude 3.5 Sonnet',
      meta: t('Long-form coding'),
      price: '$3.00/M',
    },
    {
      provider: 'Google',
      model: 'Gemini 2.5 Pro',
      meta: t('Multimodal analysis'),
      price: '$1.25/M',
    },
    {
      provider: 'ByteDance',
      model: 'Seedance',
      meta: t('Video generation'),
      price: t('Async task'),
    },
  ]

  const renderDocsButton = () => {
    const className =
      'group inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-background/80 px-5 text-sm font-medium text-foreground hover:bg-muted dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white'
    const content = (
      <>
        <BookOpen className='text-muted-foreground size-4 transition-colors duration-200 group-hover:text-foreground dark:text-slate-300 dark:group-hover:text-white' />
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
    <section className='bg-background text-foreground dark:bg-[#05060a] relative z-10 overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 dark:text-white'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-80'
        style={{
          background: [
            'radial-gradient(circle at 50% 8%, rgba(59,130,246,0.30) 0%, transparent 34%)',
            'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.20) 0%, transparent 28%)',
            'radial-gradient(circle at 80% 24%, rgba(20,184,166,0.16) 0%, transparent 30%)',
          ].join(', '),
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_18%,black_25%,transparent_100%)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]'
      />

      <div className='mx-auto max-w-6xl'>
        <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
          <div
            className='landing-animate-fade-up border-border bg-muted/50 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium text-blue-700 opacity-0 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-blue-100'
            style={{ animationDelay: '0ms' }}
          >
            <Sparkles className='size-3.5 text-blue-500 dark:text-blue-300' />
            <span>{t('Deeprouter is a unified API for AI')}</span>
          </div>

          <h1
            className='landing-animate-fade-up max-w-4xl text-[clamp(3rem,8vw,6.8rem)] leading-[0.9] font-semibold tracking-[-0.075em] opacity-0'
            style={{ animationDelay: '60ms' }}
          >
            {t('One API for any model')}
          </h1>
          <p
            className='landing-animate-fade-up text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed opacity-0 md:text-xl dark:text-slate-300'
            style={{ animationDelay: '120ms' }}
          >
            {t(
              'Access the best AI models from one account. Route requests, compare pricing, and monitor usage without rebuilding your app.'
            )}
          </p>

          <div
            className='landing-animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0'
            style={{ animationDelay: '180ms' }}
          >
            {props.isAuthenticated ? (
              <Button
                className='bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 group h-11 rounded-full px-5 text-sm font-medium'
                render={<Link to='/dashboard' />}
              >
                {t('Go to Dashboard')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            ) : (
              <Button
                className='bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 group h-11 rounded-full px-5 text-sm font-medium'
                render={<Link to='/sign-up' />}
              >
                {t('Start building')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
            )}
            <Button
              variant='outline'
              className='border-border bg-background/80 h-11 rounded-full px-5 text-sm font-medium text-foreground hover:bg-muted dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white'
              render={<Link to='/pricing' />}
            >
              {t('Browse models')}
            </Button>
            {renderDocsButton()}
          </div>
        </div>

        <div
          className='landing-animate-fade-up mx-auto mt-12 max-w-3xl opacity-0'
          style={{ animationDelay: '260ms' }}
        >
          <Link
            to='/pricing'
            className='border-border bg-card/80 hover:bg-muted/70 flex h-14 items-center gap-3 rounded-2xl border px-4 text-left shadow-2xl shadow-blue-950/10 backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] dark:shadow-blue-950/30'
          >
            <Search className='text-muted-foreground size-5 dark:text-slate-400' />
            <span className='text-muted-foreground flex-1 text-sm dark:text-slate-400'>
              {t('Search models, providers, modalities...')}
            </span>
            <span className='border-border bg-muted rounded-lg border px-2 py-1 font-mono text-[10px] text-muted-foreground dark:border-white/10 dark:bg-white/10 dark:text-slate-400'>
              /
            </span>
          </Link>
        </div>

        <div
          className='landing-animate-fade-up mt-5 grid gap-3 opacity-0 sm:grid-cols-2 lg:grid-cols-4'
          style={{ animationDelay: '320ms' }}
        >
          {modelCards.map((item) => (
            <Link
              key={`${item.provider}-${item.model}`}
              to='/pricing'
              className='border-border bg-card/70 hover:bg-muted/70 group rounded-2xl border p-4 text-sm backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]'
            >
              <div className='mb-4 flex items-center justify-between'>
                <span className='text-muted-foreground dark:text-slate-400'>
                  {item.provider}
                </span>
                <ArrowRight className='text-muted-foreground size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-slate-400' />
              </div>
              <div className='font-medium text-foreground dark:text-white'>
                {item.model}
              </div>
              <div className='mt-2 flex items-center justify-between gap-3 text-xs'>
                <span className='text-muted-foreground dark:text-slate-500'>
                  {item.meta}
                </span>
                <span className='text-muted-foreground font-mono dark:text-slate-500'>
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
