/* src/app/robots.js */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://prashantumrao.me/sitemap.xml',
    host: 'https://prashantumrao.me',
  };
}
