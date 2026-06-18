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
import EnApiGuideMarkdown from './user-guide/en/api.mdx'
import EnAuthGuideMarkdown from './user-guide/en/auth.mdx'
import EnChatAppsGuideMarkdown from './user-guide/en/chat-apps.mdx'
import EnLogGuideMarkdown from './user-guide/en/log.mdx'
import EnPersonalSettingGuideMarkdown from './user-guide/en/personal-setting.mdx'
import EnPricingGuideMarkdown from './user-guide/en/pricing.mdx'
import EnSubscriptionGuideMarkdown from './user-guide/en/subscription.mdx'
import EnTaskGuideMarkdown from './user-guide/en/task.mdx'
import EnTokenGuideMarkdown from './user-guide/en/token.mdx'
import EnTopupGuideMarkdown from './user-guide/en/topup.mdx'
import JaApiGuideMarkdown from './user-guide/ja/api.mdx'
import JaAuthGuideMarkdown from './user-guide/ja/auth.mdx'
import JaChatAppsGuideMarkdown from './user-guide/ja/chat-apps.mdx'
import JaLogGuideMarkdown from './user-guide/ja/log.mdx'
import JaPersonalSettingGuideMarkdown from './user-guide/ja/personal-setting.mdx'
import JaPricingGuideMarkdown from './user-guide/ja/pricing.mdx'
import JaSubscriptionGuideMarkdown from './user-guide/ja/subscription.mdx'
import JaTaskGuideMarkdown from './user-guide/ja/task.mdx'
import JaTokenGuideMarkdown from './user-guide/ja/token.mdx'
import JaTopupGuideMarkdown from './user-guide/ja/topup.mdx'
import ZhApiGuideMarkdown from './user-guide/zh/api.mdx'
import ZhAuthGuideMarkdown from './user-guide/zh/auth.mdx'
import ZhChatAppsGuideMarkdown from './user-guide/zh/chat-apps.mdx'
import ZhLogGuideMarkdown from './user-guide/zh/log.mdx'
import ZhPersonalSettingGuideMarkdown from './user-guide/zh/personal-setting.mdx'
import ZhPricingGuideMarkdown from './user-guide/zh/pricing.mdx'
import ZhSubscriptionGuideMarkdown from './user-guide/zh/subscription.mdx'
import ZhTaskGuideMarkdown from './user-guide/zh/task.mdx'
import ZhTokenGuideMarkdown from './user-guide/zh/token.mdx'
import ZhTopupGuideMarkdown from './user-guide/zh/topup.mdx'

export const USER_GUIDE_LOCALES = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
] as const

export type UserGuideLocale = (typeof USER_GUIDE_LOCALES)[number]['code']

export type UserGuideItem = {
  slug: string
  title: string
  summary: string
  markdown: string
}

export type UserGuideCopy = {
  section: string
  title: string
  language: string
}

const docsAssetBaseUrl =
  'https://raw.githubusercontent.com/QuantumNous/new-api-docs-v1/main/public/assets/'

const guideMarkdownByLocale: Record<UserGuideLocale, Record<string, string>> = {
  zh: {
    auth: ZhAuthGuideMarkdown,
    'personal-setting': ZhPersonalSettingGuideMarkdown,
    token: ZhTokenGuideMarkdown,
    api: ZhApiGuideMarkdown,
    'chat-apps': ZhChatAppsGuideMarkdown,
    pricing: ZhPricingGuideMarkdown,
    log: ZhLogGuideMarkdown,
    topup: ZhTopupGuideMarkdown,
    subscription: ZhSubscriptionGuideMarkdown,
    task: ZhTaskGuideMarkdown,
  },
  en: {
    auth: EnAuthGuideMarkdown,
    'personal-setting': EnPersonalSettingGuideMarkdown,
    token: EnTokenGuideMarkdown,
    api: EnApiGuideMarkdown,
    'chat-apps': EnChatAppsGuideMarkdown,
    pricing: EnPricingGuideMarkdown,
    log: EnLogGuideMarkdown,
    topup: EnTopupGuideMarkdown,
    subscription: EnSubscriptionGuideMarkdown,
    task: EnTaskGuideMarkdown,
  },
  ja: {
    auth: JaAuthGuideMarkdown,
    'personal-setting': JaPersonalSettingGuideMarkdown,
    token: JaTokenGuideMarkdown,
    api: JaApiGuideMarkdown,
    'chat-apps': JaChatAppsGuideMarkdown,
    pricing: JaPricingGuideMarkdown,
    log: JaLogGuideMarkdown,
    topup: JaTopupGuideMarkdown,
    subscription: JaSubscriptionGuideMarkdown,
    task: JaTaskGuideMarkdown,
  },
}

export const USER_GUIDE_COPY: Record<UserGuideLocale, UserGuideCopy> = {
  zh: {
    section: '功能指南',
    title: '用户指南',
    language: '切换语言',
  },
  en: {
    section: 'Feature Guide',
    title: 'User Guide',
    language: 'Language',
  },
  ja: {
    section: '機能ガイド',
    title: 'ユーザーガイド',
    language: '言語',
  },
}

function parseFrontmatter(markdown: string) {
  const cleanMarkdown = markdown.replace(/^\uFEFF/, '')
  const match = cleanMarkdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const frontmatter = match?.[1] ?? ''
  const body = match ? cleanMarkdown.slice(match[0].length) : cleanMarkdown
  const fields = Object.fromEntries(
    frontmatter
      .split(/\r?\n/)
      .map((line) => {
        const separatorIndex = line.indexOf(':')
        if (separatorIndex === -1) return undefined
        const key = line.slice(0, separatorIndex).trim()
        const value = line.slice(separatorIndex + 1).trim()
        return [key, value]
      })
      .filter(Boolean) as [string, string][]
  )

  return {
    title: fields.title ?? '',
    description: fields.description ?? '',
    body,
  }
}

function normalizeOfficialMarkdown(markdown: string) {
  const parsed = parseFrontmatter(markdown)
  const body = parsed.body
    .replace(/^import\s+.*$/gm, '')
    .replace(/<Callout[^>]*>/g, '> ')
    .replace(/<\/Callout>/g, '')
    .replace(/\]\(\/assets\//g, `](${docsAssetBaseUrl}`)
    .trim()

  return {
    title: parsed.title,
    summary: parsed.description,
    markdown: body,
  }
}

export function normalizeUserGuideLocale(locale?: string): UserGuideLocale {
  return USER_GUIDE_LOCALES.some((item) => item.code === locale)
    ? (locale as UserGuideLocale)
    : 'zh'
}

export function getUserGuideItems(locale?: string): UserGuideItem[] {
  const normalizedLocale = normalizeUserGuideLocale(locale)

  return Object.entries(guideMarkdownByLocale[normalizedLocale]).map(
    ([slug, markdown]) => ({
      slug,
      ...normalizeOfficialMarkdown(markdown),
    })
  )
}

export function getDefaultUserGuideItem(locale?: string): UserGuideItem {
  return getUserGuideItems(locale)[0]
}
