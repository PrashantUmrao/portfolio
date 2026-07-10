/* src/components/Education.js */
'use client';

import React from 'react';
import styles from '../styles/Education.module.css';
import { ExternalLinkIcon } from './Icons';

export default function Education({ educationData, certificationsData }) {
  return (
    <section id="education" className={styles.educationSection}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Education */}
          <div>
            <h3 className={styles.sectionTitle}>
              Education Timeline
            </h3>
            
            <div className={styles.timeline}>
              {educationData.map((edu) => (
                <div key={edu.degree} className={`${styles.eduCard} glass`}>
                  <div className={styles.eduHeader}>
                    <h4 className={styles.degree}>{edu.degree}</h4>
                    <span className={styles.date}>{edu.duration}</span>
                  </div>
                  <div className={styles.institution}>{edu.institution}</div>
                  <div className={styles.board}>{edu.board}</div>
                  {edu.score && <span className={styles.score}>Percentage: {edu.score}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div>
            <h3 className={styles.sectionTitle}>
              Certifications
            </h3>

            <div className={styles.certList}>
              {certificationsData.map((cert) => (
                <div key={cert.name} className={`${styles.certCard} glass`}>
                  <div className={styles.certInfo}>
                    <h4 className={styles.certName}>{cert.name}</h4>
                    <span className={styles.certOrg}>{cert.organization}</span>
                    <span className={styles.certDate}>Issued {cert.date}</span>
                  </div>
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.certLink}
                      aria-label={`Verify certificate for ${cert.name}`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
