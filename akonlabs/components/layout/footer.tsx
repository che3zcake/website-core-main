import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-card/20">
      {/* Top CTA strip */}
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-12 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/akonlabs_logo-removebg-preview.png"
              alt="Akon Labs"
              width={36}
              height={36}
              className="size-9 object-contain"
            />
            <div>
            <span className="text-xl font-bold tracking-tight">Akon Labs</span>
            <p className="text-sm text-muted-foreground mt-1">
              Building the nervous system for agent context.
            </p>
            </div>
          </div>
          <Button size="sm" className="gap-2" asChild>
            <a href="https://app.akonlabs.com">
              Get Started <ArrowRight className="size-3.5" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">GitNexus</Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/#integrations" className="hover:text-foreground transition-colors">Integrations</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://discord.gg/S388T3da" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-foreground transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Compare</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">vs Tree-sitter alone</span></li>
              <li><span className="cursor-default">vs Grep-based search</span></li>
              <li><span className="cursor-default">vs Manual code review</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">PolyForm Noncommercial 1.0.0</span></li>
              <li><span className="cursor-default">Commercial licensing available</span></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/[0.06]" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Akon Labs. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            100% Local &middot; Privacy-First &middot; Enterprise-Safe
          </p>
        </div>
      </div>
    </footer>
  )
}
