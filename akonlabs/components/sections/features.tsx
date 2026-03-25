"use client"

import {
  Network,
  Target,
  Search,
  FolderGit2,
  FileText,
  GitCompare,
  Shield,
  Globe,
} from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Maps every function, class, import, and call chain. AI agents understand the full codebase, not just open files.",
    className: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Target,
    title: "Impact Analysis",
    description:
      "Shows blast radius of any change before it's made. Fewer regressions, safer refactors.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Search,
    title: "Hybrid Search",
    description: "BM25 + semantic search combined. Faster, more accurate code discovery.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: FolderGit2,
    title: "Multi-Repo Support",
    description:
      "Index and serve multiple codebases at once. Works for large engineering orgs with many repos.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Shield,
    title: "100% Local / Private",
    description: "No code sent to any server. Enterprise-safe, no data leakage.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: FileText,
    title: "Wiki Generation",
    description:
      "LLM-powered docs auto-generated from the graph. Always up-to-date architecture documentation.",
    className: "md:col-span-2",
    featured: false,
  },
  {
    icon: GitCompare,
    title: "Git-Diff Impact",
    description: "Maps changed lines to affected processes. Pre-commit risk assessment.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Globe,
    title: "Web UI",
    description:
      "Browser-based, 100% client-side graph explorer and AI chat. No install needed for stakeholders.",
    className: "md:col-span-1",
    featured: false,
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 md:py-20 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="container mx-auto max-w-7xl px-4">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to give your AI coding assistant full codebase
            awareness.
          </p>
        </AnimatedSection>

        <div className="grid gap-3 md:grid-cols-4 auto-rows-[minmax(140px,auto)]">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={Math.min(index * 50, 350)}
              direction="up"
              className={feature.className}
            >
              <div
                className={cn(
                  "card-hover group relative h-full overflow-hidden rounded-xl border p-6 transition-all duration-200",
                  feature.featured
                    ? "border-primary/20 bg-primary/[0.06] hover:border-primary/40"
                    : "border-white/[0.06] bg-card/40 hover:border-white/[0.12] hover:bg-card/60",
                  feature.featured && "flex flex-col justify-between"
                )}
              >
                <div className="relative z-10">
                  <div
                    className={cn(
                      "mb-4 flex items-center justify-center rounded-xl bg-primary/10 transition-all duration-200 group-hover:bg-primary/15 group-hover:scale-105",
                      feature.featured ? "size-14" : "size-11"
                    )}
                  >
                    <feature.icon
                      className={cn(
                        "text-primary",
                        feature.featured ? "size-7" : "size-5"
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "font-semibold mb-2",
                      feature.featured ? "text-xl" : "text-base"
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "text-muted-foreground leading-relaxed",
                      feature.featured ? "text-sm" : "text-sm"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Featured card — terminal code block */}
                {feature.featured && (
                  <div className="relative z-10 mt-6 rounded-lg border border-white/[0.06] bg-background/50 p-4 font-mono text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary">$</span>
                      <span className="text-foreground/80">gitnexus context --name UserService</span>
                    </div>
                    <div className="text-muted-foreground mt-2 space-y-0.5">
                      <div><span className="text-primary/60">&#x251C;</span> incoming: <span className="text-foreground/70">8 callers, 3 clusters</span></div>
                      <div><span className="text-primary/60">&#x251C;</span> outgoing: <span className="text-foreground/70">4 calls, 2 imports</span></div>
                      <div><span className="text-primary/60">&#x2514;</span> processes: <span className="text-foreground/70">LoginFlow, RegistrationFlow</span></div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
