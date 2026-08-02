# mythmaker.ca: bringing across the rest of the reference build

For whoever is working on mythmaker.ca, human or Claude. The port so far got a lot
across. This is the punch list of what's still to bring over, checked item by item
against the live site on 2026-08-01 so nothing here is already done.

**Reference build (live):** https://mythmaker-site.vercel.app
**Full source (public repo):** https://github.com/mythmaker-quest/mythmaker-site

The source wasn't public when the port was made, so everything that only lives in the
source (the second section of the site, the `<head>` payload, the scroll behaviors)
understandably didn't make the trip. It's public now, which makes the rest much easier:
every effect below is plain CSS and vanilla JS logic (IntersectionObserver, scroll math,
pointer math) that drops into the existing theme the same way the tilt and chapter rail
already did. Two files contain nearly all of it:

- **`app/globals.css`**: every token, class, and keyframe, with exact values.
- **`app/page.tsx`**: every behavior, in small readable `useEffect` hooks. Search for
  `reveal`, `burn parallax`, `magnetic`; the lightbox is the `lb` state plus the
  `.lightbox` CSS.

**Already in place, no need to touch:** the ember drift, the Ken Burns hero zoom, the 3D
card tilt with its sheen, chapter-rail highlighting, the stat count-up, the marquee with
pause-on-hover, card hover zoom, the wolf easter egg, and the reduced-motion gating (the
motion engine's capability gate is genuinely nice work). The new behaviors below can hang
off that same gate (`window.emBlocksMotion.allowed`).

Suggested order: sections 1 and 2 first. They're the highest impact and the least work.

---

## 1. The Saga journal (a second section of the site)

The reference has a journal at `/saga`: an index with a topic filter and seven published
articles with a styled reading view. See it live:
https://mythmaker-site.vercel.app/saga

On mythmaker.ca, `/saga` doesn't exist yet, and the nav's "The Saga" item currently
points at the `/#saga` homepage anchor. (In the reference nav, "Burn" goes to the
homepage heritage section and "The Saga" goes to the journal; two different
destinations.)

The good news: this is the easiest big win, because the content is plain markdown. In the
repo:

- **`content/articles/*.mdx`**: one file per article, body text plus a small frontmatter
  block (title, dek, date, pillar). Each maps 1:1 to a WordPress post, with `pillar` as
  the category. The seven slugs: `choose-the-story-you-live`, `nobody-held-the-door`,
  `the-day-does-not-need-to-be-saved`, `the-fog-is-not-your-fault`,
  `the-forge-and-the-wildfire`, `what-the-owl-sees`, `you-are-already-in-a-clan`.
- **`app/saga/[slug]/page.tsx` + `page.module.css`**: the reading-view design
  (typography, spacing, header treatment).
- **`app/saga/page.tsx`**: the index and filter.

Then point the nav's "The Saga" at the new index.

## 2. The `<head>`: search and sharing

None of this is visible in a browser, which is exactly why it didn't come across, but
it's what search engines and social platforms read. In WordPress, one SEO plugin (Yoast
or Rank Math) plus a share image covers almost all of it in an afternoon.

| Item | Reference | mythmaker.ca today | Fix |
|---|---|---|---|
| Meta description | Written, on-message | Not set, so Google composes its own snippet | Copy the reference's (below) |
| Structured data | `Organization` + `PerformingGroup` JSON-LD: founder, offers, socials, founding date | Not set | SEO plugin generates it, or paste the object from `app/page.tsx` (`structuredData`) |
| Title | `MythMaker: Fire Performance, Myth & Ceremony` (44 chars) | 122 chars, gets truncated in results, and leads with the Burning Man camp era rather than the current positioning | Use the reference title |
| Share image (og:image) | Purpose-made 1200x630 card | A 1632x888 hero frame, so platforms crop it | Use the reference's card, links below |
| Twitter card | Full set (title, description, image) | Image only | SEO plugin fills this |
| Favicon | The brand medallion, transparent PNG | Auto-cropped JPGs of an upload | Upload the medallion PNG as the Site Icon |
| theme-color | `#0b0806` (tints mobile browser chrome) | Not set | One meta tag |

The reference meta description, ready to paste:
*A professional company of fire artists, storytellers and myth-builders from British
Columbia. Book the show, explore The Quest, or study with Hjeron.*

Assets, ready to reuse as-is:

