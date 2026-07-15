'use client';
import { Fragment, useState } from 'react';

/** Seamless festival-credits ticker with ember-diamond separators. */
export interface MarqueeProps {
  /** Festival names, in order */
  items: string[];
  /** Loop seconds. Default 34. */
  duration?: number;
  /** Soft bg fades on both edges. Default true. */
  edgeFade?: boolean;
}

export function Marquee({ items, duration = 34, edgeFade = true }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const half = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {items.map((f, i) => (
        <Fragment key={i}>
          <span style={{
            fontFamily: 'var(--font-ui)', fontSize: 12.5, letterSpacing: 'var(--ls-nav)',
            textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap', padding: '0 26px',
          }}>{f}</span>
          <span style={{ width: 5, height: 5, flex: 'none', transform: 'rotate(45deg)', background: 'var(--amber)', boxShadow: 'var(--glow-ember)' }} />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-alt)', borderTop: '1px solid var(--border-gold-soft)', borderBottom: '1px solid var(--border-gold-soft)', padding: '22px 0' }}
    >
      <div style={{ display: 'flex', width: 'max-content', animation: `mmMarquee ${duration}s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}>
        {half}
        <div aria-hidden="true">{half}</div>
      </div>
      {edgeFade && <>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(90deg, var(--bg-alt), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(270deg, var(--bg-alt), transparent)', pointerEvents: 'none' }} />
      </>}
    </div>
  );
}
