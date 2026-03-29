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
    <section className="py-6">
      <AnimatedSection>
        <div className="rounded-full bg-white/[0.05] border border-white/[0.08] px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3 shrink-0">
              <stat.icon className="size-4 text-emerald-400/60" />
              <span className="text-sm font-semibold text-emerald-300">{stat.value}</span>
              <span className="text-xs text-white/40">{stat.label}</span>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-4 bg-white/[0.08] ml-4" />
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
