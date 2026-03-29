"use client"

import { Icon } from "@/components/ui/evervault-card"
import { cn } from "@/lib/utils"

interface CornerCardProps {
  children: React.ReactNode
  className?: string
  featured?: boolean
}

export function CornerCard({ children, className, featured }: CornerCardProps) {
  return (
    <div
      className={cn(
        "corner-card relative p-4 sm:p-6",
        featured && "border-white/[0.25]",
        className
      )}
    >
      <Icon className="absolute size-6 -top-3 -left-3 text-white/60" />
      <Icon className="absolute size-6 -top-3 -right-3 text-white/60" />
      <Icon className="absolute size-6 -bottom-3 -left-3 text-white/60" />
      <Icon className="absolute size-6 -bottom-3 -right-3 text-white/60" />
      {children}
    </div>
  )
}
