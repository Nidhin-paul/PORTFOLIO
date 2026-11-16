import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TiltProjectCard({ proj, onSelectProject }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      onClick={() => onSelectProject(proj)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
      }}
    >
      {/* Image Preview Box with Horizontal Reveal */}
      <div className="project-preview-wrapper">
        <div className="project-image-reveal-curtain">
          <img
            src={proj.image}
            alt={proj.title}
            className="project-preview-img"
            loading="lazy"
          />
        </div>
        <span className="project-index-pill">{proj.number}</span>
      </div>

      {/* Card Meta Content */}
      <div className="project-info">
        <h3 className="project-title">{proj.title}</h3>
        <p className="project-tagline">{proj.tagline}</p>

        {/* Tech Tags and Arrow Action */}
        <div className="project-tags-row">
          <div className="project-tags-list">
            {proj.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-name">{tag}</span>
            ))}
          </div>

          <button
            className="project-action-btn"
            aria-label={`View details for ${proj.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(proj);
            }}
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects({ onSelectProject }) {
  const { projects } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal image reveal animation for project cards
      gsap.fromTo(
        '.project-image-reveal-curtain',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding projects-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-header-left">
            <div className="section-tag">
              <span className="num">04</span>
              <span className="label">FEATURED PROJECTS</span>
            </div>
            <h2 className="projects-heading">
              Selected<br />
              <span className="heading-muted">Projects.</span>
            </h2>
          </div>

          <div className="projects-header-right">
            <p className="projects-subtitle">
              Here are some of the projects I've built using the MERN stack and modern web technologies.
            </p>
            <button
              onClick={() => onSelectProject(projects[0])}
              className="view-all-projects-btn"
            >
              <span>View All Projects</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="projects-grid">
          {projects.map((proj) => (
            <TiltProjectCard
              key={proj.id}
              proj={proj}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
