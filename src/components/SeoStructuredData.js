export default function SeoStructuredData({ data = [] }) {
  const schemas = Array.isArray(data) ? data : [data];

  return schemas
    .filter(Boolean)
    .map((schema, index) => (
      <script
        key={index}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ));
}