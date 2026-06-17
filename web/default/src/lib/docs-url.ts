const USER_GUIDE_DOCS_PATH = '/zh/docs/guide/feature-guide/user/auth'

export const DEFAULT_DOCS_URL = `https://doc.deeprouterai.com${USER_GUIDE_DOCS_PATH}`

export function resolveDocsUrl(docsLink?: string): string {
  const normalizedDocsLink =
    !docsLink || docsLink.includes('docs.newapi.pro')
      ? DEFAULT_DOCS_URL
      : docsLink

  if (typeof window === 'undefined') {
    return normalizedDocsLink
  }

  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'

  if (
    isLocalhost &&
    (normalizedDocsLink.includes('doc.deeprouterai.com') ||
      normalizedDocsLink.includes('docs.newapi.pro'))
  ) {
    return `${window.location.origin}${USER_GUIDE_DOCS_PATH}`
  }

  return normalizedDocsLink
}
