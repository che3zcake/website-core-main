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
          "z-10 flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] p-2 backdrop-blur-sm sm:size-12 sm:p-3",
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
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
      className="dot-grid glass-card featured-card relative flex h-[220px] w-full items-center justify-center overflow-hidden p-4 sm:h-[280px] sm:p-8"
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
          <Circle
            ref={centerRef}
            className="size-12 border-white/[0.15] bg-white/[0.06] sm:size-14"
            label="GitNexus"
          >
            <Network className="size-6 text-foreground" />
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

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeRef1}
        toRef={centerRef}
        curvature={-40}
        gradientStartColor="#7c5cbf"
        gradientStopColor="#a78bfa"
        pathColor="oklch(1 0 0 / 0.04)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeRef2}
        toRef={centerRef}
        gradientStartColor="#7c5cbf"
        gradientStopColor="#a78bfa"
        pathColor="oklch(1 0 0 / 0.04)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeRef3}
        toRef={centerRef}
        curvature={40}
        gradientStartColor="#7c5cbf"
        gradientStopColor="#a78bfa"
        pathColor="oklch(1 0 0 / 0.04)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={editorRef1}
        curvature={-40}
        gradientStartColor="#a78bfa"
        gradientStopColor="#c4b5fd"
        pathColor="oklch(1 0 0 / 0.04)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={editorRef2}
        gradientStartColor="#a78bfa"
        gradientStopColor="#c4b5fd"
        pathColor="oklch(1 0 0 / 0.04)"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={editorRef3}
        curvature={40}
        gradientStartColor="#a78bfa"
        gradientStopColor="#c4b5fd"
        pathColor="oklch(1 0 0 / 0.04)"
      />
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
    <section className="py-20 md:py-28">
      <div className="px-6 sm:px-12 md:px-16">
        <AnimatedSection className="mx-auto mb-12 max-w-[640px] text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            The Problem
          </p>
          <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            AI coding tools are powerful.{" "}
            <span className="text-muted-foreground">
              But they&apos;re flying blind.
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            They edit code without knowing what depends on it. GitNexus gives
            them the full picture.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="mx-auto mb-10">
          <GitNexusBeamDiagram />
        </AnimatedSection>

        <div className="mx-auto">
          <AnimatedSection delay={200}>
            <div className="mb-4 grid gap-4 md:grid-cols-3">
              {comparisons.map((item, i) => (
                <div
                  key={i}
                  className="glass-card card-hover group p-5 transition-all duration-300"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 transition-colors duration-300 group-hover:bg-red-500/15">
                      <XCircle className="size-3.5 text-red-400/70" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground line-through decoration-red-400/20">
                      {item.without}
                    </p>
                  </div>
                  <div className="section-divider mb-4" />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 transition-colors duration-300 group-hover:bg-emerald-500/15">
                      <CheckCircle className="size-3.5 text-emerald-400/70" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {item.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="gradient-border-card glow-purple flex flex-col items-center justify-center p-5 text-center transition-all duration-300">
                <span className="text-2xl font-bold text-foreground">
                  100%
                </span>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  blast radius known
                </p>
              </div>
              {[
                {
                  stat: "1",
                  unit: "tool call",
                  desc: "Complete context. No multi-query chains.",
                },
                {
                  stat: "0",
                  unit: "data sent",
                  desc: "100% local. Nothing leaves your machine.",
                },
                {
                  stat: "Any",
                  unit: "LLM works",
                  desc: "Small models get full architectural clarity.",
                },
              ].map((item) => (
                <div
                  key={item.unit}
                  className="glass-card card-hover flex flex-col justify-center p-5 text-center transition-all duration-300"
                >
                  <div className="mb-1 flex items-baseline justify-center gap-1">
                    <span className="text-lg font-bold text-foreground">
                      {item.stat}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.unit}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
