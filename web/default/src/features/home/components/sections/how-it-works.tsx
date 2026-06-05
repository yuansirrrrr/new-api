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
import { BarChart3, Cable, Route } from 'lucide-react'
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
      icon: <Route className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '02',
      title: t('Send one API request'),
      desc: t(
        'Use one compatible base URL and let Deeprouter translate the request to the selected upstream.'
      ),
      icon: <Cable className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '03',
      title: t('Control cost and quality'),
      desc: t(
        'Monitor spend, latency and failures, then tune ratios, groups and fallback channels.'
      ),
      icon: <BarChart3 className='size-6' strokeWidth={1.5} />,
    },
  ]

  return (
    <section className='border-border bg-background text-foreground dark:border-white/10 dark:bg-[#05060a] relative z-10 border-t px-6 py-24 md:py-32 dark:text-white'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='mb-3 text-xs font-medium tracking-widest text-blue-600 uppercase dark:text-blue-300'>
            {t('How It Works')}
          </p>
          <h2 className='text-3xl font-semibold tracking-[-0.04em] md:text-5xl'>
            {t('From model choice to production traffic in minutes.')}
          </h2>
        </AnimateInView>

        <div className='grid gap-5 md:grid-cols-3'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 150}
              animation='fade-up'
              className='border-border bg-card/70 relative overflow-hidden rounded-3xl border p-6 dark:border-white/10 dark:bg-white/[0.04]'
            >
              <div className='text-muted-foreground/15 absolute top-4 right-5 text-5xl font-semibold tracking-[-0.08em] dark:text-white/[0.06]'>
                {step.num}
              </div>
              <div className='mb-8 flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-white/10 dark:text-blue-200'>
                {step.icon}
              </div>
              <h3 className='mb-3 text-lg font-semibold'>{step.title}</h3>
              <p className='text-muted-foreground text-sm leading-relaxed dark:text-slate-400'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
