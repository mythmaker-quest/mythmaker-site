# design-sync notes — @mythmaker/ui

Repo-specific gotchas for syncing `packages/ui` (`@mythmaker/ui`) to the Claude
Design project `be05ec27-45c9-4cde-b24b-6616c63508e0`.

## Gotchas the converter hit (all resolved)

- **Top-level `types` is required.** The converter discovers components from
  `pkgJson.types`/`typings` (NOT `exports["."].types`). Our `.` export points at
  `src/index.ts` for Next's transpilePackages, so without a top-level
  `"types": "./dist/index.d.ts"` the converter reported `[ZERO_MATCH]` (0
  components). Keep the top-level `types` field pointing at the built `.d.ts`.
- **`--entry` must be passed explicitly.** `exports["."]` resolves to TS source,
  so the JS entry is given on the command line: `--entry ./packages/ui/dist/index.js`.
- **CSS must be a single flattened file.** The converter appends `cfg.cssEntry`
  verbatim into the closure and does NOT follow `@import`s; `tokensGlob` only
  works with a separate tokens *package*. So `src/styles.css` (which `@import`s
  `tokens/*.css`) shipped an empty token layer. Fix: `scripts/bundle-css.mjs`
  emits `dist/styles.css` with all tokens inlined, and `cfg.cssEntry` points at
  it. This runs as part of `npm run build` (tsup + bundle-css).
- **Fonts must be real files, not data-URIs.** The converter drops any
  `@font-face` whose `url()` isn't a resolvable local file ("dead @font-face
  block dropped") — data-URIs included. So `bundle-css.mjs` copies
  `fonts/knights-quest.woff2` into `dist/` and references it by path; the
  converter copies it into the bundle's `fonts/` and rewrites the url. Google
  faces (Cinzel/Alegreya/IM Fell) load via a remote `@import` → `[FONT_REMOTE]`,
  expected, no action.
- **`TextArea` / `SelectField` land under group `general`.** They're exported
  from `Field.tsx` (group `forms`), but the converter maps each export to its own
  source file and can't find `TextArea.tsx`/`SelectField.tsx`. Cosmetic (DS-pane
  grouping only). To move them under `forms`, add
  `componentSrcMap: {"TextArea": "src/components/forms/Field.tsx", "SelectField": "src/components/forms/Field.tsx"}`.

## Known render warns

- `[RENDER_SKIPPED]` — the first sync ran `package-validate.mjs --no-render-check`
  (no playwright/chromium installed). Previews were NOT machine-rendered. Floor
  cards are deterministic, so this is low-risk, but a render-verified re-sync
  (install playwright + chromium) would confirm the cards visually.

## Re-sync risks / what can go stale

- **`dist/` is gitignored and rebuilt.** `cfg.buildCmd` (`npm run build --workspace
  @mythmaker/ui`) runs tsup AND `scripts/bundle-css.mjs`; always run it before the
  converter. If someone runs bare `tsup`, `dist/styles.css` and
  `dist/knights-quest.woff2` won't exist and the CSS/font will regress.
- **The display font source lives at `packages/ui/fonts/knights-quest.woff2`**
  (committed). If it moves, update `bundle-css.mjs`.
- **All 15 components ship floor cards.** No authored previews yet
  (`.design-sync/previews/` is empty). Authoring rich previews is the standing
  incremental follow-up — needs playwright for grading.
- **No `conventions.md` yet.** The design-agent conventions header
  (`readmeHeader`) hasn't been authored — a follow-up that improves how the
  design agent builds with the DS. The generated README carries the token/usage
  basics in the meantime.
