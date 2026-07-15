import { ScrollCue } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Default = () => <S><ScrollCue /></S>;
export const Custom = () => <S><ScrollCue label="Enter the Quest" /></S>;
