# Design Analysis Report: What Makes Premium Dev Tool Landing Pages Work

Research based on: **Greptile**, **SafeDep**, **Zed**, **Soloterm**
Applied framework: UI/UX Pro Max (style, typography, color, layout rules)

---

## 1. The "Contained Content" Pattern

The single biggest pattern across all 4 sites: **content lives inside clearly bounded rectangular zones**. This isn't just `max-width` — it's a deliberate architectural choice.

### How Each Site Does It

| Site | Container Strategy | What Makes It Work |
|------|-------------------|-------------------|
| **Greptile** | `max-w-[1500px]` with `border-x border-border` — vertical border lines on both sides of the page | Content feels like it's inside a **column/newspaper layout**. The side borders create an implicit "page" on the screen. |
| **Zed** | Nested grid with `border-x`, `border-r`, `border-b` on individual sections. Corner decorations (45° rotated squares) at boundaries | Feels like a **technical blueprint**. Each section is a compartment. The corner diamonds are a signature detail. |
| **SafeDep** | Full-bleed dark background with constrained inner content (~1280px). Cards have subtle borders on dark surfaces | **Floating cards on dark void** effect. The contrast between full-bleed dark and bounded content creates depth. |
| **Soloterm** | Max-width with generous padding (`px-24 xl:px-32`). Horizontal rules (`<hr>`) between every section | **Clean editorial** feel. Sections are defined by whitespace and horizontal lines, not container borders. |

### The Principle

> Content that touches the edges of the screen feels unfinished. Content inside a visible boundary feels **designed**.

For GitNexus, the recommendation is:

```
Outer wrapper: max-w-[1200px] mx-auto
Border treatment: border-x border-white/[0.04] (subtle vertical rails)
Section dividers: border-b border-white/[0.04] between sections
No border-radius on the main container — sharp, architectural
```

---

## 2. Color Palette Comparison

### Background Colors (Dark Mode)

| Site | Background | Card/Surface | Why It Works |
|------|-----------|-------------|-------------|
| **Greptile** | Adaptive (light/dark toggle) | `bg-background` semantic | Neutral, not opinionated |
| **Zed** | `#282c33` (dark editor gray) | `#2e343e` (element bg) | **Cool gray, not pure black** — feels like a code editor |
| **SafeDep** | `#000000` (true black) | `rgb(3, 6, 32)` (deep navy) | OLED black with navy tint — dramatic and deep |
| **Soloterm** | Deep navy/charcoal `#1A1F2E` | White cards for contrast | Dark base, light cards — **creates elevation without shadows** |

### Accent Colors

| Site | Primary Accent | Secondary | Usage |
|------|---------------|-----------|-------|
| **Greptile** | Green, Orange, Pink, Yellow | Multi-color badges | **Categorical** — each feature gets its own color |
| **Zed** | `hsl(228, 100%, 60%)` — Bright blue | `#74ade8` (soft cyan) | **Single hue** — blue for all interactive elements |
| **SafeDep** | `#4360e0` (Blue) | `#9240b5` (Purple) | **Dual accent** — blue for actions, purple for highlights |
| **Soloterm** | `#3B82F6` (Blue) | Process status colors (green/red) | **Functional** — blue for UI, semantic colors for status |

### What This Means for GitNexus

Your emerald green (`oklch 0.696 0.17 162.48`) is strong and distinctive — none of these competitors use green. That's an advantage. But the background needs refinement:

**Current:** `oklch(0.10 0.012 166)` — very dark with a slight green tint
**Recommendation:** Lean into a **slightly warmer dark** or go **true dark with green reserved only for accents**:

```
Background:     oklch(0.09 0.005 166)    — nearly black, barely green
Surface/Card:   oklch(0.12 0.008 166)    — subtle lift
Border:         oklch(1 0 0 / 0.06)      — white at 6% (you already have this)
Accent:         oklch(0.696 0.17 162.48) — your emerald (keep it)
Text primary:   oklch(0.93 0 0)          — off-white, not pure white
Text muted:     oklch(0.55 0.02 166)     — desaturated green-gray
```

The key insight: **the darker the background, the more your emerald green pops**. SafeDep's true black + blue accent is the most dramatic pairing. Your near-black + emerald can hit the same level.

---

## 3. Typography Comparison

### Font Choices

