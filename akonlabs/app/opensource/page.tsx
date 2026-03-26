import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Button } from "@/components/ui/button"
import {
  Star,
  GitPullRequest,
  Users,
  GitFork,
  ExternalLink,
  GitMerge,
  GitCommitHorizontal,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight,
  Rocket,
  Sparkles,
  Zap,
  Globe,
  CircleDot,
} from "lucide-react"
import {
  getRepoStats,
  getRecentPRs,
  getTopContributors,
  getStarHistory,
  formatNumber,
  timeAgo,
} from "@/lib/github"
import { StarChart } from "@/components/ui/star-chart"
import Image from "next/image"

const roadmap = [
  {
    status: "shipped" as const,
    title: "13 Language Support",
    description: "TypeScript, Python, Java, Go, Rust, C#, and 7 more with full parsing",
    icon: CheckCircle,
  },
  {
    status: "shipped" as const,
    title: "Web UI Graph Explorer",
    description: "Browser-based, client-side knowledge graph viewer and AI chat",
    icon: CheckCircle,
  },
  {
    status: "shipped" as const,
    title: "Multi-Repo Indexing",
    description: "Index and serve multiple codebases from a single MCP server",
    icon: CheckCircle,
  },
  {
    status: "in-progress" as const,
    title: "Incremental Re-indexing",
    description: "Only re-analyze changed files instead of full re-index on every commit",
    icon: Zap,
  },
  {
    status: "in-progress" as const,
    title: "VS Code Extension",
    description: "Native integration with inline graph context and impact warnings",
    icon: Sparkles,
  },
  {
    status: "planned" as const,
    title: "Cloud-Hosted Graphs",
    description: "Optional hosted graph storage for teams who want shared codebase intelligence",
    icon: Globe,
  },
  {
    status: "planned" as const,
    title: "CI/CD Integration",
    description: "Auto-run impact analysis on every PR and block risky merges",
    icon: Rocket,
  },
]

const statusColors = {
  shipped: "text-primary",
  "in-progress": "text-yellow-500",
  planned: "text-muted-foreground",
}

const statusLabels = {
  shipped: "Shipped",
  "in-progress": "In Progress",
  planned: "Planned",
}

const prStatusIcon = {
  merged: GitMerge,
  open: CircleDot,
  closed: Circle,
}

const prStatusColor = {
  merged: "text-primary/70",
  open: "text-green-500/70",
  closed: "text-muted-foreground/50",
}

