# GitNexus Website — Design Upgrade Implementation Plan

Inspired by **soloterm.com** and **zed.dev**, this plan outlines specific design upgrades to make the GitNexus website feel like it was crafted by a professional UI/UX designer.

---

## Current State vs Target

**Current:** Clean, functional SaaS landing page with consistent emerald branding. Looks good but feels like a "shadcn template with content."

**Target:** A premium developer-tool website that feels intentional, confident, and polished — like Zed and Solo — where every pixel has purpose.

---

## 1. HEADER — Frosted Glass + Tighter Layout

**Inspiration:** Zed's header is ~57px tall, uses system-level blur, and has clear hierarchy. Solo uses minimal nav with a single prominent CTA.

**Current Problem:** Header looks generic — standard border-b, basic backdrop-blur. Nav items have no visual weight distinction.

**Changes:**
- Reduce header height from `h-16` (64px) to `h-14` (56px) for a tighter, more intentional feel
- Replace `border-primary/10` with a subtle `border-b border-white/[0.06]` (barely visible line)
- Increase backdrop blur: `backdrop-blur-xl` instead of just `backdrop-blur`
- Add a faint gradient to the header background: `bg-gradient-to-b from-background/80 to-background/60`
- Make "Get Started" button use a subtle glow on hover:
  ```
  shadow-[0_0_20px_oklch(0.696_0.17_162.48/0.3)]
  ```
- Add an active nav indicator — a small 2px emerald dot or underline below the current page link, not just a color change
- Logo should be slightly larger and bolder — consider adding a small icon/mark next to "Akon Labs"

**Visual Reference:**
```
┌──────────────────────────────────────────────────────────────┐
│  ● Akon Labs     Home  Testimonials  Gallery    [Discord] [Get Started] │
│  ─── frosted glass, barely-visible bottom border ────────────│
└──────────────────────────────────────────────────────────────┘
         ^^                                          ^^
     logo mark                              glow on hover
```

---

## 2. HERO — Cinematic, Confidence-Driven

**Inspiration:** Zed uses a serif font for "Love your editor again" — it's bold, emotional, and breaks from the monospace developer cliche. Solo uses full-width decorative patterns with layered depth.

**Current Problem:** Hero has the right pieces (badge, heading, video) but feels safe. The background image + gradient overlay is standard. The heading could be more impactful.

**Changes:**

### 2a. Background Overhaul
- Remove the static cover.jpeg background image
- Replace with a **dark gradient mesh** using CSS:
  ```
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.696 0.17 162.48 / 0.15), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, oklch(0.696 0.17 162.48 / 0.08), transparent),
    radial-gradient(ellipse 50% 50% at 20% 60%, oklch(0.508 0.118 165.612 / 0.06), transparent);
  ```
- This creates a subtle, ambient emerald glow that feels organic — no image dependency, loads instantly, looks premium

### 2b. Typography Upgrade
- Make the hero heading significantly larger: `text-5xl md:text-7xl lg:text-8xl`
- Use tighter letter-spacing on the heading: `tracking-tighter` (-0.05em)
- The gradient text "agent context" should glow faintly:
  ```
  drop-shadow: 0 0 30px oklch(0.696 0.17 162.48 / 0.4)
  ```
- Subheading should be slightly wider max-width and `text-lg md:text-xl` with `text-muted-foreground/80`

### 2c. CTA Buttons
- Primary "Get Started" button should have a **glow ring** on hover:
  ```
  hover:shadow-[0_0_30px_oklch(0.696_0.17_162.48/0.4)]
  transition-shadow duration-300
  ```
- Secondary "npx gitnexus analyze" button should look like a real terminal prompt:
  - Dark background `bg-card/80`
  - Green `$` prefix
  - Monospace font
  - Subtle border glow on hover
  - Copy-to-clipboard icon on the right

### 2d. Video Section
- Add a **subtle noise texture overlay** on the video container (CSS grain effect):
  ```css
  .noise::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,..."); /* tiny noise SVG */
    opacity: 0.03;
    pointer-events: none;
  }
  ```
- The video border should pulse very subtly (like a heartbeat) using the primary color — signals "this is alive"
- Add a "Watch Demo" label with a play icon BELOW the video frame, not overlaid

