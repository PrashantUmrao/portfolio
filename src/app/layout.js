/* src/app/layout.js */
import './globals.css';

export const metadata = {
  title: 'Prashant Umrao | Software Engineer & QA Tester Portfolio',
  description: 'Portfolio of Prashant Umrao, Software Engineer and QA Tester Intern specializing in responsive frontends, REST APIs, manual & regression testing, and quality assurance.',
  keywords: 'Prashant Umrao, Software Engineer, QA Tester, Quality Assurance, Frontend Developer, Kanpur, India, Portfolio',
  authors: [{ name: 'Prashant Umrao' }],
  creator: 'Prashant Umrao',
  metadataBase: new URL('https://prashantumrao.github.io'),
  openGraph: {
    title: 'Prashant Umrao | Software Engineer & QA Tester Portfolio',
    description: 'Portfolio of Prashant Umrao showcasing skills, experience, and projects in Frontend Development and Software Quality Assurance.',
    url: 'https://prashantumrao.github.io',
    siteName: 'Prashant Umrao Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prashant Umrao | Portfolio',
    description: 'Portfolio of Prashant Umrao, Software Engineer and QA Tester Intern.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
