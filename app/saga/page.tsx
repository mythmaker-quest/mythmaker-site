import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { PILLAR_LABEL } from '@/lib/pillars';
import { PillarFilter } from '@/components/PillarFilter';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The Saga — MythMaker',
  description: 'Stories from twenty-five years on the road with fire, myth, and the old ways.',
  alternates: { canonical: '/saga' },
  openGraph: {
    title: 'The Saga — MythMaker',
    description: 'Stories from twenty-five years on the road with fire, myth, and the old ways.',
    url: '/saga',
    type: 'website',
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default async function SagaIndexPage() {
  const articles = await getAllArticles();

  return (
    <section className={styles.index}>
      <p className={styles.eyebrow}>The Saga</p>
      <h1 className={styles.h1}>Stories from the fire.</h1>
      <p className={styles.sub}>
        Twenty-five years on the road. What happened out there deserves more than memory.
      </p>

      <Suspense fallback={<div className={styles.filterPlaceholder} aria-hidden="true" />}>
        <PillarFilter />
      </Suspense>

      <div data-filter-root className={styles.list}>
        {articles.length === 0 ? (
          <p className={styles.empty}>Nothing published yet — check back soon.</p>
        ) : (
          articles.map((article) => (
            <Link
              key={article.slug}
              href={`/saga/${article.slug}`}
              data-pillar={article.pillar}
              className={styles.row}
            >
              <span className={styles.rowMeta}>
                <span className={styles.rowPillar}>
                  {PILLAR_LABEL[article.pillar]}
                </span>
                <span className={styles.rowDate}>{formatDate(article.date)}</span>
              </span>
              <span className={styles.rowBody}>
                <span className={styles.rowTitle}>{article.title}</span>
                <span className={styles.rowDek}>{article.dek}</span>
              </span>
              <span className={styles.rowRead}>{article.readMinutes} min</span>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
