import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export function IntroModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
            className="modal-card"
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
                <span className="live-tag">
                  <span className="pulse-indicator"></span> Intro Reel
                </span>
                <h3>Nidhin Paulson • Developer Story</h3>
              </div>
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

            <div className="video-viewport">
              <div className="video-simulated-content">
                <div className="video-ambient-glow"></div>
                
                <div className="video-overlay-info">
                  <div className="code-pill">
                    <Code size={14} /> MERN Full-Stack Engineer
                  </div>
                  <h2 className="video-headline">
                    Crafting robust applications from Palakkad, Kerala to global users.
                  </h2>
                  <div className="video-tags">
                    <span>⚡ High-Performance React</span>
                    <span>🛡️ Scalable Express & MongoDB</span>
                    <span>🎨 Pixel-Perfect UI/UX</span>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="video-controls">
                  <button 
                    className="control-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  
                  <div className="progress-bar-container">
                    <div className={`progress-bar-fill ${isPlaying ? 'animating' : ''}`}></div>
                  </div>

                  <button 
                    className="control-btn"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Philosophy
              </button>
              <button 
                className={`tab-btn ${activeTab === 'stack' ? 'active' : ''}`}
                onClick={() => setActiveTab('stack')}
              >
                Workflow & Stack
              </button>
              <button 
                className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
                onClick={() => setActiveTab('goals')}
              >
                Career Focus
              </button>
            </div>

            <div className="modal-body">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    className="tab-pane"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p>
                      "I focus on writing clean, maintainable code with clear boundaries between UI state and server logic. Building user interfaces is about empathy for the end user and structural discipline under the hood."
                    </p>
                    <div className="key-points">
                      <div className="point-item">
                        <CheckCircle2 size={16} className="text-green" />
                        <span>Component-driven frontend design with React and Tailwind</span>
                      </div>
                      <div className="point-item">
                        <CheckCircle2 size={16} className="text-green" />
                        <span>Clean RESTful architecture & secure JWT authorization</span>
                      </div>
                      <div className="point-item">
                        <CheckCircle2 size={16} className="text-green" />
                        <span>Schema-validated database designs in MongoDB</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stack' && (
                  <motion.div
                    key="stack"
                    className="tab-pane"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p>
                      My everyday stack revolves around modern JavaScript/TypeScript, Express REST APIs, MongoDB Mongoose data modeling, and React client architecture.
                    </p>
                    <div className="stack-badges">
                      <span className="badge">MongoDB</span>
                      <span className="badge">Express.js</span>
                      <span className="badge">React.js</span>
                      <span className="badge">Node.js</span>
                      <span className="badge">Tailwind CSS</span>
                      <span className="badge">Git / GitHub</span>
                      <span className="badge">Postman</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'goals' && (
                  <motion.div
                    key="goals"
                    className="tab-pane"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p>
                      Currently eager to contribute to product companies and agile engineering teams looking for a dedicated full-stack developer with rapid problem-solving skills.
                    </p>
                    <div className="availability-box">
                      <Sparkles size={16} className="text-amber" />
                      <span>Available for full-time roles & high-impact contracts.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
