"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/ui/animated-section"

const languages = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Kotlin",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "C",
  "C++",
]

export function Languages() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-primary/[0.03] to-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <AnimatedSection className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            13 Languages Supported
          </h2>
          <p className="text-lg text-muted-foreground">
            Full parsing and analysis support for the most popular programming languages.
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {languages.map((lang, index) => (
            <AnimatedSection key={lang} delay={index * 50} direction="up">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium transition-transform duration-300 hover:scale-110 cursor-default"
              >
                {lang}
              </Badge>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
