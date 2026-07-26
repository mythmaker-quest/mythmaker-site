import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug } from '@/lib/content';
import { PILLAR_LABEL } from '@/lib/pillars';
import { siteConfig } from '@/site.config';
import styles from './page.module.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mythmaker.quest';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const url = `/saga/${slug}`;
  return {
    title: `${article.title} — MythMaker`,
    description: article.dek,
    authors: [{ name: article.author ?? siteConfig.author.name }],
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author ?? siteConfig.author.name],
      section: article.pillar,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.dek,
    },
  };
}

export default async function SagaArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { content, title, dek, date, pillar, readMinutes, author } = article;

  const dateFormatted = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const metaParts = [
    `By ${author ?? siteConfig.author.name}`,
    dateFormatted,
    `${readMinutes} min read`,
  ];

  return (
    <article className={styles.readingColumn}>
      <div className={styles.breadcrumb}>
        <Link href="/saga">The Saga</Link>
        <span aria-hidden="true"> · </span>
        <span>{PILLAR_LABEL[pillar]}</span>
      </div>

      <h1 className={styles.articleH1}>{title}</h1>
      <p className={styles.articleDek}>{dek}</p>
      <div className={styles.metaRow}>{metaParts.join(' · ')}</div>

      <div className={styles.articleBody}>{content}</div>

      <div className={styles.cta}>
        <p>{siteConfig.cta.copy}</p>
        <a href={siteConfig.cta.href}>{siteConfig.cta.label} →</a>
      </div>
    </article>
  );
}
