import { Sora, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SmoothScroll } from "@/components/smooth-scroll"

const sora = Sora({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Akon Labs - Building the Nervous System for Agent Context",
  description:
    "Indexes any codebase into a knowledge graph — every dependency, call chain, cluster, and execution flow — then exposes it through smart tools so AI agents never miss code.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", sora.variable)}
    >
      <body className="min-h-screen bg-background overflow-x-hidden">
        <ThemeProvider>
          <SmoothScroll />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm">
            Skip to main content
          </a>
          <div>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
