/* src/components/Hero.js */
'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowDownIcon } from './Icons';

const roles = ['Frontend Enthusiast', 'QA Tester Intern', 'IT Student'];

export default function Hero({ personalData }) {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Stats Counter Animation state
  const [counts, setCounts] = useState(
    personalData.stats.map(() => 0)
  );

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
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && roleText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  // Statistics incremental count animation on mount
  useEffect(() => {
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);

    const targetValues = personalData.stats.map(stat => {
      const match = stat.value.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts(targetValues.map(target => {
        return Math.floor(target * progress);
      }));

      if (frame >= totalFrames) {
        clearInterval(counter);
        // set exact values back (e.g. "3+" or "150+")
        setCounts(targetValues);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [personalData.stats]);

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
          {/* Left Text Info */}
          <div className={styles.left}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Open to Opportunities
            </div>
            <h1 className={styles.title}>
              Hi, I'm <span className="gradient-text">{personalData.name}</span>
            </h1>
            <div className={styles.subtitle}>
              I'm a <span className="gradient-text-cyan">{roleText}</span>
              <span className={styles.cursor} />
            </div>
            <p className={styles.tagline}>{personalData.summary}</p>

            <div className={styles.ctaGroup}>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={styles.btnPrimary}
              >
                Hire Me <ArrowDownIcon style={{ transform: 'rotate(-45deg)' }} />
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={styles.btnSecondary}
              >
                View Projects
              </button>
            </div>

            {/* Social badges row */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary} style={{ padding: '10px' }} aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary} style={{ padding: '10px' }} aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href={`mailto:${personalData.email}`} className={styles.btnSecondary} style={{ padding: '10px' }} aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className={styles.right}>
            <div className={styles.characterContainer}>
              <img 
                src="/hero-character.png" 
                alt="Prashant Umrao - 3D Character Avatar" 
                className={styles.characterImage}
              />
              <div className={styles.characterShadow} />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {personalData.stats.map((stat, i) => {
            const hasPlus = stat.value.includes('+');
            const targetVal = counts[i] || 0;
            return (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statVal}>
                  {targetVal}{hasPlus && '+'}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
