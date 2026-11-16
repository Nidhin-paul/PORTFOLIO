import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ResumeModal({ isOpen, onClose }) {
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent="true"
        >
          <motion.div
            className="modal-card resume-modal-card"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
          >
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="live-tag">Curriculum Vitae</span>
                <h3>Nidhin Paulson • Resume</h3>
              </div>
              <div className="resume-actions">
                <motion.button
                  className="pill-btn download-btn"
                  onClick={handleDownload}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download size={15} /> Download / Print PDF
                </motion.button>
                <motion.button
                  className="close-btn"
                  onClick={onClose}
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <div className="resume-paper" id="resume-document">
              <div className="resume-header">
                <div>
                  <h1 className="resume-name">Nidhin Paulson</h1>
                  <p className="resume-role">MERN Stack Developer</p>
                </div>
                <div className="resume-contact-meta">
                  <div className="meta-row">
                    <Mail size={13} /> nidhinpaulsonv@gmail.com
                  </div>
                  <div className="meta-row">
                    <MapPin size={13} /> Palakkad, Kerala, India
                  </div>
                  <div className="meta-row">
                    <ExternalLink size={13} /> linkedin.com/in/nidhin-paulson
                  </div>
                </div>
              </div>

              <hr className="resume-divider" />

              {/* Professional Summary */}
              <div className="resume-section">
                <h4 className="resume-section-title">Professional Summary</h4>
                <p className="resume-text">
                  Results-driven MERN Stack Developer with hands-on experience building scalable, dynamic web applications with React.js, Node.js, Express.js, and MongoDB. Passionate about clean code standards, responsive user interfaces, RESTful API architecture, and solving real-world product engineering challenges.
                </p>
              </div>

              {/* Work Experience */}
              <div className="resume-section">
                <h4 className="resume-section-title">
                  <Briefcase size={15} /> Experience
                </h4>

                <div className="resume-exp-item">
                  <div className="exp-heading">
                    <div>
                      <strong>Full Stack Developer</strong> — <span>Dcoode</span>
                    </div>
                    <span className="exp-date">Apr 2026 - Present | Ottapalam, Kerala</span>
                  </div>
                  <ul className="exp-bullets">
                    <li>Architect and develop responsive web applications using the complete MERN stack.</li>
                    <li>Design, optimize, and maintain scalable front-end components and modular server-side APIs.</li>
                    <li>Collaborate in agile sprints to deliver client requirements on tight deadlines.</li>
                    <li>Participate in requirement discovery, database schema design, testing, and Vercel/Render deployments.</li>
                  </ul>
                </div>

                <div className="resume-exp-item">
                  <div className="exp-heading">
                    <div>
                      <strong>MERN Stack Developer Intern</strong> — <span>Softronics</span>
                    </div>
                    <span className="exp-date">May 2025 - Mar 2026 | Palakkad, Kerala</span>
                  </div>
                  <ul className="exp-bullets">
                    <li>Built dynamic client-side single page applications using React and Tailwind CSS.</li>
                    <li>Constructed RESTful CRUD endpoints in Express.js with Mongoose ODM integration.</li>
                    <li>Integrated authentication workflows utilizing JSON Web Tokens (JWT) and Bcrypt.</li>
                    <li>Assisted senior engineers in debugging and optimizing MongoDB queries.</li>
                  </ul>
                </div>

                <div className="resume-exp-item">
                  <div className="exp-heading">
                    <div>
                      <strong>Summer Internship (Python)</strong> — <span>Softroniics</span>
                    </div>
                    <span className="exp-date">Apr 2024 - Apr 2024 | Palakkad, Kerala</span>
                  </div>
                  <ul className="exp-bullets">
                    <li>Completed an intensive summer program focusing on full-stack Python web development.</li>
                    <li>Built web application prototypes and interactive interfaces using Python, HTML, and CSS.</li>
                    <li>Gained practical exposure to Git version control, documentation standards, and collaborative workflows.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="resume-section">
                <h4 className="resume-section-title">Key Projects</h4>
                <div className="resume-project-item">
                  <strong>Emergency Contact Hub:</strong> Full-stack platform for emergency contact directory and dispatch management featuring admin dashboard and instant alerts. (React, Node.js, Express, MongoDB)
                </div>
                <div className="resume-project-item">
                  <strong>Expense Tracker:</strong> Interactive personal finance application with category breakdowns, analytical charts, and income/expense monitoring. (React, Node.js, MongoDB, Chart.js)
                </div>
                <div className="resume-project-item">
                  <strong>Vehicle Service Booking:</strong> Digital automotive appointment platform featuring calendar reservation slots, progress statuses, and admin bays. (React, Node.js, Tailwind CSS)
                </div>
              </div>

              {/* Skills */}
              <div className="resume-section">
                <h4 className="resume-section-title">Technical Skills</h4>
                <div className="skills-line">
                  <strong>Languages & Core:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3
                </div>
                <div className="skills-line">
                  <strong>Frontend:</strong> React.js, Tailwind CSS, Redux Toolkit, Responsive Web Design
                </div>
                <div className="skills-line">
                  <strong>Backend & DB:</strong> Node.js, Express.js, MongoDB, Mongoose, REST APIs, JWT
                </div>
                <div className="skills-line">
                  <strong>Tools & Platforms:</strong> Git, GitHub, Postman, VS Code, Vercel, Vite
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
