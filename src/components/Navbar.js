/* src/components/Navbar.js */
'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from './Icons';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll state for scaling navbar down
      setScrolled(window.scrollY > 50);

      // Scroll Spy active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      let currentSection = 'hero';

      const scrollPosition = window.scrollY + 180; // offset for nav height + comfort gap

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = navItems[i].id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // account for navbar height
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
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logo} onClick={() => handleNavClick('hero')}>
          PRASHANT<span className={styles.logoDot} />
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <span
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
            >
              {item.label}
            </span>
          ))}

          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button 
          className={styles.menuBtn} 
          onClick={() => setDrawerOpen(!drawerOpen)}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
        >
          {drawerOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        {navItems.map((item) => (
          <span
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`${styles.drawerLink} ${activeSection === item.id ? styles.drawerActive : ''}`}
          >
            {item.label}
          </span>
        ))}
        
        <div style={{ marginTop: '20px', paddingLeft: '16px' }}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            style={{ width: 'fit-content' }}
          >
            {theme === 'dark' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><SunIcon /> Light Mode</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MoonIcon /> Dark Mode</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
