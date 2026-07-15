import { Field } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Name = () => <S><div style={{ maxWidth: 340 }}><Field name="name" placeholder="Your name" /></div></S>;
export const Email = () => <S><div style={{ maxWidth: 340 }}><Field type="email" name="email" placeholder="Email" /></div></S>;
