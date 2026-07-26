'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PILLARS, PILLAR_LABEL } from '@/lib/pillars';
import styles from './PillarFilter.module.css';

export function PillarFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get('topic');
  const active = (PILLARS as readonly string[]).includes(raw ?? '') ? (raw as string) : 'all';

  useEffect(() => {
    const root = document.querySelector('[data-filter-root]');
    if (root) root.setAttribute('data-filter', active);
  }, [active]);

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('topic');
    } else {
      params.set('topic', value);
    }
    const qs = params.toString();
    router.replace(`/saga${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const chips = ['all', ...PILLARS] as const;

  return (
    <div role="group" aria-label="Filter by topic" className={styles.group}>
      {chips.map((chip) => {
        const isActive = active === chip;
        return (
          <button
            key={chip}
            type="button"
            onClick={() => setFilter(chip)}
            aria-pressed={isActive}
            className={isActive ? styles.chipActive : styles.chip}
          >
            {chip === 'all' ? 'all' : PILLAR_LABEL[chip]}
          </button>
        );
      })}
    </div>
  );
}
