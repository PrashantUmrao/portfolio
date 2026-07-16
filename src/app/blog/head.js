import { SITE_URL } from '../../lib/seo';

export default function Head() {
  const title = 'Blog | Prashant Umrao';
  const description = 'Prashant Umrao writes about frontend engineering, QA testing, productivity workflows, and premium portfolio design.';
  const url = `${SITE_URL}/blog`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Prashant Umrao Portfolio" />
      <meta property="og:image" content={`${SITE_URL}/cover_portfolio.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/cover_portfolio.png`} />
    </>
  );
}