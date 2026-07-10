/* src/components/Preloader.js */
'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/ExtraPremium.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Standard delay for initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.preloader} ${!loading ? styles.preloaderHidden : ''}`}>
      <div className={styles.preloaderLogo}>
        PU<span className={styles.preloaderLogoDot}>.</span>
      </div>
      <div className={styles.preloaderTrack}>
        <div className={styles.preloaderBar} />
      </div>
    </div>
  );
}
