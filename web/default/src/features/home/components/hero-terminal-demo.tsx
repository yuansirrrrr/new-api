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
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type AccentTone = 'emerald' | 'amber' | 'blue' | 'violet'

interface ApiDemoConfig {
  id: string
  label: string
  endpoint: string
  request: string
  response: string
  tokens: number
  latency: number
  cost: string
  accent: AccentTone
}

const ACCENT_CLASSES: Record<AccentTone, string> = {
  emerald: 'text-emerald-300 border-emerald-300',
  amber: 'text-amber-300 border-amber-300',
  blue: 'text-blue-300 border-blue-300',
  violet: 'text-violet-300 border-violet-300',
}

const API_DEMOS: ApiDemoConfig[] = [
  {
    id: 'openai',
    label: 'GPT-4o',
    endpoint: '/v1/chat/completions',
    request: `curl https://api.deeprouterai.com/v1/chat/completions \\
  -H "Authorization: Bearer dr-********" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{ "role": "user", "content": "Plan my launch" }]
  }'`,
    response: `{
  "choices": [{ "message": { "content": "Launch plan routed." } }],
  "usage": { "total_tokens": 842 }
}`,
    tokens: 842,
    latency: 142,
    cost: '$0.0021',
    accent: 'emerald',
  },
  {
    id: 'claude',
    label: 'Claude',
    endpoint: '/v1/chat/completions',
    request: `curl https://api.deeprouterai.com/v1/chat/completions \\
  -H "Authorization: Bearer dr-********" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3-5-sonnet",
    "messages": [{ "role": "user", "content": "Review this spec" }]
  }'`,
    response: `{
  "choices": [{ "message": { "content": "Spec review routed." } }],
  "usage": { "total_tokens": 1180 }
}`,
    tokens: 1180,
    latency: 168,
    cost: '$0.0035',
    accent: 'amber',
  },
  {
    id: 'gemini',
    label: 'Gemini',
    endpoint: '/v1/chat/completions',
    request: `curl https://api.deeprouterai.com/v1/chat/completions \\
  -H "Authorization: Bearer dr-********" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "google/gemini-2.5-pro",
    "messages": [{ "role": "user", "content": "Summarize this file" }]
  }'`,
    response: `{
  "choices": [{ "message": { "content": "Summary generated." } }],
  "usage": { "total_tokens": 736 }
}`,
    tokens: 736,
    latency: 156,
    cost: '$0.0018',
    accent: 'blue',
  },
  {
    id: 'seedance',
    label: 'Seedance',
    endpoint: '/v1/video/generations',
    request: `curl https://api.deeprouterai.com/v1/video/generations \\
  -H "Authorization: Bearer dr-********" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "doubao-seedance-2.0-fast",
    "prompt": "Create a product video",
    "metadata": { "duration": 5, "ratio": "16:9" }
  }'`,
    response: `{
  "id": "task_9Kx...",
  "status": "submitted",
  "model": "doubao-seedance-2.0-fast"
}`,
    tokens: 0,
    latency: 204,
    cost: '$0.00 preflight',
    accent: 'violet',
  },
]

const CYCLE_INTERVAL = 4500

interface HeroTerminalDemoProps {
  className?: string
}

export function HeroTerminalDemo(props: HeroTerminalDemoProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const demo = API_DEMOS[activeIndex]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % API_DEMOS.length)
    }, CYCLE_INTERVAL)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className={cn('mx-auto w-full max-w-2xl', props.className)}>
      <div className='border-border bg-card/95 overflow-hidden rounded-2xl border shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur-sm dark:border-white/10 dark:bg-[#080b12]/95 dark:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.7)]'>
        <div className='border-border flex items-center gap-1 border-b px-3 dark:border-white/10'>
          {API_DEMOS.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative -mb-px border-b-2 px-3 py-3 text-xs font-medium transition-colors',
                  isActive
                    ? ACCENT_CLASSES[item.accent]
                    : 'text-muted-foreground hover:text-foreground border-transparent dark:text-slate-500 dark:hover:text-slate-300'
                )}
              >
                {item.label}
              </button>
            )
          })}
          <div className='ml-auto flex items-center gap-2 pr-2'>
            <span className='inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]' />
            <span className='text-muted-foreground font-mono text-[10px] tracking-wider uppercase dark:text-slate-500'>
              routed
            </span>
          </div>
        </div>

        <div className='border-border flex items-center gap-2 border-b px-5 py-3 dark:border-white/10'>
          <span className='rounded-md bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-blue-600 dark:bg-white/10 dark:text-blue-200'>
            POST
          </span>
          <code className='text-foreground truncate font-mono text-[12.5px] dark:text-slate-300'>
            {demo.endpoint}
          </code>
        </div>

        <div className='bg-border grid gap-px font-mono text-[12px] leading-relaxed dark:bg-white/10 md:grid-cols-2'>
          <CodePanel label='Request' code={demo.request} />
          <CodePanel label='Response' code={demo.response} />
        </div>

        <div className='border-border bg-muted/30 flex items-center justify-between border-t px-5 py-2.5 dark:border-white/10 dark:bg-white/[0.03]'>
          <div className='text-muted-foreground flex items-center gap-3 text-[10px] tabular-nums dark:text-slate-500'>
            <span>
              <span className='font-mono text-foreground dark:text-slate-300'>
                {demo.latency}
              </span>{' '}
              ms
            </span>
            <span className='bg-muted-foreground/40 size-1 rounded-full dark:bg-slate-700' />
            <span>
              <span className='font-mono text-foreground dark:text-slate-300'>
                {demo.tokens}
              </span>{' '}
              tokens
            </span>
            <span className='bg-muted-foreground/40 size-1 rounded-full dark:bg-slate-700' />
            <span>
              cost{' '}
              <span className='font-mono text-foreground dark:text-slate-300'>
                {demo.cost}
              </span>
            </span>
          </div>
          <span className='text-muted-foreground font-mono text-[10px] tracking-wider uppercase dark:text-slate-600'>
            stream via sse
          </span>
        </div>
      </div>
    </div>
  )
}

function CodePanel(props: { label: string; code: string }) {
  return (
    <div className='bg-card min-h-[320px] px-5 py-4 dark:bg-[#080b12]'>
      <div className='text-muted-foreground mb-3 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase dark:text-slate-600'>
        {props.label}
      </div>
      <pre className='text-foreground overflow-x-auto whitespace-pre-wrap break-words dark:text-slate-300'>
        {props.code}
      </pre>
    </div>
  )
}
