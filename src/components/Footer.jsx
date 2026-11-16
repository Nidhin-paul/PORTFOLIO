import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import logo from '../assets/logo.png';

export function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -20, duration: 1.3 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.3 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        
        {/* Left: NP Logo & Copyright */}
        <div className="footer-left">
          <img src={logo} alt="Nidhin Paulson Logo" className="footer-logo-img" />
          <span className="footer-copyright">
            © 2026 Nidhin Paulson. All rights reserved.
          </span>
        </div>

        {/* Right: Links and Scroll to Top */}
        <div className="footer-right">
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => scrollTo('home')} className="footer-nav-link">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('about')} className="footer-nav-link">
                About
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('projects')} className="footer-nav-link">
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('experience')} className="footer-nav-link">
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('contact')} className="footer-nav-link">
                Contact
              </button>
            </li>
          </ul>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top-btn"
            aria-label="Scroll back to top"
            title="Back to top"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
