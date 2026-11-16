import React, { useState, useEffect } from 'react';
import 'lenis/dist/lenis.css';
import './App.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { IntroModal } from './components/IntroModal';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { AllSkillsModal } from './components/AllSkillsModal';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { GrainOverlay } from './components/GrainOverlay';
import { Marquee } from './components/Marquee';
import { portfolioData } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('np_theme') || 'light';
  });

  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAllSkillsOpen, setIsAllSkillsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // 1. Theme persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('np_theme', theme);
  }, [theme]);

  // 2. Lenis Smooth Scrolling + GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Initial page entrance animation: nav fade-in and smooth page reveal
    gsap.fromTo(
      '.navbar-wrapper',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Lock body scroll and pause Lenis while any modal is open
  useEffect(() => {
    const isAnyModalOpen = isIntroOpen || isResumeOpen || isAllSkillsOpen || Boolean(selectedProject);
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isIntroOpen, isResumeOpen, isAllSkillsOpen, selectedProject]);

  // Support closing modals with the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsIntroOpen(false);
        setIsResumeOpen(false);
        setIsAllSkillsOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Editorial Luxury Grain Texture */}
      <GrainOverlay />

      {/* Awwwards Initial Page Preloader */}
      <Preloader />

      {/* Custom Awwwards-style magnetic/expanding cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <Skills onOpenAllSkills={() => setIsAllSkillsOpen(true)} />

        {/* Typographic Marquee Divider */}
        <Marquee text="MERN STACK ARCHITECTURE • REACT & NODE.JS • HIGH-PERFORMANCE WEB APPS • SCALABLE REST APIS • CLEAN MODERN CODE •" />

        <Experience onOpenResume={() => setIsResumeOpen(true)} />
        <Projects onSelectProject={(proj) => setSelectedProject(proj)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <IntroModal
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AllSkillsModal
        isOpen={isAllSkillsOpen}
        onClose={() => setIsAllSkillsOpen(false)}
        skills={portfolioData.skills}
        extendedSkills={portfolioData.extendedSkills}
      />

      <ProjectModal
        isOpen={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
