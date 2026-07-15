import type { CSSProperties, ReactNode } from 'react';

/** Alegreya lead paragraph under a section heading. */
export interface LeadProps {
  /** Hero variant: 19px, brighter parchment */
  hero?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export function Lead({ children, hero = false, style }: LeadProps) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: hero ? 'var(--text-hero-lead)' : 'var(--text-lead)',
      lineHeight: hero ? 1.65 : 1.68,
      color: hero ? 'var(--text-strong)' : 'rgba(239,230,211,.78)',
      margin: 0, ...style,
    }}>
      {children}
    </p>
  );
}
