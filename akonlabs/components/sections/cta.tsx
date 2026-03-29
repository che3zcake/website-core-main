"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Copy, Check, Star } from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { useState, useCallback } from "react"

export function CTA() {
  const [copied, setCopied] = useState(false)

  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText("npm i -g gitnexushub\ngnx connect <your-key> --editor claude-code")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,oklch(0.5_0.12_280/0.06),transparent_70%)] -z-10" />

      <div className="">
        <div className="mx-auto max-w-[640px] text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/60 mb-3">Get Started</p>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
              Ready to give your AI agent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300">
                full codebase awareness
              </span>
              ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
              One command. That&apos;s it. No infrastructure, no cloud, no data leakage.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="gradient-border-card p-5 mb-8 mx-auto text-left">
              <button
                onClick={copyCommand}
                className="absolute top-4 right-4 p-1.5 rounded-md text-white/20 hover:text-white/50 hover:bg-white/5 transition-colors duration-150 z-10"
                aria-label="Copy commands"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </button>
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-white/70">npm i -g gitnexushub</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30">$</span>
                  <span className="text-white/70">gnx connect &lt;your-key&gt; --editor claude-code</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-emerald-400/50">&#10003;</span>
                  <span>Connected. Your AI agent now has full codebase awareness.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto rounded-xl animate-pulse-glow transition-all duration-300"
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

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="size-3.5 text-white/20" />
                <span>19,500+ GitHub stars</span>
              </div>
              <span className="hidden sm:inline text-white/10">|</span>
              <span>Free for non-commercial use</span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
