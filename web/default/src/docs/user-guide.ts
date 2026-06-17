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
import ApiGuideMarkdown from './user-guide/api.mdx'
import AuthGuideMarkdown from './user-guide/auth.mdx'
import ChatAppsGuideMarkdown from './user-guide/chat-apps.mdx'
import LogGuideMarkdown from './user-guide/log.mdx'
import PersonalSettingGuideMarkdown from './user-guide/personal-setting.mdx'
import PricingGuideMarkdown from './user-guide/pricing.mdx'
import SubscriptionGuideMarkdown from './user-guide/subscription.mdx'
import TaskGuideMarkdown from './user-guide/task.mdx'
import TokenGuideMarkdown from './user-guide/token.mdx'
import TopupGuideMarkdown from './user-guide/topup.mdx'

export type UserGuideItem = {
  slug: string
  title: string
  summary: string
  markdown: string
}

const docsAssetBaseUrl =
  'https://raw.githubusercontent.com/QuantumNous/new-api-docs-v1/main/public/assets/'

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
      .filter(Boolean) as [string, string][],
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

function createUserGuideItem(
  slug: string,
  markdown: string,
  fallback: Pick<UserGuideItem, 'title' | 'summary'>,
): UserGuideItem {
  const normalized = normalizeOfficialMarkdown(markdown)
  return {
    slug,
    title: normalized.title || fallback.title,
    summary: normalized.summary || fallback.summary,
    markdown: normalized.markdown,
  }
}

export const USER_GUIDE_ITEMS: UserGuideItem[] = [
  createUserGuideItem('auth', AuthGuideMarkdown, {
    title: '注册与登录',
    summary: '支持账号密码注册,以及多种第三方 OAuth 一键登录',
  }),
  createUserGuideItem('personal-setting', PersonalSettingGuideMarkdown, {
    title: '个人设置',
    summary: '管理账号基本信息、安全设置和第三方账号绑定',
  }),
  createUserGuideItem('token', TokenGuideMarkdown, {
    title: '令牌管理',
    summary: '令牌是调用 API 的凭证，每个令牌可独立配置权限范围和配额上限',
  }),
  createUserGuideItem('api', ApiGuideMarkdown, {
    title: '使用 API',
    summary:
      '将平台地址替换 OpenAI 的 base_url，使用平台颁发的令牌作为 api_key，即可开始调用',
  }),
  createUserGuideItem('chat-apps', ChatAppsGuideMarkdown, {
    title: '聊天应用集成',
    summary: '快速将 New API 配置导入到各类 AI 聊天应用中',
  }),
  createUserGuideItem('pricing', PricingGuideMarkdown, {
    title: '定价',
    summary: '查看全站模型定价及计费说明',
  }),
  createUserGuideItem('log', LogGuideMarkdown, {
    title: '使用记录',
    summary: '查看每次 API 调用的详细信息，支持按时间、模型、令牌等条件过滤',
  }),
  createUserGuideItem('topup', TopupGuideMarkdown, {
    title: '配额与充值',
    summary: '配额是平台内部计费单位，支持多种方式充值',
  }),
  createUserGuideItem('subscription', SubscriptionGuideMarkdown, {
    title: '订阅计划',
    summary: '按周期购买的套餐,适合有稳定用量需求的用户',
  }),
  createUserGuideItem('task', TaskGuideMarkdown, {
    title: '任务管理',
    summary: '管理 Midjourney 绘图、Suno 音乐生成等异步任务',
  }),
]

export const DEFAULT_USER_GUIDE_ITEM = USER_GUIDE_ITEMS[0]
