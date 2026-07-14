# صُنع (Suna Media) — Brand Implementation

Brand identity extracted from the client's Drive kit (Logo / Icons / Stationary) and applied across the site. Direction: **keep the dark cinematic design + scroll animations**, recolored and re-marked to the real brand.

## Identity

| Element | Value |
|---------|-------|
| Brand | صُنع / **Suna Media** — creative & content studio, Riyadh, KSA |
| Logo | Custom black Arabic wordmark **صُنع** (designed calligraphy, not a font) |
| Signature motif | Interlocking **wave** graphic |
| Email | `Suna.mediaa@gmail.com` |
| Phone | `+966 55 903 2660` |
| Location | الرياض، المملكة العربية السعودية |

## Color palette (design tokens in `src/styles.css`)

| Token | Hex | HSL | Role |
|-------|-----|-----|------|
| `--suna-red` | `#d00a00` | `hsl(3 100% 41%)` | deep red |
| `--suna` | `#e92500` | `hsl(9 100% 46%)` | **core scarlet** (main accent) |
| `--suna-orange` | `#ff6a3d` | `hsl(14 100% 62%)` | orange highlight |
| `--suna-gradient` | `linear-gradient(135deg,#d00a00,#e92500 45%,#ff6a3d)` | — | signature gradient |

The previous amber-orange (`hsl(18 88% 55%)`) was replaced everywhere with this scarlet-orange system (accents, gradients, the SVG impact track, ambient orbs, focus rings).

## Typography

- **Arabic:** IBM Plex Sans Arabic (retained — good match for the brand naskh).
- **Latin display:** **Poppins** (`--font-latin` / `.font-latin`) — matches the brand stationery. Used on Latin display type (e.g. the "Make Sales" hero).

## Brand assets (`public/brand/`)

- `suna-wordmark-white.png`, `suna-wordmark-black.png` — the real wordmark (aspect ≈ 1336:800).
- `suna-wave-white.png`, `suna-wave-black.png` — the wave motif strip.
- `public/favicon.ico` + `public/apple-touch-icon.png` — brand gradient + white wave.

## Where the brand is wired in

- **Hero (`EsquireHero.tsx`)** — the traveling logo is now the real wordmark rendered as a CSS **mask**, so it keeps the scroll-linked color morph (brand red → white); docks into the nav and slides right. Red teaser uses the white wordmark on brand red. Identity row reads "صُنع ميديا / يُقدّم".
- **Footer (`SiteFooter.tsx`)** — real wordmark, wave-motif divider, 3-column layout with a real contact column, brand-gradient CTA, "© SUNA MEDIA · Riyadh, KSA".
- **All sections** — recolored to the Suna palette.
- **`__root.tsx`** — Poppins added; brand favicon/apple-touch-icon; removed the `@Lovable` Twitter handle.

## ⏳ Pending — needs real content from the client

The Drive kit was **visual identity only**. Still placeholder until the client sends materials:

- [ ] Real portfolio projects + images → `src/lib/projects.ts` and all Unsplash URLs
- [ ] Real statistics (dummy `10+ / 240+ / 40M` etc. in `AgencySection`, `IntelligenceSection`)
- [ ] Real client logos → replace the `NEBULA / APEX / …` text wall in `AgencySection`
- [ ] Verify/replace service copy; build the missing service routes (`/services/ads`, `/content`, `/visual`, `/analytics` — only `/services/social` exists)
- [ ] Social-media handles (none provided)
- [ ] Company-profile / about copy, real photography & video

## Dev notes

- Use **`npm run dev`** — `bun` is not installed locally (the Lovable Vite preset binds port 8080, falling back to 8081).
- Lovable-synced repo — don't force-push / rewrite pushed history.
