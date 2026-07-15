import type { CSSProperties, ReactNode } from 'react';

/** Blackletter display heading (Knights Quest 400). Keep short; never uppercase. */
export interface HeadingProps {
  /** Semantic tag. Default 'h2'. */
  as?: 'h1' | 'h2' | 'h3';
  /** Slightly smaller clamp (Company section) */
  compact?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export function Heading({ as: Tag = 'h2', compact = false, children, style }: HeadingProps) {
  return (
    <Tag style={{
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: compact ? 'var(--text-h2-compact)' : 'var(--text-h2)',
      lineHeight: 1.1, letterSpacing: 'var(--ls-display)', color: 'var(--text-heading)',
      margin: 0, ...style,
    }}>
      {children}
    </Tag>
  );
}