**Visual Reference:**
```
            ┌─────────────────────────────────────────┐
            │                                         │
            │        ✦ Introducing GitNexus           │
            │                                         │
            │    Building the nervous system          │
            │       for  ✨agent context✨             │
            │                                         │
            │    Indexes any codebase into a           │
            │    knowledge graph...                    │
            │                                         │
            │    [■ Get Started]   [$ npx gitnexus]   │
            │                                         │
            │    ┌─────────────────────────────────┐  │
            │    │   ▶ Demo Video                  │  │
            │    │   (with subtle border glow)     │  │
            │    └─────────────────────────────────┘  │
            │              ambient mesh gradient bg    │
            └─────────────────────────────────────────┘
```

---

## 3. PROBLEM-SOLUTION — Visual Storytelling Like Solo

**Inspiration:** Solo uses a "The Issue" / "The Fix" toggle pattern — two states, one view. This is cleaner than side-by-side cards.

**Current Problem:** The before/after cards work but feel like a template. The beam diagram is excellent but the cards below it compete for attention.

**Changes:**
- Convert the before/after to a **tab-toggle** component:
  - Two tabs: "Without GitNexus" (red) | "With GitNexus" (green)
  - Single card area that transitions between the two states with a crossfade
  - Active tab has a colored indicator bar
  - This reduces visual noise and adds interactivity
- The beam diagram should be the hero of this section — give it more vertical space (`h-[320px]` → `h-[380px]`)
- Add faint dotted grid lines behind the beam diagram for a "technical blueprint" feel:
  ```css
  background-image: radial-gradient(circle, oklch(0.696 0.17 162.48 / 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
  ```
- The "Precomputed Relational Intelligence" card should use a colored left border accent (`border-l-2 border-primary`) instead of a full border

---

## 4. FEATURES — Bento Grid with Depth

**Inspiration:** Modern SaaS sites (Linear, Raycast) use bento grids where featured cards have distinct background treatments. Zed uses asymmetric layouts with media.

**Current Problem:** Feature cards all look the same except for size. The "Knowledge Graph" card has a code block but visually blends in.

**Changes:**
- **Featured card (Knowledge Graph)** should have:
  - A distinct darker background: `bg-primary/[0.08]` instead of `bg-card/50`
  - A faint emerald gradient border (animated on hover):
    ```
    background: linear-gradient(135deg, primary/30, transparent, primary/20)
    ```
  - The terminal code block inside should have syntax-colored output (green for `$`, dim for paths, bright for values)

- **All cards** should have:
  - A dotted grid background on hover (like technical paper)
  - Icon background should transition from `bg-primary/10` to `bg-primary/20` with a scale effect on hover
  - Subtle top-border gradient that appears on hover (like the testimonial cards already have):
    ```
    border-top: 2px solid transparent → linear-gradient(to right, primary/0, primary, primary/0)
    ```

- **Add visual separators** between the bento rows — a thin horizontal `<Separator>` with `bg-primary/5` between row groups

**Visual Reference:**
```
┌─────────────────────────────┬──────────────┬──────────────┐
│                             │              │              │
│   ◈ Knowledge Graph         │  ◎ Impact    │  ◎ Hybrid    │
│   (FEATURED - darker bg,    │   Analysis   │   Search     │
│    gradient border,         │              │              │
│    syntax-colored terminal) ├──────────────┼──────────────┤
│                             │              │              │
│                             │  ◎ Multi     │  ◎ 100%      │
│                             │   Repo       │   Local      │
├─────────────────────────────┴──────────────┴──────────────┤
│  ◎ Wiki Generation (wide)          │  ◎ Git-Diff  │ ◎ Web │
└─────────────────────────────────────┴──────────────┴──────┘
     ^^^ each card gets a top-border glow on hover
```

---

## 5. HOW IT WORKS — Pipeline Visualization Upgrade

**Current Problem:** The 6-step pipeline is functional but looks like a basic grid of cards. The bouncing arrow is distracting.

**Changes:**
- Connect the steps with a **horizontal line/connector** between them (on desktop):
  ```
  [1] ──── [2] ──── [3] ──── [4] ──── [5] ──── [6]
  ```
  Use a thin `1px` line in `bg-primary/20` with small circles at connection points
