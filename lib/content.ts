import { cache } from 'react';
import type { ReactElement } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Pluggable } from 'unified';
import { mdxComponents } from '@/components/mdx';
import type { Pillar } from '@/lib/pillars';
import { PILLARS } from '@/lib/pillars';

const PILLAR_ENUM = PILLARS as unknown as [string, ...string[]];

const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  dek: z.string(),
  date: z
    .string()
    .refine((d) => !Number.isNaN(Date.parse(d)), { message: 'date must be a parseable ISO 8601 string' }),
  pillar: z.enum(PILLAR_ENUM),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be URL-safe (lowercase letters, numbers, hyphens only)'),
  author: z.string().optional(),
  read: z.number().optional(),
  draft: z.boolean().optional().default(false),
});

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

export interface Article extends ArticleFrontmatter {
  readMinutes: number;
  content: ReactElement;
}

const mdxOptions = {
  remarkPlugins: [remarkGfm as Pluggable],
  rehypePlugins: [] as Pluggable[],
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const getAllArticles = cache(async (): Promise<Article[]> => {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const articles: Article[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content: mdxBody } = matter(raw);

    const parsed = ArticleFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const missing = Object.keys(fieldErrors).join(', ');
      throw new Error(
        `[content] Frontmatter validation failed in ${file}:\n` +
          `  Missing or invalid fields: ${missing || '(unknown)'}\n` +
          `  ${parsed.error.message}`,
      );
    }

    const fm = parsed.data;

    if (IS_PRODUCTION && fm.draft === true) continue;

    const { minutes } = readingTime(mdxBody);
    const readMinutes = fm.read ?? Math.ceil(minutes);

    const { content } = await compileMDX({
      source: mdxBody,
      components: mdxComponents,
      options: {
        parseFrontmatter: false,
        blockJS: false,
        mdxOptions,
      },
    });

    articles.push({ ...fm, readMinutes, content });
  }

  return articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const all = await getAllArticles();
  return all.find((a) => a.slug === slug) ?? null;
});

export const getArticlesByPillar = cache(async (pillar: Pillar): Promise<Article[]> => {
  const all = await getAllArticles();
  return all.filter((a) => a.pillar === pillar);
});
