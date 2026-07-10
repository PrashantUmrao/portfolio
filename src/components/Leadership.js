/* src/components/Leadership.js */
'use client';

import React from 'react';
import styles from '../styles/Leadership.module.css';

export default function Leadership({ leadershipData }) {
  return (
    <section id="leadership" className={styles.leadershipSection}>
      <div className="container">
        <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Extracurricular Roles
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Leadership & Activities
          </h2>
        </div>

        <div className={styles.grid}>
          {leadershipData.map((role) => (
            <div key={role.role} className={`${styles.card} glass`}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
