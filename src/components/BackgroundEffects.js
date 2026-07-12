/* src/components/BackgroundEffects.js */
'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/ExtraPremium.module.css';

export default function BackgroundEffects() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setReadingProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.readingBar} style={{ width: `${readingProgress}%` }} />
  );
}
