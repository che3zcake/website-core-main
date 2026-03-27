import { Hero } from "@/components/sections/hero"
import { ProblemSolution } from "@/components/sections/problem-solution"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Integrations } from "@/components/sections/integrations"
import { McpTools } from "@/components/sections/mcp-tools"
import { CTA } from "@/components/sections/cta"
import { Waitlist } from "@/components/sections/waitlist"

function Divider() {
  return (
    <div className="relative">
      <hr className="border-primary/20" />
      <div
        className="h-4 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            oklch(0.696 0.17 162.48) 0px,
            oklch(0.696 0.17 162.48) 1px,
            transparent 1px,
            transparent 8px
          ),
          repeating-linear-gradient(
            -45deg,
            oklch(0.696 0.17 162.48) 0px,
            oklch(0.696 0.17 162.48) 1px,
            transparent 1px,
            transparent 8px
          )`,
        }}
      />
      <hr className="border-primary/20" />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Hero />
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
