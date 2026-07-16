/* src/app/page.js */
'use client';

import React, { useState, useEffect } from 'react';
import resumeData from '../data/resume.json';

// Import Components
import Preloader from '../components/Preloader';
import BackgroundEffects from '../components/BackgroundEffects';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Leadership from '../components/Leadership';
import Projects from '../components/Projects';
import BlogSection from '../components/BlogSection';
import Education from '../components/Education';
import ResumeSection from '../components/ResumeSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import SeoStructuredData from '../components/SeoStructuredData';
import SeoFaq from '../components/SeoFaq';
import { SITE_URL, buildWebPageSchema } from '../lib/seo';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Initialize theme from LocalStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme === 'light' ? 'light-theme' : '';
    } else {
      setTheme('dark');
      document.body.className = '';
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.className = nextTheme === 'light' ? 'light-theme' : '';
  };

  // Keyboard shortcut listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SeoStructuredData
        data={buildWebPageSchema({
          name: 'Prashant Umrao | Software Engineer & QA Tester Portfolio',
          description: resumeData.personal.summary,
          url: SITE_URL,
        })}
      />

      
      {/* Custom loading preloader screen */}
      <Preloader />

      {/* GPU Accelerated ambient backgrounds and custom cursor */}
      <BackgroundEffects />

      {/* Glassmorphic Sticky Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Page Sections */}
      <main>
        <Hero personalData={resumeData.personal} />
        <About personalData={resumeData.personal} />
        <Skills skillsData={resumeData.skills} softSkills={resumeData.softSkills} />
        <Experience experienceData={resumeData.experience} />
        <Leadership leadershipData={resumeData.leadership} />
        <Projects projectsData={resumeData.projects} />
        <BlogSection />
        <Education 
          educationData={resumeData.education} 
          certificationsData={resumeData.certifications} 
        />
        <ResumeSection 
          personalData={resumeData.personal}
          experienceData={resumeData.experience}
          educationData={resumeData.education}
        />
        <Contact personalData={resumeData.personal} />
        <SeoFaq
          title="What people should know about Prashant Umrao"
          intro="This section answers the most common brand, contact, and service questions that people search before reaching out."
          faqs={[
            {
              question: 'Who is Prashant Umrao?',
              answer: 'Prashant Umrao is a Software Engineer and QA Tester from Kanpur, Uttar Pradesh, India, focused on responsive frontend development, testing, and quality assurance.',
            },
            {
              question: 'What services does this portfolio highlight?',
              answer: 'The portfolio highlights frontend development, REST API integration, QA testing, regression testing, bug reporting, and clean UI implementation for modern web apps.',
            },
            {
              question: 'Is Prashant Umrao available for internships or freelance work?',
              answer: 'The portfolio is positioned for internships, entry-level roles, and project-based collaboration in frontend engineering and software testing.',
            },
            {
              question: 'Where is Prashant Umrao based?',
              answer: 'He is based in Kanpur, Uttar Pradesh, India, and the site is optimized for local and personal-brand search discovery.',
            },
            {
              question: 'How can recruiters contact Prashant Umrao?',
              answer: 'Recruiters can use the contact section on the homepage or connect through the listed email, GitHub, and LinkedIn profiles.',
            },
          ]}
        />
      </main>

      {/* Page Footer and Floating Docks */}
      <Footer personalData={resumeData.personal} />

      {/* Command Palette menu overlay */}
      <CommandPalette 
        isOpen={paletteOpen} 
        setIsOpen={setPaletteOpen} 
        toggleTheme={toggleTheme}
        personalData={resumeData.personal}
      />
    </>
  );
}
