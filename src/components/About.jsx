import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { Magnetic } from './Magnetic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About({ onOpenResume }) {
  const sectionRef = useRef(null);
  const imageCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveals line-by-line / block-by-block
      gsap.fromTo(
        '.about-reveal-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      // 2. Image card slides and rotates subtly into position
      gsap.fromTo(
        imageCardRef.current,
        { x: 50, rotate: 3, scale: 0.95, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section-padding about-section" ref={sectionRef}>
      <div className="container about-container">

        {/* Left Column: Text & Metrics */}
        <div className="about-content">
          <div className="section-tag about-reveal-item">
            <span className="num">01</span>
            <span className="label">ABOUT ME</span>
          </div>

          <h2 className="about-title about-reveal-item">
            Turning ideas into <span className="title-italic">real-world</span> solutions.
          </h2>

          <p className="about-bio about-reveal-item">
            I'm Nidhin Paulson, a MERN Stack Developer based in Palakkad, Kerala. I enjoy building full-stack web applications that are fast, scalable and user-friendly. I'm always excited to learn new technologies and work on meaningful projects.
          </p>

          {/* Stats Grid */}
          <div className="about-stats-grid about-reveal-item">
            <div className="stat-card">
              <span className="stat-number">2+</span>
              <span className="stat-label">Projects Completed</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">6+</span>
              <span className="stat-label">Months Experience</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Commitment</span>
            </div>
          </div>

          {/* Download CV Button */}
          <div className="about-action about-reveal-item">
            <Magnetic strength={0.3}>
              <button
                onClick={onOpenResume}
                className="pill-btn primary-btn cv-btn"
                aria-label="Download Curriculum Vitae"
              >
                <span>Download CV</span>
                <Download size={16} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Portrait, Circular Stamp, Floating Pill, and Handwritten Sticker */}
        <div className="about-visual">
          <div className="about-image-card" ref={imageCardRef}>
            <img
              src="/images/about.jpg"
              alt="Nidhin Paulson Portrait"
              className="about-image"
              loading="lazy"
            />

            {/* Circular Rotating Badge Stamp */}
            <div className="rotating-stamp-wrapper">
              <svg className="spin-slow stamp-svg" viewBox="0 0 160 160">
                <path
                  id="textPath-circle"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="none"
                />
                <text className="stamp-text">
                  <textPath href="#textPath-circle" startOffset="0%">
                    NIDHIN PAULSON • DEVELOPER •
                  </textPath>
                </text>
              </svg>
              <div className="stamp-center-dot"></div>
            </div>

            {/* Floating Pill: Open to new opportunities */}
            <div className="floating-opportunity-pill float-animation">
              <span className="pulse-indicator"></span>
              <span className="pill-text">Open to new opportunities</span>
            </div>

            {/* Handwritten sticker: Passionate Developer */}
            <div className="about-handwritten-note">
              <span className="handwritten sticker-text">Passionate Developer</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
