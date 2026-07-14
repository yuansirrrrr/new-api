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
  ArrowRight01Icon,
  CodeSquareIcon,
  Layers01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'
import { HeroTerminalDemo } from '../hero-terminal-demo'

export function FeaturedModels() {
  const { t } = useTranslation()

  const models = [
    {
      name: 'openai/gpt-4o',
      provider: 'OpenAI',
      context: '128K',
      input: '$2.50',
      output: '$10.00',
      tag: t('Reasoning'),
    },
    {
      name: 'anthropic/claude-3-5-sonnet',
      provider: 'Anthropic',
      context: '200K',
      input: '$3.00',
      output: '$15.00',
      tag: t('Coding'),
    },
    {
      name: 'google/gemini-2.5-pro',
      provider: 'Google',
      context: '1M',
      input: '$1.25',
      output: '$10.00',
      tag: t('Multimodal'),
    },
    {
      name: 'doubao-seedance-2.0-fast',
      provider: 'ByteDance',
      context: t('Task'),
      input: t('Video'),
      output: t('Async'),
      tag: t('Generation'),
    },
  ]

  return (
    <section className='border-border bg-background text-foreground relative z-10 border-t px-5 py-20 md:py-28'>
      <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-start'>
        <AnimateInView>
          <div className='mb-8 flex items-end justify-between gap-4'>
            <div>
              <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
                {t('Featured Models')}
              </p>
              <h2 className='max-w-2xl text-3xl leading-tight font-semibold md:text-5xl'>
                {t('Find the right model, then route it through one key.')}
              </h2>
            </div>
            <Link
              to='/pricing'
              className='text-muted-foreground hover:text-foreground hidden shrink-0 items-center gap-1.5 text-sm font-medium md:flex'
            >
              {t('View all models')}
              <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden='true' />
            </Link>
          </div>

          <div className='border-border bg-card overflow-hidden rounded-lg border'>
            <div className='text-muted-foreground grid grid-cols-[minmax(0,1.4fr)_0.7fr_0.5fr_0.5fr] gap-4 border-b px-5 py-3 text-xs font-medium md:grid-cols-[minmax(0,1.4fr)_0.7fr_0.5fr_0.5fr]'>
              <span>{t('Model')}</span>
              <span>{t('Context')}</span>
              <span>{t('Input')}</span>
              <span>{t('Output')}</span>
            </div>
            {models.map((model) => (
              <Link
                key={model.name}
                to='/pricing'
                className='hover:bg-muted/40 grid grid-cols-[minmax(0,1.4fr)_0.7fr_0.5fr_0.5fr] gap-4 border-b px-5 py-4 text-sm transition-colors last:border-b-0'
              >
                <span className='min-w-0'>
                  <span className='flex items-center gap-2'>
                    <HugeiconsIcon
                      icon={Layers01Icon}
                      className='text-muted-foreground shrink-0'
                      aria-hidden='true'
                    />
                    <span className='truncate font-medium'>{model.name}</span>
                  </span>
                  <span className='text-muted-foreground mt-1 flex items-center gap-2 text-xs'>
                    {model.provider}
                    <span className='bg-muted-foreground/40 size-1 rounded-full' />
                    {model.tag}
                  </span>
                </span>
                <span className='text-muted-foreground self-center font-mono text-xs'>
                  {model.context}
                </span>
                <span className='text-muted-foreground self-center font-mono text-xs'>
                  {model.input}
                </span>
                <span className='text-muted-foreground self-center font-mono text-xs'>
                  {model.output}
                </span>
              </Link>
            ))}
          </div>
        </AnimateInView>

        <AnimateInView delay={120} animation='scale-in'>
          <div className='mb-4 flex items-center gap-2 text-sm font-medium'>
            <HugeiconsIcon
              icon={CodeSquareIcon}
              className='text-muted-foreground'
              aria-hidden='true'
            />
            {t('OpenAI-compatible requests')}
          </div>
          <HeroTerminalDemo />
        </AnimateInView>
      </div>
    </section>
  )
}
