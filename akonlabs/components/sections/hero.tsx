"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { TextReveal } from "@/components/ui/text-reveal"
import { ArrowRight, Play, Pause, Copy, Check } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "motion/react"

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const copyCommand = useCallback(() => {
    navigator.clipboard.writeText("npx gitnexus analyze")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background layers */}
      <Image
        src="/assets/cover.jpeg"
        alt=""
        fill
        className="object-cover -z-30"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/90 via-background/85 to-background" />

      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="oklch(0.696 0.17 162.48 / 0.15)"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        <FloatingParticles count={30} />
      </div>

      <div className="container mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Introducing GitNexus
            </Badge>
          </motion.div>

          {/* Heading with text reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl"
          >
            <TextReveal words="Building the nervous system for" />
            <br className="hidden sm:block" />
            <span
              className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
              style={{ filter: "drop-shadow(0 0 30px oklch(0.696 0.17 162.48 / 0.4))" }}
            >
              agent context
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:text-[15px] md:text-[17px] leading-relaxed"
          >
            Indexes any codebase into a knowledge graph. Every dependency, call
            chain, cluster, and execution flow. Then exposes it through smart
            tools so AI agents never miss code.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="gap-2 hover-lift hover:shadow-[0_0_30px_oklch(0.696_0.17_162.48/0.4)] transition-shadow duration-300 text-sm sm:text-base px-6 w-full sm:w-auto" asChild>
              <a href="https://app.akonlabs.com">
                Get Started
                <ArrowRight className="size-4" />
              </a>
            </Button>

            <button
              onClick={copyCommand}
              className="group flex items-center justify-center gap-3 rounded-lg border border-white/[0.08] bg-card/80 px-5 py-2.5 font-mono text-xs sm:text-sm transition-all duration-200 hover:border-primary/30 hover:bg-card active:scale-[0.98] w-full sm:w-auto"
            >
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">npx gitnexus analyze</span>
              {copied ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Demo video */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-card/30 p-1.5 backdrop-blur-sm glow-sm">
            <div className="overflow-hidden rounded-xl relative group">
              <video
                ref={(el) => {
                  (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el
                  if (el) el.playbackRate = 0.75
                }}
                autoPlay
                loop
                muted
                playsInline
                poster="/assets/demo-poster.jpg"
                aria-label="GitNexus demo showing codebase analysis"
                className="w-full h-auto block"
              >
                <source src="/assets/demo.mp4" type="video/mp4" />
              </video>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-transform duration-150 hover:scale-105 active:scale-95">
                  {isPlaying ? (
                    <Pause className="size-5 text-white" />
                  ) : (
                    <Play className="size-5 text-white ml-0.5" />
                  )}
                </div>
              </button>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <Play className="size-5 text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
