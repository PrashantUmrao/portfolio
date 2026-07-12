/* src/components/Projects.js */
'use client';

import React, { useState } from 'react';
import styles from '../styles/Projects.module.css';
import { SearchIcon, XIcon, GithubIcon, ExternalLinkIcon } from './Icons';

export default function Projects({ projectsData }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique categories
  const categories = ['All', ...new Set(projectsData.map((p) => p.category))];

  // Filter projects by search and category
  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory =
      activeCategory === 'All' || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="gradient-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            My Works
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '8px' }}>
            Featured Projects
          </h2>
        </div>

        {/* Filter and Search Controls */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.searchWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.card} glass`}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.imageArea}>
                <span className={styles.imageText}>{project.title}</span>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.tagline}</p>
                <div className={styles.techList}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techTag}>+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Project Modal Details */}
        <div 
          className={`${styles.modalOverlay} ${selectedProject ? styles.modalActive : ''}`}
          onClick={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <div 
              className={`${styles.modalContent} glass`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setSelectedProject(null)}
                aria-label="Close details"
              >
                <XIcon />
              </button>

              <span className={styles.modalCategory}>{selectedProject.category}</span>
              <h3 className={styles.modalTitle}>{selectedProject.title}</h3>

              <div className={styles.modalBody}>
                <div>
                  <h4 className={styles.modalSectionTitle}>Description</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', textAlign: 'justify' }}>
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className={styles.modalSectionTitle}>Key Features</h4>
                  <ul className={styles.modalFeatures}>
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className={styles.modalFeatureItem}>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={styles.modalSectionTitle}>Challenges & Solutions</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', fontStyle: 'italic', textAlign: 'justify' }}>
                    {selectedProject.challenges}
                  </p>
                </div>

                <div>
                  <h4 className={styles.modalSectionTitle}>Tech Stack</h4>
                  <div className={styles.techList} style={{ gap: '8px' }}>
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.btnRow}>
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary-custom"
                      style={{
                        background: 'var(--accent-blue)',
                        color: '#FFFFFF',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 250ms ease'
                      }}
                    >
                      Live Demo <ExternalLinkIcon />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--accent-blue)',
                        color: 'var(--accent-blue)',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 250ms ease'
                      }}
                    >
                      GitHub Repo <GithubIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
