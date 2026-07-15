'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { Ref } from 'react';

/** Seamless festival-credits ticker with ember-diamond separators. */
export interface MarqueeProps {
  /** Festival names, in order */
  items: string[];
  /** Seconds to scroll one item-set past (sets the speed). Default 34. */
  duration?: number;
  /** Soft bg fades on both edges. Default true. */
  edgeFade?: boolean;
}

export function Marquee({ items, duration = 34, edgeFade = true }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const [reps, setReps] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // The loop is two identical groups sliding left by exactly one group width.
  // That's only seamless when one group is wider than the container — else a
  // gap opens on the right before it resets. So repeat the item-set enough
  // times that one group always overflows the viewport, and re-check on resize.
  useEffect(() => {
    const container = containerRef.current, group = groupRef.current;
    if (!container || !group) return;
    const fit = () => {
      const cw = container.offsetWidth;
      const setW = group.offsetWidth / reps;
      if (!cw || !setW) return;
      const need = Math.ceil(cw / setW) + 1;
      if (need !== reps) setReps(need);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
  }, [items, reps]);

  const oneSet = items.map((f, i) => (
    <Fragment key={i}>
      <span style={{
        fontFamily: 'var(--font-ui)', fontSize: 12.5, letterSpacing: 'var(--ls-nav)',
        textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap', padding: '0 26px',
      }}>{f}</span>
      <span style={{ width: 5, height: 5, flex: 'none', transform: 'rotate(45deg)', background: 'var(--amber)', boxShadow: 'var(--glow-ember)' }} />
    </Fragment>
  ));

  const group = (ref?: Ref<HTMLDivElement>) => (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: reps }, (_, r) => <Fragment key={r}>{oneSet}</Fragment>)}
    </div>
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-alt)', borderTop: '1px solid var(--border-gold-soft)', borderBottom: '1px solid var(--border-gold-soft)', padding: '22px 0' }}
    >
      {/* two identical groups; -50% slides exactly one group, so it repeats with no gap.
          duration scales with reps to keep the pixel speed constant. */}
      <div style={{ display: 'flex', width: 'max-content', animation: `mmMarquee ${duration * reps}s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}>
        {group(groupRef)}
        <div aria-hidden="true">{group()}</div>
      </div>
      {edgeFade && <>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(90deg, var(--bg-alt), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(270deg, var(--bg-alt), transparent)', pointerEvents: 'none' }} />
      </>}
    </div>
  );
}
