// Unlisted private preview of the festival-tool plan, written for Hjeron to review.
// Server component, self-contained (no edits to globals.css/layout). Reuses the site
// tokens + fonts; scoped under `.ftdoc`. Noindexed + not linked from nav.
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festival Tool · Early Plan',
  description: 'An early, plain-language plan for MythMaker’s festival booking + tour tool.',
  robots: { index: false, follow: false },
};

export default function FestivalToolPage() {
  return (
    <main className="ftdoc">
      <style>{`
        .ftdoc { max-width: 748px; margin: 0 auto; padding: 72px 24px 110px; }
        .ftdoc .kicker { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 52px; }
        .ftdoc .wordmark { font-family: var(--font-knights), var(--font-cinzel), serif; font-size: 25px; letter-spacing: 0.02em; color: var(--gold); }
        .ftdoc .tag { font-family: var(--font-cinzel), serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(239,230,211,0.55); border: 1px solid var(--border-gold); border-radius: 999px; padding: 6px 13px; white-space: nowrap; }
        .ftdoc h1 { font-family: var(--font-knights), var(--font-cinzel), serif; font-weight: 400; font-size: clamp(38px, 6.4vw, 58px); line-height: 1.06; color: var(--text); margin: 0; }
        .ftdoc .frame { font-family: var(--font-fell), serif; font-style: italic; font-size: 18.5px; line-height: 1.66; color: rgba(236,228,212,0.76); margin: 22px 0 4px; }
        .ftdoc h2 { font-family: var(--font-knights), var(--font-cinzel), serif; font-weight: 400; font-size: clamp(27px, 3.8vw, 35px); line-height: 1.14; color: var(--text); margin: 66px 0 4px; }
        .ftdoc h3 { font-family: var(--font-cinzel), serif; font-weight: 600; font-size: 15px; letter-spacing: 0.05em; color: var(--gold); margin: 34px 0 2px; }
        .ftdoc p { font-size: 18px; line-height: 1.72; color: rgba(239,230,211,0.82); margin: 14px 0; }
        .ftdoc ul { margin: 14px 0; padding-left: 20px; }
        .ftdoc li { font-size: 18px; line-height: 1.62; color: rgba(239,230,211,0.82); margin: 9px 0; padding-left: 4px; }
        .ftdoc li::marker { color: var(--amber); }
        .ftdoc em { font-style: italic; color: rgba(246,196,83,0.92); }
        .ftdoc .q { border-left: 2px solid var(--amber); background: rgba(232,149,30,0.06); border-radius: 0 6px 6px 0; padding: 15px 20px; margin: 22px 0; }
        .ftdoc .q .qlabel { font-family: var(--font-cinzel), serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--amber-hover); display: block; margin-bottom: 6px; }
        .ftdoc .q p { margin: 0; font-size: 17px; line-height: 1.6; color: rgba(239,230,211,0.9); }
        .ftdoc .hinge { display: flex; align-items: center; gap: 16px; margin: 42px 0; font-family: var(--font-cinzel), serif; font-size: 12px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); }
        .ftdoc .hinge::before, .ftdoc .hinge::after { content: ''; height: 1px; flex: 1; background: var(--border-gold); }
        .ftdoc .bigq { counter-reset: bq; list-style: none; padding: 0; margin: 20px 0 0; }
        .ftdoc .bigq li { position: relative; padding-left: 46px; margin: 15px 0; }
        .ftdoc .bigq li::before { counter-increment: bq; content: counter(bq); position: absolute; left: 0; top: -3px; width: 30px; height: 30px; border: 1px solid var(--border-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-cinzel), serif; font-size: 13px; color: var(--gold); }
        .ftdoc .end { margin-top: 72px; padding-top: 26px; border-top: 1px solid var(--border-gold); font-size: 14px; color: rgba(239,230,211,0.5); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .ftdoc .end a { color: rgba(239,230,211,0.62); }
        @media (max-width: 640px) { .ftdoc { padding: 52px 20px 80px; } .ftdoc p, .ftdoc li { font-size: 17px; } }
      `}</style>

      <div className="kicker">
        <a href="/" className="wordmark">MythMaker</a>
        <span className="tag">Private preview · for Hjeron</span>
      </div>

      <span className="eyebrow">Festival Tool · Early Plan</span>
      <h1>Making myths of your tours</h1>
      <p className="frame">
        A tool to take the scramble out of booking festivals, and to plan tours that
        actually pay. This is an early plan, written for you to poke holes in before we
        build anything. You know this world far better than we do, so wherever we have it
        wrong or missed something, that is the gold. The spots where your read should
        overrule ours are marked <em>Q for you</em>.
      </p>

      <h2>The idea in one breath</h2>
      <p>
        Right now, booking festivals lives in a dozen places: email threads, festival
        portals, a spreadsheet maybe, and a lot of it in your head and your phone. This
        tool pulls it into one place. The festivals worth pitching, where each application
        stands, who is in your performer network, who to cast for a given gig, and whether
        a run of gigs makes money before you commit a crew to the road. Think of it as the
        logistics behind making myths of your tours.
      </p>

      <h2>Two halves, with a hinge in the middle</h2>

      <h3>Half one: getting the gig</h3>
      <ul>
        <li>
          A working list of festivals worth pitching, already seeded from research we did
          (Norse and Viking fests, Ren faires, Highland games, fire gatherings, busker
          festivals, burns, across the US and Canada), with how each one actually books
          (direct email, a form, or an RFP) and who to contact.
        </li>
        <li>
          For each one you track the pitch: who you contacted, when, the deadline, did they
          reply, booked or passed. Nothing falls through the cracks and no deadline sneaks
          up on you.
        </li>
        <li>
          The pitch is about what MythMaker <em>offers</em>, the range from a lone fire
          dancer to a fifty-person spectacle, not a fixed cast. You are selling the act,
          not a specific lineup.
        </li>
      </ul>
      <div className="q">
        <span className="qlabel">Q for you</span>
        <p>Does that match how you actually pitch? What makes a festival say yes?</p>
      </div>

      <div className="hinge">Booked</div>

      <h3>Half two: casting and logistics</h3>
      <ul>
        <li>
          Now you build the lineup from your network. The tool helps you pick people who are
          actually free those dates, close enough to get there, allowed to work across the
          border, have the skills the festival wants (and allows, since some ban fire), and
          are proven enough for the slot.
        </li>
        <li>
          Then the festival-facing details, the advance: vehicle passes, camping versus
          reserved area, wristband counts, load-in. You choose what to share with the
          festival and what stays internal.
        </li>
      </ul>
      <div className="q">
        <span className="qlabel">Q for you</span>
        <p>When you cast a gig, what actually decides who goes? Which logistics details bite you most often?</p>
      </div>

      <h2>Your network, captured</h2>
      <p>
        The most valuable thing early on might just be getting your network out of your head
        and phone into one place: the Canadian core and the American performers you can call
        on, where each is based, what they do, when they are free, and how proven they are
        with you. Then the tool can stop you double-booking someone, and show you where your
        bench is thin. A perfect festival you cannot crew is worth knowing about <em>before</em>
        you pitch it.
      </p>
      <div className="q">
        <span className="qlabel">Q for you</span>
        <p>Roughly how big is that network? What do you track about people now, if anything?</p>
      </div>

      <h2>The money side: tours, not one-offs</h2>
      <ul>
        <li>
          <em>Close to home</em>, casting is cheap. People just show up, so a great-fit
          unpaid gig (a burn, a participation festival) can be worth it for the brand alone.
        </li>
        <li>
          <em>On the road</em>, a crew has to be paid. Nobody commits to a month on a bus
          for covered tickets. So a tour only works as a string of paying anchors (Ren
          faires, paying Viking fests, Highland games, corporate), with the unpaid brand-fit
          gigs riding along on a trip that is already funded.
        </li>
      </ul>
      <p>
        So the tool plans at the tour level with rough math: does the paid work cover crew
        wages, travel, and lodging, with margin left over? Only send a crew where the answer
        is yes. And the same routed plan doubles as your recruiting pitch. Show someone the
        route and what they will clear at the end, and that is what gets them on the bus.
      </p>
      <div className="q">
        <span className="qlabel">Q for you</span>
        <p>Is that how the money really works for you? What are the real numbers, day rates, travel, what a crew expects to walk away with?</p>
      </div>

      <h2>What comes later, not first</h2>
      <ul>
        <li>
          AI help drafting tailored pitches in the right voice for each festival, and
          quietly watching for new festivals and open application windows so you catch them.
        </li>
        <li>
          A shared logistics app for the multi-party stuff: acts, camps, and organizers
          sharing rides, passes, and camping.
        </li>
        <li>
          Other troupes using the tool too, which makes the festival list better for
          everyone.
        </li>
      </ul>

      <h2>Signing in</h2>
      <p>
        You would log in with your FOAF identity, one login shared across the FOAF tools, so
        your account and your reputation travel with you.
      </p>

      <h2>The big questions for you</h2>
      <ol className="bigq">
        <li>Where have we got the festival and booking world wrong?</li>
        <li>What is the one thing that, if this tool did it well, would actually save you time or land you gigs?</li>
        <li>What should we build first?</li>
        <li>Anything about the roster, the money, or the logistics we are not seeing?</li>
      </ol>

      <div className="end">
        <span>Early plan, for review. Nothing built yet.</span>
        <a href="/">← mythmaker.ca</a>
      </div>
    </main>
  );
}
