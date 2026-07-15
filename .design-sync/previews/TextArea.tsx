import { TextArea } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Vision = () => (
  <S>
    <div style={{ maxWidth: 420 }}>
      <TextArea name="vision" rows={4} placeholder="Tell us about your event — where, how big, how wild" />
    </div>
  </S>
);
