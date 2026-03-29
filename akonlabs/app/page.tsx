import { Hero } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats-bar"
import { ProblemSolution } from "@/components/sections/problem-solution"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Integrations } from "@/components/sections/integrations"
import { McpTools } from "@/components/sections/mcp-tools"
import { CTA } from "@/components/sections/cta"
import { Waitlist } from "@/components/sections/waitlist"

function Divider() {
  return <div className="section-divider mx-6 sm:mx-12 md:mx-16" />
}

export default function Page() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Divider />
      <ProblemSolution />
      <Divider />
      <Features />
      <Divider />
      <HowItWorks />
      <Divider />
      <McpTools />
      <Divider />
      <Integrations />
      <Divider />
      <CTA />
      <Divider />
      <Waitlist />
    </>
  )
}
