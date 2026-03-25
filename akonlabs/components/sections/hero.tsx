"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Terminal, Sparkles, Play, Pause, Copy, Check } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Background image + gradient mesh overlay */}
      <Image
        src="/assets/cover.jpeg"
        alt=""
        fill
        className="object-cover -z-20"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/80 to-background" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] rounded-full bg-[radial-gradient(ellipse,oklch(0.696_0.17_162.48/0.12),transparent_70%)]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[40%] rounded-full bg-[radial-gradient(ellipse,oklch(0.696_0.17_162.48/0.06),transparent_70%)]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`transition-all duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
              <Sparkles className="size-3" />
              Introducing GitNexus
            </Badge>
          </div>

          <h1
            className={`mb-6 text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl transition-all duration-500 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Building the nervous{" "}
            <br className="hidden sm:block" />
            system for{" "}
            <span
              className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 30px oklch(0.696 0.17 162.48 / 0.4))" }}
            >
              agent context
            </span>
          </h1>

          <p
            className={`mx-auto mb-8 max-w-2xl text-[15px] text-muted-foreground md:text-[17px] leading-relaxed transition-all duration-500 delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Indexes any codebase into a knowledge graph. Every dependency, call
            chain, cluster, and execution flow. Then exposes it through smart
            tools so AI agents never miss code.
          </p>

          <div
            className={`flex flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-500 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button size="lg" className="gap-2 hover-lift hover:shadow-[0_0_30px_oklch(0.696_0.17_162.48/0.4)] transition-shadow duration-300 text-base px-6" asChild>
              <a href="https://app.akonlabs.com">
                Get Started
                <ArrowRight className="size-4" />
              </a>
            </Button>

            {/* Terminal-style command button */}
            <button
              onClick={copyCommand}
              className="group flex items-center gap-3 rounded-lg border border-white/[0.08] bg-card/80 px-5 py-2.5 font-mono text-sm transition-all duration-200 hover:border-primary/30 hover:bg-card active:scale-[0.98]"
            >
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">npx gitnexus analyze</span>
              {copied ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Demo video */}
        <div
          className={`mt-12 mx-auto max-w-5xl transition-all duration-500 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
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

              {/* Play/pause button — always visible */}
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

              {/* Show button when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <Play className="size-5 text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
