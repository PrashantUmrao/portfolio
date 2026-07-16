import { blogs } from '../../../data/blogs';
import { SITE_URL } from '../../../lib/seo';

export default function Head({ params }) {
  const post = blogs.find((blog) => blog.slug === params.slug);
  const title = post ? `${post.title} | Prashant Umrao` : 'Blog Post | Prashant Umrao';
  const description = post
    ? post.description
    : 'Prashant Umrao shares practical articles about frontend engineering, QA testing, and portfolio building.';
  const url = `${SITE_URL}/blog/${params.slug}`;
  const image = post ? `${SITE_URL}${post.featuredImage}` : `${SITE_URL}/cover_portfolio.png`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Prashant Umrao Portfolio" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}