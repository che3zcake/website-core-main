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
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus("success")
      setEmail("")
    },
    [email]
  )

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[radial-gradient(ellipse,oklch(0.5_0.12_280/0.04),transparent_70%)] -z-10" />

      <div className="">
        <div className="mx-auto max-w-[480px] text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 mb-6">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/40" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400/60" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">Waitlist open</span>
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
              <div className="gradient-border-card p-6 transition-all duration-300">
                <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 mx-auto mb-3">
                  <Check className="size-5 text-emerald-400" />
                </div>
                <p className="font-medium text-sm mb-1">You&apos;re on the list!</p>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll notify you when new features drop.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/20 pointer-events-none" />
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
                      className="w-full h-12 rounded-xl border border-white/[0.07] bg-white/[0.03] pl-10 pr-4 text-sm text-foreground placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/15 disabled:opacity-50 transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 px-6 rounded-xl bg-foreground text-background text-sm font-semibold flex items-center justify-center gap-2 hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
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

                {status === "error" && (
                  <p role="alert" className="text-xs text-red-400 text-left pl-1">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="size-3 text-white/15" />
                <span>2,400+ on the waitlist</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="size-3 text-white/15" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-3 text-white/15" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
