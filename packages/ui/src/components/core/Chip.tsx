import type { CSSProperties, ReactNode } from 'react';

/** Gold-hairline pill for trust facts ("Professional fire-safety standards"). */
export interface ChipProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Chip({ children, style }: ChipProps) {
  return (
    <span style={{
      fontFamily: 'var(--font-ui)', fontSize: 'var(--text-chip)', letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'rgba(239,230,211,.78)',
      border: '1px solid rgba(246,196,83,.28)', borderRadius: 'var(--radius-pill)',
      padding: 'var(--chip-pad)', display: 'inline-block', ...style,
    }}>
      {children}
    </span>
  );
}
