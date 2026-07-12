/* src/components/Leadership.js */
'use client';

import React from 'react';
import styles from '../styles/Leadership.module.css';

export default function Leadership({ leadershipData }) {
  return (
    <section id="leadership" className={styles.leadershipSection}>
      <div className="container">
        <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
          <span className={styles.sectionLabel}>Extracurricular Roles</span>
          <h2 className="section-title">
            LEADERSHIP & ACTIVITIES
          </h2>
        </div>

        <div className={styles.grid}>
          {leadershipData.map((role) => {
            const isVP = role.role.toLowerCase().includes('vice-president') || role.role.toLowerCase().includes('vice president');
            return (
              <div 
                key={role.role} 
                className={`${styles.card} ${isVP ? styles.vpHighlightCard : ''} glass`}
              >
                {isVP && <div className={styles.highlightBadge}>Featured Role</div>}
                
                <div className={styles.header}>
                  <h3 className={styles.role}>{role.role}</h3>
                  <span className={styles.org}>{role.organization}</span>
                  <span className={styles.date}>{role.duration}</span>
                </div>
                <ul className={styles.descList}>
                  {role.description.map((desc, idx) => (
                    <li key={idx} className={styles.descItem}>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