- The step numbers should have a **ring effect**: outer ring `ring-2 ring-primary/20 ring-offset-2 ring-offset-background`
- Replace the bouncing arrow with a simple static chevron `ChevronDown` with `text-primary/40`
- The output cards below should be visually distinct from the pipeline — use a `bg-primary/[0.08]` tint and a left-aligned icon layout instead of centered

---

## 6. MCP TOOLS — Terminal-Inspired Design

**Inspiration:** Developer tools should look like developer tools. This section describes CLI tools — it should feel like a terminal.

**Current Problem:** The tool cards are generic. Nothing says "these are CLI tools."

**Changes:**
- Wrap the entire tools grid in a **terminal-like container**:
  ```
  ┌─ MCP Tools ──────────────────────────────────────┐
  │  $ gitnexus query      Search your entire...     │
  │  $ gitnexus context    360-degree view of...     │
  │  $ gitnexus impact     Full blast radius...      │
  │  ...                                              │
  └──────────────────────────────────────────────────┘
  ```
  - Dark card background `bg-[oklch(0.10_0.01_166)]`
  - Top bar with three colored dots (red/yellow/green) and "MCP Tools" title
  - Tool names in `font-mono text-primary` with `$` prefix
  - Descriptions in `text-muted-foreground`
- Each tool row should have a subtle hover: highlight the row with `bg-primary/5`
- Remove the background image from this section — the terminal container IS the visual

---

## 7. INTEGRATIONS — Highlight Hierarchy

**Current Problem:** Claude Code is "highlighted" but visually it's barely different from the others.

**Changes:**
- Claude Code card should be **significantly different**:
  - Full `bg-primary/10` background
  - A "Recommended" or "Deepest Integration" badge in the corner
  - Checkmarks should be filled circles instead of plain checks
  - A faint animated border (subtle shimmer)
- Other cards should be more muted: `border-white/[0.04]` borders, no hover glow
- Add a comparison table BELOW the cards showing MCP / Skills / Hooks in a grid with checkmarks and x-marks — visual decision-making aid

---

## 8. LANGUAGES — Merge Into Features or Integrations

**Current Problem:** Full section with `py-24` for a single row of badges is wasted space.

**Changes:**
- **Option A (Recommended):** Move languages into the Integrations section as a sub-section:
  ```
  Supported Editors
  [cards...]

  ── 13 Languages ──
  [TS] [JS] [Python] [Java] ... (inline badges, no heading)
  ```

- **Option B:** Keep separate but make it a slim `py-12` strip with no section heading — just the badges in a row with a subtle label

---

## 9. CTA — Make It Impossible to Ignore

**Inspiration:** Zed's download section is simple but the button is the clearest thing on the page. Solo repeats their CTA prominently.

**Current Problem:** CTA section has equal-weight buttons and modest styling. This is the conversion moment — it should feel climactic.

**Changes:**
- Background: Replace subtle gradient with a **radial glow** centered behind the heading:
  ```
  radial-gradient(circle at 50% 40%, oklch(0.696 0.17 162.48 / 0.15) 0%, transparent 60%)
  ```
- "Get Started" button should be **2x larger** than anywhere else on the page:
  - `text-lg px-8 py-4` (not just `size-lg`)
  - Permanent subtle glow: `shadow-[0_0_40px_oklch(0.696_0.17_162.48/0.3)]`
  - Animate the glow with a slow pulse (2s cycle)
- "View Documentation" should be clearly secondary — `variant="ghost"` with just an underline
- The terminal code block should have a **copy button** on the right side
- Add a **trust line** below the buttons: "Trusted by 13,000+ developers" with the GitHub star count

---

## 10. FOOTER — Professional & Dense

**Inspiration:** Zed has a 4-column footer with clean hierarchy. Solo adds comparison/alternative links.

**Current Problem:** Footer is functional but sparse. Legal section has non-linked text.

**Changes:**
- Add a **top section** before the columns: Repeat the logo large + tagline + primary CTA button
- Add a 5th column or row for "Comparison" links (vs Tree-sitter, vs grep, vs manual review)
- Style the footer with a slightly different background: `bg-card/30` with a top border gradient
- Add social links with icons (GitHub, Discord, X/Twitter)
- Copyright line should be on a separate row with a full-width separator above it

---

## 11. GLOBAL DESIGN TOKENS — Consistency Pass

