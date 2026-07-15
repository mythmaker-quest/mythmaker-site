import { TiltCard } from '@mythmaker/ui';

const b = 'https://mythmaker-site.vercel.app/brand';

const S = ({ children, pad = 24 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8, display: 'flex', gap: 24, justifyContent: 'center' }}>{children}</div>
);

export const QuestCards = () => (
  <S>
    <TiltCard image={`${b}/questcard-the-magician.png`} alt="Quest card — The Magician" width={200} />
    <TiltCard image={`${b}/questcard-wrens-ritual.png`} alt="Quest card — Wren's Ritual" width={200} />
  </S>
);