| Site | Display/Heading | Body | Mono | Vibe |
|------|----------------|------|------|------|
| **Greptile** | TASAOrbiter | Inter | GeistMono | Technical, precise |
| **Zed** | Plex Serif (450 weight) | System UI | - | **Serif in nav is a signature move** — warm + technical |
| **SafeDep** | Mona Sans | Inter Tight | Chivo Mono | Clean, modern, GitHub-adjacent |
| **Soloterm** | System stack | System stack | - | Invisible typography — content first |

### What Works Best for Dev Tools

The standout is **Zed's use of a serif font** at `font-weight: 450`. It breaks the monotony of all-sans-serif dev sites and adds personality. But it requires confidence — you can't half-commit to serif.

**For GitNexus, recommendation:**

```
Headings:   Inter (already using) — keep it, it's the industry standard
Body:       Inter — consistent with headings
Mono:       Geist Mono (already using) — perfect for terminal blocks
```

Don't change fonts — **change how you use them**:

### Typography Scale (from the research)

| Level | Size (mobile) | Size (desktop) | Weight | Letter-spacing |
|-------|--------------|----------------|--------|---------------|
| Hero heading | 28px (text-[28px]) | 56px (text-[56px]) | 700 | -0.03em (tracking-tight) |
| Section heading | 22px | 36px | 700 | -0.02em |
| Card title | 16px | 18px | 600 | 0 |
| Body | 14px | 16px | 400 | 0 |
| Caption/label | 12px | 13px | 500 | 0.01em |
| Mono/terminal | 13px | 14px | 400 | 0 |

The key difference between your site and these 4: **they use tighter letter-spacing on headings** (`tracking-tight` or `tracking-tighter`) and **heavier weights** (700, not 600). Small change, big impact.

---

## 4. Layout Architecture

### The Content Column Pattern

Every site follows this structure:

```
┌─────────────────────── viewport ───────────────────────┐
│                                                         │
│   ┌─────────── max-w-[1200px] container ──────────┐    │
│   │                                                │    │
│   │  ┌──────── max-w-[800px] text content ──────┐  │    │
│   │  │  Heading                                  │  │    │
│   │  │  Subtitle                                 │  │    │
│   │  └──────────────────────────────────────────┘  │    │
│   │                                                │    │
│   │  ┌──── full container width for grids/media ─┐  │    │
│   │  │  [Card] [Card] [Card] [Card]              │  │    │
│   │  └──────────────────────────────────────────┘  │    │
│   │                                                │    │
│   │  ─────────── divider line ──────────────────   │    │
│   │                                                │    │
│   └────────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Two widths:**
1. **Outer container**: `max-w-[1200px]` for cards, grids, media
2. **Inner text column**: `max-w-[640px]` or `max-w-[720px]` for headings + body text

Text never spans the full 1200px — that's what makes line lengths readable (per `line-length-control` rule: 60-75 chars on desktop).

### Section Spacing (from research)

| Between sections | Greptile | Zed | SafeDep | Soloterm |
|-----------------|---------|-----|---------|---------|
| Vertical padding | `<hr>` dividers | Border-based | 64px+ gaps | `<hr>` + whitespace |
| Inner heading→content | 24-32px | 16-24px | 24-32px | 32px |

**Current GitNexus:** `py-16 md:py-20` on all sections — this is fine but needs **visible dividers** between sections to match the trend.

---

## 5. Border & Shadow System

### The Pattern: Borders > Shadows

All 4 sites prefer **thin borders over shadows** for depth. This is THE defining characteristic of modern dev tool design.

| Technique | Usage |
|-----------|-------|
| `border: 1px solid white/6%` | Card boundaries, section dividers |
| `border-x` on page container | Vertical "rails" that frame the content |
| `hover: border-color transition` | Cards reveal their boundaries on hover |
| **No drop shadows on cards** | Flat design with border-defined hierarchy |
| Shadows only for elevated UI | Modals, dropdowns, popovers |

**Zed's specific approach:**
```css
/* Default card — invisible border */
border: 1px solid transparent;

/* Hover — border appears */
border-color: hsl(228, 100%, 60% / 0.2);
background: hsl(228, 100%, 60% / 0.03);
```

This "ghost border that appears on hover" is a premium pattern.

---

## 6. What You Should Change for GitNexus

### High-Impact Changes (implement these)

**A. Add vertical border rails to the page**
```html
<div class="mx-auto max-w-[1200px] border-x border-white/[0.04]">
  <!-- all sections go inside this -->
