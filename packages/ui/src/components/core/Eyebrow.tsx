import type { CSSProperties, ReactNode } from 'react';

/** Small uppercase Cinzel kicker above a heading ("The Saga"). */
export interface EyebrowProps {
  children: ReactNode;
  /** Default amber; Quest section uses var(--bronze) */
  color?: string;
  style?: CSSProperties;
}

export function Eyebrow({ children, color = 'var(--amber)', style }: EyebrowProps) {
  return (
    <div style={{
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)', textTransform: 'uppercase',
      color, marginBottom: 14, ...style,
    }}>
      {children}
    </div>
  );
}
