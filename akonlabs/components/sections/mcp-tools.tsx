"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Eye,
  Target,
  GitCompare,
  PenLine,
  Database,
  List,
} from "lucide-react"

const tools = [
  { name: "query", icon: Search, description: "Search across all indexed repos with full architectural context — BM25 + semantic hybrid search" },
  { name: "context", icon: Eye, description: "360-degree view of any symbol across repos. Callers, callees, execution flows, cluster membership" },
  { name: "impact", icon: Target, description: "Cross-repo blast radius, risk-scored by depth. Know what breaks before you merge" },
  { name: "detect_changes", icon: GitCompare, description: "Map git diffs to affected execution flows. Auto-analyzed on every PR via Hub webhooks" },
  { name: "rename", icon: PenLine, description: "Graph-aware rename across repos with full dependency tracking" },
  { name: "list_repos", icon: List, description: "Discover all indexed repositories and cross-repo groups available on your Hub" },
  { name: "cypher", icon: Database, description: "Raw Cypher queries against the knowledge graph for advanced exploration" },
]

export function McpTools() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-3 py-1.5 border-white/10 bg-white/[0.06] text-white/70">
            7 MCP Tools
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
            What AI Agents Get
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Powerful tools that give your AI assistant deep codebase understanding.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="gradient-border-card overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-white/10" />
                <div className="size-2.5 rounded-full bg-white/8" />
                <div className="size-2.5 rounded-full bg-white/6" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">mcp-server</span>
            </div>

            {/* Tool rows */}
            <div className="divide-y divide-white/[0.04]">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 px-5 sm:px-6 py-4 transition-all duration-200 hover:bg-white/[0.02]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.04] group-hover:bg-white/[0.07] transition-colors">
                      <tool.icon className="size-3.5 text-white/40 group-hover:text-white/60 transition-colors" />
                    </div>
                    <span className="font-mono text-sm text-foreground/80 font-medium">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-11 sm:pl-0">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
