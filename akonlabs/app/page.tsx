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
        <div className="pl-[5vw] pr-[2vw]">
          {/* Hero — no glass, just text on the left */}
          <div className="max-w-[580px]">
            <Hero />
          </div>
        </div>

        {/* Sections — glass cards, full width of content area */}
        <div className="pl-[5vw] pr-[2vw] space-y-6 pb-20">
          <Panel><StatsBar /></Panel>
          <Divider />
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
          <Panel><CTA /></Panel>
          <Divider />
          <Panel><Waitlist /></Panel>
        </div>
      </div>
    </div>
  )
}
