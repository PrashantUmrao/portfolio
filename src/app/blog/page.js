/* src/app/blog/page.js */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import resumeData from '../../data/resume.json';
import { blogs } from '../../data/blogs';
import styles from '../../styles/Blog.module.css';

export default function BlogIndex() {
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

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className={styles.section}>
        <div className="container">
          <div className={styles.headerArea}>
            <span className={styles.sectionLabel}>Insights & Stories</span>
            <h1 className={styles.title}>My Blog</h1>
          </div>

          <div className={styles.grid}>
            {blogs.map((post) => (
              <div key={post.slug} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.imageArea}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className={post.featuredImage ? styles.cardImage : ''}
                  />
                </Link>
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span>{post.date}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className={styles.blogTitle}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.blogDesc}>{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMoreBtn}>
                    Read More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer personalData={resumeData.personal} />
    </>
  );
}
