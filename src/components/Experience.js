/* src/components/Experience.js */
'use client';

import React from 'react';
import styles from '../styles/Experience.module.css';

export default function Experience({ experienceData }) {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Work History
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Internship Experience
          </h2>
        </div>

        <div className={styles.timeline}>
          {experienceData.map((exp, index) => (
            <div key={`${exp.company}-${index}`} className={styles.item}>
              <div className={styles.marker} />
              
              <div className={`${styles.card} glass`}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleArea}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.company}>{exp.company}</span>
                  </div>
                  <span className={styles.durationBadge}>{exp.duration}</span>
                </div>

                <ul className={styles.list}>
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className={styles.bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div>
                    <span className={styles.techLabel}>Technologies / Skills Focus</span>
                    <div className={styles.techStack}>
                      {exp.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
