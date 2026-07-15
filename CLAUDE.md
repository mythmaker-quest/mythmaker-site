# MythMaker site — working notes

The marketing site for MythMaker (mythmaker.ca replacement): a fire/Norse
performance troupe selling three things — **The Show** (book the troupe),
**The Quest** (a mythic self-development game), and **Workshops & Retreats**
(Hjeron's men's work, rites of passage, community consulting, old-ways skills).
Commercial job: convert bookings.

## Source of truth

**This repo is the source of truth for what ships.** The live site builds and
deploys from here, so anything going to production lands in this code.

Claude Design is *not* retired, though. It's still the better surface for
**composing** certain things — laying out a section, assembling pieces, seeing
a design whole before it's code. When something is built there, it doesn't flow
back automatically: pull it across with DesignSync (`get_file` on the project
below) and port it into the repo, then deploy. Compose in Claude Design where
that's the better tool; ship from here.

Claude Design project `01cb940a-fcfa-44a2-b0c9-d716eb3b72b0`, file
`Mythmaker Home.dc.html` (needs `/design-login`).

## Stack

- Next.js 15 (App Router, TypeScript). The whole page is `app/page.tsx` — one
  `'use client'` component. Data lives in arrays at the top (NAV, RAIL,
  FESTIVALS, SHOW, WORKSHOPS, GALLERY, STATS).
- `app/globals.css` holds the design tokens (`:root`), keyframes, and every
  component class. No CSS modules, no Tailwind.
- `app/actions.ts` is the booking Server Action (SMTP2GO via nodemailer).
- `app/layout.tsx` wires the fonts and metadata.

## Fonts

Self-hosted with `next/font`.
- **Knights Quest** (blackletter, local WOFF2) — *all* display type, including
  the hero eyebrow. This is Hjeron's supplied font; use it freely.
- **Cinzel** — small caps / labels / the chapter rail.
- **Alegreya** — body copy.
- **IM Fell English** — The Quest's voice.
- **PR Viking is retired.** Don't reintroduce it.

## Photos

Live in `public/photos/`. Pixel dimensions for `next/image` are in
`app/photo-dims.json` — if you add a photo, add its dims there. The gallery
lightbox uses a plain `<img>` on purpose (next/image with `width:auto`
collapses to zero); leave the eslint-disable comment.

## Motion

Everything respects `prefers-reduced-motion` (a `reduce` flag computed once in
the main effect). The magnetic CTAs and saga parallax are also gated on
fine-pointer / non-reduced. Keep new motion behind the same gates.

## Confirmed facts (Hjeron, 2026-07-14)

15 years at Burning Man · 100 warriors at full strength · 30,000 souls at the
biggest show · 33 productions since 1999. Burning Man is **heritage/proof**, not
a call to action — the troupe has stepped back from the join-the-camp path.
Don't add "upcoming Burning Man" content.

## Deploy

`git push origin main` auto-deploys to production (Vercel, framework = nextjs).

**Commit author email must be `robin@novadiem.com`.** Vercel Hobby blocks git
deploys whose author isn't a verified team member (COMMIT_AUTHOR_REQUIRED), and
Robin's GitHub is that address, not the gmail. `git config user.email` is
already set in this clone; don't override it.

Live: https://mythmaker-site.vercel.app · Repo: github.com/rheos/mythmaker-site
