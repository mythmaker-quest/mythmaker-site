import type { CSSProperties } from 'react';

/** The circular wolf-medallion brand mark. 36px nav, 44px footer. */
export interface MedallionProps {
  /** Pixel size. Default 36. */
  size?: number;
  /** Amber fire glow (hero-scale uses) */
  glow?: boolean;
  /** Override asset path if the consumer's relative root differs */
  src?: string;
  style?: CSSProperties;
}

export function Medallion({ size = 36, glow = false, src = 'assets/brand/wolf-medallion.png', style }: MedallionProps) {
  return (
    <img
      src={src} alt="MythMaker medallion" width={size} height={size}
      style={{ borderRadius: '50%', display: 'block', boxShadow: glow ? 'var(--glow-medallion)' : 'none', ...style }}
    />
  );
}
