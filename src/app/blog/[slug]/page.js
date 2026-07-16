/* src/app/blog/[slug]/page.js */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SeoStructuredData from '../../../components/SeoStructuredData';
import resumeData from '../../../data/resume.json';
import { blogs } from '../../../data/blogs';
import { SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema } from '../../../lib/seo';
import styles from '../../../styles/Blog.module.css';

export default function BlogPost({ params }) {
  const { slug } = params;
  const [theme, setTheme] = useState('light');

  // Initialize theme from LocalStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
    } else {
      setTheme('light');
      document.body.className = '';
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.className = nextTheme === 'dark' ? 'dark-theme' : '';
  };

  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className={styles.section}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className={styles.title} style={{ marginBottom: '20px' }}>Post Not Found</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
              The blog article you are looking for does not exist or has been moved.
            </p>
            <Link href="/blog" className={styles.backBtn}>
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer personalData={resumeData.personal} />
      </>
    );
  }

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className={styles.section}>
        <SeoStructuredData
          data={[
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
            buildBlogPostingSchema(post, `${SITE_URL}/blog/${post.slug}`),
          ]}
        />

        <article className={styles.articleContainer}>
          <Link href="/blog" className={styles.backBtn}>
            ← Back to Blog
          </Link>

          <header className={styles.articleHeader}>
            <div className={styles.metaRow} style={{ width: 'fit-content', gap: '20px', marginBottom: '8px' }}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '760px', marginTop: '16px' }}>
              {post.description}
            </p>
          </header>

          <div className={styles.featuredImageArea}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className={styles.featuredImage}
            />
          </div>

          <div className={styles.articleBody}>
            {post.content.map((section, idx) => {
              if (section.type === 'paragraph') {
                return <p key={idx}>{section.text}</p>;
              } else if (section.type === 'heading') {
                return <h3 key={idx}>{section.text}</h3>;
              } else if (section.type === 'code') {
                return (
                  <pre key={idx} className={styles.codeBlock}>
                    <code>{section.code}</code>
                  </pre>
                );
              }
              return null;
            })}
          </div>
        </article>
      </main>

      <Footer personalData={resumeData.personal} />
    </>
  );
}
