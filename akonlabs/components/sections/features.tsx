"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import {
  Network,
  Target,
  Search,
  Shield,
  Lock,
  FolderGit2,
  Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/evervault-card"
import { AnimatedSection } from "@/components/ui/animated-section"

// ── Knowledge Graph Animation ──────────────────────────────────────────
function KnowledgeGraphViz() {
  const [activeEdge, setActiveEdge] = useState(0)

  const nodes = [
    { x: 50, y: 30, label: "auth.ts" },
    { x: 20, y: 60, label: "db.ts" },
    { x: 80, y: 55, label: "api.ts" },
    { x: 35, y: 85, label: "utils.ts" },
    { x: 65, y: 85, label: "types.ts" },
    { x: 50, y: 58, label: "core.ts" },
  ]

  const edges = [
    [0, 5],
    [5, 1],
    [5, 2],
    [1, 3],
    [2, 4],
    [5, 3],
    [5, 4],
    [0, 2],
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge((prev) => (prev + 1) % edges.length)
    }, 800)
    return () => clearInterval(interval)
  }, [edges.length])

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {edges.map(([from, to], i) => (
          <motion.line
            key={`edge-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke={i === activeEdge ? "#34d399" : "rgba(255,255,255,0.08)"}
            strokeWidth={i === activeEdge ? 0.8 : 0.4}
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              stroke:
                i === activeEdge ? "#34d399" : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={3.5}
              fill="rgba(0,0,0,0.6)"
              stroke={
                edges[activeEdge]?.includes(i)
                  ? "#34d399"
                  : "rgba(255,255,255,0.15)"
              }
              strokeWidth={0.6}
              animate={{
                scale: edges[activeEdge]?.includes(i) ? 1.3 : 1,
                stroke: edges[activeEdge]?.includes(i)
                  ? "#34d399"
                  : "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.3 }}
            />
            {edges[activeEdge]?.includes(i) && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={3.5}
                fill="none"
                stroke="#34d399"
                strokeWidth={0.3}
                initial={{ r: 3.5, opacity: 0.6 }}
                animate={{ r: 8, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <text
              x={node.x}
              y={node.y + 7}
              textAnchor="middle"
              className="fill-white/30 text-[3px]"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Impact Analysis Animation ──────────────────────────────────────────
function ImpactAnalysisViz() {
  const [ripple, setRipple] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRipple((prev) => (prev + 1) % 4)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 100 60" className="h-full w-full">
        {[0, 1, 2, 3].map((ring) => (
          <motion.circle
            key={ring}
            cx={50}
            cy={30}
            r={6 + ring * 8}
            fill="none"
            stroke={
              ring <= ripple ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.05)"
            }
            strokeWidth={ring <= ripple ? 0.8 : 0.4}
            strokeDasharray="3 2"
            animate={{
              stroke:
                ring <= ripple
                  ? "rgba(52,211,153,0.3)"
                  : "rgba(255,255,255,0.05)",
              strokeWidth: ring <= ripple ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.3, delay: ring * 0.1 }}
          />
        ))}
        <motion.circle
          cx={50}
          cy={30}
          r={3}
          fill="#34d399"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <text
          x={50}
          y={54}
          textAnchor="middle"
          className="fill-white/20 text-[3.5px]"
        >
          blast radius
        </text>
      </svg>
    </div>
  )
}

// ── Hybrid Search Animation ────────────────────────────────────────────
function HybridSearchViz() {
  const [searchPhase, setSearchPhase] = useState(0)
  const results = [
    { name: "UserService.ts", score: 0.97, type: "semantic" },
    { name: "auth/login.ts", score: 0.91, type: "bm25" },
    { name: "middleware.ts", score: 0.84, type: "semantic" },
    { name: "types/user.d.ts", score: 0.78, type: "bm25" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPhase((prev) => (prev + 1) % 6)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  const visibleResults = Math.min(searchPhase, results.length)

  return (
    <div className="flex h-full flex-col gap-2 px-1">
      <div className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
        <Search className="size-3 text-white/30" />
        <motion.div
          className="font-mono text-[10px] text-white/50"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          getUserById
        </motion.div>
      </div>
      <div className="flex flex-col gap-1">
        {results.slice(0, visibleResults).map((result, i) => (
          <motion.div
            key={result.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex items-center justify-between rounded border border-white/[0.05] bg-white/[0.02] px-2 py-1"
          >
            <span className="font-mono text-[9px] text-white/50">
              {result.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "rounded px-1 py-0.5 text-[7px] font-medium uppercase",
                  result.type === "semantic"
                    ? "bg-emerald-500/10 text-emerald-400/70"
                    : "bg-blue-500/10 text-blue-400/70"
                )}
              >
                {result.type}
              </span>
              <span className="font-mono text-[8px] text-white/30">
                {result.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── 100% Local Animation ───────────────────────────────────────────────
function LocalPrivacyViz() {
  const [activeIcon, setActiveIcon] = useState(0)
  const icons = [Shield, Lock, Shield, Lock]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length)
    }, 600)
    return () => clearInterval(interval)
  }, [icons.length])

  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      {icons.map((IconComp, i) => (
        <motion.div
          key={i}
          className={cn(
            "flex size-9 items-center justify-center rounded-lg border",
            i <= activeIcon
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-white/[0.06] bg-white/[0.02]"
          )}
          animate={{
            scale: i === activeIcon ? 1.15 : 1,
            borderColor:
              i <= activeIcon
                ? "rgba(16,185,129,0.3)"
                : "rgba(255,255,255,0.06)",
          }}
          transition={{ duration: 0.3 }}
        >
          <IconComp
            className={cn(
              "size-4",
              i <= activeIcon ? "text-emerald-400" : "text-white/20"
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ── Multi-Repo Animation ───────────────────────────────────────────────
function MultiRepoViz() {
  const [activeRepo, setActiveRepo] = useState(0)
  const repos = ["frontend", "backend", "shared-lib", "infra", "mobile"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRepo((prev) => (prev + 1) % repos.length)
    }, 900)
    return () => clearInterval(interval)
  }, [repos.length])

  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      {repos.map((repo, i) => (
        <motion.div
          key={repo}
          className="flex flex-col items-center gap-1.5"
          animate={{
            y: i === activeRepo ? -4 : 0,
            scale: i === activeRepo ? 1.08 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg border transition-colors duration-300",
              i === activeRepo
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-white/[0.06] bg-white/[0.03]"
            )}
          >
            <FolderGit2
              className={cn(
                "size-4 transition-colors duration-300",
                i === activeRepo ? "text-emerald-400" : "text-white/20"
              )}
            />
          </div>
          <span
            className={cn(
              "text-[8px] font-medium transition-colors duration-300",
              i === activeRepo ? "text-white/60" : "text-white/20"
            )}
          >
            {repo}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ── 13 Languages Animation ─────────────────────────────────────────────
function LanguagesViz() {
  const [activeLang, setActiveLang] = useState(0)
  const languages = [
    "TypeScript",
    "Python",
    "Rust",
    "Go",
    "Java",
    "C#",
    "Ruby",
    "Swift",
    "Kotlin",
    "C++",
    "PHP",
    "Scala",
    "Elixir",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLang((prev) => (prev + 1) % languages.length)
    }, 500)
    return () => clearInterval(interval)
  }, [languages.length])

  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      <Code2 className="size-5 text-white/20" />
      <div className="relative h-7 w-28 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center"
          key={activeLang}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="font-mono text-sm font-semibold text-emerald-400">
            {languages[activeLang]}
          </span>
        </motion.div>
      </div>
      <span className="font-mono text-[10px] text-white/20">
        {activeLang + 1}/{languages.length}
      </span>
    </div>
  )
}

// ── Card Data ──────────────────────────────────────────────────────────
const cards = [
  {
    title: "Knowledge Graph",
    description:
      "Maps every function, class, import, and call chain into a traversable graph. AI agents see your full architecture.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    featured: true,
    viz: KnowledgeGraphViz,
  },
  {
    title: "Impact Analysis",
    description: "Blast radius of any change, before it ships.",
    colSpan: "md:col-span-2",
    rowSpan: "",
    featured: false,
    viz: ImpactAnalysisViz,
  },
  {
    title: "Hybrid Search",
    description: "BM25 + semantic search combined. Faster, more accurate.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    featured: false,
    viz: HybridSearchViz,
  },
  {
    title: "100% Local",
    description: "No code leaves your machine. Enterprise-safe.",
    colSpan: "md:col-span-2",
    rowSpan: "",
    featured: false,
    viz: LocalPrivacyViz,
  },
  {
    title: "Multi-Repo",
    description: "Index and serve multiple codebases simultaneously.",
    colSpan: "md:col-span-3",
    rowSpan: "",
    featured: false,
    viz: MultiRepoViz,
  },
  {
    title: "13 Languages",
    description: "First-class support across your entire stack.",
    colSpan: "md:col-span-3",
    rowSpan: "",
    featured: false,
    viz: LanguagesViz,
  },
]

// ── Features Component ─────────────────────────────────────────────────
export function Features() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-50px" })

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div>
        <AnimatedSection className="mx-auto mb-12 max-w-[640px] text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-400/70">
            Capabilities
          </p>
          <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            Everything your AI agent needs
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Full codebase awareness through a comprehensive set of tools and
            features.
          </p>
        </AnimatedSection>

        <div
          ref={gridRef}
          className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900/50 p-6 transition-colors hover:border-white/[0.15]",
                card.colSpan,
                card.rowSpan,
                card.featured && "border-white/[0.2] border-emerald-500/20"
              )}
            >
              {card.featured && (
                <>
                  <Icon className="absolute -top-3 -left-3 size-6 text-white/60" />
                  <Icon className="absolute -top-3 -right-3 size-6 text-white/60" />
                  <Icon className="absolute -bottom-3 -left-3 size-6 text-white/60" />
                  <Icon className="absolute -bottom-3 -right-3 size-6 text-white/60" />
                </>
              )}

              <div className="flex-1 overflow-hidden">
                <card.viz />
              </div>

              <div className="mt-4">
                <h3
                  className={cn(
                    "text-lg font-semibold text-white",
                    card.featured && "text-emerald-400"
                  )}
                >
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-white/40">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
