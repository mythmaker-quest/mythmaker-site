import { Button } from '@mythmaker/ui';

// MythMaker's world is a bonfire at night; preview cards render on white, so
// each story sits on the brand's dark surface the components are built for.
const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Primary = () => <S><Button variant="primary" href="#book">Book a performance</Button></S>;
export const Ghost = () => <S><Button variant="ghost" href="#quest">Explore the Quest</Button></S>;
export const Small = () => <S><Button variant="primary" size="sm" href="#book">Book</Button></S>;
export const Disabled = () => <S><Button variant="primary" disabled>Sending…</Button></S>;
