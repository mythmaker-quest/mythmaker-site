import { SectionIntro } from '@mythmaker/ui';

const S = ({ children, pad = 36 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const Show = () => (
  <S>
    <SectionIntro eyebrow="The Show" title="Twelve ancient arts. One fire."
      lead="Every act scales, from a lone fire dancer at an intimate ceremony to a fifty-person spectacle on a festival main stage." />
  </S>
);

export const Quest = () => (
  <S>
    <SectionIntro eyebrow="The Quest" eyebrowColor="var(--bronze)" title="The veil is thin"
      lead="Beyond the fire lies a hidden world — a deck of cards you hold in your hands, a scrying scroll, seven keys and a white antlered wolf." />
  </S>
);
