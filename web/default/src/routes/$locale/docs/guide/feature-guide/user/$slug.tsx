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
  USER_GUIDE_COPY,
  USER_GUIDE_LOCALES,
  getDefaultUserGuideItem,
  getUserGuideItems,
  normalizeUserGuideLocale,
} from '@/docs/user-guide'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Check, Languages } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Route = createFileRoute(
  '/$locale/docs/guide/feature-guide/user/$slug',
)({
  component: UserGuidePage,
})

function UserGuidePage() {
  const { locale: localeParam, slug } = Route.useParams()
  const locale = normalizeUserGuideLocale(localeParam)
  const copy = USER_GUIDE_COPY[locale]
  const guideItems = getUserGuideItems(locale)
  const currentItem =
    guideItems.find((item) => item.slug === slug) ??
    getDefaultUserGuideItem(locale)

  return (
    <main className='bg-background text-foreground min-h-screen'>
      <div className='border-border bg-card/80 sticky top-0 z-20 border-b backdrop-blur-xl'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10'>
          <Link
            to='/$locale/docs/guide/feature-guide/user/$slug'
            params={{ locale, slug: 'auth' }}
            className='flex items-center gap-3 font-semibold'
          >
            <span className='bg-primary text-primary-foreground grid size-9 place-items-center rounded-xl text-sm'>
              D
            </span>
            <span>Deeprouter Docs</span>
          </Link>
          <LanguageMenu
            locale={locale}
            slug={currentItem.slug}
            label={copy.language}
          />
        </div>
      </div>

      <div className='mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10'>
        <aside className='border-border bg-card/70 h-fit rounded-3xl border p-4 shadow-sm lg:sticky lg:top-24'>
          <div className='px-3 py-2'>
            <p className='text-muted-foreground text-sm'>{copy.section}</p>
            <h1 className='mt-1 text-xl font-semibold'>{copy.title}</h1>
          </div>
          <nav className='mt-4 space-y-1'>
            {guideItems.map((item) => {
              const active = item.slug === currentItem.slug
              return (
                <Link
                  key={item.slug}
                  to='/$locale/docs/guide/feature-guide/user/$slug'
                  params={{ locale, slug: item.slug }}
                  className={[
                    'block rounded-xl px-3 py-2.5 text-sm leading-5 transition-colors',
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  ].join(' ')}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </aside>

        <article className='min-w-0'>
          <div className='border-border bg-card/70 rounded-3xl border p-6 shadow-sm sm:p-8 md:p-10'>
            <p className='text-primary text-sm font-medium'>{copy.title}</p>
            <h2 className='mt-4 text-3xl font-bold tracking-tight md:text-4xl'>
              {currentItem.title}
            </h2>
            <p className='text-muted-foreground mt-4 max-w-3xl text-base leading-7'>
              {currentItem.summary}
            </p>

            <div className='mt-10'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className='mt-10 border-t pt-8 text-2xl font-semibold tracking-tight first:mt-0 first:border-t-0 first:pt-0'>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='mt-6 text-lg font-semibold'>{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className='text-muted-foreground mt-3 leading-7'>
                      {children}
                    </p>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className='text-primary underline underline-offset-4'
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className='text-muted-foreground mt-3 list-disc space-y-2 pl-6 leading-7'>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='text-muted-foreground mt-3 list-decimal space-y-2 pl-6 leading-7'>
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className='border-primary/40 bg-muted/60 text-muted-foreground mt-4 rounded-2xl border-l-4 px-4 py-3 leading-7'>
                      {children}
                    </blockquote>
                  ),
                  img: ({ alt, src }) => (
                    <img
                      alt={alt ?? ''}
                      src={src ?? ''}
                      className='mt-4 rounded-2xl border'
                      loading='lazy'
                    />
                  ),
                  table: ({ children }) => (
                    <div className='mt-4 overflow-x-auto rounded-2xl border'>
                      <table className='w-full text-sm'>{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className='bg-muted px-4 py-3 text-left font-medium'>
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className='text-muted-foreground border-t px-4 py-3'>
                      {children}
                    </td>
                  ),
                  code: ({ children }) => (
                    <code className='bg-muted rounded px-1.5 py-0.5 font-mono text-sm'>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className='bg-muted mt-4 overflow-x-auto rounded-2xl p-4 text-sm'>
                      {children}
                    </pre>
                  ),
                }}
              >
                {currentItem.markdown}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

function LanguageMenu({
  locale,
  slug,
  label,
}: {
  locale: string
  slug: string
  label: string
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button variant='outline' size='sm' className='rounded-full px-3' />
        }
      >
        <Languages className='size-4' />
        <span className='hidden sm:inline'>{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {USER_GUIDE_LOCALES.map((item) => (
          <DropdownMenuItem
            key={item.code}
            render={
              <Link
                to='/$locale/docs/guide/feature-guide/user/$slug'
                params={{ locale: item.code, slug }}
                className='flex w-full items-center'
              />
            }
          >
            {item.label}
            {locale === item.code && <Check className='ms-auto size-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
