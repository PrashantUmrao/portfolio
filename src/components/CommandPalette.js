/* src/components/CommandPalette.js */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/CommandPalette.module.css';
import { SearchIcon } from './Icons';

export default function CommandPalette({ isOpen, setIsOpen, toggleTheme, personalData }) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // Command items definitions
  const commands = [
    { label: 'Navigate: Home', action: () => scrollToSection('hero'), category: 'Navigation' },
    { label: 'Navigate: About', action: () => scrollToSection('about'), category: 'Navigation' },
    { label: 'Navigate: Skills', action: () => scrollToSection('skills'), category: 'Navigation' },
    { label: 'Navigate: Experience', action: () => scrollToSection('experience'), category: 'Navigation' },
    { label: 'Navigate: Projects', action: () => scrollToSection('projects'), category: 'Navigation' },
    { label: 'Navigate: Education', action: () => scrollToSection('education'), category: 'Navigation' },
    { label: 'Navigate: Leadership', action: () => scrollToSection('leadership'), category: 'Navigation' },
    { label: 'Navigate: Contact', action: () => scrollToSection('contact'), category: 'Navigation' },
    { label: 'Theme: Toggle Light/Dark', action: () => toggleTheme(), category: 'Preferences' },
    { label: 'Action: Copy Email Address', action: () => copyText(personalData.email), category: 'Actions' },
    { label: 'Action: Copy Phone Number', action: () => copyText(personalData.phone), category: 'Actions' },
    { label: 'Open: LinkedIn Profile', action: () => window.open(personalData.linkedin, '_blank'), category: 'Social' },
    { label: 'Open: GitHub Profile', action: () => window.open(personalData.github, '_blank'), category: 'Social' }
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
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

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setIsOpen(false);
    alert('Copied to clipboard!');
  };

  // Filter commands by search
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Reset index when search changes
  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within the palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands]);

  if (!isOpen) return null;

  return (
    <div 
      className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`} 
      onClick={() => setIsOpen(false)}
    >
      <div 
        className={`${styles.container} glass`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            className={styles.input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={styles.closeTip}>ESC</span>
        </div>

        {/* Dynamic results list */}
        <div className={styles.list}>
          {filteredCommands.length > 0 ? (
            <div className={styles.group}>
              {filteredCommands.map((cmd, index) => (
                <div
                  key={cmd.label}
                  className={`${styles.item} ${activeIndex === index ? styles.itemActive : ''}`}
                  onClick={cmd.action}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className={styles.itemLeft}>
                    <span className={styles.itemIcon}>❖</span>
                    <span className={styles.itemLabel}>{cmd.label}</span>
                  </div>
                  <span className={styles.shortcut}>{cmd.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
