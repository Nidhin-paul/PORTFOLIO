import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Magnetic } from './Magnetic';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  // 1. Initial Staggered Entry Reveal (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-monumental-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 2. Synchronized Scroll Transitions driven by normalized scrollProgress
  useEffect(() => {
    const heroSection = heroRef.current;
    const heroContent = contentRef.current;
    if (!heroSection) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const heroHeight = heroSection.offsetHeight || window.innerHeight;
          const scrollProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

          // Update CSS custom variable --scroll-progress for dark gradient mask
          heroSection.style.setProperty('--scroll-progress', scrollProgress.toString());

          // Parallax Float & Scale Down on the Text (.hero-content)
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.5}px) scale(${1 - scrollProgress * 0.2})`;
            heroContent.style.opacity = (1 - scrollProgress * 0.8).toString();
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -20, duration: 1.3 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="hero-monumental-section" ref={heroRef}>
      {/* Anchor for nav compatibility */}
      <span id="home" style={{ position: 'absolute', top: 0, left: 0 }} aria-hidden="true"></span>

      {/* Main Monumental Typography & Centered Content */}
      <div className="hero-monumental-content hero-content" ref={contentRef}>
        {/* Eyebrow Label */}
        <div className="hero-monumental-eyebrow hero-monumental-reveal">
          <span>NIDHIN PAULSON</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="hero-monumental-title hero-monumental-reveal">
          <span className="hero-title-line line-1">HI THERE</span>
          <span className="hero-title-line line-2">
            I AM <span className="hero-stroke-name">NIDHIN</span>
            <span className="hero-pink-asterisk">*</span>
          </span>
        </h1>

        {/* Subtitle / Role Tag */}
        <div className="hero-monumental-role hero-monumental-reveal">
          <span>MERN STACK DEVELOPER</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-actions hero-monumental-reveal">
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo('projects')}
              className="pill-btn primary-btn monumental-cta-btn"
            >
              <span>View My Work</span>
              <ArrowUpRight size={16} />
            </button>
          </Magnetic>
        </div>

        {/* Center Scroll Down Arrow Indicator */}
        <div
          className="hero-monumental-scroll hero-scroll-indicator hero-monumental-reveal"
          onClick={() => scrollTo('about')}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to About section"
        >
          <ArrowDown className="scroll-arrow-icon" size={22} />
        </div>
      </div>

      {/* Bottom Metadata: Location */}
      <div className="hero-bottom-meta hero-monumental-reveal">
        <span className="hero-location-text">Based in Palakkad, Kerala, India</span>
      </div>
    </section>
  );
}
