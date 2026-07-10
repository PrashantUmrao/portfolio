/* src/components/Footer.js */
'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';
import extraStyles from '../styles/ExtraPremium.module.css';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpIcon } from './Icons';

export default function Footer({ personalData }) {
  const [showFAB, setShowFAB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Floating Left Social Dock */}
      <div className={extraStyles.socialDock}>
        <a 
          href={personalData.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={extraStyles.dockLink}
          aria-label="GitHub Profile"
        >
          <GithubIcon />
        </a>
        <a 
          href={personalData.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={extraStyles.dockLink}
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon />
        </a>
        <a 
          href={`mailto:${personalData.email}`} 
          className={extraStyles.dockLink}
          aria-label="Send Email"
        >
          <MailIcon />
        </a>
      </div>

      {/* Footer Main Component */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.grid}>
            {/* Column 1: Brand Info */}
            <div className={styles.brandColumn}>
              <div className={styles.logo}>
                PRASHANT<span className={styles.logoDot} />
              </div>
              <p className={styles.tagline}>{personalData.tagline}</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Navigation</span>
              <div className={styles.links}>
                <span onClick={() => handleNavClick('hero')} className={styles.link}>Home</span>
                <span onClick={() => handleNavClick('about')} className={styles.link}>About</span>
                <span onClick={() => handleNavClick('skills')} className={styles.link}>Skills</span>
                <span onClick={() => handleNavClick('experience')} className={styles.link}>Experience</span>
              </div>
            </div>

            {/* Column 3: Secondary Links */}
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Focus Areas</span>
              <div className={styles.links}>
                <span onClick={() => handleNavClick('projects')} className={styles.link}>Projects</span>
                <span onClick={() => handleNavClick('education')} className={styles.link}>Education</span>
                <span onClick={() => handleNavClick('leadership')} className={styles.link}>Leadership</span>
                <span onClick={() => handleNavClick('contact')} className={styles.link}>Contact</span>
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className={styles.linkColumn}>
              <span className={styles.columnTitle}>Connect</span>
              <div className={styles.socialRow}>
                <a href={personalData.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
                <a href={`mailto:${personalData.email}`} className={styles.socialIcon} aria-label="Email">
                  <MailIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright and credits */}
          <div className={styles.bottom}>
            <span className={styles.copy}>
              © {new Date().getFullYear()} Prashant Umrao. All rights reserved.
            </span>
            <span className={styles.credit}>
              Built with <span className={styles.creditHeart}>❤️</span> using Next.js & Pure CSS
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Back-To-Top FAB Button */}
      <button 
        onClick={scrollToTop}
        className={`${styles.backToTop} ${showFAB ? styles.backToTopVisible : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon />
      </button>
    </>
  );
}
