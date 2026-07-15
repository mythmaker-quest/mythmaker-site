import { Marquee } from '@mythmaker/ui';

const FESTIVALS = ['Burning Man', 'Shambhala', 'Faerieworlds', 'Earthdance', 'Vancouver Island MusicFest', 'Starbelly Jam'];

const S = ({ children }: any) => (
  <div style={{ background: 'var(--bg)', padding: '24px 0', borderRadius: 8 }}>{children}</div>
);

export const Festivals = () => <S><Marquee items={FESTIVALS} /></S>;
