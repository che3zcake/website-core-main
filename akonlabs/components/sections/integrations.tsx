"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Terminal, Code2, Wind, Braces, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/evervault-card"

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
    <section id="integrations" className="py-20 md:py-28">
      <div className="">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Integrations</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
            Supported Editors
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Works with your favorite AI-powered code editors.
          </p>
        </AnimatedSection>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {editors.map((editor, index) => (
            <AnimatedSection
              key={editor.name}
              delay={Math.min(index * 80, 320)}
              direction="up"
            >
              <div
                className={cn(
                  "group relative h-full overflow-hidden p-6 transition-all duration-300",
                  editor.highlight
                    ? "corner-card border-white/[0.2]"
                    : "glass-card"
                )}
              >
                {editor.highlight && (
                  <>
                    <Icon className="absolute size-6 -top-3 -left-3 text-white/60" />
                    <Icon className="absolute size-6 -top-3 -right-3 text-white/60" />
                    <Icon className="absolute size-6 -bottom-3 -left-3 text-white/60" />
                    <Icon className="absolute size-6 -bottom-3 -right-3 text-white/60" />
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <Badge variant="default" className="text-[10px] px-2.5 py-0.5 rounded-t-none rounded-b-md">
                        Recommended
                      </Badge>
                    </div>
                  </>
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105",
                        editor.highlight ? "bg-white/[0.08]" : "bg-white/[0.04] group-hover:bg-white/[0.07]"
                      )}
                    >
                      <editor.icon className="size-5 text-white/50 group-hover:text-white/70 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{editor.name}</h3>
                      <span className="text-xs text-muted-foreground">{editor.level}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{editor.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {editor.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10">
                          <Check className="size-2.5 text-emerald-400/70" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400} className="mt-16">
          <div className="flex flex-col items-center gap-5">
            <p className="text-sm font-medium text-muted-foreground">
              13 languages supported
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="glass-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
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
