/* src/components/Hero.js */
'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons';

const roles = ['Frontend Enthusiast', 'QA Tester Intern', 'IT Student'];

export default function Hero({ personalData }) {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect hook
  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(currentFullText.substring(0, roleText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setRoleText(currentFullText.substring(0, roleText.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }

    if (!isDeleting && roleText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && roleText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.contentGrid}>
          {/* Left Column: Typography Layout */}
          <div className={styles.left}>
            <div className={styles.editorialHeader}>
              <span className={styles.degreeLabel}>B.TECH INFORMATION TECHNOLOGY</span>
              <h1 className={styles.title}>PRASHANT UMRAO</h1>
              <div className={styles.roleSubhead}>
                <span className={styles.roleTitle}>SOFTWARE ENGINEER</span>
                <span className={styles.divider}>/</span>
                <span className={styles.typingRole}>{roleText}</span>
                <span className={styles.cursor} />
              </div>
            </div>
            
            <p className={styles.tagline}>
              Building scalable web applications, AI-powered solutions, modern user experiences, and solving real-world problems.
            </p>

            <div className={styles.ctaGroup}>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={styles.btnPrimary}
              >
                Hire Me <span style={{ marginLeft: '4px' }}>→</span>
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={styles.btnSecondary}
              >
                View Projects
              </button>
            </div>

            {/* Social badges row */}
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

          {/* Right Column: Pixar Character */}
          <div className={styles.right}>
            <div className={styles.characterContainer}>
              <img 
                src="/hero-character.png" 
                alt="Prashant Umrao - 3D Pixar Character Avatar" 
                className={styles.characterImage}
              />
              <div className={styles.characterShadow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
