import type { CSSProperties } from 'react';

/** Bottom-of-hero bouncing chevron cue. */
export interface ScrollCueProps {
  /** Default "The saga unfolds" */
  label?: string;
  style?: CSSProperties;
}

export function ScrollCue({ label = 'The saga unfolds', style }: ScrollCueProps) {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(239,230,211,.55)', ...style }}>
      {label}
      <div style={{ animation: 'mmBounce 2.2s ease-in-out infinite', marginTop: 4, color: 'rgba(246,196,83,.7)' }}>▾</div>
    </div>
  );
}
