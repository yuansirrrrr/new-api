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
  BracesIcon,
  DollarSquareIcon,
  GitBranchIcon,
  Key01Icon,
  Layers01Icon,
  Shield01Icon,
  VideoAiIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
  isAuthenticated?: boolean
}

export function Features(props: FeaturesProps) {
  const { t } = useTranslation()
  const protectedHref = (path: string) =>
    props.isAuthenticated
      ? path
      : `/sign-in?redirect=${encodeURIComponent(path)}`

  const features = [
    {
      id: 'models',
      title: t('Model marketplace'),
      desc: t(
        'Browse text, image, audio and video models in one place and expose them through a consistent API surface.'
      ),
      icon: Layers01Icon,
      span: 'md:col-span-2',
      visual: ['GPT-4o', 'Claude', 'Gemini', 'DeepSeek', 'Seedance'],
      href: '/pricing',
    },
    {
      id: 'routing',
      title: t('Reliable routing'),
      desc: t(
        'Route by model, group, priority and health so production traffic keeps flowing when an upstream changes.'
      ),
      icon: GitBranchIcon,
      span: 'md:col-span-1',
      visual: [t('fallback'), t('priority'), t('retry')],
      href: protectedHref('/channels'),
    },
    {
      id: 'billing',
      title: t('Usage based billing'),
      desc: t(
        'Set model prices, group discounts and pre-consumption rules before requests reach the upstream provider.'
      ),
      icon: DollarSquareIcon,
      span: 'md:col-span-1',
      visual: ['$0.002', '$0.009', '$0.958'],
      href: protectedHref('/wallet'),
    },
    {
      id: 'video',
      title: t('Video generation ready'),
      desc: t(
        'Expose asynchronous generation tasks such as Seedance through the same authenticated gateway.'
      ),
      icon: VideoAiIcon,
      span: 'md:col-span-2',
      visual: ['/v1/video/generations', '/v1/tasks/{id}'],
      href: protectedHref('/playground'),
    },
  ]

  const compactFeatures = [
    {
      icon: Key01Icon,
      title: t('One user key'),
      desc: t('Users call Deeprouter keys while admins manage upstream keys.'),
    },
    {
      icon: Activity03Icon,
      title: t('Live observability'),
      desc: t('Track requests, spend, latency and channel failures.'),
    },
    {
      icon: Shield01Icon,
      title: t('Quota controls'),
      desc: t('Limit usage by user, key, group, model and IP.'),
    },
    {
      icon: BracesIcon,
      title: t('OpenAI compatible'),
      desc: t('Keep familiar request shapes and switch models fast.'),
    },
  ]

  return (
    <section className='bg-background text-foreground relative z-10 px-5 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 max-w-2xl'>
          <p className='text-muted-foreground mb-3 text-xs font-medium uppercase'>
            {t('Why Deeprouter')}
          </p>
          <h2 className='text-3xl leading-tight font-semibold md:text-5xl'>
            {t('The routing layer between your app and every model.')}
          </h2>
        </AnimateInView>

        <div className='grid gap-4 md:grid-cols-3'>
          {features.map((feature, i) => (
            <AnimateInView
              key={feature.id}
              delay={i * 100}
              animation='scale-in'
              className={feature.span}
            >
              <a
                href={feature.href}
                className='border-border bg-card hover:bg-muted/30 group flex h-full flex-col rounded-lg border p-6 transition-colors'
              >
                <div className='mb-5 flex items-center gap-3'>
                  <div className='bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-md'>
                    <HugeiconsIcon icon={feature.icon} aria-hidden='true' />
                  </div>
                  <h3 className='text-base font-semibold'>{feature.title}</h3>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className='text-muted-foreground ml-auto transition-transform group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </div>
                <p className='text-muted-foreground max-w-xl text-sm leading-relaxed'>
                  {feature.desc}
                </p>
                <div className='mt-6 flex flex-wrap gap-2'>
                  {feature.visual.map((item) => (
                    <span
                      key={item}
                      className='border-border bg-muted/60 text-muted-foreground rounded-full border px-3 py-1 text-xs'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            </AnimateInView>
          ))}
        </div>

        <div className='mt-12 grid gap-4 md:grid-cols-4'>
          {compactFeatures.map((feature, i) => (
            <AnimateInView
              key={feature.title}
              delay={i * 80}
              animation='fade-up'
              className='border-border bg-card rounded-lg border p-5'
            >
              <div className='text-muted-foreground mb-4'>
                <HugeiconsIcon icon={feature.icon} aria-hidden='true' />
              </div>
              <h3 className='mb-2 text-sm font-semibold'>{feature.title}</h3>
              <p className='text-muted-foreground text-xs leading-relaxed'>
                {feature.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