| Asset | In the repo | Direct download |
|---|---|---|
| Share card, 1200x630 | `app/opengraph-image.png` | https://mythmaker-site.vercel.app/opengraph-image.png |
| Twitter card, 1200x630 | `app/twitter-image.png` | https://mythmaker-site.vercel.app/twitter-image.png |
| Favicon (medallion PNG) | `public/brand/wolf-medallion.png` | https://mythmaker-site.vercel.app/brand/wolf-medallion.png |

Favicon goes in via Appearance → Customize → Site Identity → Site Icon.

## 3. Scroll and pointer behaviors

These live in `page.tsx` and are all short, dependency-free functions. Port them as one
vanilla JS file in the theme footer, gated on `window.emBlocksMotion.allowed` and
`prefers-reduced-motion` like the existing effects.

**a. The nav.** In the reference the menu is a pinned glass bar: `position: fixed`,
`background: rgba(11,8,6,.8)`, `backdrop-filter: blur(12px)`, gold hairline underneath.
It slides up out of the way when you scroll down and returns the moment you scroll up, so
it's always one flick away. On mythmaker.ca the menu currently scrolls off the page.
The show/hide is ~15 lines (in `page.tsx`, the `nav--hidden` effect): compare `scrollY`
against the last position, toggle a class that's just `transform: translateY(-100%)`.
Remember `body { padding-top: <nav height> }` once it's fixed.

**b. Scroll reveal.** Below-fold blocks start at `opacity 0`, shifted down 32px, scaled
.985, blurred 7px, and resolve as they enter the viewport. This one change accounts for
most of the "alive" feel of the reference. CSS:

```css
.reveal { opacity: 0; transform: translateY(32px) scale(.985); filter: blur(7px);
  transition: opacity .9s ease, transform 1.15s cubic-bezier(.2,.7,.2,1), filter 1s ease; }
.reveal.shown { opacity: 1; transform: none; filter: none; }
```

JS: an IntersectionObserver (`threshold 0.12`, `rootMargin '0px 0px -6% 0px'`) that adds
`shown` and unobserves. Add the `reveal` class to section intros, card grids, and
figures; skip the hero.

**c. Saga parallax.** The Black Rock City background sits in an oversized wrapper
(top -12%, height 124%) and drifts at 0.05x scroll speed via `translate3d`. The driver
is ~12 lines in `page.tsx` (`burn parallax`).

**d. Magnetic CTAs.** Primary buttons lean toward the cursor on fine-pointer devices
(offset x0.22 / y0.32, spring back on leave). ~15 lines (`magnetic`).

**e. Film grain + vignette.** Two fixed, click-through overlays above everything: a
radial vignette and an SVG-noise layer at 5.5% opacity with `mix-blend-mode: overlay`.
Pure CSS, copy `.grain` and `.grain-noise` from `globals.css` verbatim and add the two
divs. Quietly does a lot; it's why the reference reads filmic rather than flat.

**f. Gallery lightbox.** Clicking a gallery photo opens an in-page lightbox with
arrow-key navigation, captions, and scroll lock. On mythmaker.ca the gallery links
currently open the raw image file. Any WordPress lightbox plugin gets close; the
reference's own styling is `.lightbox` in `globals.css` if pixel-matching matters.

**g. Marquee edge fades.** Small one: the festival marquee softly fades out at both
edges (`.proof::before/::after` gradients in `globals.css`) instead of clipping.

## 4. Styling details

All pure CSS, exact values in `globals.css`:

- **Hero wordmark glow:** `filter: drop-shadow(0 4px 26px rgba(232,149,30,.35))` on the
  wordmark, plus a slow-pulsing radial halo behind it (the `mmGlow` keyframe, 4.5s).
- **Eyebrows** (THE SHOW, THE SAGA...): `color: #ffbf2e` with a double gold text-shadow
  (`0 0 20px rgba(255,191,46,.55), 0 0 7px rgba(255,191,46,.5)`). Currently flat grey on
  mythmaker.ca; this is the cheapest high-impact change on the whole list.
- **Hero tagline** ("Fire · Myth · Ceremony"): lit gold (`#f8cf63`) in the display face
  with a warm text-shadow, rather than muted small-caps.
- **Hero overlay:** a warm radial glow low in the frame plus a fade to ink at the bottom
  so the hero blends into the page (`.hero-overlay` in `globals.css`).
- **Primary buttons:** amber glow shadow, `0 6px 30px rgba(232,149,30,.36)`, instead of
  black.

---

**Checking the result:** open https://mythmaker-site.vercel.app side by side and compare
the feel, not the pixels. When the reveal, the pinned glass nav, the grain, and the gold
glows are in and /saga is live, the two should be hard to tell apart.
