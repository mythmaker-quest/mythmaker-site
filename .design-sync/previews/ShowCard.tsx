import { ShowCard } from '@mythmaker/ui';

const url = (n: string) => `https://mythmaker-site.vercel.app/photos/${n}`;

const S = ({ children, pad = 24 }: any) => (
  <div style={{ background: 'var(--bg)', padding: pad, borderRadius: 8 }}>{children}</div>
);

export const FirePerformance = () => (
  <S>
    <div style={{ maxWidth: 340 }}>
      <ShowCard image={url('IMG_6868.jpg')} title="Fire performance"
        description="Poi, staff, sword and choreographed flame. The signature that made the name." />
    </div>
  </S>
);

export const Ceremony = () => (
  <S>
    <div style={{ maxWidth: 340 }}>
      <ShowCard image={url('IMG_2487.jpg')} title="Ceremony & ritual"
        description="Openings, finales and weddings. Moments made sacred by fire and story." />
    </div>
  </S>
);

export const Workshop = () => (
  <S>
    <div style={{ maxWidth: 300 }}>
      <ShowCard image={url('IMG_1424.jpg')} title="Retreats & rites of passage"
        description="Ceremonial journeys into healthy masculinity, initiation and belonging." imageHeight={210} />
    </div>
  </S>
);
