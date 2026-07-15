import { Lead } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Default = () => (
  <S>
    <div style={{ maxWidth: 600 }}>
      <Lead>Every act scales — from a lone fire dancer at an intimate ceremony to a fifty-person spectacle on a festival main stage. Tailored to your theme, staged to professional fire-safety standards.</Lead>
    </div>
  </S>
);

export const Hero = () => (
  <S>
    <div style={{ maxWidth: 600 }}>
      <Lead hero>A professional company of fire artists, storytellers and myth-builders from the mountains of British Columbia — summoning living mythology to festivals, weddings and gatherings across the world.</Lead>
    </div>
  </S>
);
