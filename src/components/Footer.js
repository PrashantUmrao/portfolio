/* src/components/Footer.js */
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../styles/Footer.module.css';
import extraStyles from '../styles/ExtraPremium.module.css';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, MailIcon, FileTextIcon, ArrowUpIcon } from './Icons';

export default function Footer({ personalData }) {
  const [showFAB, setShowFAB] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

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
          <div className={styles.minimalFooter}>
            <h3 className={styles.connectHeading}>Let's Connect</h3>
            
            <div className={styles.socialLinks}>
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" className={styles.footerLink} aria-label="GitHub">
                <GithubIcon /> <span>GitHub</span>
              </a>
              <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.footerLink} aria-label="LinkedIn">
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
              {personalData.leetcode && (
                <a href={personalData.leetcode} target="_blank" rel="noopener noreferrer" className={styles.footerLink} aria-label="LeetCode">
                  <LeetcodeIcon /> <span>LeetCode</span>
                </a>
              )}
              <a href={`mailto:${personalData.email}`} className={styles.footerLink} aria-label="Email">
                <MailIcon /> <span>Email</span>
              </a>
              <span onClick={() => handleNavClick('resume')} className={styles.footerLink} style={{ cursor: 'pointer' }} aria-label="Resume">
                <FileTextIcon /> <span>Resume</span>
              </span>
            </div>

            <div className={styles.copyright}>
              © {new Date().getFullYear()} Prashant Umrao
            </div>
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
