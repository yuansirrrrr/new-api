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
  Analytics01Icon,
  CableIcon,
  Route01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '01',
      title: t('Choose a model'),
      desc: t(
        'Pick a model by capability, provider and price. Keep model names stable for your users.'
      ),
      icon: Route01Icon,
    },
    {
      num: '02',
      title: t('Send one API request'),
      desc: t(
        'Use one compatible base URL and let Deeprouter translate the request to the selected upstream.'
      ),
      icon: CableIcon,
    },
    {
      num: '03',
      title: t('Control cost and quality'),
      desc: t(
        'Monitor spend, latency and failures, then tune ratios, groups and fallback channels.'
      ),
      icon: Analytics01Icon,
    },
  ]

  return (
    <section className='border-border bg-background text-foreground relative z-10 border-t px-5 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
            {t('How It Works')}
          </p>
          <h2 className='text-3xl leading-tight font-semibold md:text-5xl'>
            {t('From model choice to production traffic in minutes.')}
          </h2>
        </AnimateInView>

        <div className='grid gap-5 md:grid-cols-3'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 150}
              animation='fade-up'
              className='border-border bg-card relative overflow-hidden rounded-lg border p-6'
            >
              <div className='text-muted-foreground/20 absolute top-4 right-5 text-5xl font-semibold'>
                {step.num}
              </div>
              <div className='bg-muted text-muted-foreground mb-8 flex size-14 items-center justify-center rounded-md'>
                <HugeiconsIcon icon={step.icon} aria-hidden='true' />
              </div>
              <h3 className='mb-3 text-lg font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
