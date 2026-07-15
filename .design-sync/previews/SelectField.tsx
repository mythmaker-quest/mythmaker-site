import { SelectField } from '@mythmaker/ui';

const S = ({ children, pad = 28 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const EventType = () => (
  <S>
    <div style={{ maxWidth: 340 }}>
      <SelectField name="type" defaultValue="">
        <option value="">Type of event…</option>
        <option value="festival">Festival</option>
        <option value="wedding">Wedding</option>
        <option value="corporate">Corporate</option>
        <option value="school">School program</option>
        <option value="parade">Parade</option>
      </SelectField>
    </div>
  </S>
);
