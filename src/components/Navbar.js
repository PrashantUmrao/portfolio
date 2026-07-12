/* src/components/Navbar.js */
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  { id: 'blog', label: 'Blog' },
];

export default function Navbar({ theme, toggleTheme }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll state for scaling navbar down
      setScrolled(window.scrollY > 50);

      // Scroll Spy active section detection
      if (pathname !== '/') return;

      const sections = navItems
        .filter(item => item.id !== 'blog')
        .map(item => document.getElementById(item.id));
      let currentSection = 'hero';

      const scrollPosition = window.scrollY + 180; // offset for nav height + comfort gap

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = navItems.filter(item => item.id !== 'blog')[i].id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Handle URL hashes on mount or path change
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
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
      }, 150);
    }
  }, [pathname]);

  const handleNavClick = (id) => {
    setDrawerOpen(false);
    if (id === 'blog') {
      router.push('/blog');
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

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
              className={`${styles.navLink} ${(pathname.startsWith('/blog') && item.id === 'blog') || (pathname === '/' && activeSection === item.id) ? styles.active : ''}`}
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
            className={`${styles.drawerLink} ${(pathname.startsWith('/blog') && item.id === 'blog') || (pathname === '/' && activeSection === item.id) ? styles.drawerActive : ''}`}
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
