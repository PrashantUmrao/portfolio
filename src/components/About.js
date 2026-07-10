/* src/components/About.js */
'use client';

import React from 'react';
import styles from '../styles/About.module.css';

export default function About({ personalData }) {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Summary and Core info */}
          <div>
            <div className={styles.headingArea}>
              <span className={styles.sectionLabel}>About Me</span>
              <h2>Professional Journey & Strengths</h2>
            </div>
            
            <div className={`${styles.bioCard} glass`}>
              <p className={styles.bioText}>
                {personalData.summary}
              </p>
              <p className={styles.bioText} style={{ marginBottom: 0 }}>
                <strong>Career Objective:</strong> {personalData.objectives}
              </p>
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <label>Current Status</label>
                <span>B.Tech in IT (Pursuing)</span>
              </div>
              <div className={styles.infoItem}>
                <label>Location</label>
                <span>{personalData.location}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <span>{personalData.email}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Passionate About</label>
                <span>UI/UX, Performance, Testing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Milestones timeline */}
          <div className={styles.timelineSection}>
            <h3 className={styles.timelineTitle}>
              Key Milestones
            </h3>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineMeta}>2026</div>
                <div className={styles.timelineLabel}>QA Tester Intern</div>
                <div className={styles.timelineSub}>Kalesh</div>
                <p className={styles.timelineDesc}>
                  Engaged in web and mobile app manual quality assurance.
                </p>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineMeta}>2025 – Present</div>
                <div className={styles.timelineLabel}>Vice President - BTech Society</div>
                <div className={styles.timelineSub}>Sangnak Shila Society</div>
                <p className={styles.timelineDesc}>
                  Leading student chapters, coordinating technical workshops, and events.
                </p>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineMeta}>2023</div>
                <div className={styles.timelineLabel}>Started B.Tech (IT)</div>
                <div className={styles.timelineSub}>Axis Institute of Technology & Management</div>
                <p className={styles.timelineDesc}>
                  Commenced academic path in Dr. A.P.J. Abdul Kalam Technical University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
