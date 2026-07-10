/* src/components/BackgroundEffects.js */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/ExtraPremium.module.css';

export default function BackgroundEffects() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorDotPos, setCursorDotPos] = useState({ x: 0, y: 0 });
  const [readingProgress, setReadingProgress] = useState(0);
  const [hideCursor, setHideCursor] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Show cursor when mouse moves
    const handleMouseMove = (e) => {
      setHideCursor(false);
      setCursorDotPos({ x: e.clientX, y: e.clientY });
      
      // Delay for outer circle follower (spotlight effect)
      setTimeout(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseLeave = () => {
      setHideCursor(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Reading scroll progress tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setReadingProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Canvas particle animation (60fps optimized, respects reduced motion)
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles constructor
    const particlesArray = [];
    const numberOfParticles = Math.min(Math.floor(window.innerWidth / 20), 40);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(0, 102, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid movement optionally or just float particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Canvas Particle Overlay */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: -6, pointerEvents: 'none' }} />

      {/* Reading Progress Line */}
      <div className={styles.readingBar} style={{ width: `${readingProgress}%` }} />

      {/* Mouse Glow Spotlight wrapper */}
      {!hideCursor && (
        <div 
          className={styles.mouseGlow} 
          style={{ 
            left: `${cursorDotPos.x}px`, 
            top: `${cursorDotPos.y}px` 
          }} 
        />
      )}

      {/* Custom Cursor follow elements */}
      {!hideCursor && (
        <>
          <div 
            className={styles.customCursor} 
            style={{ 
              left: `${cursorPos.x}px`, 
              top: `${cursorPos.y}px` 
            }} 
          />
          <div 
            className={styles.customCursorDot} 
            style={{ 
              left: `${cursorDotPos.x}px`, 
              top: `${cursorDotPos.y}px` 
            }} 
          />
        </>
      )}

      {/* Ambient background Blobs */}
      <div className={styles.blobContainer}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>
    </>
  );
}
