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
import { Link, createFileRoute } from '@tanstack/react-router'
import { DEFAULT_USER_GUIDE_ITEM, USER_GUIDE_ITEMS } from '@/docs/user-guide'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Route = createFileRoute('/zh/docs/guide/feature-guide/user/$slug')(
  {
    component: UserGuidePage,
  }
)

function UserGuidePage() {
  const { slug } = Route.useParams()
  const currentItem =
    USER_GUIDE_ITEMS.find((item) => item.slug === slug) ??
    DEFAULT_USER_GUIDE_ITEM

  return (
    <main className='bg-background text-foreground min-h-screen'>
      <div className='mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-10'>
        <aside className='border-border bg-card/70 h-fit rounded-3xl border p-4 shadow-sm lg:sticky lg:top-8'>
          <div className='px-3 py-2'>
            <p className='text-muted-foreground text-sm'>功能指南</p>
            <h1 className='mt-1 text-xl font-semibold'>用户指南</h1>
          </div>
          <nav className='mt-4 space-y-1.5'>
            {USER_GUIDE_ITEMS.map((item) => {
              const active = item.slug === currentItem.slug
              return (
                <Link
                  key={item.slug}
                  to='/zh/docs/guide/feature-guide/user/$slug'
                  params={{ slug: item.slug }}
                  className={[
                    'block min-h-10 rounded-2xl px-3 py-2.5 text-sm leading-5 transition-colors',
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
          <div className='border-border bg-card/70 rounded-3xl border p-8 shadow-sm md:p-10'>
            <p className='text-primary text-sm font-medium'>用户指南</p>
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
