import { siteConfig } from '@/site.config';

export const PILLARS = siteConfig.categories.map((c) => c.slug) as readonly string[];

export type Pillar = string;

// All three pillars share the uniform amber-gold eyebrow colour — no per-section colours.
const AMBER_GOLD = '#ffbf2e';

export const PILLAR_TOKEN: Record<string, string> = Object.fromEntries(
  siteConfig.categories.map((c) => [c.slug, AMBER_GOLD]),
);

export const PILLAR_LABEL: Record<string, string> = Object.fromEntries(
  siteConfig.categories.map((c) => [c.slug, c.label]),
);

export const PILLAR_SLUG_PATH: Record<string, string> = Object.fromEntries(
  siteConfig.categories.map((c) => [c.slug, `/saga?topic=${c.slug}`]),
);
