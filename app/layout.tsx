import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Cinzel, Alegreya, IM_Fell_English } from 'next/font/google';
// Design-system tokens are the source of truth; the site's globals.css loads
// after and overrides only the --font-* tokens to the next/font faces below.
import '@mythmaker/ui/tokens/colors.css';
import '@mythmaker/ui/tokens/typography.css';
import '@mythmaker/ui/tokens/spacing.css';
import '@mythmaker/ui/tokens/effects.css';
import './globals.css';

const knights = localFont({ src: './fonts/knights-quest.woff2', variable: '--font-knights', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cinzel', display: 'swap' });
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400', '500', '700'], style: ['normal', 'italic'], variable: '--font-alegreya', display: 'swap' });
const fell = IM_Fell_English({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-fell', display: 'swap' });

const siteUrl = 'https://www.mythmaker.quest';
const siteTitle = 'MythMaker: Fire Performance, Myth & Ceremony';
const siteDescription =
  'A professional company of fire artists, storytellers and myth-builders from British Columbia. Book the show, explore The Quest, or study with Hjeron.';
const socialDescription = 'Fire performance, the transmedia Quest, and workshops & retreats with Hjeron O’Sidhe.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'MythMaker',
  title: {
    default: siteTitle,
    template: '%s | MythMaker',
  },
  description: siteDescription,
  keywords: [
    'MythMaker',
    'fire performance',
    'fire dancers',
    'festival performance',
    'ceremonial performance',
    'workshops and retreats',
    'British Columbia performers',
    'Hjeron OSidhe',
    'The Quest',
  ],
  authors: [{ name: 'MythMaker', url: siteUrl }],
  creator: 'MythMaker',
  publisher: 'MythMaker',
  referrer: 'origin-when-cross-origin',
  alternates: { canonical: '/' },
  openGraph: {
    title: siteTitle,
    description: socialDescription,
    url: '/',
    siteName: 'MythMaker',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: socialDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/brand/wolf-medallion.png',
    apple: '/brand/wolf-medallion.png',
  },
};

export const viewport: Viewport = { themeColor: '#0b0806' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${knights.variable} ${cinzel.variable} ${alegreya.variable} ${fell.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
