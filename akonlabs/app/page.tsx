import { Hero } from "@/components/sections/hero"
import { ProblemSolution } from "@/components/sections/problem-solution"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Integrations } from "@/components/sections/integrations"
import { McpTools } from "@/components/sections/mcp-tools"
import { CTA } from "@/components/sections/cta"
import { Waitlist } from "@/components/sections/waitlist"

export default function Page() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <McpTools />
      <Integrations />
      <CTA />
      <Waitlist />
    </>
  )
}
