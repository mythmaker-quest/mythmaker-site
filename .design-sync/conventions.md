# Building with @mythmaker/ui

MythMaker is a fire-arts / Norse performance company. The look is **a bonfire at
night**: near-black warm-brown surfaces, parchment text, one hue family — gold /
amber firelight. There is no second accent colour. Voice is a fireside
saga-teller: legend first, then the plain fact. No emoji; use unicode glyphs
(▾ ↗ ✕ ‹ › ·) only.

## Setup — no provider, just the stylesheet

Components are self-styled with inline styles that read CSS custom properties.
There is **no React context or theme provider** to wrap. The one requirement: the
design must load the design system's `styles.css` — it defines every `--*` token,
the `.reveal` scroll animation, the `@font-face` for the blackletter display
face, and `@import`s the Google UI/body faces. With that stylesheet present every
component renders on-brand; without it they fall back to browser defaults.

## Styling idiom — compose components, style your own glue with `var(--*)`

Never invent hex values, font stacks, radii, or spacing — use the tokens:

- **Colour** — surfaces `var(--bg)` `var(--bg-alt)` `var(--bg-deep)`
  `var(--surface)`; text `var(--text)` `var(--text-muted)` `var(--text-strong)`;
  fire `var(--gold)` `var(--gold-bright)` `var(--amber)` `var(--amber-hover)`
  `var(--on-amber)` (text on amber) `var(--bronze)`; borders `var(--border-gold)`
  `var(--border-parchment)`.
- **Type** — families: `var(--font-display)` (blackletter — ALL display headings,
  short, never uppercased), `var(--font-ui)` (Cinzel — every small UPPERCASE
  label: eyebrows, nav, buttons, stats, chips), `var(--font-body)` (Alegreya —
  paragraphs), `var(--font-quest)` (IM Fell English italic — mystic pull-quotes).
  Sizes are tokens too: `var(--text-h2)` `var(--text-lead)` `var(--text-stat)`
  `var(--text-eyebrow)` `var(--text-button)`; tracking `var(--ls-eyebrow)`
  `var(--ls-nav)` `var(--ls-label)`.
- **Shape** — radii are intentionally sharp: `var(--radius-btn)` (2px)
  `var(--radius-card)` (6px) `var(--radius-pill)`. Elevation `var(--shadow-card)`;
  fire glows `var(--shadow-cta)` `var(--glow-medallion)` `var(--glow-ember)`;
  focus `var(--focus-ring)`.
- **Space & motion** — `var(--section-pad-y)` `var(--section-pad-x)`
  `var(--section-max)` `var(--card-min)` `var(--grid-gap)`; eases
  `var(--ease-settle)` `var(--ease-snap)`. Add `className="reveal"` to a block for
  the scroll-in focus-pull. Everything honours `prefers-reduced-motion`.

## The components (15) and how a page is built

Every section opens with **SectionIntro** (centred eyebrow → blackletter Heading
→ Lead). Building blocks: **Button** (primary amber / ghost), **Chip** (trust
pills), **Eyebrow**, **Heading**, **Lead**, **Medallion** (the wolf mark),
**ShowCard** (photo + gold-title act card), **Stat** (gold count-up number),
**TiltCard** (3D quest card), **Field** / **TextArea** / **SelectField** (booking
inputs), **Marquee** (festival ticker), **ScrollCue**. Read each component's
`<Name>.d.ts` for exact props and `<Name>.prompt.md` for usage before composing.

## A real composition

```jsx
import { SectionIntro, ShowCard, Button } from '@mythmaker/ui';

<section style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', maxWidth: 'var(--section-max)', margin: '0 auto' }}>
  <SectionIntro eyebrow="The Show" title="Twelve ancient arts. One fire."
    lead="Every act scales, from a lone fire dancer to a fifty-person spectacle." />
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(var(--card-min), 1fr))', gap: 'var(--grid-gap)', marginTop: 46 }}>
    <ShowCard image="/photos/fire.jpg" title="Fire performance"
      description="Poi, staff, sword and choreographed flame." />
  </div>
  <div style={{ textAlign: 'center', marginTop: 36 }}>
    <Button href="#book">Book the fire</Button>
  </div>
</section>
```
