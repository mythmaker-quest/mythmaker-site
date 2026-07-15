import { Medallion } from '@mythmaker/ui';

const src = 'https://mythmaker-site.vercel.app/brand/wolf-medallion.png';

const S = ({ children, pad = 32 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8, display: 'flex', gap: 28, alignItems: 'center' }}>{children}</div>
);

export const Sizes = () => (
  <S>
    <Medallion src={src} size={36} />
    <Medallion src={src} size={44} />
    <Medallion src={src} size={72} glow />
  </S>
);
