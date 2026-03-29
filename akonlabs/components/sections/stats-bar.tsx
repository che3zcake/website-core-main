"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Star, Globe, Terminal, Shield } from "lucide-react"

const stats = [
  { icon: Star, value: "19K+", label: "GitHub Stars" },
  { icon: Globe, value: "13", label: "Languages" },
  { icon: Terminal, value: "7", label: "MCP Tools" },
  { icon: Shield, value: "100%", label: "Local & Private" },
]

export function StatsBar() {
  return (
    <section className="py-10 md:py-14">
      <div className="px-6 sm:px-12 md:px-16">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card flex items-center gap-4 px-5 py-4"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/[0.04]">
                  <stat.icon className="size-4.5 text-white/40" />
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
