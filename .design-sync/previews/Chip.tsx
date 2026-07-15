import { Chip } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const TrustPills = () => (
  <S>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Chip>Professional fire-safety standards</Chip>
      <Chip>Tailored to your theme</Chip>
      <Chip>Festival-proven since 1999</Chip>
    </div>
  </S>
);

export const Single = () => <S><Chip>Festival-proven since 1999</Chip></S>;
