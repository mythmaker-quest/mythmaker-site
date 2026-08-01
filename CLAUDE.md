# MythMaker site — working notes

The marketing site for MythMaker (mythmaker.ca replacement): a fire/Norse
performance troupe selling three things — **The Show** (book the troupe),
**The Quest** (a mythic self-development game), and **Workshops & Retreats**
(Hjeron's men's work, rites of passage, community consulting, old-ways skills).
Commercial job: convert bookings.

**Status (2026-07-25):** mythmaker.ca stays on WordPress (Hjeron's call, maintained by Terran).
This Next.js build is live at **mythmaker.quest** — Robin's redesign, independent of the WordPress
site. The active Hjeron collaboration is GigCaravan, not this site, but the site ships real features
and is maintained normally. Robin's interest: "Forged by Novadiem" backlink, a live portfolio piece,
and GigCaravan preview base.

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
- npm **workspace**: the site is the root; `packages/ui` is `@mythmaker/ui`,
  the design system (see below). Next compiles it via `transpilePackages`.
- `app/globals.css` holds the site's component classes + keyframes. The design
  *tokens* are imported from `@mythmaker/ui/tokens/*.css` in `layout.tsx`;
  globals.css overrides only the `--font-*` tokens to the next/font faces.
  No CSS modules, no Tailwind.
- `app/actions.ts` is the booking Server Action (SMTP2GO via nodemailer).
- `app/layout.tsx` wires the fonts, the package token CSS, and metadata.

## Design system — `@mythmaker/ui` (`packages/ui`)

The MythMaker component library: 7 token CSS files + 15 typed React components
(Button, Chip, Eyebrow, Heading, Lead, Medallion, ShowCard, Stat, TiltCard,
Field/TextArea/SelectField, Marquee, ScrollCue, SectionIntro). Built with tsup
to `dist/` (ESM + types); `scripts/bundle-css.mjs` also emits a flattened
`dist/styles.css` (tokens inlined + display font shipped) for design-sync.

- **The site dogfoods it.** `page.tsx` renders the real `<Marquee>` and `<Stat>`
  from the package; more components can migrate over time. Photo-heavy components
  (ShowCard, TiltCard, Medallion) stay as next/image in the site (the package
  ships plain-`<img>` versions for Claude Design / non-Next use) — an intentional
  deviation, don't "fix" it.
- **It syncs to Claude Design.** `@mythmaker/ui` is a Claude Design *design-system*
  project (`be05ec27-45c9-4cde-b24b-6616c63508e0`), so the design agent builds
  with the real components. Push changes with the `/design-sync` skill (config in
  `.design-sync/`, gotchas in `.design-sync/NOTES.md`). This is repo → Claude
  Design; the repo stays the source of truth. Distinct from the older "Mythmaker"
  design/prototype project (`01cb940a-…`, a regular project) above.
- To rebuild the package: `npm run build --workspace @mythmaker/ui` (runs tsup +
  bundle-css). Always use this, not bare `tsup` — see NOTES.md.
- **The Claude Design copy is a few changes behind (as of 2026-07-15).** Since the
  last sync these package tokens/components moved: `--text-eyebrow` 11.5px → 15px,
  `--bronze` #b08d57 → #eaba50, and the `Marquee` component got a seamless-loop fix
  (it repeats the set to fill the viewport so there's no gap on wide screens). Run
  `/design-sync` to bring the CD project level when you want a deck/collateral to
  match. Note: the site's unified vibrant-gold eyebrow (`#ffbf2e` + glow) lives in the
  site's `.eyebrow` class in globals.css, NOT the package — the package `Eyebrow`
  still defaults to `--amber`. Push it into the package if the DS should match.

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

## Copy voice & audience

Audience read (spiral-dynamics): **Purple primary** — the seekers/tribe the Quest and
workshops speak to, and the identity of the whole thing (ceremony, warriors, the old
ways, belonging). Plus **Orange proof** for the one buyer who needs it: the event
planner booking the Show (professional, festival-proven, fire-safety, reliable). Purple
carries the emotion everywhere; concentrate the Orange at the money moments (the Show
intro, the trust chips, the stats, the Book form) as understated evidence, never hype.

**Em-dashes are OFF in the copy.** They read as an AI tell; Robin's standing rule is
default-off. Reduce/eliminate them (commas, periods, colons, the brand `·` interpunct);
never add them. Do NOT follow the Claude Design readme's "em-dashes for the turn" note.
Run copy through the `spiral-dynamics` + `humanizer` skills. (Memory: `copy-em-dashes-off`.)

Section eyebrows (The Show, Saga, Quest…) are all one **vibrant amber-gold `#ffbf2e`
with a glow** — uniform, no per-section colours. Footer carries a "Forged by Novadiem"
backlink to novadiem.com.

## Deploy

`git push origin main` auto-deploys to production (Vercel, framework = nextjs).

**Commit author email must be `robin@novadiem.com`.** Vercel Hobby blocks git
deploys whose author isn't a verified team member (COMMIT_AUTHOR_REQUIRED), and
Robin's GitHub is that address, not the gmail. `git config user.email` is
already set in this clone; don't override it.

Live: https://mythmaker.quest · Repo: github.com/rheos/mythmaker-site

**Vercel:** project `mythmaker-site`, team `robins-projects-8ddb2c8d` (IDs in
`.vercel/project.json`). Production URL `https://mythmaker-site.vercel.app`. The
`mythmaker.quest` / `www.mythmaker.quest` domains are aliases on this same project and serve
the latest production deploy, so the domain and the `.vercel.app` URL are the same build
(verified byte-identical). A **public read-only copy** of the repo lives at
github.com/mythmaker-quest/mythmaker-site (pushed 2026-07-31 for Terran; can drift from the
private `rheos` origin).

## Blog system

The standard Novadiem static-blog stack, adapted from devweb. Reference implementation:
`~/Code/foaftech/Growoperative/growoperative-landing` (fully integrated there; copy that pattern).

**Source of truth: devweb** (`~/Code/novadiem/devweb`). growoperative-landing is a prior port and
may be behind. Always diff against devweb before porting. Notable devweb-specific feature NOT to
port: `lib/authors.ts` (pen-name registry for Robin's anonymized publishing — not relevant to
mythmaker). Use `siteConfig.author.name` as the article fallback instead, same as growoperative.

**Files to add:**
- `src/site.config.ts` — the single config point: siteName, siteUrl, author, cta, categories
- `src/lib/content.ts` — MDX spine (copy from devweb `lib/content.ts`, adapt as needed)
- `src/lib/pillars.ts` — reads `siteConfig.categories`, derives PILLAR_TOKEN / PILLAR_LABEL / PILLAR_SLUG_PATH
- `content/articles/*.mdx` — one file per post; Zod-validated at build time
- `src/app/articles/page.tsx` — static index with `<PillarFilter>` in `<Suspense>`
- `src/app/articles/[slug]/page.tsx` — reading view with `generateStaticParams`
- `src/components/PillarFilter.tsx` — client island, reads `?topic=` via `useSearchParams`
- `src/components/mdx/index.ts` — MDX component map passed to `compileMDX`

**Frontmatter schema** (Zod, enforced at build): required `title`, `dek`, `date` (ISO), `pillar`
(must match a category slug from `site.config.ts`), `slug` (lowercase-hyphen); optional `coverImage`,
`author`, `read`, `draft`, `publication`.

**Categories for mythmaker** — TBD when building; suggested starting point matching the three site
pillars: `show` (fire performance, festival recaps), `quest` (the Quest game, mythic self-dev),
`workshops` (men's work, rites of passage, old-ways skills).

**Static-only constraint.** Like devweb: every article route must build as `○` (Static). The usual
regression is an unwrapped `useSearchParams` in PillarFilter — keep it inside `<Suspense>`.

**CSS is site-specific — not shared.** The growoperative-landing CSS modules use `--go-green` for
all accents and HeadingNow (`--font-heading`) for titles. Mythmaker needs its own reskin: swap
`--go-green` → `#ffbf2e` (vibrant amber-gold with glow, the uniform eyebrow color), fonts →
Knights Quest for display, Alegreya for body — use `@mythmaker/ui` token variables throughout.
The page structure and reading layout port directly; only the color/font tokens change.

**Not integrated yet** (as of 2026-07-25). When building, use growoperative-landing as the direct
reference — it's the only fully wired instance of this pattern.

## Related / planning docs — the festival tool

A separate product (multi-tenant festival booking + tour tool, MythMaker as tenant #1)
is being designed in the parent `mythmaker/` folder (not this repo). Its name is
**GigCaravan** (gigcaravan.com registered 2026-07-17; repo will live under Robin's
personal account or Novadiem-Studio, not rheos). Target market spans troupes, touring
musicians with crew, and solo acts who only need the application tracker. Its docs:

- `festival-targets.md` — researched US/Canada festivals to pitch, by region, with contacts.
- `festival-tool-spec.md` — the plan (MOL-style pipeline, roster-as-network, FOAF interop).
- `festival-tool-data-model.md` — the schema (shared catalog vs private roster, engagement seam).
- `festival-tool-backend-architecture.md` — the build: AdonisJS + Lucid + SQLite→Postgres,
  FOAF auth (embed `FoafAuthClient`), Python agent workers, flat-rate host (NOT Vercel).
- `festival-tool-for-hjeron.md` — plain-language spec for the domain partner to review.
- `docs/festival-tool-domain-candidates.md` — product-name / domain search.

**In THIS repo:** `app/festival-tool/page.tsx` is an unlisted, noindexed preview of the
Hjeron spec, live at `/festival-tool`. Build of the actual tool is PAUSED pending Hjeron's
review. Design decisions live in the project memory index (`festival-tool-concept`,
`foaf-auth-service`, `framework-values-structure-discipline`, `multi-tenant-by-default`).
