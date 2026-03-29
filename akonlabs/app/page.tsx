"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats-bar"
import { ProblemSolution } from "@/components/sections/problem-solution"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Integrations } from "@/components/sections/integrations"
import { McpTools } from "@/components/sections/mcp-tools"
import { CTA } from "@/components/sections/cta"
import { Waitlist } from "@/components/sections/waitlist"
import { OpenSource } from "@/components/sections/open-source"
import { ParticlePlanet } from "@/components/ui/particle-planet"
import { CornerCard } from "@/components/ui/corner-card"

function Divider() {
  return <div className="section-divider my-6" />
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <CornerCard className="bg-black/40 backdrop-blur-xl p-5 sm:p-8 lg:p-10">
      {children}
    </CornerCard>
  )
}

function MobileLayout() {
  return (
    <>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden px-5">
        <div className="absolute inset-0 -z-10">
          <ParticlePlanet particleCount={8000} />
        </div>
        <div className="relative z-10"><Hero /></div>
      </section>
      <div className="px-4 space-y-4 pb-16">
        <Panel><StatsBar /></Panel>
        <Panel><ProblemSolution /></Panel>
        <Panel><Features /></Panel>
        <Panel><HowItWorks /></Panel>
        <Panel><McpTools /></Panel>
        <Panel><Integrations /></Panel>
        <Panel><OpenSource /></Panel>
        <Panel><CTA /></Panel>
        <Panel><Waitlist /></Panel>
      </div>
    </>
  )
}

export default function Page() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    setMounted(true)
    const onResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (!mounted) return null
  if (isMobile) return <MobileLayout />

  return (
    <div className="relative min-h-screen">
      {/* Particle — fixed right, bleeds left */}
      <div className="fixed top-0 right-0 h-screen z-0 w-[55vw]">
        <div className="absolute inset-0 -left-[10vw]">
          <ParticlePlanet particleCount={20000} />
        </div>
      </div>

      {/* Content — uses viewport-based left padding so it hugs the left edge consistently */}
      <div className="relative z-10 pr-[10vw]">
        <div className="pl-[5vw] pr-[2vw] min-h-screen relative">
          {/* Hero — no glass, just text on the left */}
          <div className="max-w-[580px]">
            <Hero />
          </div>
          {/* Stats card — overlapping particle area */}
          <div className="absolute bottom-[8vh] left-[42vw] w-[620px] z-20">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-10 shadow-[0_0_60px_oklch(1_0_0/0.06)]">
              <div className="flex items-center gap-6 mb-6">
                <span className="text-4xl font-bold text-emerald-300">20K+</span>
                <span className="text-lg text-white/50">GitHub Stars</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-base font-medium text-white/70">Surgical Precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-base font-medium text-white/70">Open Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-base font-medium text-white/70">Zero Hallucination</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections — glass cards, full width of content area */}
        <div className="pl-[5vw] pr-[2vw] space-y-6 pb-20">
          <Panel><ProblemSolution /></Panel>
          <Divider />
          <Panel><Features /></Panel>
          <Divider />
          <Panel><HowItWorks /></Panel>
          <Divider />
          <Panel><McpTools /></Panel>
          <Divider />
          <Panel><Integrations /></Panel>
          <Divider />
          <Panel><OpenSource /></Panel>
          <Divider />
          <Panel><CTA /></Panel>
          <Divider />
          <Panel><Waitlist /></Panel>
        </div>
      </div>
    </div>
  )
}
