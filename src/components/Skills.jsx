import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Skills({ onOpenAllSkills }) {
  const { skills } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger technology cards in from left to right
      gsap.fromTo(
        '.skill-card',
        { x: -35, y: 25, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
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
    <section id="skills" className="section-padding skills-section" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="skills-header">
          <div className="skills-header-left">
            <div className="section-tag">
              <span className="num">02</span>
              <span className="label">SKILLS & TOOLS</span>
            </div>
            <h2 className="section-heading">Technologies<br />I work with.</h2>
          </div>

          <div className="skills-header-right">
            <p className="skills-subtitle">
              I use modern technologies to build complete web solutions from front-end to back-end.
            </p>
            <button
              onClick={onOpenAllSkills}
              className="view-all-btn"
            >
              <span>View All Skills</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="skill-card"
              style={{ '--skill-color': skill.color }}
            >
              <div className="skill-icon-box">
                <TechIcon type={skill.iconType} className="skill-svg-icon" />
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
