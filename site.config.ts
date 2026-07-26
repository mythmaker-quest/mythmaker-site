export interface SiteCategory {
  slug: string;
  label: string;
  description: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  author: { name: string };
  cta: { copy: string; label: string; href: string };
  categories: SiteCategory[];
}

export const siteConfig: SiteConfig = {
  siteName: 'MythMaker',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mythmaker.quest',
  author: { name: 'Hjeron O\'Sidhe' },
  cta: {
    copy: 'The Quest is a real-world game. Pick up a shard.',
    label: 'Enter the Quest',
    href: 'https://thequest.mythmaker.ca',
  },
  categories: [
    {
      slug: 'show',
      label: 'the show',
      description: 'fire performance, festival recaps, and the stage',
    },
    {
      slug: 'quest',
      label: 'the quest',
      description: 'the Quest game, mythic self-development, and the old ways',
    },
    {
      slug: 'workshops',
      label: 'workshops',
      description: "men's work, rites of passage, and old-ways skills",
    },
  ],
};
