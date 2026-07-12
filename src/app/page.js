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
