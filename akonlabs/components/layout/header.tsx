"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  )
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Open Source", href: "/#open-source" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileMenuOpen, closeMobile])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/70 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-6 sm:px-12 md:px-16 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/akonlabs_logo-removebg-preview.png"
            alt="Akon Labs"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="text-[15px] font-semibold tracking-tight">Akon Labs</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-1 py-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-full",
                  pathname === item.href
                    ? "text-foreground bg-white/[0.07]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://discord.gg/S388T3da"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-8 items-center justify-center rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label="Discord"
          >
            <DiscordIcon className="size-3.5" />
          </a>
          <Button size="sm" className="rounded-lg text-xs h-8 px-4 font-semibold" asChild>
            <a href="https://app.akonlabs.com">Get Started</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04] active:scale-95 transition-all duration-150"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-out",
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-8 sm:px-12 py-4 flex flex-col gap-1 border-t border-white/[0.06]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground px-3 py-2.5 rounded-lg active:bg-white/[0.04]",
                pathname === item.href
                  ? "text-foreground bg-white/[0.04]"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-white/[0.06]">
            <Button size="sm" variant="outline" asChild className="w-full">
              <a href="https://discord.gg/S388T3da" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </Button>
            <Button size="sm" asChild className="w-full">
              <a href="https://app.akonlabs.com">Get Started</a>
            </Button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/30 backdrop-blur-sm md:hidden -z-10"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
