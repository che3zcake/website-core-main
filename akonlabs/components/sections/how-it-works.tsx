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
  ChevronDown,
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
    <section className="py-12 md:py-16 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto max-w-7xl px-4">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            6-Step Pipeline
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From source code to queryable knowledge graph in 6 steps.
          </p>
        </AnimatedSection>

        {/* Pipeline steps with connectors */}
        <div className="mb-10">
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={Math.min(index * 50, 250)}
                direction="up"
              >
                <div className="card-hover group relative h-full overflow-hidden rounded-xl border border-white/[0.06] bg-card/40 p-4 transition-all duration-200 hover:border-white/[0.12] hover:bg-card/60">
                  <div className="relative z-10 text-center">
                    <div className="mb-3 mx-auto flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-transform duration-200 group-hover:scale-105">
                      {step.number}
                    </div>
                    <step.icon className="size-4 text-primary mx-auto mb-2" />
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

        {/* Chevron down */}
        <AnimatedSection delay={300} direction="up">
          <div className="flex justify-center mb-10">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <ChevronDown className="size-4 text-primary/50" />
            </div>
          </div>
        </AnimatedSection>

        {/* Outputs */}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
          {outputs.map((output, index) => (
            <AnimatedSection
              key={output.title}
              delay={Math.min(350 + index * 50, 500)}
              direction="up"
            >
              <div className="card-hover group relative h-full overflow-hidden rounded-xl border border-primary/15 bg-primary/[0.04] p-4 transition-all duration-200 hover:border-primary/30">
                <div className="relative z-10 flex items-center gap-3">
                  <output.icon className="size-5 text-primary shrink-0 transition-transform duration-200 group-hover:scale-105" />
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
