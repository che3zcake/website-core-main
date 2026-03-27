"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"
import {
  Quote,
  Star,
  TrendingUp,
  Trophy,
  Newspaper,
  MessageSquare,
} from "lucide-react"

const testimonials = [
  {
    quote:
      "We're using GitNexus Blast radius analysis before every code change. We have a strict protocol — before touching any file, run the impact analysis on the affected subjects and report the caller/dependent count explicitly. This came out of a painful experience where a voice pipeline refactor silently broke graph memory writes — two completely unrelated-looking systems that shared a dependency we didn't know about. GitNexus would have caught it.",
    name: "Stephen",
    handle: "SioSuenos64",
    role: "Solo Developer",
    project: "Neura — Voice-First Digital Legacy System",
    source: "Reddit",
    highlight: "Blast radius saved us",
    icon: MessageSquare,
  },
  {
    quote:
      "We have a cursor/rules/Tier1-Protection.mdc with alwaysApply that mandates GitNexus blast radius analysis before any file modification. Our post-commit hook runs gitnexus analyze --skip-embeddings after every commit and auto-commits the updated context files. The blast radius analysis in particular is filling a gap that nothing else does cleanly.",
    name: "Stephen",
    handle: "SioSuenos64",
    role: "Solo Developer",
    project: "Neura — 51+ subsystems, hundreds of Python files",
    source: "Reddit",
    highlight: "Mandatory in CI/CD",
    icon: MessageSquare,
  },
  {
    quote:
      "The impact tool with blast radius grouping by depth is exactly what we needed — giving 360-degree symbol view (incoming/outgoing calls, process membership) is genuinely useful for debugging. The post-commit auto-update pattern is clean and low-friction.",
    name: "Stephen",
    handle: "SioSuenos64",
    role: "Solo Developer",
    project: "Python/FastAPI + React + Neo4j + QDrant stack",
    source: "Reddit",
    highlight: "360-degree context",
    icon: MessageSquare,
  },
  {
    quote:
      "GitNexus exposes an MCP-driven knowledge graph directly in the browser. Two other parsers, the code, KuzuDB stores structure and relations, and a local model generates embeddings for the search engine. It's all local, nothing leaves your machine while you still get Cypher graph queries, BM25, impact analysis, and more.",
    name: "André Lindenberg",
    handle: "@andrelindenberg",
    role: "Developer",
    project: "",
    source: "X (Twitter)",
    highlight: "100% local intelligence",
    icon: MessageSquare,
  },
  {
    quote:
      "I think its a brilliant idea. I am an inventor in this space, being the principle investigator on the forerunner patent for GraphRAG, and the author of 'Stingy Context', which uses graph theory to reduce token burn by over 90%. I am very excited to see others like you kicking these 'Knowledge Graph' tires. In the long run, its the only way to reliably auto-code.",
    name: "David Ostby",
    handle: "ViperAICSO",
    role: "Co-founder at ViperPrompt",
    project: "GraphRAG Patent Investigator, 4 awarded patents",
    source: "Reddit",
    highlight: "GraphRAG pioneer endorsement",
    icon: MessageSquare,
  },
  {
    quote:
      "Game-changer! I used to grep through every file and hope I didn't miss a dynamic import. Now, I can see the actual dependency graph! The detailed documentation with Gemini 3 Flash also worked surprisingly well for me too! Giving me even more insight about what's going on with my code.",
    name: "SioSuenos64",
    handle: "SioSuenos64",
    role: "Developer",
    project: "",
    source: "Reddit",
    highlight: "Replaced grep workflows",
    icon: MessageSquare,
  },
  {
    quote:
      "Really impressive work. The phased ingestion pipeline is cleanly separated — structure, parse, resolve, relate, cluster, trace, embed. Leiden community detection on the relationship graph is a smart choice. Process tracing via BFS from scored entry points is elegant. KuzuDB as the embedded graph store is an interesting choice — embedded like SQLite but with native Cypher traversal.",
    name: "SithLordRising",
    handle: "SithLordRising",
    role: "Knowledge Infrastructure Engineer",
    project: "Building structured knowledge graphs from documents",
    source: "Reddit",
    highlight: "Architecture deep-dive",
    icon: MessageSquare,
  },
  {
    quote:
      "Your work has been genuinely useful for validating some architectural directions we've been considering, particularly around graph storage and hybrid search. The parallel between tracing execution flows through code and tracing reasoning chains through knowledge is closer than I expected. Great project. Following with interest.",
    name: "SithLordRising",
    handle: "SithLordRising",
    role: "Knowledge Infrastructure Engineer",
    project: "",
    source: "Reddit",
    highlight: "Validated our architecture",
    icon: MessageSquare,
  },
  {
    quote:
      "I stumbled on GitNexus and gave it a try running locally. First impressions: it is fast, looks stunning, and very informative. It shows key process flows, allows you to query the knowledge graph and even chat with your repository using the structured knowledge as its basis. I am in awe how after years of AI hype, you can still be surprised by what is possible.",
    name: "Frank Buters",
    handle: "",
    role: "GenAI & Data Leader",
    project: "Building AI Capabilities for Financial Services",
    source: "LinkedIn",
    highlight: "Stunning & informative",
    icon: MessageSquare,
  },
  {
    quote:
      "GitNexus Turns Your Codebase Into a Knowledge Graph — and Your AI Agent Will Thank You. Instead of stuffing files into a prompt, it indexes your entire repository into a knowledge graph — mapping out every dependency, call chain, cluster, and execution flow.",
    name: "Top AI Product",
    handle: "",
    role: "AI Newsletter",
    project: "",
    source: "Blog Feature",
    highlight: "Featured article",
    icon: Newspaper,
  },
]

