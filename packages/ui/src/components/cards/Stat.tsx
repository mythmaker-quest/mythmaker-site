'use client';
import { useEffect, useRef, useState } from 'react';

/** Gold count-up stat with uppercase label ("15 / Years at Burning Man"). */
export interface StatProps {
  /** Final number; formatted with en-US thousands separators */
  value: number;
  label: string;
  /** Animate 0→value on first view (1600ms easeOutCubic). Off under reduced motion. */
  countUp?: boolean;
  duration?: number;
}

export function Stat({ value, label, countUp = true, duration = 1600 }: StatProps) {
  const [shown, setShown] = useState(countUp ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!countUp) { setShown(value); return; }
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(value); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, countUp, duration]);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-stat)', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>
        {shown.toLocaleString('en-US')}
      </div>
      <div style={{ marginTop: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-strong)', textShadow: 'var(--shadow-text-legible)' }}>
        {label}
      </div>
    </div>
  );
}
