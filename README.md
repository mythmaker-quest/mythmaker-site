# MythMaker — website

Marketing site for **MythMaker**, a fire-arts / Norse performance company from British Columbia.
Three pillars: **The Show** (book a performance), **The Quest** (a transmedia mythic game), and
**Workshops & Retreats** (study with Hjeron). Built with **Next.js (App Router)** and deployed on Vercel.

**This repo is the source of truth.** The design started in Claude Design; it's now a real Next.js
app, so changes are code edits here — no more export-and-re-optimize loop.

## Stack
- **Next.js 15** (App Router, TypeScript), single home page, statically prerendered.
- **`next/image`** — every photo is optimized automatically (AVIF/WebP, responsive sizes, lazy).
  Sources live in `public/photos/`; add a photo and its dimensions to `app/photo-dims.json`.
- **`next/font`** — Knights Quest (display headings) + PR Viking (hero eyebrow) self-hosted from
  `app/fonts/*.woff2`; Cinzel, Alegreya, IM Fell English from Google, all self-hosted at build.
- Design tokens + keyframes in `app/globals.css`; the page and all interactions in `app/page.tsx`
  (ember hero canvas, count-up stats, reveal-on-scroll, 3D Quest cards, gallery lightbox, mobile
  nav, quote form, the "wolf" easter egg, and `prefers-reduced-motion`).

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy
`git push origin main` → Vercel auto-deploys to production (framework: Next.js, production branch:
`main`). Or `vercel --prod` from the CLI.

## Still to wire up
- **The booking form fakes submission** client-side. Add a Server Action / Route Handler posting to
  email or a CRM (Resend, Formspree), keep the validation and the "Sköl!" success state, add spam
  protection.
- Confirm any placeholder copy/dates with Hjeron. Numbers are current per Hjeron (2026-07): 15 years
  at Burning Man, 30,000 at the biggest show, 33 productions.
