/* src/components/ResumeSection.js */
'use client';

import React, { useState } from 'react';
import styles from '../styles/ResumeSection.module.css';
import { ExternalLinkIcon } from './Icons';

export default function ResumeSection({ personalData, experienceData, educationData }) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadText, setDownloadText] = useState('Download Resume');

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadText('Preparing...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      setDownloadText(`Downloading (${progress}%)`);

      if (progress >= 100) {
        clearInterval(interval);
        setDownloadText('Resume Downloaded!');
        
        // Trigger actual download of a mock resume file or print window
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          setDownloadText('Download Resume');
          window.print(); // Easy neat way to print/save resume right away!
        }, 1000);
      }
    }, 150);
  };

  return (
    <section id="resume" className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Curriculum Vitae
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Interactive Resume Preview
          </h2>
        </div>

        <div className={`${styles.card} glass`}>
          {/* Mock Interactive document preview */}
          <div className={styles.previewBox}>
            <div className={styles.previewHeader}>
              <div className={styles.previewName}>{personalData.name}</div>
              <div className={styles.previewTitle}>{personalData.title}</div>
              <div className={styles.previewContact}>
                <span>{personalData.location}</span>
                <span>{personalData.email}</span>
                <span>{personalData.phone}</span>
              </div>
            </div>

            {/* Profile summary preview */}
            <div className={styles.previewSection}>
              <h4 className={styles.previewSectionTitle}>Summary</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {personalData.summary}
              </p>
            </div>

            {/* Experience preview */}
            <div className={styles.previewSection}>
              <h4 className={styles.previewSectionTitle}>Work Experience</h4>
              {experienceData.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span>{exp.role} – {exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <ul className={styles.previewList} style={{ marginTop: '4px' }}>
                    {exp.description.slice(0, 2).map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.previewBullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education preview */}
            <div className={styles.previewSection}>
              <h4 className={styles.previewSectionTitle}>Education</h4>
              {educationData.map((edu, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>{edu.degree} – {edu.institution}</span>
                  <span>{edu.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actions}>
            <button 
              className={styles.downloadBtn} 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {downloadText}
              {isDownloading && (
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${downloadProgress}%` }} 
                />
              )}
            </button>

            <button 
              className="btn-secondary-custom"
              onClick={() => window.print()}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--accent-blue)',
                color: 'var(--accent-blue)',
                padding: '14px 28px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 250ms ease'
              }}
            >
              Print Version <ExternalLinkIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
