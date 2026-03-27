"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Terminal, Code2, Wind, Braces, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const editors = [
  {
    name: "Claude Code",
    icon: Terminal,
    level: "Full",
    features: ["MCP", "Skills", "Hooks"],
    description: "Deepest integration. PreToolUse hooks enrich searches with graph context automatically",
    highlight: true,
  },
  {
    name: "Cursor",
    icon: Code2,
    level: "MCP + Skills",
    features: ["MCP", "Skills"],
    description: "Full MCP tools and agent skills for deep codebase queries",
    highlight: false,
  },
  {
    name: "Windsurf",
    icon: Wind,
    level: "MCP",
    features: ["MCP"],
    description: "All 7 MCP tools available for codebase intelligence",
    highlight: false,
  },
  {
    name: "OpenCode",
    icon: Braces,
    level: "MCP + Skills",
    features: ["MCP", "Skills"],
    description: "MCP tools plus agent skills for guided workflows",
    highlight: false,
  },
]

const languages = [
  "TypeScript", "JavaScript", "Python", "Java", "Kotlin", "C#",
  "Go", "Rust", "PHP", "Ruby", "Swift", "C", "C++",
]

export function Integrations() {
  return (
    <section id="integrations" className="py-12 md:py-16">
      <div className="px-10 sm:px-12">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4">
            Supported Editors
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Works with your favorite AI-powered code editors.
          </p>
        </AnimatedSection>

        <div className="grid gap-y-3 gap-x-6 grid-cols-1 sm:grid-cols-2">
          {editors.map((editor, index) => (
            <AnimatedSection
              key={editor.name}
              delay={Math.min(index * 80, 320)}
              direction="up"
            >
              <div
                className={cn(
                  "card-hover group relative h-full overflow-hidden rounded-md border backdrop-blur p-6 transition-all duration-200",
                  editor.highlight
                    ? "border-primary/15 bg-primary/[0.03] hover:border-primary/30"
                    : "border-white/[0.06] bg-card/20 hover:border-white/[0.12] hover:bg-card/30"
                )}
              >
                {editor.highlight && (
                  <div className="absolute -top-px left-0 right-0 flex justify-center">
                    <Badge variant="default" className="text-[10px] px-2.5 py-0.5 rounded-t-none rounded-b-md">
                      Recommended
                    </Badge>
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-105",
                        editor.highlight ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/15"
                      )}
                    >
                      <editor.icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{editor.name}</h3>
                      <span className="text-xs text-muted-foreground">{editor.level}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{editor.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {editor.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="size-3 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Languages — merged as a sub-section */}
        <AnimatedSection delay={400} className="mt-16">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              13 languages supported
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground rounded-md bg-white/[0.04] border border-white/[0.06]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
