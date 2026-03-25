"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Open Source", href: "/opensource" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileMenuOpen(false), [])

  // Close on escape key
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileMenuOpen, closeMobile])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/akonlabs_logo-removebg-preview.png"
            alt="Akon Labs"
            width={30}
            height={30}
            className="size-[30px] object-contain"
          />
          <span className="text-lg font-bold tracking-tight">Akon Labs</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://discord.gg/S388T3da" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </Button>
          <Button size="sm" className="hover:shadow-[0_0_20px_oklch(0.696_0.17_162.48/0.3)] transition-shadow duration-200" asChild>
            <a href="https://app.akonlabs.com">Get Started</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex size-10 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] active:scale-95 transition-all duration-150"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile navigation — slide-down drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-out",
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1 border-t border-white/[0.06]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground px-3 py-2.5 rounded-md active:bg-white/[0.04]",
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

      {/* Backdrop overlay for mobile */}
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
