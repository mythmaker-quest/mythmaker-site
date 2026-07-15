'use client';
import { useRef } from 'react';
import type { CSSProperties, PointerEvent } from 'react';

/** 3D pointer-tilt card with a light-sheen sweep (the Quest cards). */
export interface TiltCardProps {
  /** Card artwork url */
  image: string;
  alt?: string;
  /** Max width px (rendered as min(width, 40vw)). Default 230. */
  width?: number;
  /** Diagonal light sweep loop. Default true. */
  sheen?: boolean;
  style?: CSSProperties;
}

export function TiltCard({ image, alt = '', width = 230, sheen = true, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform .07s linear';
    el.style.transform = `perspective(900px) rotateY(${(x * 16).toFixed(2)}deg) rotateX(${(-y * 14).toFixed(2)}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transition = 'transform .55s var(--ease-snap)';
    el.style.transform = 'perspective(900px)';
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}
      style={{ width: `min(${width}px, 40vw)`, willChange: 'transform', transform: 'perspective(900px)', ...style }}>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-quest-card)', overflow: 'hidden', border: '1px solid rgba(200,180,140,.35)', boxShadow: 'var(--shadow-card)' }}>
        <img src={image} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
        {sheen && <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 42%, rgba(255,240,210,.13) 47%, transparent 54%)',
          backgroundSize: '240% 100%', animation: 'mmSheen 5.5s ease-in-out infinite',
        }} />}
      </div>
    </div>
  );
}