These changes apply everywhere:

### Shadows (define 3 tiers):
```css
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
--shadow-md: 0 4px 12px oklch(0 0 0 / 0.08);
--shadow-lg: 0 8px 24px oklch(0 0 0 / 0.12);
--shadow-glow: 0 0 30px oklch(0.696 0.17 162.48 / 0.3);
```

### Borders (standardize):
```css
--border-subtle: oklch(1 0 0 / 0.06);       /* barely visible */
--border-default: oklch(1 0 0 / 0.10);      /* standard */
--border-emphasis: oklch(0.696 0.17 162.48 / 0.30); /* highlighted */
```

### Background noise texture:
Add a global subtle noise overlay at `opacity: 0.02` across the entire page body. This adds "grain" that makes flat backgrounds feel textured and premium:
```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("data:image/svg+xml,...noise-pattern...");
  opacity: 0.02;
  pointer-events: none;
  z-index: 9999;
}
```

### Dot-grid background utility:
```css
.dot-grid {
  background-image: radial-gradient(circle, oklch(0.696 0.17 162.48 / 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## 12. TESTIMONIALS PAGE — Social Proof Like Zed

**Inspiration:** Zed uses attributed quotes from recognizable developers (Dan Abramov, Jose Valim) with GitHub avatars. Clean, credible, no fluff.

**Current Problem:** All cards look identical. Heavy quotes without visual anchoring. Stats might be stale.

**Changes:**
- **Featured testimonial** (David Ostby / GraphRAG pioneer): Pull out as a hero-sized quote at the top — large serif text, larger avatar, distinct background
- **Group testimonials by theme**: "Blast Radius Analysis", "Architecture & Design", "Community Reactions"
- Add **source icons** (Reddit alien, X bird, LinkedIn logo) next to the source badges — visual recognition is faster than reading
- Stats bar should link to live sources (GitHub stars badge from shields.io, npm downloads badge)
- Consider a **horizontal scrolling marquee** for shorter quotes (like "Game-changer!", "Stunning & informative") as social proof ticker

---

## 13. MOBILE MENU — Slide-In Drawer

**Current Problem:** Menu toggles visibility instantly with no animation, no overlay.

**Changes:**
- Animate the mobile menu as a **slide-down drawer** with `transition-all duration-200`:
  ```
  transform: translateY(-100%) → translateY(0)
  opacity: 0 → 1
  ```
- Add a semi-transparent backdrop overlay: `bg-black/20 backdrop-blur-sm`
- Close on outside click and on Escape key
- Add a subtle spring easing for natural feel

---

## Priority Order for Implementation

| Phase | Changes | Impact | Effort |
|-------|---------|--------|--------|
| **Phase 1** | Hero background mesh + typography + CTA glow | Very High | Medium |
| **Phase 2** | Global design tokens (shadows, borders, noise) | High | Low |
| **Phase 3** | Feature bento grid upgrade | High | Medium |
| **Phase 4** | MCP Tools terminal design | High | Medium |
| **Phase 5** | Header refinement + mobile drawer | Medium | Low |
| **Phase 6** | CTA section overhaul | High | Low |
| **Phase 7** | Problem-solution tab toggle | Medium | Medium |
| **Phase 8** | How-it-works connectors | Medium | Low |
| **Phase 9** | Merge Languages into Integrations | Medium | Low |
| **Phase 10** | Testimonials page redesign | Medium | Medium |
| **Phase 11** | Footer upgrade | Low | Low |
| **Phase 12** | Integration highlight hierarchy | Low | Low |

---

## Design Principles (From Zed & Solo)

1. **Confidence over decoration** — Every visual element should justify its existence. If it doesn't communicate or guide, remove it.
2. **Hierarchy through restraint** — Make the important things big and bold. Make everything else quiet.
3. **Developer authenticity** — Terminal blocks, monospace type, code-aware styling. Don't over-design for developers — they notice fakes.
4. **Ambient depth over flat** — Subtle glows, noise textures, and gradient meshes > solid color blocks.
5. **Interactivity signals quality** — Tab toggles, hover reveals, copy buttons, live badges. Static pages feel dead.

---

*This plan covers 13 design areas across ~30 individual changes. Each can be implemented independently. Start with Phase 1-2 for the biggest visual impact with the least effort.*
