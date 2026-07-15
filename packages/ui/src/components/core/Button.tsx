'use client';
import { useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Amber CTA / parchment ghost button.
 * @startingPoint section="Components" subtitle="Primary amber CTA and ghost variants" viewport="700x220"
 */
export interface ButtonProps {
  /** 'primary' = filled amber + glow; 'ghost' = 1px parchment border, gold on hover */
  variant?: 'primary' | 'ghost';
  /** 'md' = 15x28 pads (section CTAs); 'sm' = 9x18 (nav) */
  size?: 'md' | 'sm';
  /** Renders an <a> when set, else <button> */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

const base: CSSProperties = {
  display: 'inline-block', fontFamily: 'var(--font-ui)', fontWeight: 600,
  textTransform: 'uppercase', cursor: 'pointer', borderRadius: 'var(--radius-btn)',
  border: '1px solid transparent', transition: 'all var(--dur-hover) ease', textDecoration: 'none',
};

export function Button({ variant = 'primary', size = 'md', children, href, onClick, disabled, style }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const sz: CSSProperties = size === 'sm'
    ? { fontSize: 12, letterSpacing: '0.14em', padding: 'var(--btn-pad-sm)', fontWeight: 700 }
    : { fontSize: 'var(--text-button)', letterSpacing: 'var(--ls-button)', padding: 'var(--btn-pad)' };
  const looks: CSSProperties = variant === 'primary'
    ? {
        background: hover && !disabled ? 'var(--amber-hover)' : 'var(--amber)',
        color: 'var(--on-amber)', boxShadow: 'var(--shadow-cta)',
        transform: hover && !disabled ? 'translateY(-1px)' : 'none',
      }
    : {
        background: 'transparent',
        borderColor: hover && !disabled ? 'var(--gold)' : 'rgba(239,230,211,.45)',
        color: hover && !disabled ? 'var(--gold)' : 'var(--text)',
      };
  const Tag: ElementType = href ? 'a' : 'button';
  return (
    <Tag
      href={href} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sz, ...looks, ...(disabled ? { opacity: 0.5, cursor: 'default' } : null), ...style }}
    >
      {children}
    </Tag>
  );
}
