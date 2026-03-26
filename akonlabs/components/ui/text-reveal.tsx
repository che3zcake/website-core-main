"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate, useInView } from "motion/react"
import { cn } from "@/lib/utils"

export function TextReveal({
  words,
  className,
}: {
  words: string
  className?: string
}) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: stagger(0.02) }
      )
    }
  }, [isInView, animate])

  return (
    <span ref={scope} className={cn("inline", className)}>
      {words.split(" ").map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block opacity-0 mr-[0.25em]"
          style={{ filter: "blur(8px)" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
