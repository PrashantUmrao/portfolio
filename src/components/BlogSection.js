/* src/components/BlogSection.js */
'use client';

import React from 'react';
import Link from 'next/link';
import { blogs } from '../data/blogs';
import styles from '../styles/Blog.module.css';

export default function BlogSection() {
  // Display latest 3 posts
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" className={styles.section} style={{ padding: '130px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className={styles.sectionLabel}>Insights & Stories</span>
            <h2 className={styles.title} style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>
              Latest Articles
            </h2>
          </div>
          <Link href="/blog" className={styles.backBtn} style={{ marginBottom: 0 }}>
            View All Posts <span>→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {latestBlogs.map((post) => (
            <div key={post.slug} className={styles.card}>
              <Link href={`/blog/${post.slug}`} className={styles.imageArea}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className={styles.cardImage}
                />
              </Link>
              <div className={styles.cardContent}>
                <div className={styles.metaRow}>
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className={styles.blogTitle}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h3>
                <p className={styles.blogDesc}>{post.description}</p>
                <Link href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
                  Read More <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
