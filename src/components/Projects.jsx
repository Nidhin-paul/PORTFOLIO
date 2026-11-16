import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TILT_CONFIGS = [
  { defaultRotate: -4.5, defaultOffset: -12, zIndex: 1 },
  { defaultRotate: 3.5, defaultOffset: 14, zIndex: 2 },
  { defaultRotate: -2.5, defaultOffset: -8, zIndex: 3 }
];

export function Projects({ onSelectProject }) {
  const { projects } = portfolioData;
  const sectionRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cascading-deck-card');
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): cascading tilt with staggered scroll trigger
      mm.add('(min-width: 769px)', () => {
        cards.forEach((card, index) => {
          const config = TILT_CONFIGS[index % TILT_CONFIGS.length];
          gsap.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
              rotate: 0,
              scale: 0.94
            },
            {
              y: 0,
              opacity: 1,
              rotate: config.defaultRotate,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 45%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });

      // Mobile (<= 768px): flat, straight cards (rotate: 0deg) to prevent horizontal overflow
      mm.add('(max-width: 768px)', () => {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
              rotate: 0,
              scale: 0.97
            },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });
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
              Here are some of the full-stack applications I've built using the MERN stack, RESTful APIs, and modern UI engineering.
            </p>
            <button
              onClick={() => onSelectProject(projects[0])}
              className="view-all-projects-btn"
            >
              <span>Explore First Project</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Cascading Tilted Deck Showcase Layout */}
        <div className="cascading-deck-container" ref={deckRef}>
          {projects.map((proj, idx) => {
            const config = TILT_CONFIGS[idx % TILT_CONFIGS.length];
            const isDarkCard = proj.themeVariant === 'deck-dark' || proj.themeVariant === 'deck-accent';

            return (
              <div
                key={proj.id}
                className={`cascading-deck-card ${proj.themeVariant} ${isDarkCard ? 'is-dark-theme' : 'is-light-theme'}`}
                style={{
                  '--card-tilt': `${config.defaultRotate}deg`,
                  '--card-offset': `${config.defaultOffset}px`,
                  '--card-z': config.zIndex,
                  zIndex: config.zIndex
                }}
                onClick={() => onSelectProject(proj)}
                role="button"
                tabIndex={0}
                aria-label={`View case study for ${proj.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(proj);
                  }
                }}
              >
                {/* 1. Card Top Bar Header */}
                <div className="deck-card-topbar">
                  <div className="deck-topbar-left">
                    <span className="deck-index-badge">{proj.number}</span>
                    <span className="deck-category-text">{proj.category}</span>
                  </div>

                  {/* Inline Stats / Metrics strip in header */}
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="deck-topbar-metrics">
                      {proj.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="deck-topbar-metric-item">
                          <span className="deck-topbar-metric-val">{m.val}</span>
                          <span className="deck-topbar-metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="deck-topbar-right">
                    <button
                      className="deck-action-circle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj);
                      }}
                      aria-label="Open project modal"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Subtle Divider Rule */}
                <div className="deck-card-divider"></div>

                {/* 2. Main Card Body: 2-Column Split */}
                <div className="deck-card-body">
                  {/* Left Column: Title, Overview, Highlights, Tags, Actions */}
                  <div className="deck-card-info">
                    <div className="deck-title-block">
                      <h3 className="deck-title">{proj.title}</h3>
                      <p className="deck-tagline">{proj.tagline}</p>
                    </div>

                    {/* Architecture Highlights */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <ul className="deck-highlights-list">
                        {proj.highlights.slice(0, 2).map((hl, hIdx) => (
                          <li key={hIdx}>
                            <span className="deck-bullet-dot">•</span>
                            <span className="deck-bullet-text">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="deck-tags-row">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="deck-tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="deck-actions-row">
                      <button
                        className="pill-btn deck-primary-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(proj);
                        }}
                      >
                        <span>View Details</span>
                        <ArrowUpRight size={14} />
                      </button>

                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="deck-secondary-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: High-Impact Project Preview */}
                  <div className="deck-card-visual">
                    <div className="deck-image-frame">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="deck-preview-img"
                        loading="lazy"
                      />
                      <div className="deck-image-overlay"></div>
                      <span className="deck-corner-badge">FULL-STACK</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
