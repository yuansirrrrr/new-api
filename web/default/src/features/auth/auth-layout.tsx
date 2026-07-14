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
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='bg-background text-foreground relative grid h-svh max-w-none'>
      <Link
        to='/'
        className='absolute top-5 left-5 z-10 flex items-center gap-2 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative size-8 overflow-hidden rounded-md'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-md' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='size-8 rounded-md object-cover'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <h1 className='text-base font-semibold tracking-tight'>{systemName}</h1>
        )}
      </Link>
      <div className='container flex items-center pt-16 sm:pt-0'>
        <div className='mx-auto flex w-full max-w-[440px] flex-col justify-center gap-2 px-4 py-8 sm:p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
