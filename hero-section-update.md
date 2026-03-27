# Hero Section Layout Update

This plan outlines the steps to change the hero section's layout so the background image visually "breaks out" of the main 1200px container to fill the screen, while the content area remains within a translucent, blurred central column (matching exactly the safedep.io pattern).

## Why the black space exists
Currently, your entire app is wrapped in a `<div className="mx-auto max-w-[1200px]">` in `layout.tsx`. Because of this, the `Hero` section is constrained to 1200px width. That constraint is what forces your background image to stop at 1200px, leaving those solid black borders on the left and right sides that you highlighted with the red squiggly lines.

## Proposed Changes

### `akonlabs/app/layout.tsx`
[MODIFY] `akonlabs/app/layout.tsx`
1. Add `overflow-x-hidden` to the `<body ...>` tag.
   * *Why?* Because we are going to force the hero background image to stretch to `100vw`. Without `overflow-x-hidden` on the body, forcing elements to `100vw` often introduces a horizontal scrollbar on devices with visible OS scrollbars (like Windows).

### `akonlabs/components/sections/hero.tsx`
[MODIFY] `akonlabs/components/sections/hero.tsx`
1. **Outer `<section>` element**:
   * Change from `className="relative overflow-hidden py-12 md:py-20"` to `className="relative py-12 md:py-20"`.
   * *Why?* We must remove `overflow-hidden` so the background image inside it has permission to escape and visibly "bleed out" past the 1200px constraint.

2. **Background Image (Breakout effect)**:
   * Change the current `<div className="absolute inset-0 -z-30 ...">` wrapper of the `Image` into a breakout container:
   ```tsx
   {/* Background image — breaks out of the 1200px layout container */}
   <div className="absolute top-0 -z-30 h-full w-[100vw] left-[50%] -translate-x-[50%] overflow-hidden">
     <Image src="/assets/cover.jpeg" fill className="object-cover" alt="" priority />
   </div>
   ```
   * *Why?* By using `w-[100vw] left-[50%] -translate-x-[50%]`, the image will automatically center itself against the viewport width rather than the 1200px container. This fills those black empty spaces you pointed out!

3. **The Translucent Overlay (The Central Column)**:
   * Replace the current dark gradient overlay (`bg-gradient-to-b...`) with a frosted glass overlay:
   ```tsx
   {/* The translucent box matching only the 1200px width */}
   <div className="absolute inset-0 -z-20 bg-background/50 backdrop-blur-xl" />
   ```
   * *Why?* Because this `div` has `absolute inset-0`, it will respect its parent bounds (the 1200px section). This creates the glassmorphism effect directly inside the 1200px column. The `100vw` background image will poke out cleanly on the left and right, while remaining nicely blurred and translucent underneath your primary text and video!
