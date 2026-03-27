"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Copy, Check, Star } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Spotlight } from "@/components/ui/spotlight"
import { useState, useCallback } from "react"

export function CTA() {
  const [copied, setCopied] = useState(false)

  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText("npx gitnexus analyze\nnpx gitnexus setup")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Spotlight */}
      <Spotlight
        className="-top-40 right-0 md:right-40 md:-top-20"
        fill="oklch(0.696 0.17 162.48 / 0.08)"
      />

      {/* Radial glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] rounded-full bg-[radial-gradient(ellipse,oklch(0.696_0.17_162.48/0.10),transparent_60%)]" />
      </div>

      <div className="px-10 sm:px-12">
        <div className="mx-auto max-w-[640px] text-center">
          <AnimatedSection>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-4xl lg:text-5xl mb-4">
              Ready to give your AI agent{" "}
              <span className="text-primary" style={{ filter: "drop-shadow(0 0 20px oklch(0.696 0.17 162.48 / 0.3))" }}>
                full codebase awareness
              </span>
              ?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              One command. That&apos;s it. No infrastructure, no cloud, no data leakage.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="relative rounded-md border border-white/[0.04] bg-[oklch(0.06_0.004_166)] p-5 mb-8 mx-auto text-left">
              <button
                onClick={copyCommand}
                className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/[0.06] transition-colors duration-150"
                aria-label="Copy commands"
              >
                {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
              </button>
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-foreground/80">npx gitnexus analyze</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span className="text-foreground/80">npx gitnexus setup</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary">&#10003;</span>
                  <span>Done. Your AI agent now has full codebase awareness</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto animate-pulse-glow hover:shadow-[0_0_40px_oklch(0.696_0.17_162.48/0.4)] transition-shadow duration-300"
                asChild
              >
                <a href="https://app.akonlabs.com">
                  Get Started
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                <Terminal className="size-4" />
                View Documentation
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="size-3.5 text-primary/70" />
                <span>Trusted by 19,000+ developers</span>
              </div>
              <span className="hidden sm:inline text-white/20">|</span>
              <span>Free for non-commercial use</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
