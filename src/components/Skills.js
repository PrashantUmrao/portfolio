/* src/components/Skills.js */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Skills.module.css';
import { SearchIcon } from './Icons';

export default function Skills({ skillsData, softSkills }) {
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger skill level bar loading animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Filter skills based on search term
  const filteredSkills = skillsData.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase()) ||
    skill.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group skills by category
  const categories = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className={styles.skillsSection} ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Core Skillset
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Technical Expertise
          </h2>
        </div>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search skills (e.g. JavaScript, QA, Java...)"
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Categories Grid */}
        <div className={styles.categoriesGrid}>
          {Object.keys(categories).map((cat) => (
            <div key={cat} className={`${styles.categoryCard} glass`}>
              <h3 className={styles.categoryTitle}>
                {cat} <span>({categories[cat].length})</span>
              </h3>
              <div className={styles.skillsList}>
                {categories[cat].map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>
                        {skill.name}
                      </span>
                      <span className={styles.skillLevel}>{skill.level}</span>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills Section */}
        {softSkills && softSkills.length > 0 && (
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Soft Skills & Attributes
            </h3>
            <div className={styles.badgesContainer}>
              {softSkills.map((skill) => (
                <div key={skill} className={styles.floatingBadge}>
                  <span>✦</span> {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
