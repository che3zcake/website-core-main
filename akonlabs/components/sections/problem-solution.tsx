"use client"

import React, { forwardRef, useRef } from "react"
import {
  XCircle,
  CheckCircle,
  FileCode2,
  FolderGit2,
  Network,
  Terminal,
  Code2,
  Braces,
  ArrowRight,
} from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { cn } from "@/lib/utils"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-10 sm:size-12 items-center justify-center rounded-full border border-white/[0.08] bg-card p-2 sm:p-3",
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
          {label}
        </span>
      )}
    </div>
  )
})
Circle.displayName = "Circle"

function GitNexusBeamDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef1 = useRef<HTMLDivElement>(null)
  const codeRef2 = useRef<HTMLDivElement>(null)
  const codeRef3 = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const editorRef1 = useRef<HTMLDivElement>(null)
  const editorRef2 = useRef<HTMLDivElement>(null)
  const editorRef3 = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[220px] sm:h-[280px] w-full items-center justify-center overflow-hidden rounded-md border border-white/[0.06] bg-card/20 dot-grid p-4 sm:p-8"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg items-stretch justify-between">
        <div className="flex flex-col justify-between py-2">
          <Circle ref={codeRef1} label="Functions">
            <FileCode2 className="size-5 text-muted-foreground" />
          </Circle>
          <Circle ref={codeRef2} label="Imports">
            <Braces className="size-5 text-muted-foreground" />
          </Circle>
          <Circle ref={codeRef3} label="Call Chains">
            <FolderGit2 className="size-5 text-muted-foreground" />
          </Circle>
        </div>
        <div className="flex items-center justify-center">
          <Circle ref={centerRef} className="size-12 sm:size-14 border-primary/30 bg-primary/10" label="GitNexus">
            <Network className="size-6 text-primary" />
          </Circle>
        </div>
        <div className="flex flex-col justify-between py-2">
          <Circle ref={editorRef1} label="Claude Code">
            <Terminal className="size-5 text-muted-foreground" />
          </Circle>
          <Circle ref={editorRef2} label="Cursor">
            <Code2 className="size-5 text-muted-foreground" />
          </Circle>
          <Circle ref={editorRef3} label="Windsurf">
            <Code2 className="size-5 text-muted-foreground" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={codeRef1} toRef={centerRef} curvature={-40} gradientStartColor="#10b981" gradientStopColor="#059669" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
      <AnimatedBeam containerRef={containerRef} fromRef={codeRef2} toRef={centerRef} gradientStartColor="#10b981" gradientStopColor="#059669" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
      <AnimatedBeam containerRef={containerRef} fromRef={codeRef3} toRef={centerRef} curvature={40} gradientStartColor="#10b981" gradientStopColor="#059669" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={editorRef1} curvature={-40} gradientStartColor="#34d399" gradientStopColor="#10b981" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={editorRef2} gradientStartColor="#34d399" gradientStopColor="#10b981" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={editorRef3} curvature={40} gradientStartColor="#34d399" gradientStopColor="#10b981" pathColor="oklch(0.696 0.17 162.48 / 0.08)" />
    </div>
  )
}

const comparisons = [
  {
    without: "AI edits a function without knowing 47 others depend on it",
    with: "Full blast radius shown before any edit is made",
  },
  {
    without: "Grep misses implicit call chains and cross-file deps",
    with: "Knowledge graph maps every dependency automatically",
  },
  {
    without: "4+ LLM round-trips to understand one function's context",
    with: "One tool call returns complete structured context",
  },
]

export function ProblemSolution() {
  return (
    <section className="py-16 md:py-20">
      <div className="px-10 sm:px-12">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-10">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl mb-3">
            AI coding tools are powerful.{" "}
            <span className="text-muted-foreground">But they&apos;re flying blind.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
            They edit code without knowing what depends on it. GitNexus gives them
            the full picture.
          </p>
        </AnimatedSection>

        {/* Beam diagram — full width, centered */}
        <AnimatedSection delay={100} className="mx-auto mb-8">
          <GitNexusBeamDiagram />
          <p className="text-center text-xs text-muted-foreground/60 mt-2">
            Code → Knowledge Graph → AI Editors
          </p>
        </AnimatedSection>

        {/* Comparison rows — centered, consistent width */}
        <div className="mx-auto">
          <AnimatedSection delay={200}>
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              {comparisons.map((item, i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/[0.06] bg-card/20 p-4 transition-all duration-200 hover:border-white/[0.12] hover:bg-card/40"
                >
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 mt-0.5">
                      <XCircle className="size-3 text-destructive/70" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-through decoration-destructive/30">
                      {item.without}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <CheckCircle className="size-3 text-primary/70" />
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {item.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Bottom row — impact stat + value props, same grid width */}
          <AnimatedSection delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Impact stat — spans 1 col */}
              <div className="rounded-md border border-primary/15 bg-primary/[0.04] p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-primary">100%</span>
                <p className="text-xs text-primary/70 font-medium">blast radius known</p>
              </div>

              {/* Three value props */}
              {[
                { stat: "1", unit: "tool call", desc: "Complete context. No multi-query chains." },
                { stat: "0", unit: "data sent", desc: "100% local. Nothing leaves your machine." },
                { stat: "Any", unit: "LLM works", desc: "Small models get full architectural clarity." },
              ].map((item) => (
                <div
                  key={item.unit}
                  className="rounded-md border border-white/[0.06] bg-card/20 p-4 text-center flex flex-col justify-center hover:border-white/[0.12]"
                >
                  <div className="flex items-baseline justify-center gap-1 mb-0.5">
                    <span className="text-lg font-bold text-foreground">{item.stat}</span>
                    <span className="text-xs font-medium text-muted-foreground">{item.unit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
