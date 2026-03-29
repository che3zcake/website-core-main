"use client"

import {
  Network,
  Target,
  Search,
  FolderGit2,
  FileText,
  GitCompare,
  Shield,
  Globe,
} from "lucide-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Maps every function, class, import, and call chain. AI agents understand the full codebase, not just open files.",
    className: "col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Target,
    title: "Impact Analysis",
    description:
      "Shows blast radius of any change before it's made. Fewer regressions, safer refactors.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Search,
    title: "Hybrid Search",
    description:
      "BM25 + semantic search combined. Faster, more accurate code discovery.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: FolderGit2,
    title: "Multi-Repo Support",
    description:
      "Index and serve multiple codebases at once. Works for large engineering orgs with many repos.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Shield,
    title: "100% Local / Private",
    description:
      "No code sent to any server. Enterprise-safe, no data leakage.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: FileText,
    title: "Wiki Generation",
    description:
      "LLM-powered docs auto-generated from the graph. Always up-to-date architecture documentation.",
    className: "col-span-2 md:col-span-2",
    featured: false,
  },
  {
    icon: GitCompare,
    title: "Git-Diff Impact",
    description:
      "Maps changed lines to affected processes. Pre-commit risk assessment.",
    className: "md:col-span-1",
    featured: false,
  },
  {
    icon: Globe,
    title: "Web UI",
    description:
      "Browser-based, 100% client-side graph explorer and AI chat. No install needed for stakeholders.",
    className: "md:col-span-1",
    featured: false,
  },
]

export function Features() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-50px" })

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="px-6 sm:px-12 md:px-16">
        <AnimatedSection className="mx-auto mb-12 max-w-[640px] text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
          className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 sm:auto-rows-[minmax(160px,auto)] md:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={feature.className}
            >
              <div
                className={cn(
                  "group relative h-full overflow-hidden p-5 transition-all duration-300 sm:p-6",
                  feature.featured
                    ? "gradient-border-card featured-card"
                    : "glass-card card-hover",
                  feature.featured && "flex flex-col justify-between"
                )}
              >
                <div className="relative z-10">
                  <div
                    className={cn(
                      "mb-4 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105",
                      feature.featured
                        ? "size-12 bg-white/[0.06] sm:size-14"
                        : "size-10 bg-white/[0.04] group-hover:bg-white/[0.06] sm:size-12"
                    )}
                  >
                    <feature.icon
                      className={cn(
                        "text-white/60 transition-colors group-hover:text-white/80",
                        feature.featured
                          ? "size-5 sm:size-7"
                          : "size-4 sm:size-5"
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "mb-2 font-semibold",
                      feature.featured
                        ? "text-base sm:text-xl"
                        : "text-sm sm:text-base"
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {feature.featured && (
                  <div className="relative z-10 mt-4 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/30 p-3 font-mono text-[10px] sm:mt-6 sm:p-4 sm:text-xs">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-white/40">$</span>
                      <span className="text-white/70">
                        gitnexus context --name UserService
                      </span>
                    </div>
                    <div className="mt-2 space-y-0.5 text-muted-foreground">
                      <div>
                        <span className="text-white/20">&#x251C;</span>{" "}
                        incoming:{" "}
                        <span className="text-white/60">
                          8 callers, 3 clusters
                        </span>
                      </div>
                      <div>
                        <span className="text-white/20">&#x251C;</span>{" "}
                        outgoing:{" "}
                        <span className="text-white/60">
                          4 calls, 2 imports
                        </span>
                      </div>
                      <div>
                        <span className="text-white/20">&#x2514;</span>{" "}
                        processes:{" "}
                        <span className="text-white/60">
                          LoginFlow, RegistrationFlow
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
