# صُنع (SUNA) — Project Overview & Technical Documentation

> A single-page marketing / portfolio website for **صُنع (SUNA)** — an Arabic (RTL) creative digital studio offering photography & video production, social-account management, paid ad campaigns, and content creation. Dark-themed, motion-heavy, "Netflix-Ads-style" editorial experience.

---

## 1. What this project is

- **Type:** Server-rendered (SSR) single-page marketing site with a few sub-routes.
- **Language / direction:** Arabic, **RTL** (`dir="rtl"`, `lang="ar"`), forced **dark mode** (`class="dark"` on `<html>`).
- **Brand mark:** the word **"صُنع"** (means "made / crafted"), animated as a shared traveling logo.
- **Design language:** editorial, cinematic, "Esquire"-magazine dark aesthetic + Netflix-ad opening. Accent color = warm orange `hsl(18 88% 55%)`; teaser red `#E50914`.
- **Origin:** Generated / maintained via **[Lovable](https://lovable.dev)** (see `.lovable/`, `AGENTS.md`). Deployed on **Vercel** (see `.vercel/`).

---

## 2. Tech Stack

### Core framework
| Area | Choice | Version |
|------|--------|---------|
| Framework | **TanStack Start** (full-stack React, SSR) | `^1.168.26` |
| Routing | **TanStack Router** (file-based) | `^1.170.16` |
| Data/cache | **TanStack React Query** | `^5.101.1` |
| UI library | **React** | `^19.2.0` |
| Build tool | **Vite** | `^8.0.16` |
| Server/deploy | **Nitro** (Cloudflare target default), Vercel | `3.0.260603-beta` |
| Language | **TypeScript** | `^5.8.3` |
| Package manager | **Bun** (`bun.lock`, `bunfig.toml`) — npm lock also present | — |

### Styling
| Tool | Purpose |
|------|---------|
| **Tailwind CSS v4** (`@tailwindcss/vite`) | Utility-first styling, `@theme` inline tokens |
| **tw-animate-css** | Animation utility classes |
| **class-variance-authority (cva)** | Component variants (shadcn) |
| **clsx** + **tailwind-merge** | `cn()` class merging helper (`src/lib/utils.ts`) |
| Colors | **oklch** color space for the design system |

### Animation
| Tool | Usage |
|------|-------|
| **Framer Motion** (`framer-motion` `^12.42.2`) | Primary animation engine — every scroll effect, reveal, parallax, counters |

### UI components (shadcn / new-york style)
- **Radix UI** primitives (accordion, dialog, dropdown, popover, select, tabs, tooltip, navigation-menu, etc. — ~30 packages).
- **lucide-react** — icon library.
- Extra widgets: **cmdk** (command menu), **sonner** (toasts), **vaul** (drawer), **embla-carousel-react** (carousel), **recharts** (charts), **react-day-picker** (calendar), **input-otp**, **react-resizable-panels**.

### Forms & validation
- **react-hook-form** + **@hookform/resolvers** + **zod** (schema validation).
- **date-fns** for date handling.

### Tooling
- **ESLint 9** (flat config) + **typescript-eslint** + **eslint-plugin-react-hooks** + **eslint-plugin-react-refresh** + **eslint-plugin-prettier**.
- **Prettier** (`.prettierrc`, `.prettierignore`).
- **vite-tsconfig-paths** — `@/*` → `./src/*` alias.

---

## 3. Directory Structure

```
sunawebsite-2-/
├── AGENTS.md                     # Lovable sync notes (don't rewrite git history)
├── components.json               # shadcn config (new-york style, lucide icons)
├── vite.config.ts                # thin wrapper over @lovable.dev/vite-tanstack-config
├── tsconfig.json                 # TS config, @/* path alias, strict mode
├── eslint.config.js              # ESLint flat config
├── bunfig.toml / bun.lock        # Bun package manager
├── package-lock.json             # (npm lock also present)
├── .prettierrc / .prettierignore
├── .lovable/project.json         # Lovable template metadata
├── .vercel/project.json          # Vercel project link (project: "suna-3")
├── public/
│   └── favicon.ico
└── src/
    ├── router.tsx                # createRouter (QueryClient context, scroll restoration)
    ├── routeTree.gen.ts          # AUTO-GENERATED route tree (do not edit)
    ├── server.ts                 # SSR entry — error-normalizing fetch wrapper
    ├── start.ts                  # createStart + error middleware
    ├── styles.css                # design system (oklch tokens, fonts, esq-* tokens)
    ├── routes/
    │   ├── __root.tsx            # app shell: <html>, <head>, meta/OG, fonts, providers
    │   ├── index.tsx             # "/" landing page (composes 5 sections)
    │   ├── projects.$slug.tsx    # "/projects/:slug" project detail page
    │   ├── services.social.tsx   # "/services/social" service landing page
    │   └── README.md             # routing conventions doc
    ├── components/
    │   ├── EsquireHero.tsx       # Netflix-ad opening + traveling logo
    │   ├── SanaaGallery.tsx      # parallax image gallery + word-fill text
    │   ├── AgencySection.tsx     # "who we are", stats, stacking project cards
    │   ├── IntelligenceSection.tsx # services showcase (sticky phone) + process
    │   ├── SiteFooter.tsx        # CTA band + footer links
    │   ├── AmbientBackground.tsx # drifting glowing orbs
    │   └── ui/                   # ~45 shadcn/Radix components
    ├── hooks/
    │   └── use-mobile.tsx        # useIsMobile() (768px breakpoint)
    ├── lib/
    │   ├── projects.ts           # PROJECTS data + getProject()
    │   ├── utils.ts              # cn() helper
    │   ├── error-capture.ts      # captures last SSR error
    │   ├── error-page.ts         # renderErrorPage() HTML
    │   └── lovable-error-reporting.ts # reportLovableError()
    └── assets/
        └── suna-logo.png.asset.json
```

---

## 4. Routing / Pages (file-based)

TanStack Start file-based routing. `routeTree.gen.ts` is auto-generated.

| Route file | URL | Description |
|------------|-----|-------------|
| `__root.tsx` | — | App shell. Sets `<html lang="ar" dir="rtl" class="dark">`, all meta/OG/Twitter tags, Google Fonts, favicon, wraps app in `QueryClientProvider`. Defines global `NotFoundComponent` (Arabic 404) and `ErrorComponent`. |
| `index.tsx` | `/` | Landing page. Renders in order: `EsquireHero → SanaaGallery → AgencySection → IntelligenceSection → SiteFooter`. |
| `projects.$slug.tsx` | `/projects/:slug` | Project detail. Uses a `loader` to fetch from `PROJECTS` (throws `notFound()` if missing), per-project OG meta, image gallery, "other projects" links. |
| `services.social.tsx` | `/services/social` | Dedicated "social account management" landing page. "Make Sales" hero with flowing order cards, includes-grid, animated counters, process steps, CTA. |

**Note:** `IntelligenceSection` references `/services/ads`, `/services/content`, `/services/visual`, `/services/analytics` — only `/services/social` exists; the others currently fall back to `#contact`.

---

## 5. Layout & Page Structure (the "/" landing flow)

The whole site is one dark canvas (`--esq-bg` ≈ near-black) with an orange accent. Sections scroll in this cinematic order:

1. **`EsquireHero`** — full-screen opening.
2. **`SanaaGallery`** — 320vh sticky parallax image stage.
3. **`AgencySection`** — story, stats, brand logos, stacking project cards.
4. **`IntelligenceSection`** — services showcase + process journey (id=`services`).
5. **`SiteFooter`** — orange CTA band + footer nav.

A **fixed nav bar** (92px, blurred) sits on top; the hero's "صُنع" logo docks into it on scroll.

Anchor targets used across nav/footer: `#about`, `#work`, `#services`, `#contact`.

---

## 6. Animations & Effects (the heart of the project)

All animation is **Framer Motion**, driven mostly by **scroll progress** (`useScroll` + `useTransform`) and viewport detection (`useInView`, `IntersectionObserver`). A shared easing curve `[0.16, 1, 0.3, 1]` (ease-out-expo) is used throughout.

### 6.1 `EsquireHero.tsx` — Netflix-Ads opening
- **RedTeaser** — a full-screen red (`#E50914`) overlay with "حمِّل التقرير", giant "صُنع", and a bouncing download icon. After **1.7s** it slides up (`y: -100%`) to reveal the scene.
- **TravelingLogo** — a single shared "صُنع" element, `position: fixed`, that transforms on scroll across two phases:
  - *Phase 1* (first ½ viewport): scales `1 → 0.13`, moves up to dock into the nav, color morphs red → white.
  - *Phase 2* (when the `#services` section arrives): docks and slides to the right edge.
  - Measures viewport + `#services` position on mount/resize (with a 1.2s re-measure).
- **BlockReveal** — a red block sweeps across text (`x: -115% → 115%`) then reveals it — the sharp ad-wipe.
- **FeatureScene** — "صُنع آدز / يُقدّم" identity row + a poster image that enters from below with zoom, rounded top corners, gradient overlay.

### 6.2 `SanaaGallery.tsx` — parallax gallery (320vh)
- Sticky viewport holds an **8-tile image composition**. Each `Tile` has final `x/y/w`, a `from` drift direction, per-tile `speed` (parallax multiplier), and `z`.
- On scroll: tiles travel **up** at ~120%×speed, settle horizontally, receding tiles get a **progressive blur** (`blur(px)` via `useTransform`) and subtle opacity falloff → fake depth-of-field.
- The whole stage **scales down** `1.6 → 0.8` (zoom-out) as you scroll.
- **FillText** — a headline reveals **word-by-word** (each word `0.3 → 1.0` opacity) staggered across scroll progress, while the text block rises `14vh → -52vh` and fades out.
- Mobile: lighter `blurFactor` (3.5 vs 5.5) for GPU perf.

### 6.3 `AgencySection.tsx`
- **StoryReel** — horizontal editorial image strip that drifts right→left (`x: 6% → -24%`) as it passes, with a linear-gradient edge mask.
- **StoryStats / DigitReel** — **odometer counters**: each digit is a tall column of numerals that rolls (2 full spins then settles) when in view; separator lines draw themselves (`scaleX: 0 → 1`).
- **ProjectCard** — **sticky stacking cards**: each card sticks at `top: 90 + i*26px` and stacks with rising `zIndex`; on scroll each rises (`y: 80 → 0`) and fades in. Image zooms on hover (`scale-105`). *Disabled on mobile* (`<1024px`) in favor of a simple fade-up.
- Brand logo wall (text placeholders: NEBULA, APEX, …).
- Reusable `fadeUp` variant for headings/paragraphs (`whileInView`, once).

### 6.4 `IntelligenceSection.tsx` — most complex
- **StatCounter** — `requestAnimationFrame` cubic-ease count-up when in view (prefix/suffix parsed from strings like `+40M`, `3X`).
- **ServicesShowcase** — a **single sticky phone** overlaid on a full-width stack of service cards. An `IntersectionObserver` watching a thin band at viewport center decides the active card; only the **phone screen crossfades** (`AnimatePresence`, fade+rise+scale). Different active-zone `rootMargin` for desktop vs mobile. Phone is a detailed faux-device: metallic gradient shell, side buttons, dynamic island, ground shadow.
- **FeatureCard** — spring-animated (`stiffness 90, damping 18`), tall (`min-h ~82–94vh`) cards; active card gets an orange border tint. CTA buttons with hover-fill + arrow-slide.
- **ImpactTrack** — an **SVG winding track** (dark edge + orange-gradient rail) that **draws itself** via `pathLength: 0 → 1` on scroll; three teaser phrases ("Something big / is coming down / the tracks") rise into view.
- **Process journey** — 4 steps. Nodes light orange while centered (`useInView` margin band). Rail is **vertical on mobile** (per-segment `scaleY` fill) and **horizontal on desktop** (`scaleX` progress line). Staggered children reveal.
- **Intro** — title & description with scroll-linked parallax (title & desc move at slightly different speeds/lag).

### 6.5 `AmbientBackground.tsx`
- 3 large blurred radial-gradient **orbs** (2 orange, 1 white) drifting on infinite 22–30s loops (`x/y/scale` keyframes) — ambient premium glow behind dark sections.

### 6.6 `services.social.tsx`
- **MakeSalesHero** — light (`#f1f1ef`) hero with a slowly-rising dot pattern, radial center light, giant "Make **Sales**" (Sales springs in orange), and **FlowCard** "New order" cards that float upward on staggered infinite loops.
- **Counter** — same rAF cubic count-up.
- Includes grid, stats, 4-step process, CTA — all `whileInView` fade-ups.

### 6.7 Global motion behavior
- **`prefers-reduced-motion`** honored in `styles.css` (animations/transitions collapsed to 0.01ms).
- `scroll-behavior: smooth` on `<html>`; **scroll restoration** enabled in the router.
- Heavy use of `willChange` hints for transform/opacity/filter performance.

---

## 7. Design System (`src/styles.css`)

- **Tailwind v4** `@theme inline` maps CSS variables → utility classes.
- **shadcn semantic tokens** in `:root` (light) and `.dark` — all in **oklch**: `background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1..5, sidebar-*`. Radius scale derived from `--radius: 0.625rem`.
- **Custom "Esquire" tokens:**
  - `--esq-bg: oklch(0.16 0 0)` (near-black), `--esq-ink` (near-white), `--esq-muted`, `--esq-paper`.
  - `--esq-noise` — a noise-texture PNG (used by `.esq-noise::after` screen-blend overlay).
- **Accent color:** orange `hsl(18 88% 55%)` (and shades `60%`, `45%`) — used inline throughout, not a token.
- **Teaser red:** `#E50914`.
- **Fonts (Google Fonts):**
  - `--font-arabic` / body: **IBM Plex Sans Arabic** (weights 400–700).
  - `--font-display`: **Playfair Display** (serif, for display).
  - **Instrument Sans** (Latin body fallback).
- Focus-visible outlines use the orange accent.

---

## 8. System Design / Architecture

```
Browser (RTL, dark)
   │
   ▼
TanStack Start SSR  ──  src/server.ts (fetch wrapper)
   │                      • normalizes catastrophic h3-swallowed 500s
   │                      • renders custom error page (error-page.ts)
   │                      • captures errors (error-capture.ts)
   ├── src/start.ts  ── createStart + errorMiddleware (server request middleware)
   │
   ▼
Router (src/router.tsx)
   • createRouter(routeTree)
   • context: { queryClient }   ← React Query injected app-wide
   • scrollRestoration: true
   • defaultPreloadStaleTime: 0
   │
   ▼
__root.tsx  (shell + <QueryClientProvider>)
   └── file-based routes render via <Outlet />
```

- **Rendering:** SSR via TanStack Start; Nitro build (Cloudflare default target); deployed to **Vercel**.
- **Data:** No backend / DB in-repo. Content is **static** (`src/lib/projects.ts`, and inline arrays in section components). Images are hosted on **Unsplash** (remote URLs). React Query is wired up but currently unused for real fetching.
- **Error handling:** three layers — server middleware (`start.ts`), SSR fetch normalizer (`server.ts`), and React error boundaries (`__root.tsx`, `projects.$slug.tsx`) plus Lovable error reporting.
- **SEO:** full meta / Open Graph / Twitter card tags in `__root.tsx`; per-project meta via route `head()`.
- **Config:** `vite.config.ts` deliberately thin — the Lovable preset (`@lovable.dev/vite-tanstack-config`) already bundles TanStack Start, React, Tailwind, tsconfig-paths, Nitro, env injection, `@` alias, dedupe, and error-logger plugins. **Do not duplicate these** (would break the build).

---

## 9. Data Model

Only one typed content model, in `src/lib/projects.ts`:

```ts
type Project = {
  slug: string;      // URL slug
  tag: string;       // Arabic category label
  title: string;     // Arabic title
  src: string;       // hero image (Unsplash)
  year: string;
  client: string;
  description: string;
  gallery: string[]; // detail images
};
```
4 projects: `velocity` (زواجات), `the-perfect-frame` (بورتريه), `spreading-the-word` (منتجات), `fresh-beginnings` (بدايات جديدة). `getProject(slug)` looks one up.

Other content (services, stats, process steps, reel images) lives as **inline `const` arrays** inside the respective section components.

---

## 10. Scripts

```bash
bun dev          # vite dev            → local dev server
bun run build    # vite build          → production build (Nitro)
bun run build:dev# vite build --mode development
bun run preview  # vite preview        → preview the build
bun run lint     # eslint .
bun run format   # prettier --write .
```

---

## 11. Notable Conventions & Gotchas

- **RTL-first:** most sections force `dir="rtl"`; the two "Make Sales" / Latin display bits flip to `dir="ltr"` locally.
- **Dark-only:** `.dark` is hard-coded on `<html>`; the light `:root` token set exists but isn't used at the page level.
- **`routeTree.gen.ts` is generated** — never hand-edit.
- **Lovable sync (`AGENTS.md`):** don't force-push / rewrite pushed history; commits to the connected branch sync back to the Lovable editor — keep the branch working.
- **Accent color is a raw HSL literal** (`hsl(18 88% 55%)`) repeated inline rather than a token — a candidate for refactor into a CSS variable.
- **Missing routes:** service CTAs point to `/services/ads|content|visual|analytics` which aren't implemented yet (fall back to `#contact`).
- Mobile performance tuned deliberately (reduced blur, disabled sticky stacking, different observer margins).

---

## 12. Possible / Implied Next Steps (plans)

These are **inferred** from the code (no formal roadmap file exists in the repo):

- [ ] Build the remaining service pages: `/services/ads`, `/services/content`, `/services/visual`, `/services/analytics` (data already defined in `IntelligenceSection`).
- [ ] Wire a real **contact form** (react-hook-form + zod are installed but unused) — currently `#contact` is a `mailto:` CTA.
- [ ] Replace **Unsplash placeholder images** with real studio work.
- [ ] Extract the orange accent into a proper design token / Tailwind color.
- [ ] Replace placeholder brand-logo wall (NEBULA, APEX…) with real client logos.
- [ ] Consider using React Query for any future dynamic content (already provisioned).

---

*Generated from a full read of the source on 2026-07-14. Branch: `Dev-Ajlan`.*
