# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite dev server with HMR
- **Build**: `npm run build` - Type-checks with `tsc -b` then builds with Vite
- **Lint**: `npm run lint` - Runs ESLint on the codebase
- **Preview**: `npm run preview` - Preview production build locally

## Architecture Overview

This is a React 19 + TypeScript + Vite landing page with advanced scroll-based animations using GSAP and Lenis smooth scrolling.

### Core Architecture Pattern

The app uses a **Provider-based architecture** with two critical context providers that wrap all routes:

1. **ModalProvider** (`src/context/ModalContext.tsx`) - Manages global modal state
2. **SmoothScrollProvider** (`src/context/SmoothScrollContext.tsx`) - Integrates Lenis smooth scrolling with GSAP ScrollTrigger

**Provider hierarchy**: `ModalProvider` → `SmoothScrollProvider` → `LayoutContent` → Routes

### Routing Structure

- Single-page app using React Router DOM
- All routes wrapped in `Layout` component which provides:
  - Global providers (Modal, SmoothScroll)
  - Persistent UI (Navbar, Footer, NoiseBackground, CursorGlow, DemoModal)
- Routes: Home (`/`), Products (`/products`, `/products/:productId`), About (`/about`), Blog (`/blog`, `/blog/:postId`), Contact (`/contact`)

### Critical Scroll Animation System

**IMPORTANT**: The codebase uses an **event-driven initialization system** to prevent GSAP bugs and ensure animations work on first load:

#### Event Flow

1. **`lenisReady` event** (SmoothScrollContext.tsx): Dispatched after Lenis initializes and syncs with ScrollTrigger
2. **`layoutReady` event** (Layout.tsx): Dispatched after DOM is stable and ready for animations
   - On first mount: Waits for `lenisReady` then dispatches after 50ms delay
   - On navigation: Dispatches after 50ms delay to ensure components have mounted

#### Component Animation Setup

**All components with scroll animations must use the layoutReady event:**

```typescript
useEffect(() => {
  let ctx: gsap.Context | null = null;
  let isSetup = false;

  const setupAnimations = () => {
    if (isSetup || !ref.current) return;
    isSetup = true;

    ctx = gsap.context(() => {
      // Set up GSAP ScrollTrigger animations here
    }, ref);
  };

  const handleLayoutReady = () => {
    setupAnimations();
  };

  window.addEventListener('layoutReady', handleLayoutReady);

  return () => {
    window.removeEventListener('layoutReady', handleLayoutReady);
    if (ctx) ctx.revert();
  };
}, []);
```

**Exception: Initial timeline animations (like HeroEnhanced)**

Components with initial entrance animations that play immediately (not on scroll) should:
1. Create a separate context for initial animations (play immediately)
2. Create a separate context for scroll-triggered animations (wait for layoutReady)

See `HeroEnhanced.tsx` for reference implementation.

#### Route Change Cleanup

**In `Layout.tsx`**: On every route change:
1. **Kills all ScrollTrigger instances** from previous route
2. **Resets scroll position** to top (both native and Lenis)
3. **Clears ScrollTrigger memory** to avoid stale state
4. **Dispatches layoutReady** after components have mounted

#### Fallback Reveal System

For simple CSS-based animations, use the `.reveal` class. Layout.tsx has an IntersectionObserver that adds `.active` class when elements enter viewport.

**Never remove or simplify this event system** - it prevents:
- Blank pages on first load
- Missing elements due to early opacity:0 state
- React errors from ScrollTrigger pinning
- Animation jitter and race conditions

### Smooth Scrolling Integration

**In `SmoothScrollContext.tsx`**:
- Lenis instance configured with 1.2s duration and custom easing
- **Synced with GSAP**: `lenisInstance.on('scroll', ScrollTrigger.update)` ensures ScrollTrigger updates with Lenis
- Integrated with `gsap.ticker` instead of requestAnimationFrame for better performance
- Provides `scrollTo` function for programmatic scrolling

### Animation Hooks

**`src/hooks/useScrollAnimation.ts`** provides reusable GSAP animation hooks:

- `useScrollAnimation` - Generic scroll-triggered animations (fadeIn, fadeInUp, scaleIn, parallax, stagger, etc.)
- `useHorizontalScroll` - Pin container and scroll horizontally
- `useTextReveal` - Split text and animate words on scroll
- `useMagnetic` - Magnetic hover effect following cursor

All hooks properly clean up GSAP contexts on unmount.

### Component Architecture

**Home page** (`src/pages/Home.tsx`) is component-based:
- Each section is a standalone component (HeroEnhanced, Features, Stats, Testimonials, etc.)
- Components use scroll animation hooks for scroll-triggered effects
- Components are composed in order to create the landing page flow

**Other pages** follow similar patterns with dedicated page components in `src/pages/`

### Styling System

- **Tailwind CSS** for utility-first styling
- **Custom theme** in `tailwind.config.js`:
  - Brand colors: `brand-{50-950}` (primary purple/indigo)
  - Dark theme: `dark-{bg,surface,card,border,text,muted,subtle}`
  - Custom animations: float, marquee, glow-line, fade-in variants, shimmer, etc.
  - Custom fonts: Plus Jakarta Sans (sans), Outfit (display)
- **TailwindMerge + clsx** for conditional class composition

### Key Dependencies

- **Animation**: `gsap` (ScrollTrigger), `lenis` (smooth scroll), `framer-motion` (alternative animations)
- **UI**: `lucide-react` (icons), `clsx` + `tailwind-merge` (class utilities)
- **Routing**: `react-router-dom` v7

## Important Notes

- This is NOT a git repository yet
- TypeScript is configured with `tsconfig.app.json` (app code) and `tsconfig.node.json` (Vite config)
- ESLint uses flat config with React hooks and React Refresh plugins
