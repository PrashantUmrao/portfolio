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

  const getMappedCategory = (cat, name) => {
    const lowerName = name.toLowerCase();
    const lowerCat = cat.toLowerCase();
    if (lowerName.includes('html') || lowerName.includes('css') || lowerName.includes('javascript') || lowerName.includes('dom')) {
      return 'Frontend';
    }
    if (lowerName.includes('api') || lowerName.includes('storage') || lowerName.includes('rest')) {
      return 'Backend & Concepts';
    }
    if (lowerName.includes('git') || lowerName.includes('github')) {
      return 'Version Control';
    }
    if (lowerCat.includes('testing') || lowerCat.includes('qa') || lowerName.includes('bug')) {
      return 'Software Testing & QA';
    }
    if (lowerCat.includes('programming') || lowerName.includes('java') || lowerName.includes('python') || lowerName.includes('dsa') || lowerName.includes('structures')) {
      return 'Programming';
    }
    if (lowerName.includes('vs code') || lowerName.includes('vscode')) {
      return 'Tools & IDE';
    }
    return cat;
  };

  // Filter skills based on search term
  const filteredSkills = skillsData.filter((skill) =>
    skill.name.toLowerCase().includes(search.toLowerCase()) ||
    getMappedCategory(skill.category, skill.name).toLowerCase().includes(search.toLowerCase())
  );

  // Group skills by category
  const categories = filteredSkills.reduce((acc, skill) => {
    const mappedCat = getMappedCategory(skill.category, skill.name);
    if (!acc[mappedCat]) {
      acc[mappedCat] = [];
    }
    acc[mappedCat].push(skill);
    return acc;
  }, {});

  // Define desired editorial order
  const desiredOrder = [
    'Frontend',
    'Backend & Concepts',
    'Programming',
    'Tools & IDE',
    'Version Control',
    'Software Testing & QA'
  ];

  // Group sorting based on desiredOrder
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    const indexA = desiredOrder.indexOf(a);
    const indexB = desiredOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <section id="skills" className={styles.skillsSection} ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className={styles.sectionLabel}>Core Skillset</span>
          <h2 className="section-title">
            TECH STACK
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
          {sortedCategories.map((cat) => (
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
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
