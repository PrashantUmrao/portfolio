import SeoStructuredData from './SeoStructuredData';
import { buildFaqSchema } from '../lib/seo';

export default function SeoFaq({ title, intro, faqs }) {
  const schema = buildFaqSchema(faqs);

  return (
    <section
      aria-labelledby="seo-faq-title"
      style={{
        padding: '120px 0 40px',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
          <span style={{
            display: 'inline-block',
            marginBottom: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            fontSize: '12px',
            fontWeight: 700,
          }}>
            Questions people ask
          </span>
          <h2 id="seo-faq-title" className="section-title" style={{ marginTop: 0 }}>
            {title}
          </h2>
          <p style={{ maxWidth: '720px', color: 'var(--text-secondary)' }}>
            {intro}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px 22px',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--text-primary)' }}>
                {faq.question}
              </summary>
              <p style={{ marginTop: '12px', marginBottom: 0, color: 'var(--text-secondary)' }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <SeoStructuredData data={schema} />
    </section>
  );
}