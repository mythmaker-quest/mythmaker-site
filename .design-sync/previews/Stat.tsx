import { Stat } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

// countUp is off so the static preview shows the final figure, not 0.
export const Single = () => <S><Stat value={30000} label="Souls at our biggest show" countUp={false} /></S>;

export const Row = () => (
  <S>
    <div style={{ display: 'flex', gap: '36px 52px', flexWrap: 'wrap' }}>
      <Stat value={15} label="Years at Burning Man" countUp={false} />
      <Stat value={100} label="Warriors at full strength" countUp={false} />
      <Stat value={30000} label="Souls at our biggest show" countUp={false} />
      <Stat value={33} label="Productions since 1999" countUp={false} />
    </div>
  </S>
);
