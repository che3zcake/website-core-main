"use client"

import { useState, useCallback, useRef } from "react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Mail, ArrowRight, Check, Loader2, Users, Shield, Zap } from "lucide-react"

export function Waitlist() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || !email.includes("@")) {
        setStatus("error")
        setErrorMsg("Please enter a valid email address")
        inputRef.current?.focus()
        return
      }

      setStatus("loading")

      // Simulate API call — replace with your actual waitlist API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStatus("success")
      setEmail("")
    },
    [email]
  )

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-[radial-gradient(ellipse,oklch(0.696_0.17_162.48/0.06),transparent_65%)]" />
      </div>

      <div className="px-10 sm:px-12">
        <div className="mx-auto max-w-[480px] text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary">Waitlist open</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-3">
              Get early access
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              Join the waitlist to be first in line when we launch new features.
              No spam, just updates that matter.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            {status === "success" ? (
              /* Success state */
              <div className="rounded-md border border-primary/20 bg-primary/[0.06] p-6 transition-all duration-300">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 mx-auto mb-3">
                  <Check className="size-5 text-primary" />
                </div>
                <p className="font-medium text-sm mb-1">You&apos;re on the list!</p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll notify you when new features drop.
                </p>
              </div>
            ) : (
              /* Form state */
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none" />
                    <input
                      ref={inputRef}
                      id="waitlist-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === "error") setStatus("idle")
                      }}
                      disabled={status === "loading"}
                      className="w-full h-11 rounded-lg border border-white/[0.08] bg-card/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 disabled:opacity-50 transition-all duration-150"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_oklch(0.696_0.17_162.48/0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        Join waitlist
                        <ArrowRight className="size-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p role="alert" className="text-xs text-destructive text-left pl-1">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </AnimatedSection>

          {/* Trust signals */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="size-3 text-primary/60" />
                <span>2,400+ on the waitlist</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="size-3 text-primary/60" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="size-3 text-primary/60" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
