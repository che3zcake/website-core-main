# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for **GitNexus** (by Akon Labs) — a tool that indexes codebases into knowledge graphs for AI agents. Built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui (Radix Nova style).

All source code lives in the `akonlabs/` subdirectory. Run all commands from there.

## Commands

```bash
cd akonlabs

npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint (next core-web-vitals + typescript)
npm run format       # Prettier (with tailwind plugin)
npm run typecheck    # tsc --noEmit
```

No test framework is configured.

## Architecture

**Framework:** Next.js App Router (RSC enabled). Three routes:
- `/` — Landing page composed of 8 section components
- `/testimonials` — Community feedback + stats
- `/gallery` — Image gallery from `public/assets/testimonials/`

**Component organization:**
- `components/sections/` — Page-level sections (hero, features, cta, etc.)
- `components/layout/` — Header (sticky, responsive) and Footer
- `components/ui/` — Reusable primitives (shadcn-style with CVA variants)
- `hooks/` — Custom hooks (intersection observer for scroll animations)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

**Path alias:** `@/*` maps to the `akonlabs/` root.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (no tailwind.config — config is in `globals.css` via `@theme`)
- **OKLCH color space** for all theme colors, defined as CSS custom properties in `globals.css`
- **Dark/light mode** via `next-themes` with `.dark` class strategy; default theme is dark
- **shadcn/ui** configured in `components.json` (Radix Nova style, Lucide icons)
- **Prettier** sorts Tailwind classes automatically (`prettier-plugin-tailwindcss` recognizes `cn` and `cva`)

## Behavior Rules

- **Always invoke the `ui-ux-pro-max` skill** (via `/ui-ux-pro-max`) when the user asks anything related to frontend, design, UI, or UX — including building components, reviewing designs, picking colors/fonts, improving layouts, accessibility, animations, or styling decisions. Use the skill before generating any response on these topics.

## Key Conventions

- Fonts: Inter (sans), Geist Mono (mono) — loaded in root layout
- Animation: `motion` library (Framer Motion successor) + custom CSS keyframes in `globals.css`
- `AnimatedSection` component wraps sections for scroll-triggered reveal animations
- Theme toggle: keyboard shortcut "D" toggles dark/light (implemented in `theme-provider.tsx`)
- External links: Discord (`discord.gg/S388T3da`), app (`app.akonlabs.com`)
- License: PolyForm Noncommercial 1.0.0
- Adding UI components: `npx shadcn@latest add <component>`