</div>
```
This single change will make the entire page feel more designed.

**B. Add section dividers**
Between every section, add:
```html
<div class="max-w-[1200px] mx-auto">
  <hr class="border-white/[0.04]" />
</div>
```

**C. Constrain text to a narrower column**
Headings and body text should max out at `max-w-[640px]`, not `max-w-3xl` (768px):
```html
<div class="mx-auto max-w-[640px] text-center">
  <h2>...</h2>
  <p>...</p>
</div>
```

**D. Darken the background further**
```css
--background: oklch(0.08 0.005 166);  /* from 0.10 */
--card: oklch(0.11 0.008 166);        /* from 0.14 */
```
Darker = more contrast = more premium feel.

**E. Use ghost borders on cards**
```css
/* Default: invisible border */
border: 1px solid transparent;

/* Hover: border + tint appear */
border-color: oklch(0.696 0.17 162.48 / 0.15);
background: oklch(0.696 0.17 162.48 / 0.03);
```

**F. Tighten heading letter-spacing**
All headings should use `tracking-tight` (-0.025em) or `tracking-tighter` (-0.05em). Currently some headings use `tracking-tight` and some don't.

---

## 7. Color Recommendations for GitNexus

Based on analysis of all 4 sites + UI/UX Pro Max color rules:

### Recommended Palette

```
BACKGROUNDS
  Page:           oklch(0.08 0.005 166)     #0a0f0e  (near-black, barely green)
  Surface:        oklch(0.11 0.008 166)     #131917  (cards, containers)
  Elevated:       oklch(0.14 0.010 166)     #1a201e  (modals, popovers)

BORDERS
  Subtle:         oklch(1 0 0 / 0.04)                (section dividers, rails)
  Default:        oklch(1 0 0 / 0.06)                (card borders)
  Emphasis:       oklch(0.696 0.17 162.48 / 0.20)    (hover, focus)

TEXT
  Primary:        oklch(0.93 0 0)                     (headings, important)
  Secondary:      oklch(0.72 0.02 166)                (body text)
  Muted:          oklch(0.50 0.02 166)                (captions, labels)

ACCENT
  Primary:        oklch(0.696 0.17 162.48)            (emerald — keep)
  Primary hover:  oklch(0.65 0.16 162.48)             (slightly darker)
  Primary tint:   oklch(0.696 0.17 162.48 / 0.10)    (backgrounds)

SEMANTIC
  Destructive:    oklch(0.704 0.191 22.216)           (errors — keep)
  Success:        oklch(0.696 0.17 162.48)            (same as primary)
  Warning:        oklch(0.75 0.15 85)                 (amber)
```

### Why This Works
- **Near-black background** makes the emerald accent electric (SafeDep effect)
- **White borders at 4-6%** are the industry standard — invisible until you look for them
- **Text at 0.93 lightness** is off-white, not #fff — reduces eye strain, feels softer
- **Muted text at 0.50** creates a clear 3-tier hierarchy (primary → secondary → muted)

---

## 8. Typography Recommendations

### Font Stack (keep current)
```
Sans:  Inter (headings + body)
Mono:  Geist Mono (terminal, code, data)
```

### Scale (update to this)

```css
/* Mobile → Desktop */
--text-hero:      28px → 56px    (font-weight: 700, letter-spacing: -0.03em)
--text-section:   22px → 36px    (font-weight: 700, letter-spacing: -0.02em)
--text-card-title: 16px → 18px   (font-weight: 600)
--text-body:      14px → 16px    (font-weight: 400, line-height: 1.6)
--text-small:     12px → 13px    (font-weight: 500)
--text-mono:      13px → 14px    (font-weight: 400, Geist Mono)
```

### Key Principle
> Headings should be **bolder and tighter** than you think. Body should be **lighter and more spacious** than you think. The contrast between the two is what creates hierarchy.

---

## Summary: The 5 Things That Make These Sites Look Premium

1. **Contained content** — Vertical border rails + max-width create a "designed page" feel
2. **Borders over shadows** — Thin, nearly-invisible borders that appear on hover
3. **Dark background with high-contrast accents** — Near-black + one saturated color
4. **Tight heading typography** — Bold weight + negative letter-spacing + large size gap from body
5. **Section rhythm** — Visible dividers between sections, consistent vertical padding, narrow text columns inside wider container grids

Your site has good bones. These changes would push it from "well-built" to "clearly designed."
