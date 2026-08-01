# MythMaker — website

Marketing site for **MythMaker**, a fire-arts / Norse performance company from British
Columbia. Three pillars: **The Show** (book a performance), **The Quest** (a transmedia
mythic game), and **Workshops & Retreats** (study with Hjeron).

**Live:** https://mythmaker-site.vercel.app
Built with Next.js 15 (App Router, TypeScript), deployed on Vercel. Site by
[Novadiem](https://novadiem.com).

## Orientation

Most of the design lives in two files:

- **`app/globals.css`** — every design token, class, and keyframe: the color system,
  the film grain and vignette, the glass nav, reveal transitions, hero glow, card and
  button treatments.
- **`app/page.tsx`** — the whole home page and all its behavior in small `useEffect`
  hooks: reveal-on-scroll, nav hide/show, the ember canvas, saga parallax, magnetic
  CTAs, 3D Quest-card tilt, chapter-rail highlighting, gallery lightbox, the booking
  form, and the wolf easter egg. All motion is gated on `prefers-reduced-motion`.

The rest:

- **`app/saga/`** — The Saga journal: static index with topic filter plus a styled
  reading view. Articles are plain MDX in **`content/articles/`** (frontmatter: title,
  dek, date, pillar, slug), validated with Zod at build time via `lib/content.ts`.
- **`packages/ui`** — `@mythmaker/ui`, the design system: seven token CSS files and
  fifteen typed React components. The site consumes it as an npm workspace.
- **`app/actions.ts`** — the booking form's Server Action (SMTP2GO via nodemailer),
  with honeypot spam protection and the "Sköl!" success state.
- **`app/sitemap.ts` / `app/robots.ts`** — sitemap (home, journal index, every
  published article) and robots. Metadata, Open Graph / Twitter cards, and the
  Organization + PerformingGroup JSON-LD are in `app/layout.tsx` and `app/page.tsx`;
  the share cards are `app/opengraph-image.png` and `app/twitter-image.png`.
- **Photos** in `public/photos/`, served through `next/image`. Add a photo's pixel
  dimensions to `app/photo-dims.json` when adding one.
- **Fonts** via `next/font`: Knights Quest (the company's display face, self-hosted)
  plus Cinzel, Alegreya, and IM Fell English, all self-hosted at build.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes static)
npm run build --workspace @mythmaker/ui   # rebuild the design system package
```

## Assets and reuse

The code is public for reference. Photography, the MythMaker brand marks, the Quest
card art, and the article texts belong to MythMaker; Knights Quest is the company's
display font. If you are porting from this build, `globals.css` and `page.tsx` contain
the exact values and logic for every effect.
