'use client';
import { useState } from 'react';

/**
 * Photo card for acts/workshops: image, gold Cinzel title, body.
 * @startingPoint section="Components" subtitle="Photo + gold title act card" viewport="700x420"
 */
export interface ShowCardProps {
  /** Photo url (night/firelit imagery) */
  image: string;
  title: string;
  description: string;
  /** 240 (show grid) or 210 (workshops) */
  imageHeight?: number;
  /** CSS object-position for the crop */
  objectPosition?: string;
}

export function ShowCard({ image, title, description, imageHeight = 240, objectPosition = 'center' }: ShowCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--surface-card)' }}
    >
      <div style={{ position: 'relative', height: imageHeight, overflow: 'hidden' }}>
        <img src={image} alt={title} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition, transition: 'transform 0.7s ease', transform: hover ? 'scale(1.06)' : 'none',
        }} />
      </div>
      <div style={{ padding: 'var(--card-body-pad)' }}>
        <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-card-title)', fontWeight: 600, color: 'var(--gold)', margin: '0 0 6px' }}>{title}</h3>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-card-body)', lineHeight: 1.55, color: 'rgba(239,230,211,.75)' }}>{description}</p>
      </div>
    </div>
  );
}
