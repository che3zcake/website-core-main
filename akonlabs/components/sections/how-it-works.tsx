"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Badge } from "@/components/ui/badge"
import {
  FolderTree,
  Code2,
  GitBranch,
  Network,
  Route,
  Search,
  Database,
  Server,
  Terminal,
  Globe,
  ArrowDown,
} from "lucide-react"

const steps = [
  { number: "1", title: "Structure", description: "File Tree Walk", icon: FolderTree },
  { number: "2", title: "Parsing", description: "Tree-sitter ASTs", icon: Code2 },
  { number: "3", title: "Resolution", description: "Imports & Call Chains", icon: GitBranch },
  { number: "4", title: "Clustering", description: "Functional Communities", icon: Network },
  { number: "5", title: "Processes", description: "Execution Flow Tracing", icon: Route },
  { number: "6", title: "Search", description: "BM25 + Semantic", icon: Search },
]

const outputs = [
  { title: "KuzuDB", description: "Local knowledge graph", icon: Database },
  { title: "MCP Server", description: "AI agents query it", icon: Server },
  { title: "CLI", description: "Developers query it", icon: Terminal },
  { title: "Web UI", description: "Browser-based viewer", icon: Globe },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="px-6 sm:px-12 md:px-16">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-3 py-1.5 border-white/10 bg-white/[0.06] text-white/70">
            6-Step Pipeline
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From source code to queryable knowledge graph in 6 steps.
          </p>
        </AnimatedSection>

        <div className="mb-10">
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={Math.min(index * 50, 250)}
                direction="up"
              >
                <div className="glass-card card-hover group h-full p-4 sm:p-5">
                  <div className="relative z-10 text-center">
                    <div className="mb-3 mx-auto flex size-10 items-center justify-center rounded-full bg-white/[0.06] font-bold text-sm text-white/80 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20 group-hover:bg-white/[0.1]">
                      {step.number}
                    </div>
                    <step.icon className="size-4 text-white/40 mx-auto mb-2 group-hover:text-white/60 transition-colors" />
                    <h3 className="font-semibold text-sm mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={300} direction="up">
          <div className="flex justify-center mb-10">
            <div className="flex size-9 items-center justify-center rounded-full glass-card">
              <ArrowDown className="size-4 text-white/30" />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {outputs.map((output, index) => (
            <AnimatedSection
              key={output.title}
              delay={Math.min(350 + index * 50, 500)}
              direction="up"
            >
              <div className="gradient-border-card card-hover group h-full p-5">
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/[0.06] shrink-0 transition-all duration-300 group-hover:bg-white/[0.1]">
                    <output.icon className="size-4.5 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{output.title}</h3>
                    <p className="text-xs text-muted-foreground">{output.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