export default async function OpenSourcePage() {
  const [stats, recentPRs, contributors] = await Promise.all([
    getRepoStats(),
    getRecentPRs(8),
    getTopContributors(8),
  ])

  const starHistory = await getStarHistory(stats.stars)

  const statCards = [
    { icon: Star, value: formatNumber(stats.stars), label: "GitHub Stars" },
    { icon: Users, value: formatNumber(stats.contributors), label: "Contributors" },
    { icon: GitPullRequest, value: formatNumber(stats.mergedPRs), label: "PRs Merged" },
    { icon: GitFork, value: formatNumber(stats.forks), label: "Forks" },
  ]

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-8 sm:mb-10">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <GitFork className="size-3" />
            Open Source
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
            Built in the open
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            GitNexus is open source. Every commit, every PR, every decision — transparent
            and community-driven.
          </p>
          <Button size="sm" variant="outline" className="gap-2" asChild>
            <a
              href="https://github.com/abhigyanpatwari/GitNexus"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </AnimatedSection>

        {/* Live stats */}
        <AnimatedSection delay={100} className="mb-8 sm:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.06] bg-card/30 p-3 sm:p-4 text-center transition-all duration-200 hover:bg-card/50"
              >
                <stat.icon className="size-4 sm:size-5 text-primary mx-auto mb-1.5 sm:mb-2" />
                <p className="text-xl sm:text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs sm:text-sm font-medium mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Live from GitHub</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Star History Chart */}
        {starHistory.length >= 2 && (
          <AnimatedSection delay={120} className="mb-12">
            <div className="rounded-xl border border-white/[0.06] bg-card/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Star className="size-4 text-primary" />
                  <h2 className="text-sm font-semibold">Star History</h2>
                </div>
                <span className="text-[10px] text-muted-foreground/60">
                  Updated hourly
                </span>
              </div>
              <div className="p-4 md:p-6">
                <StarChart data={starHistory} />
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Two-column: Recent PRs + Contributors */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Recent PRs */}
          <AnimatedSection delay={150} className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.06] bg-card/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="size-4 text-primary" />
                  <h2 className="text-sm font-semibold">Recent Pull Requests</h2>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>

              {recentPRs.length > 0 ? (
                <div className="divide-y divide-white/[0.04]">
                  {recentPRs.map((pr) => {
                    const StatusIcon = prStatusIcon[pr.status]
                    return (
                      <a
                        key={pr.number}
                        href={`https://github.com/abhigyanpatwari/GitNexus/pull/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-3 sm:py-3.5 transition-colors duration-150 hover:bg-white/[0.02] group"
                      >
                        <StatusIcon
                          className={`size-4 shrink-0 mt-0.5 ${prStatusColor[pr.status]}`}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs sm:text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                              {pr.title}
                            </p>
                            <span className="text-xs text-muted-foreground shrink-0 mt-0.5 tabular-nums">
                              #{pr.number}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-xs text-muted-foreground">{pr.author}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                              <Clock className="size-3" />
                              {timeAgo(pr.mergedAt || pr.createdAt)}
                            </div>
                            {pr.labels.length > 0 && (
                              <div className="flex gap-1.5 flex-wrap">
                                {pr.labels.slice(0, 3).map((label) => (
                                  <span
                                    key={label}
                                    className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary/80"
                                  >
                                    {label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Unable to load PRs — check back soon.
                </div>
              )}

              <div className="px-5 py-3 border-t border-white/[0.06]">
                <a
                  href="https://github.com/abhigyanpatwari/GitNexus/pulls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline underline-offset-2"
                >
                  View all pull requests
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Top Contributors */}
          <AnimatedSection delay={200}>
            <div className="rounded-xl border border-white/[0.06] bg-card/20 overflow-hidden h-full">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
                <Users className="size-4 text-primary" />
                <h2 className="text-sm font-semibold">Top Contributors</h2>
              </div>

              {contributors.length > 0 ? (
                <div className="divide-y divide-white/[0.04]">
                  {contributors.map((contributor) => (
                    <a
                      key={contributor.login}
                      href={`https://github.com/${contributor.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 transition-colors duration-150 hover:bg-white/[0.02] group"
                    >
                      <Image
                        src={contributor.avatarUrl}
                        alt={contributor.login}
                        width={32}
                        height={32}
                        className="size-8 rounded-full shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {contributor.login}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contributor.contributions} contributions
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <GitCommitHorizontal className="size-3" />
                          {contributor.contributions}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Unable to load contributors.
                </div>
              )}

              <div className="px-5 py-3 border-t border-white/[0.06]">
                <a
                  href="https://github.com/abhigyanpatwari/GitNexus/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline underline-offset-2"
                >
                  View all contributors
                  <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Roadmap */}
        <AnimatedSection delay={250}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-2">
                <Rocket className="size-4 text-primary" />
                <h2 className="text-base sm:text-lg font-semibold">Roadmap</h2>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="size-3 text-primary" />
                  Shipped
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="size-3 text-yellow-500" />
                  In Progress
                </div>
                <div className="flex items-center gap-1.5">
                  <Circle className="size-3 text-muted-foreground" />
                  Planned
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {roadmap.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 sm:gap-4 rounded-xl border border-white/[0.06] bg-card/20 p-3 sm:p-4 transition-all duration-200 hover:bg-card/40"
                >
                  <div className="flex flex-col items-center shrink-0 pt-0.5">
                    <item.icon className={`size-4 ${statusColors[item.status]}`} />
                    {index < roadmap.length - 1 && (
                      <div className="w-px h-full min-h-[20px] bg-white/[0.06] mt-1.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <Badge
                        variant={item.status === "shipped" ? "default" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {statusLabels[item.status]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contribute CTA */}
        <AnimatedSection delay={300} className="mt-8 sm:mt-12">
          <div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4 sm:p-6 max-w-2xl mx-auto text-center">
            <h3 className="text-base font-semibold mb-2">Want to contribute?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We welcome PRs of all sizes. Check out our good first issues or jump into
              the Discord.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <Button size="sm" className="gap-2" asChild>
                <a
                  href="https://github.com/abhigyanpatwari/GitNexus/issues?q=is%3Aopen+label%3A%22good+first+issue%22"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Good First Issues
                  <ArrowRight className="size-3.5" />
                </a>
              </Button>
              <Button size="sm" variant="outline" className="gap-2" asChild>
                <a
                  href="https://discord.gg/S388T3da"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
