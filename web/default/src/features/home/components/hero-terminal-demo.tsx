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
  emerald: 'text-foreground border-foreground',
  amber: 'text-foreground border-foreground',
  blue: 'text-foreground border-foreground',
  violet: 'text-foreground border-foreground',
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
      <div className='border-border bg-card overflow-hidden rounded-lg border'>
        <div className='border-border flex items-center gap-1 border-b px-3'>
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
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                )}
              >
                {item.label}
              </button>
            )
          })}
          <div className='ml-auto flex items-center gap-2 pr-2'>
            <span className='bg-success inline-block size-1.5 rounded-full' />
            <span className='text-muted-foreground font-mono text-[10px] tracking-wider uppercase'>
              routed
            </span>
          </div>
        </div>

        <div className='border-border flex items-center gap-2 border-b px-5 py-3'>
          <span className='bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider'>
            POST
          </span>
          <code className='text-foreground truncate font-mono text-[12.5px]'>
            {demo.endpoint}
          </code>
        </div>

        <div className='bg-border grid gap-px font-mono text-[12px] leading-relaxed md:grid-cols-2'>
          <CodePanel label='Request' code={demo.request} />
          <CodePanel label='Response' code={demo.response} />
        </div>

        <div className='border-border bg-muted/30 flex items-center justify-between border-t px-5 py-2.5'>
          <div className='text-muted-foreground flex items-center gap-3 text-[10px] tabular-nums'>
            <span>
              <span className='text-foreground font-mono'>{demo.latency}</span>{' '}
              ms
            </span>
            <span className='bg-muted-foreground/40 size-1 rounded-full' />
            <span>
              <span className='text-foreground font-mono'>{demo.tokens}</span>{' '}
              tokens
            </span>
            <span className='bg-muted-foreground/40 size-1 rounded-full' />
            <span>
              cost{' '}
              <span className='text-foreground font-mono'>{demo.cost}</span>
            </span>
          </div>
          <span className='text-muted-foreground font-mono text-[10px] tracking-wider uppercase'>
            stream via sse
          </span>
        </div>
      </div>
    </div>
  )
}

function CodePanel(props: { label: string; code: string }) {
  return (
    <div className='bg-card min-h-[320px] px-5 py-4'>
      <div className='text-muted-foreground mb-3 font-sans text-[10px] font-semibold uppercase'>
        {props.label}
      </div>
      <pre className='text-foreground overflow-x-auto break-words whitespace-pre-wrap'>
        {props.code}
      </pre>
    </div>
  )
}
