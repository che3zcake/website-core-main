"use client"

import { useMemo } from "react"

interface DataPoint {
  date: string
  stars: number
}

interface StarChartProps {
  data: DataPoint[]
  className?: string
}

function formatStarCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    // Show one decimal for values like 19.6k, but not for round numbers like 5k
    if (k >= 10) return `${k.toFixed(1)}k`
    return `${k.toFixed(1)}k`
  }
  return n.toLocaleString()
}

function formatEndLabel(n: number): string {
  // For the current value label, show more precision: "19.6k" not "20k"
  if (n >= 1000) {
    const k = n / 1000
    return `${k.toFixed(1)}k`
  }
  return n.toLocaleString()
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

export function StarChart({ data, className }: StarChartProps) {
  const chart = useMemo(() => {
    if (data.length < 2) return null

    const width = 800
    const height = 280
    const padTop = 30
    const padBottom = 45
    const padLeft = 60
    const padRight = 25

    const chartW = width - padLeft - padRight
    const chartH = height - padTop - padBottom

    const maxStars = Math.max(...data.map((d) => d.stars))
    // Round up max to a clean number for nice Y ticks
    const niceMax = Math.ceil(maxStars / 5000) * 5000
    const minDate = new Date(data[0].date).getTime()
    const maxDate = new Date(data[data.length - 1].date).getTime()
    const dateRange = maxDate - minDate || 1

    const points = data.map((d) => ({
      x: padLeft + ((new Date(d.date).getTime() - minDate) / dateRange) * chartW,
      y: padTop + chartH - (d.stars / niceMax) * chartH,
      stars: d.stars,
      date: d.date,
    }))

    // Smooth curve using cardinal spline
    const linePath = points
      .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
      .join(" ")

    const areaPath = `${linePath} L ${points[points.length - 1].x},${padTop + chartH} L ${points[0].x},${padTop + chartH} Z`

    // Y-axis — 5 ticks at clean intervals
    const yTickCount = 4
    const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => {
      const val = Math.round((niceMax / yTickCount) * i)
      const y = padTop + chartH - (val / niceMax) * chartH
      return { val, y }
    })

    // X-axis — max 4 labels to avoid overlap, evenly spaced
    const xTickCount = Math.min(4, data.length)
    const xTicks: { x: number; label: string }[] = []
    const usedLabels = new Set<string>()

    for (let i = 0; i < xTickCount; i++) {
      const idx = Math.round((i / (xTickCount - 1)) * (data.length - 1))
      const d = data[idx]
      const x = padLeft + ((new Date(d.date).getTime() - minDate) / dateRange) * chartW
      const label = formatDateShort(d.date)
      // Skip duplicate month labels
      if (!usedLabels.has(label)) {
        usedLabels.add(label)
        xTicks.push({ x, label })
      }
    }

    // Ensure minimum spacing between x labels (~120px)
    const filteredXTicks: typeof xTicks = []
    for (const tick of xTicks) {
      const lastTick = filteredXTicks[filteredXTicks.length - 1]
      if (!lastTick || tick.x - lastTick.x >= 120) {
        filteredXTicks.push(tick)
      }
    }

    return {
      width,
      height,
      points,
      linePath,
      areaPath,
      yTicks,
      xTicks: filteredXTicks,
      padTop,
      padBottom,
      padLeft,
      padRight,
      chartH,
      chartW,
      niceMax,
    }
  }, [data])

  if (!chart) {
    return (
      <div className="flex items-center justify-center h-[280px] text-sm text-muted-foreground">
        Not enough data to display chart
      </div>
    )
  }

  const lastPoint = chart.points[chart.points.length - 1]
  const lastStars = data[data.length - 1]?.stars ?? 0

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Star history chart showing growth to ${lastStars.toLocaleString()} stars`}
      >
        <defs>
          <linearGradient id="starAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {chart.yTicks.map((tick) => (
          <line
            key={tick.val}
            x1={chart.padLeft}
            y1={tick.y}
            x2={chart.padLeft + chart.chartW}
            y2={tick.y}
            stroke="oklch(1 0 0 / 0.04)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <path d={chart.areaPath} fill="url(#starAreaGrad)" />

        {/* Main line */}
        <path
          d={chart.linePath}
          fill="none"
          stroke="oklch(0.696 0.17 162.48)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
        />

        {/* Key data point dots — show ~5 evenly spaced */}
        {chart.points
          .filter(
            (_, i) =>
              i === 0 ||
              i === chart.points.length - 1 ||
              i % Math.max(1, Math.floor(chart.points.length / 4)) === 0
          )
          .map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="oklch(0.10 0.012 166)"
              stroke="oklch(0.696 0.17 162.48)"
              strokeWidth="1.5"
            />
          ))}

        {/* Last point — larger with glow */}
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r="4.5"
          fill="oklch(0.696 0.17 162.48)"
          filter="url(#lineGlow)"
        />

        {/* Current value label */}
        <text
          x={lastPoint.x}
          y={lastPoint.y - 14}
          textAnchor="end"
          className="text-[12px] font-semibold"
          fill="oklch(0.696 0.17 162.48)"
          fontFamily="var(--font-mono, monospace)"
        >
          {formatEndLabel(lastStars)} stars
        </text>

        {/* Y-axis labels */}
        {chart.yTicks.map((tick) => (
          <text
            key={tick.val}
            x={chart.padLeft - 12}
            y={tick.y + 4}
            textAnchor="end"
            fill="oklch(0.72 0.05 166)"
            fontSize="11"
            fontFamily="var(--font-mono, monospace)"
          >
            {formatStarCount(tick.val)}
          </text>
        ))}

        {/* X-axis labels */}
        {chart.xTicks.map((tick, i) => (
          <text
            key={i}
            x={tick.x}
            y={chart.padTop + chart.chartH + 24}
            textAnchor="middle"
            fill="oklch(0.72 0.05 166)"
            fontSize="11"
            fontFamily="var(--font-mono, monospace)"
          >
            {tick.label}
          </text>
        ))}

        {/* Baseline */}
        <line
          x1={chart.padLeft}
          y1={chart.padTop + chart.chartH}
          x2={chart.padLeft + chart.chartW}
          y2={chart.padTop + chart.chartH}
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
