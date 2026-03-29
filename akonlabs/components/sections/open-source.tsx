"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Icon } from "@/components/ui/evervault-card"
import { Star, GitFork, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Star, value: "19.5K+", label: "Stars" },
  { icon: GitFork, value: "800+", label: "Forks" },
  { icon: Users, value: "45+", label: "Contributors" },
]

export function OpenSource() {
  return (
    <section id="open-source" className="py-20 md:py-28">
      <AnimatedSection className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/60 mb-3">
          Open Source
        </p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
          Built in the open
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
          GitNexus is open source at its core. The community drives the roadmap.
          Star us on GitHub.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="relative corner-card border-white/[0.15] p-8 sm:p-10">
          <Icon className="absolute size-6 -top-3 -left-3 text-white/60" />
          <Icon className="absolute size-6 -top-3 -right-3 text-white/60" />
          <Icon className="absolute size-6 -bottom-3 -left-3 text-white/60" />
          <Icon className="absolute size-6 -bottom-3 -right-3 text-white/60" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Stats */}
            <div className="flex items-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="size-5 text-emerald-400/50 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-300">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 border-white/[0.15] hover:bg-white/5" asChild>
                <a href="https://github.com/AkonLabs/gitnexus" target="_blank" rel="noopener noreferrer">
                  <Star className="size-3.5" />
                  Star on GitHub
                  <ExternalLink className="size-3" />
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-white/[0.15] hover:bg-white/5" asChild>
                <a href="https://discord.gg/S388T3da" target="_blank" rel="noopener noreferrer">
                  Discord
                  <ExternalLink className="size-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* License note */}
          <p className="text-xs text-white/25 mt-6 text-center md:text-left">
            PolyForm Noncommercial 1.0.0 &middot; Commercial licensing available &middot; Enterprise features on GitNexus Hub
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
