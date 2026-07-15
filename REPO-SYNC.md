# Repo sync — rheos/mythmaker-site vs. latest design (2026-07-15)

The repo is the source of truth; these are the design changes approved in review that
haven't landed in `main` yet. Exact edits, smallest-diff first.

## 1. Hero eyebrow → Knights Quest (PR Viking retired)
`app/globals.css` `.hero-tagline` — client tried Knights Quest here and approved it:
```css
.hero-tagline {
  margin-top: 20px;
  font-family: var(--font-knights), var(--font-cinzel), serif;
  font-weight: 400;
  font-size: clamp(24px, 3vw, 33px);
  letter-spacing: 0.05em;
  /* remove text-transform: uppercase — blackletter reads title-case */
  color: var(--eyebrow-lit);
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.75), 0 0 22px rgba(232, 149, 30, 0.35);
}
```
PR Viking is then unused: drop `viking` from `app/layout.tsx` + delete
`app/fonts/pr-viking.woff2` (or keep as a commented alternate). Update the README's
font line ("Knights Quest = all display type").

## 2. Wordmark size — client flagged "way too small"
`app/page.tsx`:
- Nav: `style={{ height: 19, width: 'auto' }}` → `height: 30`
- Footer: `style={{ height: 15, width: 'auto' }}` → `height: 30`

## 3. Stat label wording (numbers already correct)
`app/page.tsx` STATS: `'Souls at a single show'` → `'Souls at our biggest show'`

## 4. Company copy
`app/page.tsx`: `"and twenty years spent touring them across the world"`
→ `"and over two decades spent touring them across the world"`

## 5. Prototype touches not yet ported (optional, in priority order)
- **Marquee edge fades**: 90px `linear-gradient(90deg, var(--bg-alt), transparent)`
  overlays on both edges of `.proof` (absolute, `pointer-events:none`, z above track).
- **Film grain texture**: `.grain` currently vignette-only. Add a second fixed layer:
  SVG `feTurbulence` noise (`baseFrequency .85`, 150px tile) at `opacity:.055;
  mix-blend-mode:overlay`.
- **Chapter rail**: fixed right-side dot rail (7 sections), IntersectionObserver with
  `rootMargin: '-45% 0px -45%'`; active dot enlarges + glows gold, label fades in
  (Cinzel 10px .2em uppercase). Hidden < 820px and under reduced motion.
- **Magnetic CTAs**: on `.btn-primary`, pointer:fine only — translate toward cursor
  (x·0.22, y·0.32), ease back `.45s cubic-bezier(.2,.8,.2,1)` on leave.
- **Saga parallax**: `.saga-bg` sized 124% height / top -12%, rAF-throttled scroll →
  `translate3d(0, -offset·0.05, 0)`. Skip under reduced motion.

## Intentional repo deviations — leave as-is
- `.h2` sized up to `clamp(34px,5vw,52px)` (design spec was 31–46) — looks deliberate.
- Server Action + nodemailer + honeypot replaces the prototype's fake submit — better.
- `next/image` masonry with explicit dims — better.
