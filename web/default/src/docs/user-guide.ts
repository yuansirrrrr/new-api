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
import ApiGuideMarkdown from './user-guide/api.md'
import AuthGuideMarkdown from './user-guide/auth.md'
import ChatAppGuideMarkdown from './user-guide/chat-app.md'
import PersonalSettingGuideMarkdown from './user-guide/personal-setting.md'
import PricingGuideMarkdown from './user-guide/pricing.md'
import QuotaGuideMarkdown from './user-guide/quota.md'
import SubscriptionGuideMarkdown from './user-guide/subscription.md'
import TaskGuideMarkdown from './user-guide/task.md'
import TokenGuideMarkdown from './user-guide/token.md'
import UsageGuideMarkdown from './user-guide/usage.md'

export type UserGuideItem = {
  slug: string
  title: string
  summary: string
  markdown: string
}

export const USER_GUIDE_ITEMS: UserGuideItem[] = [
  {
    slug: 'auth',
    title: '注册与登录',
    summary: '支持账号密码注册,以及多种第三方 OAuth 一键登录',
    markdown: AuthGuideMarkdown,
  },
  {
    slug: 'personal-setting',
    title: '个人设置',
    summary: '管理账号基本信息、安全设置和第三方账号绑定',
    markdown: PersonalSettingGuideMarkdown,
  },
  {
    slug: 'token',
    title: '令牌管理',
    summary: '令牌是调用 API 的凭证，每个令牌可独立配置权限范围和配额上限',
    markdown: TokenGuideMarkdown,
  },
  {
    slug: 'api',
    title: '使用 API',
    summary:
      '将平台地址替换 OpenAI 的 base_url，使用平台颁发的令牌作为 api_key，即可开始调用',
    markdown: ApiGuideMarkdown,
  },
  {
    slug: 'chat-app',
    title: '聊天应用集成',
    summary: '快速将 New API 配置导入到各类 AI 聊天应用中',
    markdown: ChatAppGuideMarkdown,
  },
  {
    slug: 'pricing',
    title: '定价',
    summary: '查看全站模型定价及计费说明',
    markdown: PricingGuideMarkdown,
  },
  {
    slug: 'usage',
    title: '使用记录',
    summary: '查看每次 API 调用的详细信息，支持按时间、模型、令牌等条件过滤',
    markdown: UsageGuideMarkdown,
  },
  {
    slug: 'quota',
    title: '配额与充值',
    summary: '配额是平台内部计费单位，支持多种方式充值',
    markdown: QuotaGuideMarkdown,
  },
  {
    slug: 'subscription',
    title: '订阅计划',
    summary: '按周期购买的套餐,适合有稳定用量需求的用户',
    markdown: SubscriptionGuideMarkdown,
  },
  {
    slug: 'task',
    title: '任务管理',
    summary: '管理 Midjourney 绘图、Suno 音乐生成等异步任务',
    markdown: TaskGuideMarkdown,
  },
]

export const DEFAULT_USER_GUIDE_ITEM = USER_GUIDE_ITEMS[0]
