import { Eyebrow } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Amber = () => <S><Eyebrow>The Show</Eyebrow></S>;
export const Bronze = () => <S><Eyebrow color="var(--bronze)">The Quest</Eyebrow></S>;
