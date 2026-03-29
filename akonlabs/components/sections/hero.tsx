"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Copy, Check } from "lucide-react"
import { useState, useCallback } from "react"
import { motion } from "motion/react"

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText("npx gitnexus analyze")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section className="flex min-h-screen items-center py-20">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1.5 border-white/10 bg-white/[0.06] text-white/70">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/30" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white/50" />
            </span>
            Introducing GitNexus
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[3.25rem] leading-[1.1]"
        >
          Building the nervous
          <br />
          system for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300">
            agent context.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-md text-sm text-white/50 sm:text-[15px] leading-relaxed"
        >
          Indexes any codebase into a knowledge graph &mdash; every dependency,
          call chain, cluster, and execution flow &mdash; then exposes it
          through smart tools so AI agents never miss code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-3 sm:flex-row"
        >
          <Button size="lg" className="gap-2 rounded-md hover-lift transition-all duration-300 text-sm sm:text-base px-6 w-full sm:w-auto" asChild>
            <a href="https://app.akonlabs.com">
              Get Started
              <ArrowRight className="size-4" />
            </a>
          </Button>

          <button
            onClick={copyCommand}
            className="group flex items-center gap-3 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 font-mono text-xs sm:text-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98] w-full sm:w-auto"
          >
            <span className="text-white/40">$</span>
            <span className="text-white/60">npx gitnexus analyze</span>
            {copied ? (
              <Check className="size-3.5 text-white" />
            ) : (
              <Copy className="size-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
