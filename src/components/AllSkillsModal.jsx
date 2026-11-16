import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layout, Server, Database, Terminal } from 'lucide-react';

export function AllSkillsModal({ isOpen, onClose }) {
  const categories = [
    {
      title: "Frontend Development",
      icon: <Layout size={18} />,
      skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Responsive UI", "Redux Toolkit"]
    },
    {
      title: "Backend & APIs",
      icon: <Server size={18} />,
      skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Middleware Design", "Bcrypt"]
    },
    {
      title: "Databases & Storage",
      icon: <Database size={18} />,
      skills: ["MongoDB", "Mongoose ODM", "Schema Modeling", "Data Aggregation", "Database Indexing"]
    },
    {
      title: "Developer Tools & DevOps",
      icon: <Terminal size={18} />,
      skills: ["Git & GitHub", "Postman", "Vite", "Vercel / Render Deployment", "npm / yarn", "VS Code"]
    }
  ];

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
            className="modal-card skills-modal-card"
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
                <span className="live-tag">Technical Competencies</span>
                <h3>Comprehensive Skills Matrix</h3>
              </div>
              <motion.button
                className="close-btn"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="skills-matrix-grid">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  className="matrix-category-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                >
                  <div className="matrix-category-title">
                    {cat.icon}
                    <h4>{cat.title}</h4>
                  </div>
                  <ul className="matrix-skills-list">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx}>
                        <CheckCircle2 size={14} className="text-green" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="modal-footer-note">
              <p>Always expanding knowledge into Next.js, TypeScript, and cloud serverless architectures.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
