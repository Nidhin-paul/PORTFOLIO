import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function formatPeriod(period) {
  if (!period) return { year: '', sub: '' };
  
  // Format: "Apr 2026 - Present"
  if (/present/i.test(period)) {
    const match = period.match(/(\w+)?\s*(\d{4})/i);
    const year = match ? match[2] : 'Present';
    const month = match && match[1] ? match[1] : '';
    return {
      year: `${year}`,
      sub: `${month ? month + ' – ' : ''}Present`
    };
  }

  // Format: "May 2025 - Mar 2026" or "Apr 2024 - Apr 2024"
  const match = period.match(/(\w+)?\s*(\d{4})\s*[-–]\s*(\w+)?\s*(\d{4})/i);
  if (match) {
    const [, m1, y1, m2, y2] = match;
    const year = y1 === y2 ? y1 : `${y1} – ${y2}`;
    const sub = (m1 && m2 && m1 !== m2) ? `${m1} – ${m2}` : (m1 || '');
    return { year, sub };
  }

  return { year: period, sub: '' };
}

export function Experience({ onOpenResume }) {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clean, sequential entrance of all timeline items
      gsap.fromTo(
        '.editorial-timeline-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      // 2. Dynamic progress line that draws downward as you scroll through the section
      gsap.fromTo(
        '.editorial-timeline-progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 85%',
            scrub: 0.5
          }
        }
      );

      // 3. Highlight marker dot as scroll passes each job
      const items = gsap.utils.toArray('.editorial-timeline-item');
      items.forEach((item) => {
        const dot = item.querySelector('.editorial-marker-dot');
        if (dot) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 65%',
            end: 'bottom 35%',
            onEnter: () => dot.classList.add('is-active'),
            onEnterBack: () => dot.classList.add('is-active'),
            onLeave: () => dot.classList.remove('is-active'),
            onLeaveBack: () => dot.classList.remove('is-active')
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-padding experience-section" ref={sectionRef}>
      <div className="container experience-container">
        
        {/* Left Column: Heading & Resume Button (Sticky in CSS) */}
        <div className="experience-left">
          <div className="section-tag">
            <span className="num">03</span>
            <span className="label">EXPERIENCE</span>
          </div>

          <h2 className="section-heading experience-heading">
            My<br />Experience.
          </h2>

          <p className="experience-subtitle">
            A quick overview of my professional journey and key learnings.
          </p>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenResume}
              className="pill-btn primary-btn resume-btn"
            >
              <span>View My Resume</span>
              <ArrowUpRight size={15} />
            </button>
          </Magnetic>
        </div>

        {/* Right Column: Clean Minimalist Editorial Timeline */}
        <div className="experience-timeline-editorial">
          {/* Subtle static background line */}
          <div className="editorial-timeline-line"></div>

          {/* Dynamic scrubbed progress line that draws downward as you scroll */}
          <div className="editorial-timeline-progress-line"></div>

          {experience.map((item) => {
            const { year, sub } = formatPeriod(item.period);

            return (
              <div key={item.id} className="editorial-timeline-item">
                
                {/* Timeline Dot Marker on the Vertical Axis */}
                <div className="timeline-dot-axis">
                  <div className="editorial-marker-dot"></div>
                </div>

                {/* Date / Year Column */}
                <div className="editorial-date-column">
                  <span className="editorial-year">{year}</span>
                  {sub && <span className="editorial-sub-period">{sub}</span>}
                </div>

                {/* Content Column */}
                <div className="editorial-content-column">
                  
                  {/* Role Title with optional status pill */}
                  <div className="editorial-role-row">
                    <h3 className="editorial-role-title">{item.role}</h3>
                    {item.originBadge && (
                      <span className="editorial-origin-pill">{item.originBadge}</span>
                    )}
                    {item.badge && (
                      <span className={`editorial-status-pill ${item.badge.toLowerCase().includes('intern') ? 'intern' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Company & Location */}
                  <div className="editorial-company-location">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="editorial-company-link"
                    >
                      {item.company}
                    </a>
                    {item.location && (
                      <span className="editorial-location-text">
                        , {item.location}
                      </span>
                    )}
                  </div>

                  {/* Bullet Points */}
                  <ul className="editorial-bullets-list">
                    {item.points.map((pt, idx) => (
                      <li key={idx}>
                        <span className="editorial-bullet-dot">•</span>
                        <span className="editorial-bullet-text">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skill Pills (if present) */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="editorial-skills-row">
                      {item.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="editorial-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}