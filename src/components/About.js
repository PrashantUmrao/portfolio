/* src/components/About.js */
'use client';

import React from 'react';
import styles from '../styles/About.module.css';

export default function About({ personalData }) {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Portrait & Highlights */}
          <div className={styles.leftColumn}>
            <div className={styles.portraitCard}>
              <img 
                src="/about-character.png" 
                alt="Prashant Umrao portrait" 
                className={styles.portraitImage}
              />
            </div>
            
            <div className={styles.highlightsArea}>
              <span className={styles.highlightsTitle}>Highlights</span>
              <ul className={styles.highlightsList}>
                <li className={styles.highlightItem}>
                  <span className={styles.highlightDot}>✦</span>
                  <div>
                    <strong>B.Tech IT</strong>
                    <span>Axis Institute</span>
                  </div>
                </li>
                <li className={styles.highlightItem}>
                  <span className={styles.highlightDot}>✦</span>
                  <div>
                    <strong>Frontend Enthusiast</strong>
                    <span>HTML, CSS, JS</span>
                  </div>
                </li>
                <li className={styles.highlightItem}>
                  <span className={styles.highlightDot}>✦</span>
                  <div>
                    <strong>QA Testing</strong>
                    <span>Internship at Kalesh</span>
                  </div>
                </li>
                <li className={styles.highlightItem}>
                  <span className={styles.highlightDot}>✦</span>
                  <div>
                    <strong>Leadership</strong>
                    <span>VP of BTech Society</span>
                  </div>
                </li>
                <li className={styles.highlightItem}>
                  <span className={styles.highlightDot}>✦</span>
                  <div>
                    <strong>Projects</strong>
                    <span>5+ Practical Works</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Biography & Timeline */}
          <div className={styles.rightColumn}>
            <div className={styles.headingArea}>
              <span className={styles.sectionLabel}>Biography</span>
              <h2 className="section-title">ABOUT ME</h2>
            </div>
            
            <div className={styles.bioCard}>
              <p className={styles.bioText}>
                {personalData.summary}
              </p>
              <p className={styles.bioText}>
                <strong>Career Objective:</strong> {personalData.objectives}
              </p>
            </div>

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
      </div>
    </section>
  );
}
