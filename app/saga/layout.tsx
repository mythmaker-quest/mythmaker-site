import Image from 'next/image';
import Link from 'next/link';

export default function SagaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="nav" aria-label="Primary" style={{ position: 'fixed' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image src="/brand/wolf-medallion.png" alt="MythMaker" width={36} height={36} style={{ borderRadius: '50%' }} />
          <Image src="/brand/logo-wordmark.png" alt="MythMaker" width={91} height={30} style={{ height: 30, width: 'auto' }} />
        </Link>
        <div style={{ flex: 1 }} />
        <div className="nav-links">
          <Link href="/saga">The Saga</Link>
          <a href="/#book" className="nav-cta desktop">Book a performance</a>
        </div>
      </nav>
      {children}
    </>
  );
}
