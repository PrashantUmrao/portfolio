const SITE_URL = 'https://prashantumrao.me';

function absoluteUrl(pathname = '/') {
  if (!pathname) {
    return SITE_URL;
  }

  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname;
  }

  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function normalizeSkills(personalData) {
  const keywords = [
    'Frontend Development',
    'Quality Assurance',
    'Manual Testing',
    'Regression Testing',
    'REST APIs',
    'Responsive Design',
    'JavaScript',
    'Next.js',
  ];

  if (!personalData) {
    return keywords;
  }

  return keywords.concat([
    personalData.location,
    personalData.title,
  ].filter(Boolean));
}

function buildPersonSchema(personalData) {
  if (!personalData) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalData.name,
    jobTitle: personalData.title,
    description: personalData.summary,
    url: SITE_URL,
    image: absoluteUrl('/hero-character.png'),
    sameAs: [personalData.github, personalData.linkedin, personalData.leetcode].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kanpur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance and Internship Projects',
    },
    knowsAbout: normalizeSkills(personalData),
  };
}

function buildWebSiteSchema({ name, description, url, authorName }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: authorName,
    },
  };
}

function buildWebPageSchema({ name, description, url, breadcrumbs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: 'en',
  };

  if (breadcrumbs) {
    schema.breadcrumb = breadcrumbs;
  }

  return schema;
}

function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildCollectionPageSchema({ name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: 'en',
  };
}

function buildBlogPostingSchema(post, pathname) {
  const firstParagraph = post.content.find((section) => section.type === 'paragraph');
  const publishedDate = new Date(post.date).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.featuredImage)],
    author: {
      '@type': 'Person',
      name: 'Prashant Umrao',
    },
    publisher: {
      '@type': 'Person',
      name: 'Prashant Umrao',
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: absoluteUrl(pathname),
    articleSection: 'Portfolio Blog',
    keywords: [post.title, post.slug, 'portfolio', 'software engineering', 'quality assurance'],
    inLanguage: 'en',
    about: firstParagraph?.text,
  };
}

export {
  SITE_URL,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildBlogPostingSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildPersonSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
};