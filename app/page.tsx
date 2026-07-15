'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useActionState } from 'react';
import { Marquee, Stat } from '@mythmaker/ui';
import dims from './photo-dims.json';
import { sendBooking } from './actions';

type Dim = { w: number; h: number };
const D = dims as Record<string, Dim>;
const dim = (n: string) => { const d = D[n] ?? { w: 1600, h: 1066 }; return { width: d.w, height: d.h }; };

const NAV: [string, string][] = [
  ['#show', 'The Show'], ['#saga', 'The Saga'], ['#quest', 'The Quest'],
  ['#gallery', 'Gallery'], ['#company', 'Company'], ['#workshops', 'Workshops'],
];
const RAIL: [string, string][] = [
  ['show', 'Show'], ['saga', 'Saga'], ['quest', 'Quest'], ['gallery', 'Gallery'],
  ['company', 'Company'], ['workshops', 'Workshops'], ['book', 'Book'],
];
const FESTIVALS = ['Burning Man', 'Shambhala', 'Faerieworlds', 'Realms Unknown', 'Earthdance', 'Vancouver Island MusicFest', 'Starbelly Jam'];
const SHOW = [
  { img: 'IMG_6868.jpg', t: 'Fire performance', d: 'Poi, staff, sword and choreographed flame. The signature that made the name.', pos: 'center' },
  { img: 'IMG_4445.jpg', t: 'Circus & aerial', d: 'Acrobats, jugglers and contortionists: sacred circus of flight and flame.', pos: 'center' },
  { img: 'IMG_1698.jpg', t: 'Stilts & creatures', d: 'Costumed giants and archetypal masks walking among your crowd.', pos: 'center 34%' },
  { img: 'IMG_0553.jpg', t: 'Epic swordplay', d: 'Choreographed steel for stage and screen. Performance and workshops.', pos: 'center' },
  { img: 'IMG_2487.jpg', t: 'Ceremony & ritual', d: 'Openings, finales and weddings. Moments made sacred by fire and story.', pos: 'center' },
  { img: 'IMG_1356.jpg', t: 'Music & parade', d: 'Theatrical music, thunderous drums and award-winning parade processions.', pos: 'center 22%' },
];
const WORKSHOPS = [
  { img: 'IMG_1424.jpg', t: 'Retreats & rites of passage', d: 'Men’s Mysteries, Rites of Passage and Youth Coming-of-Age: ceremonial journeys into healthy masculinity, initiation and belonging.', pos: 'center' },
  { img: 'IMG_7420.jpg', t: 'For builders of community', d: 'The Intentional Community Blueprint and hands-on consulting for co-ops and collectives. Thirty years of what makes a community last.', pos: 'center 30%' },
  { img: 'IMG_6877.jpg', t: 'For makers of experience', d: 'Designing the Immersive World: a masterclass on ritual, immersion and the craft of an event no one forgets.', pos: 'center' },
  { img: 'IMG_0618.jpg', t: 'The old ways', d: 'Sword, fire, mask, story and Nordic/Celtic rite, taught hand to hand.', pos: 'center' },
];
const GALLERY: [string, string][] = [
  ['IMG_4439.jpg', 'A hooded fire priestess raises two blazing pentagram wheels'],
  ['IMG_1178.jpg', 'A swordsman turns through the mist with twin blades drawn'],
  ['IMG_6872.jpg', 'A white leather mask streaked with red beneath a pale hood'],
  ['IMG_0585.jpg', 'The great dragon effigy ablaze against the night'],
  ['77B051F2-C3F8-4B95-9A14-6ADED93B8830.jpg', 'A fire dancer roars with a flaming club in each hand'],
  ['IMG_7315.jpg', 'A mud-caked reveller with sword and shield before the MythMaker bus'],
  ['6D7C7F63-1599-480A-84FD-03D585E83B00.jpg', 'A wall of hand-painted Norse rune shields'],
  ['IMG_4128.jpg', 'A dragon puppet breathes a column of fire above the shield wall'],
];
const STATS: [number, string, string][] = [
  [15, '15', 'Years at Burning Man'],
  [100, '100', 'Warriors at full strength'],
  [30000, '30,000', 'Souls at our biggest show'],
  [33, '33', 'Original productions since 1999'],
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lb, setLb] = useState(-1);
  const [bookState, bookAction, bookPending] = useActionState(sendBooking, null);
  const [wolf, setWolf] = useState(0);
  const embersRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // reveal, count-up, embers, reduced-motion
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // reveal on scroll
    const revEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reduce) revEls.forEach((el) => el.classList.add('shown'));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      revEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // (stat count-up now lives in the @mythmaker/ui <Stat> component)

    // embers
    const cv = embersRef.current, hero = heroRef.current;
    if (cv && hero && !reduce) {
      const ctx = cv.getContext('2d')!;
      const DPR = Math.min(1.5, window.devicePixelRatio || 1);
      let W = 0, H = 0, raf = 0, px = -1e4, py = -1e4;
      const fit = () => { const r = hero.getBoundingClientRect(); W = cv.width = Math.max(1, r.width * DPR); H = cv.height = Math.max(1, r.height * DPR); };
      fit();
      const onResize = () => fit();
      const onMove = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); px = (e.clientX - r.left) * DPR; py = (e.clientY - r.top) * DPR; };
      const onLeave = () => { px = py = -1e4; };
      addEventListener('resize', onResize);
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      const spawn = (seed: boolean) => ({
        x: Math.random() * W, y: seed ? Math.random() * H : H + Math.random() * 60 * DPR,
        r: (0.7 + Math.random() * 1.7) * DPR, vy: (0.3 + Math.random() * 0.9) * DPR, vx: (Math.random() - 0.5) * 0.35 * DPR,
        tw: Math.random() * 6.283, ts: 0.03 + Math.random() * 0.05, hue: 22 + Math.random() * 26, a: 0.3 + Math.random() * 0.5,
      });
      const P: ReturnType<typeof spawn>[] = [];
      let vis = true;
      const vio = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }, { threshold: 0.02 });
      vio.observe(hero);
      const step = (now: number) => {
        raf = requestAnimationFrame(step);
        if (document.hidden || !vis) return;
        const want = Math.round((90 * W) / (1100 * DPR));
        while (P.length < want) P.push(spawn(Math.random() < 0.5));
        if (P.length > want) P.length = want;
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of P) {
          p.tw += p.ts;
          const fl = 0.55 + 0.45 * Math.sin(p.tw);
          p.x += p.vx + Math.sin((p.y + now * 0.06) / 90) * 0.15 * DPR;
          p.y -= p.vy;
          const dx = p.x - px, dy = p.y - py, R = 150 * DPR, d2 = dx * dx + dy * dy;
          let boost = 0;
          if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = 1 - d / R; p.x += (dx / d) * f * 1.6 * DPR; p.y -= f * 0.9 * DPR; boost = f * 0.5; }
          if (p.y < -12 || p.x < -12 || p.x > W + 12) { Object.assign(p, spawn(false)); continue; }
          const al = Math.min(1, p.a * fl + boost);
          ctx.fillStyle = `hsla(${p.hue + boost * 20},95%,${58 + fl * 12 + boost * 20}%,${al})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + boost), 0, 6.283); ctx.fill();
          ctx.fillStyle = `hsla(${p.hue},95%,55%,${al * 0.16})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.283); ctx.fill();
        }
      };
      raf = requestAnimationFrame(step);
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); vio.disconnect(); });
    }

    // saga parallax
    const sagaWrap = document.querySelector<HTMLElement>('.saga-bg-wrap');
    if (sagaWrap && !reduce) {
      let sraf = 0;
      const onScroll = () => {
        cancelAnimationFrame(sraf);
        sraf = requestAnimationFrame(() => {
          const saga = sagaWrap.closest('section');
          if (!saga) return;
          const r = saga.getBoundingClientRect();
          const offset = r.top + r.height / 2 - window.innerHeight / 2;
          sagaWrap.style.transform = `translate3d(0, ${(-offset * 0.05).toFixed(1)}px, 0)`;
        });
      };
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => { cancelAnimationFrame(sraf); removeEventListener('scroll', onScroll); });
    }

    // chapter rail — highlight the active section
    const railLinks = Array.from(document.querySelectorAll<HTMLElement>('.chapter-rail a'));
    if (railLinks.length) {
      const rio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = (e.target as HTMLElement).id;
        railLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }), { rootMargin: '-45% 0px -45%' });
      document.querySelectorAll<HTMLElement>('section[id]').forEach((s) => rio.observe(s));
      cleanups.push(() => rio.disconnect());
    }

    // magnetic primary CTAs (fine-pointer only)
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
      const mags = Array.from(document.querySelectorAll<HTMLElement>('.btn-primary'));
      const handlers: Array<[HTMLElement, (e: PointerEvent) => void, () => void]> = [];
      mags.forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
          btn.style.transition = 'transform .1s ease';
          btn.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.32).toFixed(1)}px)`;
        };
        const leave = () => { btn.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)'; btn.style.transform = ''; };
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', leave);
        handlers.push([btn, move, leave]);
      });
      cleanups.push(() => handlers.forEach(([b, m, l]) => { b.removeEventListener('pointermove', m); b.removeEventListener('pointerleave', l); }));
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  // lightbox keyboard + scroll lock
  useEffect(() => {
    if (lb < 0) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(-1);
      if (e.key === 'ArrowRight') setLb((i) => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setLb((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    addEventListener('keydown', onKey);
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lb]);

  const tiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform .07s linear';
    el.style.transform = `perspective(900px) rotateY(${(x * 16).toFixed(2)}deg) rotateX(${(-y * 14).toFixed(2)}deg) translateY(-6px)`;
  };
  const tiltLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transition = 'transform .55s cubic-bezier(.2,.8,.2,1)';
    el.style.transform = 'perspective(900px)';
  };

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="grain-noise" aria-hidden />
      <nav className="chapter-rail" aria-hidden="true">
        {RAIL.map(([id, l]) => (
          <a key={id} href={`#${id}`}>
            <span className="lbl">{l}</span>
            <span className="dot" />
          </a>
        ))}
      </nav>

      <nav className="nav">
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image src="/brand/wolf-medallion.png" alt="MythMaker medallion" width={36} height={36} style={{ borderRadius: '50%' }} />
          <Image src="/brand/logo-wordmark.png" alt="MythMaker" width={91} height={30} style={{ height: 30, width: 'auto' }} />
        </a>
        <div style={{ flex: 1 }} />
        <div className="nav-links">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          <a href="#book" className="nav-cta desktop">Book a performance</a>
        </div>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span /><span /><span />
        </button>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setMenuOpen(false)}>{l}</a>)}
          <a href="#book" onClick={() => setMenuOpen(false)}>Book a performance →</a>
        </div>
      </nav>

      <div id="top" />

      <section className="hero" ref={heroRef}>
        <Image src="/photos/IMG_6864.jpg" alt="A hooded MythMaker fire dancer leads the troupe, twin arcs of flame trailing from his hands" fill priority sizes="100vw" className="hero-img" style={{ objectFit: 'cover', objectPosition: 'center 46%' }} />
        <div className="hero-overlay" />
        <canvas ref={embersRef} className="hero-embers" />
        <div className="hero-inner">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ position: 'absolute', inset: -46, background: 'radial-gradient(50% 62% at 50% 50%, rgba(232,149,30,.3), transparent 70%)', animation: 'mmGlow 4.5s ease-in-out infinite', pointerEvents: 'none' }} />
            <Image src="/brand/logo-wordmark.png" alt="MYTHMAKER" width={548} height={180} priority className="hero-wordmark" />
          </div>
          <div className="hero-tagline">Fire · Myth · Ceremony</div>
          <p className="hero-lead">A professional company of fire artists, storytellers and myth-builders from the mountains of British Columbia, summoning living mythology to festivals, weddings and gatherings across the world.</p>
          <div className="hero-ctas">
            <a href="#book" className="btn btn-primary">Book a performance</a>
            <a href="#quest" className="btn btn-ghost">Explore the Quest</a>
          </div>
        </div>
        <div className="scroll-cue">The saga unfolds<div className="chev">▾</div></div>
      </section>

      <section aria-label="Festivals played">
        <Marquee items={FESTIVALS} />
      </section>

      <section id="show" className="section">
        <div className="reveal center" style={{ maxWidth: 720, margin: '0 auto 46px' }}>
          <div className="eyebrow">The Show</div>
          <h2 className="h2">Twelve ancient arts. One fire.</h2>
          <p className="lead" style={{ marginTop: 16 }}>Every act scales, from a lone fire dancer at an intimate ceremony to a fifty-person spectacle on a festival main stage. Tailored to your theme, staged to professional fire-safety standards.</p>
        </div>
        <div className="reveal grid">
          {SHOW.map((c) => (
            <div className="card" key={c.img}>
              <div className="card-img">
                <Image src={`/photos/${c.img}`} alt={c.t} fill sizes="(max-width:820px) 100vw, 380px" style={{ objectFit: 'cover', objectPosition: c.pos }} />
              </div>
              <div className="card-body"><h3>{c.t}</h3><p>{c.d}</p></div>
            </div>
          ))}
        </div>
        <div className="reveal center" style={{ marginTop: 36 }}>
          <p style={{ margin: '0 0 24px', fontStyle: 'italic', fontSize: 16, color: 'rgba(239,230,211,.6)' }}>Also in the wagon: costumes &amp; creatures · giant puppets · roaming theatre · school programs in fire, sword, stilt and mask.</p>
          <a href="#book" className="btn btn-primary">Book the fire</a>
        </div>
      </section>

      <section id="saga" className="saga">
        <div className="saga-bg-wrap">
          <Image src="/photos/IMG_0535.jpg" alt="The hundred-strong Camp MythMaker gathered on their dragon-prowed bus at Burning Man" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 38%' }} />
        </div>
        <div className="saga-veil" />
        <div className="reveal center" style={{ position: 'relative', maxWidth: 880, margin: '0 auto' }}>
          <div className="eyebrow">The Saga</div>
          <h2 className="h2">Forged in fire at Black Rock City</h2>
          <p className="lead" style={{ margin: '18px auto 0', maxWidth: 700, color: 'rgba(239,230,211,.82)' }}>For fifteen years MythMaker raised a Viking city at Burning Man, a hundred warriors strong, with a flaming dragon-ship stage, a stocked mead hall and a Temple to the Goddess. The Quest was born around those fires. The camp is legend now; the fire it forged travels the world.</p>
          <div className="stats">
            {STATS.map(([target, , label]) => (
              <Stat key={label} value={target} label={label} />
            ))}
          </div>
        </div>
      </section>

      <section id="quest" className="quest">
        <div className="reveal" style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          <Image src="/photos/IMG_1190.jpg" alt="The white antlered wolf of the Quest, howling" {...dim('IMG_1190.jpg')} className="quest-wolf" sizes="(max-width:820px) 86vw, 560px" />
          <div className="eyebrow" style={{ color: 'var(--bronze)' }}>The Quest</div>
          <h2 className="quest-quote">“The veil is thin. The magic is real, and the threshold is directly in front of you.”</h2>
          <p className="quest-lead">Beyond the fire lies a hidden world. A deck of cards you hold in your hands. A scrying scroll that reads marks others cannot see. Seven keys, seven shards, and a white antlered wolf waiting at the edge of the forest.</p>
          <div className="quest-cards">
            <div className="tilt" onPointerMove={tiltMove} onPointerLeave={tiltLeave}>
              <div className="tilt-inner"><Image src="/brand/questcard-wrens-ritual.png" alt="Quest card: Wren’s Ritual" width={240} height={336} /></div>
            </div>
            <div className="tilt" onPointerMove={tiltMove} onPointerLeave={tiltLeave} style={{ marginTop: 26 }}>
              <div className="tilt-inner"><Image src="/brand/questcard-the-magician.png" alt="Quest card: The Magician" width={219} height={379} /></div>
            </div>
          </div>
          <p style={{ margin: '8px auto 30px', maxWidth: 480, fontFamily: 'var(--font-fell), serif', fontStyle: 'italic', fontSize: 14.5, color: 'rgba(236,228,212,.45)' }}>A real-world quest in the making. The deck is drawn, the scroll is being written.</p>
          <a href="https://thequest.mythmaker.ca" target="_blank" rel="noopener" className="btn btn-ghost" style={{ color: 'var(--gold)', borderColor: 'rgba(246,196,83,.55)', fontSize: 15 }}>Will you wake, seeker?</a>
          <div style={{ marginTop: 18 }}>
            <a href="https://www.youtube.com/watch?v=VGu-MN-Ux2w" target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-fell), serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(236,228,212,.6)' }}>Watch the opening rite:“The Wolf and the Key” ↗</a>
          </div>
        </div>
      </section>

      <section id="gallery" className="section" style={{ maxWidth: 1200 }}>
        <div className="reveal center" style={{ maxWidth: 700, margin: '0 auto 42px' }}>
          <div className="eyebrow">The Gallery</div>
          <h2 className="h2">From the road</h2>
          <p className="lead" style={{ marginTop: 16 }}>Fifteen seasons of fire, feathers, steel and stilts. A glimpse of the archive.</p>
        </div>
        <div className="reveal masonry">
          {GALLERY.map(([n, alt], i) => (
            <button key={n} className="m-item" onClick={() => setLb(i)} aria-label={`Open image: ${alt}`} style={{ background: 'none', border: 0, padding: 0 }}>
              <Image src={`/photos/${n}`} alt={alt} {...dim(n)} sizes="(max-width:820px) 50vw, 300px" />
            </button>
          ))}
        </div>
        <div className="reveal center" style={{ marginTop: 30 }}>
          <a href="https://www.instagram.com/mythmaker_official/" target="_blank" rel="noopener" className="btn btn-ghost" style={{ fontSize: 13 }}>More fire on Instagram ↗</a>
        </div>
      </section>

      <section id="company" className="company">
        <div className="company-grid">
          <div className="reveal">
            <div className="eyebrow">The Company</div>
            <h2 className="h2" style={{ fontSize: 'clamp(30px,4.4vw,44px)' }}>Guided by the swordmaster</h2>
            <p style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.7, color: 'rgba(239,230,211,.8)' }}><strong style={{ color: 'var(--gold)', fontWeight: 700 }}>Hjeron O’Sidhe</strong>, director, swordmaster and storyteller, has helmed MythMaker for over two decades: thirty-three original productions written, directed and scored, and over two decades spent touring them across the world. His craft is rooted in thirty years steeped in Celtic and world storytelling, ancestral ritual and the art of the blade.</p>
            <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.7, color: 'rgba(239,230,211,.8)' }}>Around him stands a seasoned collective of professional fire artists, acrobats, stilt-walkers, musicians and makers, with the depth to bring the right artists to your event, from an intimate ceremony to a festival main stage.</p>
            <div className="chips">
              <span className="chip">Professional fire-safety standards</span>
              <span className="chip">Tailored to your theme</span>
              <span className="chip">Festival-proven since 1999</span>
            </div>
          </div>
          <figure className="reveal">
            <Image src="/photos/IMG_2536.jpg" alt="Hjeron O’Sidhe, antlered and fur-clad, drumming and chanting into the mic" {...dim('IMG_2536.jpg')} sizes="(max-width:820px) 100vw, 540px" />
            <figcaption>Hjeron O’Sidhe · founder, director &amp; swordmaster</figcaption>
          </figure>
        </div>
      </section>

      <section id="workshops" className="section workshops">
        <div className="reveal center" style={{ maxWidth: 760, margin: '0 auto 46px' }}>
          <div className="eyebrow">Workshops &amp; Retreats</div>
          <h2 className="h2">Study with Hjeron</h2>
          <p className="lead" style={{ marginTop: 16 }}>Behind the fire shows is thirty years of the real thing: ceremony, community and ancestral craft. Where the Show is spectacle and the Quest is story, this is the practice. The work you do in your own body and life.</p>
        </div>
        <div className="reveal grid grid-4">
          {WORKSHOPS.map((c) => (
            <div className="card" key={c.img}>
              <div className="card-img" style={{ height: 210 }}>
                <Image src={`/photos/${c.img}`} alt={c.t} fill sizes="(max-width:820px) 100vw, 280px" style={{ objectFit: 'cover', objectPosition: c.pos }} />
              </div>
              <div className="card-body"><h3>{c.t}</h3><p>{c.d}</p></div>
            </div>
          ))}
        </div>
        <p className="reveal pull">“The old ways were never lost. They were waiting for you to ask.”</p>
        <div className="reveal center" style={{ marginTop: 34 }}>
          <p style={{ margin: '0 0 22px', fontStyle: 'italic', fontSize: 16, color: 'rgba(239,230,211,.6)' }}>Retreats run on their own calendar. Dates and places by enquiry.</p>
          <a href="mailto:hjeron@mythmaker.ca" className="btn btn-ghost" style={{ color: 'var(--gold)', borderColor: 'rgba(246,196,83,.55)' }}>Work with Hjeron</a>
        </div>
      </section>

      <section id="book" className="book">
        <div className="book-inner">
          <div className="reveal">
            <div className="eyebrow">Book the fire</div>
            <h2 className="h2">Bring the myth to your event</h2>
            <p className="lead" style={{ margin: '16px auto 34px' }}>Festivals, weddings, corporate gatherings, parades and schools. Tell us your vision, and we answer within two days.</p>
          </div>
          {bookState?.ok ? (
            <div className="book-success reveal shown">
              <div className="skol">Sköl!</div>
              <p style={{ margin: '12px 0 0', fontSize: 17, lineHeight: 1.6, color: 'rgba(239,230,211,.85)' }}>Your raven is away. We answer within two days, so keep an eye on the sky.</p>
            </div>
          ) : (
            <form className="form reveal" action={bookAction}>
              <div className="row">
                <input type="text" name="name" required placeholder="Your name" />
                <input type="email" name="email" required placeholder="Email" />
              </div>
              <div className="row">
                <select name="type" defaultValue="">
                  <option value="">Type of event…</option>
                  <option value="festival">Festival</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="school">School program</option>
                  <option value="parade">Parade</option>
                  <option value="other">Something else</option>
                </select>
                <input type="text" name="date" placeholder="When (roughly)?" />
              </div>
              <textarea name="vision" rows={4} placeholder="Tell us about your event: where, how big, how wild" />
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              {bookState?.error && <p style={{ margin: 0, color: '#f6b23a', fontSize: 14 }}>{bookState.error}</p>}
              <button type="submit" className="btn btn-primary" disabled={bookPending}>{bookPending ? 'Sending…' : 'Request a quote'}</button>
            </form>
          )}
          <p style={{ margin: '18px 0 0', fontSize: 15, color: 'rgba(239,230,211,.55)' }}>Or write the hall directly at <a href="mailto:mythmakerburn@gmail.com">mythmakerburn@gmail.com</a></p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Image src="/brand/wolf-medallion.png" alt="" width={44} height={44} style={{ borderRadius: '50%' }} />
            <div>
              <Image src="/brand/logo-wordmark.png" alt="MythMaker" width={91} height={30} style={{ height: 30, width: 'auto' }} />
              <div style={{ marginTop: 6, fontSize: 13.5, color: 'rgba(239,230,211,.5)' }}>© MythMaker · British Columbia, Canada</div>
              <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(239,230,211,.4)' }}>Forged by <a href="https://novadiem.com" target="_blank" rel="noopener">Novadiem</a></div>
            </div>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/mythmaker_official/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/mythmakerproductions/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.tiktok.com/@mythmakermagic" target="_blank" rel="noopener">TikTok</a>
            <a href="https://youtube.com/mythmaker" target="_blank" rel="noopener">YouTube</a>
            <a href="mailto:mythmakerburn@gmail.com">Email</a>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="wolf-egg" onClick={() => setWolf((w) => Math.min(2, w + 1))}>Have you seen the wolf?</button>
          {wolf >= 1 && <span className="wolf-reply">Has the wolf seen you?</span>}
          {wolf >= 2 && <span className="wolf-reply wolf-seen">I have been seen.</span>}
        </div>
      </footer>

      {lb >= 0 && (
        <div className="lightbox" onClick={() => setLb(-1)} role="dialog" aria-modal="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/photos/${GALLERY[lb][0]}`} alt={GALLERY[lb][1]} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-close" onClick={() => setLb(-1)} aria-label="Close">✕</button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); setLb((i) => (i - 1 + GALLERY.length) % GALLERY.length); }} aria-label="Previous">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); setLb((i) => (i + 1) % GALLERY.length); }} aria-label="Next">›</button>
          <div className="lb-cap">{GALLERY[lb][1]}</div>
        </div>
      )}
    </>
  );
}
