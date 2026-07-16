/* src/app/layout.js */
import './globals.css';
import resumeData from '../data/resume.json';
import SeoStructuredData from '../components/SeoStructuredData';
import { buildPersonSchema, buildWebSiteSchema, SITE_URL } from '../lib/seo';

export const metadata = {
  title: 'Prashant Umrao | Software Engineer & QA Tester Portfolio',
  description: 'Prashant Umrao is a Software Engineer and QA Tester from Kanpur, India, building responsive frontends, API-driven interfaces, and quality-focused digital experiences.',
  keywords: [
    'Prashant Umrao',
    'Software Engineer',
    'QA Tester',
    'Frontend Developer',
    'Quality Assurance',
    'Kanpur',
    'Uttar Pradesh',
    'India',
    'Portfolio',
    'Next.js Portfolio',
  ],
  authors: [{ name: 'Prashant Umrao' }],
  creator: 'Prashant Umrao',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prashant Umrao | Software Engineer & QA Tester Portfolio',
    description: 'Portfolio of Prashant Umrao showcasing frontend engineering, QA testing, projects, blogs, and professional experience.',
    url: SITE_URL,
    siteName: 'Prashant Umrao Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/cover_portfolio.png',
        width: 1200,
        height: 630,
        alt: 'Prashant Umrao portfolio cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prashant Umrao | Portfolio',
    description: 'Prashant Umrao, Software Engineer and QA Tester from Kanpur, India.',
    images: ['/cover_portfolio.png'],
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
  }
};

export default function RootLayout({ children }) {
  const personSchema = buildPersonSchema(resumeData.personal);
  const websiteSchema = buildWebSiteSchema({
    name: 'Prashant Umrao Portfolio',
    description: metadata.description,
    url: SITE_URL,
    authorName: resumeData.personal.name,
  });

  return (
    <html lang="en">
      <body>
        {children}
        <SeoStructuredData data={[personSchema, websiteSchema]} />
      </body>
    </html>
  );
}
