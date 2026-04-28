# KYNTHIA — Product Requirements

## Original Problem Statement
Build a website for the brand KYNTHIA — a web agency that builds websites for other brands with AI integration. Three tiers: ECHO (minimalist, full site, smooth animations, limited morphing), AETHER (dynamic scroll, morphing, unique animations, AI integration), COSMOS (full 3D, full web app scroll choreography, pointer/interactive design, deep AI integration). Professional and eye-watering approach. Black & white theme, 3D designs, full-app dynamic scroll animations, beautiful typography, dynamic backgrounds — top tier.

## User Choices (Dec 2025 kickoff)
- Contact: form + email notifications via Resend (keys empty placeholders; fills when user adds them)
- No AI demo, no live chatbot
- No prices shown — every project is custom-quoted
- Placeholder portfolio mockups (Unsplash B/W)
- Maximum animation intensity — Three.js, particles, scroll choreography

## Architecture
- **Frontend:** React 19, Tailwind, Framer Motion, raw Three.js (imperative, NOT R3F due to React 19 compatibility), Lenis smooth scroll, sonner toasts, lucide-react icons
- **Backend:** FastAPI, Motor/MongoDB, Resend SDK (no-op when keys empty)
- **Fonts:** Cabinet Grotesk (display), Cormorant Garamond italic (editorial emphasis), Manrope (body), JetBrains Mono (technical labels)

## Core Requirements (static)
- Cinematic hero with 3D torus knot + particle field
- Brand manifesto with scroll reveals
- Three progressively-animated tier cards: Echo (flat/clean), Aether (animated gradient border), Cosmos (3D canvas + glow)
- Asymmetric portfolio bento grid (6 items)
- Vertical process timeline with scroll-progress spine
- Brutalist quote form (Request a Quote CTA)
- Custom magnetic cursor (mix-blend-difference)
- Noise overlay grain texture
- Fully mobile-responsive

## Implemented (Dec 2025 — iteration 3)
- ✅ **Persistent KYNTHIA brand sigil** (`BrandOrb`) — a small 3D morphing metallic icosahedron fixed bottom-left on every section of the home, labelled "KYNTHIA · BRAND SIGIL / LIVE"
- ✅ **Each showcase now has its own unique palette + signature interaction** (deliberately NOT resembling the main KYNTHIA site):
  - **Orion Studio** (COSMOS) — warm earth: concrete `#f5efe4` + ink `#1c1612` + terracotta `#b5653a`. Persistent rotating compass (scroll-driven), animated blueprint grid
  - **Maison Veil** (COSMOS) — champagne ivory `#f6f0e4` + wine `#6b1e28` + brass `#c9a36b`. **HoverRevealImage** cursor-mask reveal (hover reveals only the hovered region of alternate photo), flowing silk SVG side motif
  - **Vanta Collective** (COSMOS) — jet black + neon pink `#ff3399` + cyan `#33ccff` + acid lime `#c6ff00`. Chromatic glitch text, cursor-following neon orb trail, morphing chromatic torus knot with pink+cyan point lights
  - **Meridian Estates** (AETHER) — deep emerald `#0d2a22` + brass `#e8c178`. Morphing SVG section dividers, brass gradient frame pinned to viewport edges
  - **Nuage Atelier** (ECHO, new brand) — pure **liquid glass + pastel** (peach, mint, lilac, sky). Multiple `backdrop-blur-2xl` frosted surfaces, floating pastel gradient blobs, liquid cursor follower
  - **Lume Journal** (ECHO) — newsprint paper `#f2e9ce` + vermillion `#c1351a` + ink. Heavy bold serif masthead "Lume.", column rules, drop-cap feature essay
- ✅ `HoverRevealImage` shared component (CSS `mask-image: radial-gradient(...)` follows cursor)
- ✅ Replaced Kuroi Bakery → Nuage Atelier (route + Portfolio card + App.js)
- ✅ Each showcase still has Back-to-Kynthia pill + tier LIVE DEMO badge

## Implemented (Dec 2025 — iteration 2)
- ✅ **Emergent "Made with" badge removed** (HTML + CSS safety net)
- ✅ **Manifesto trimmed to 2 stats** (100% Custom built · 3 Tiers of craft)
- ✅ **Hero redesigned into magazine masthead** — "VOL · 01 — THE KYNTHIA COMPENDIUM", giant editorial "Brands that don't follow.", metal torus ring in 3D, right-column editor's pull-quote + index
- ✅ **6 bespoke clickable showcase landing pages** with react-router (each a full tier-matched experience):
  - `/work/orion-studio` — COSMOS · Architecture studio (3D wireframe building, scroll-led project reveals)
  - `/work/maison-veil` — COSMOS · Luxury fashion (ivory palette, horizontal scroll lookbook)
  - `/work/vanta-collective` — COSMOS · Creative agency (distorted metallic sphere, bento grid)
  - `/work/meridian-estates` — AETHER · Real estate (animated gradient borders, morphing blobs, parallax hero)
  - `/work/kuroi-bakery` — ECHO · Artisan bakery (warm cream, editorial serif menu list)
  - `/work/lume-journal` — ECHO · Editorial magazine (strict masthead grid, archive columns)
- ✅ Each showcase has Back-to-Kynthia pill + tier live-demo badge
- ✅ ScrollToTop on route change

## Implemented (Dec 2025 — iteration 1)
- ✅ Full page with Lenis smooth scroll, custom cursor, noise overlay
- ✅ Hero: Three.js torus knot wireframe + 2600-particle depth field + mouse parallax + vignette
- ✅ Staggered KYNTHIA letter reveal + editorial subhead with italic Cormorant emphasis
- ✅ Marquee band with mixed display + serif-italic separators
- ✅ Manifesto with oversized scroll-reveal typography + stats row
- ✅ Three tiers (ECHO/AETHER/COSMOS) with distinct visual identities and Three.js in Cosmos card
- ✅ Portfolio grid with hover desaturation-reveal
- ✅ Process timeline with scroll-driven progress spine
- ✅ Brutalist Contact form posting to `/api/quote` with sonner toasts
- ✅ Footer with massive KYNTHIA wordmark
- ✅ Backend: POST /api/quote (stores + tries Resend), GET /api/quotes (admin list), GET /api/health
- ✅ Pydantic validation: name/email/tier_interest enum/message
- ✅ Graceful Resend no-op when keys blank (email_sent=false)
- ✅ All tests pass: 100% backend, 100% frontend (iteration_1.json)

## Not yet done / backlog
- **P1** Resend real email send — user adds `RESEND_API_KEY`, `SENDER_EMAIL`, `ADMIN_EMAIL` to `/app/backend/.env` and `sudo supervisorctl restart backend`
- **P2** Admin dashboard page to view submitted quotes (currently `GET /api/quotes` JSON only)
- **P2** Add real case studies / project detail pages
- **P2** Replace placeholder Unsplash portfolio images with real client work
- **P2** Add testimonials section / press logos
- **P3** Blog / journal
- **P3** SEO metadata (OG images, structured data)
- **P3** AI integrations demo (user opted out — can be added later as an AETHER/COSMOS teaser)

## Known minor items
- Nav-logo scrolls to id="top" which is on hero section (works in practice but testing agent flagged as cosmetic)
- Three.Clock deprecation warning (non-blocking console noise)

## Next Action Items
1. If user adds Resend keys → restart backend → emails flow
2. Ship real client work into Portfolio section
3. Add admin dashboard route `/admin/quotes` gated by a simple password
