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
  { name: "query", icon: Search, description: "Search your entire codebase with full architectural context" },
  { name: "context", icon: Eye, description: "Get a 360-degree view of any symbol. Who calls it, what it calls, which flows it belongs to" },
  { name: "impact", icon: Target, description: "See the full blast radius before changing anything. Every affected function, file, and process" },
  { name: "detect_changes", icon: GitCompare, description: "Understand how your recent git changes ripple through the codebase" },
  { name: "rename", icon: PenLine, description: "Safely rename symbols across multiple files with full dependency awareness" },
  { name: "list_repos", icon: List, description: "Discover all indexed repositories available to your AI agent" },
  { name: "cypher", icon: Database, description: "Run raw graph queries for advanced exploration and custom analysis" },
]

export function McpTools() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            7 MCP Tools
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4">
            What AI Agents Get
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Powerful tools that give your AI assistant deep codebase understanding.
          </p>
        </AnimatedSection>

        {/* Terminal-styled container */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto rounded-xl border border-white/[0.08] bg-[oklch(0.08_0.008_166)] overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-500/70" />
                <div className="size-2.5 rounded-full bg-yellow-500/70" />
                <div className="size-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">MCP Tools</span>
            </div>

            {/* Tool rows */}
            <div className="divide-y divide-white/[0.04]">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 transition-colors duration-150 hover:bg-white/[0.03]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <tool.icon className="size-4 text-primary/70" />
                    <span className="font-mono text-sm text-primary font-medium">
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6 sm:pl-0">
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
