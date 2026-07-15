import { Heading } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Section = () => <S><Heading>Forged in fire at Black Rock City</Heading></S>;
export const Compact = () => <S><Heading compact>Guided by the swordmaster</Heading></S>;