const stats = [
  {
    icon: Star,
    value: "19,000+",
    label: "GitHub Stars",
    sublabel: "19K stars and counting",
  },
  {
    icon: Trophy,
    value: "#1",
    label: "GitHub Trending",
    sublabel: "Repository of the Day",
  },
  {
    icon: TrendingUp,
    value: "10,000+",
    label: "Weekly npm Downloads",
    sublabel: "And growing fast",
  },
  {
    icon: Newspaper,
    value: "Open Source",
    label: "Community",
    sublabel: "Thriving Discord & GitHub community",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="px-10 sm:px-12">
        <AnimatedSection className="mx-auto max-w-[640px] text-center mb-8 sm:mb-10">
          <Badge variant="secondary" className="mb-4">
            Community Love
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Developers are{" "}
            <span className="text-primary">building with GitNexus</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Real feedback from developers, blogs, and the open-source community.
          </p>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection className="mb-10">
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="bg-card/50 backdrop-blur text-center border-primary/20"
              >
                <CardContent className="p-4 sm:pt-6">
                  <stat.icon className="size-4 sm:size-5 text-primary mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-medium">{stat.label}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {stat.sublabel}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonial cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={`${testimonial.name}-${index}`}
              delay={Math.min(index * 50, 400)}
              direction="up"
            >
              <Card className="h-full bg-card/50 backdrop-blur hover-lift group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 sm:pt-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <Quote className="size-5 text-primary/40" />
                      <Badge
                        variant="outline"
                        className="text-xs text-primary border-primary/30"
                      >
                        {testimonial.highlight}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.source}
                    </Badge>
                  </div>

                  <blockquote className="text-xs sm:text-sm leading-relaxed text-foreground/90 mb-4 sm:mb-6 flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm aspect-square">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {testimonial.name}
                        {testimonial.handle && (
                          <span className="text-muted-foreground font-normal ml-1.5">
                            {testimonial.handle}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                        {testimonial.project &&
                          ` \u00B7 ${testimonial.project}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={600} className="mt-10 sm:mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            See the images on the{" "}
            <a
              href="/gallery"
              className="text-primary hover:underline underline-offset-4"
            >
              Gallery page
            </a>
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
