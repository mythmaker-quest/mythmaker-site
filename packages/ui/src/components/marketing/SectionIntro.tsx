import type { CSSProperties } from 'react';
import { Eyebrow } from '../core/Eyebrow';
import { Heading } from '../core/Heading';
import { Lead } from '../core/Lead';

/** Centered eyebrow → blackletter heading → lead stack that opens every section. */
export interface SectionIntroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Quest section passes var(--bronze) */
  eyebrowColor?: string;
  /** Default 720 */
  maxWidth?: number;
  style?: CSSProperties;
}

export function SectionIntro({ eyebrow, title, lead, eyebrowColor, maxWidth = 720, style }: SectionIntroProps) {
  return (
    <div style={{ textAlign: 'center', maxWidth, margin: '0 auto', ...style }}>
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <Heading>{title}</Heading>
      {lead && <Lead style={{ marginTop: 16 }}>{lead}</Lead>}
    </div>
  );
}
