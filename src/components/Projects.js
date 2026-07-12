/* src/components/Projects.js */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Projects.module.css';
import { ExternalLinkIcon, GithubIcon, CloseIcon } from './Icons';

export default function Projects({ projectsData }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className={styles.sectionLabel}>My Works</span>
          <h2 className="section-title">
            FEATURED PROJECTS
          </h2>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className={`${styles.card} glass`}
              onClick={() => openModal(project)}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                  priority={index < 3}
                />
                <div className={styles.overlay}>
                  <span className={styles.viewDetails}>View Case Study</span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                
                <div className={styles.techStack}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techTagMore}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <p className={styles.projectDesc}>
                  {project.description}
                </p>

                <div className={styles.ctaGroup} onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.demoLink}
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.githubLink}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Case Study Details Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close details">
              <CloseIcon />
            </button>

            <div className={styles.modalGrid}>
              <div className={styles.modalImageWrapper}>
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  width={500}
                  height={350}
                  className={styles.modalImage}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>

              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                
                <div className={styles.modalTechStack}>
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className={styles.modalTechTag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.detailsBlock}>
                  <h4>Overview</h4>
                  <p style={{ textAlign: 'justify' }}>{selectedProject.description}</p>
                </div>

                <div className={styles.detailsBlock}>
                  <h4>Key Challenges & Solutions</h4>
                  <p style={{ textAlign: 'justify' }}>{selectedProject.challenges}</p>
                </div>

                <div className={styles.modalCtaGroup}>
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.modalDemoBtn}
                  >
                    Live Demo <ExternalLinkIcon />
                  </a>
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.modalGithubBtn}
                  >
                    GitHub Code <GithubIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
