const REPO_OWNER = "abhigyanpatwari"
const REPO_NAME = "GitNexus"
const API_BASE = "https://api.github.com"

export interface GitHubStats {
  stars: number
  forks: number
  contributors: number
  openPRs: number
  mergedPRs: number
  openIssues: number
}

export interface GitHubPR {
  number: number
  title: string
  author: string
  status: "open" | "merged" | "closed"
  labels: string[]
  createdAt: string
  mergedAt: string | null
}

export interface GitHubContributor {
  login: string
  contributions: number
  avatarUrl: string
}

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  // Add your token here for higher rate limits:
  // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getRepoStats(): Promise<GitHubStats> {
  const defaults: GitHubStats = {
    stars: 19000,
    forks: 1100,
    contributors: 45,
    openPRs: 8,
    mergedPRs: 380,
    openIssues: 24,
  }

  const repo = await fetchJSON<{
    stargazers_count: number
    forks_count: number
    open_issues_count: number
  }>(`${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`)

  if (!repo) return defaults

  // Get contributor count (paginated, check last page)
  let contributorCount = defaults.contributors
  try {
    const contribRes = await fetch(
      `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=1&anon=true`,
      { headers, next: { revalidate: 300 } }
    )
    if (contribRes.ok) {
      const linkHeader = contribRes.headers.get("link")
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/)
        if (match) contributorCount = parseInt(match[1], 10)
      }
    }
  } catch {
    // keep default
  }

  // Get merged PR count via search API
  let mergedPRCount = defaults.mergedPRs
  try {
    const searchRes = await fetchJSON<{ total_count: number }>(
      `${API_BASE}/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+is:merged&per_page=1`
    )
    if (searchRes) mergedPRCount = searchRes.total_count
  } catch {
    // keep default
  }

  // Open PRs via search
  let openPRCount = defaults.openPRs
  try {
    const searchRes = await fetchJSON<{ total_count: number }>(
      `${API_BASE}/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+is:open&per_page=1`
    )
    if (searchRes) openPRCount = searchRes.total_count
  } catch {
    // keep default
  }

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    contributors: contributorCount,
    openPRs: openPRCount,
    mergedPRs: mergedPRCount,
    openIssues: repo.open_issues_count,
  }
}

export async function getRecentPRs(count = 8): Promise<GitHubPR[]> {
  const prs = await fetchJSON<
    Array<{
      number: number
      title: string
      user: { login: string }
      state: string
      merged_at: string | null
      created_at: string
      labels: Array<{ name: string }>
    }>
  >(
    `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&sort=updated&direction=desc&per_page=${count}`
  )

  if (!prs) return []

  return prs.map((pr) => ({
    number: pr.number,
    title: pr.title,
    author: pr.user.login,
    status: pr.merged_at ? "merged" : pr.state === "open" ? "open" : "closed",
    labels: pr.labels.map((l) => l.name),
    createdAt: pr.created_at,
    mergedAt: pr.merged_at,
  }))
}

export async function getTopContributors(count = 10): Promise<GitHubContributor[]> {
  const contributors = await fetchJSON<
    Array<{
      login: string
      contributions: number
      avatar_url: string
    }>
  >(
    `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=${count}`
  )

  if (!contributors) return []

  return contributors.map((c) => ({
    login: c.login,
    contributions: c.contributions,
    avatarUrl: c.avatar_url,
  }))
}

export interface StarDataPoint {
  date: string
  stars: number
}

export async function getStarHistory(totalStars: number): Promise<StarDataPoint[]> {
  // Sample ~15 pages spread across the stargazer timeline
  // Each page returns 30 stargazers with timestamps
  const perPage = 30
  const totalPages = Math.ceil(totalStars / perPage)
  const sampleCount = Math.min(15, totalPages)

  if (totalPages <= 1) return []

  const pageNumbers = Array.from({ length: sampleCount }, (_, i) =>
    Math.max(1, Math.round((i / (sampleCount - 1)) * totalPages))
  )
  // Deduplicate
  const uniquePages = [...new Set(pageNumbers)]

  const starHeaders: HeadersInit = {
    Accept: "application/vnd.github.v3.star+json",
    // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }

  const results = await Promise.all(
    uniquePages.map(async (page) => {
      try {
        const res = await fetch(
          `${API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/stargazers?per_page=${perPage}&page=${page}`,
          { headers: starHeaders, next: { revalidate: 3600 } } // Cache 1 hour
        )
        if (!res.ok) return null
        const data = (await res.json()) as Array<{ starred_at: string }>
        if (!data.length) return null
        // Use the first stargazer on this page as the data point
        return {
          date: data[0].starred_at,
          stars: (page - 1) * perPage + 1,
        }
      } catch {
        return null
      }
    })
  )

  const points = results.filter((r): r is StarDataPoint => r !== null)

  // Always add current state as last point
  if (points.length > 0) {
    points.push({
      date: new Date().toISOString(),
      stars: totalStars,
    })
  }

  return points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function formatNumber(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`
  }
  return n.toString()
}

export function timeAgo(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}
