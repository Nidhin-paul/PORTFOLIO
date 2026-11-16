import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  );
}

export function Contact() {
  const { personal } = portfolioData;
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth entrance of contact elements
      gsap.fromTo(
        '.contact-reveal-left',
        { x: -35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.contact-reveal-right',
        { x: 35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.1,
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '9771de0e-67fd-478f-99ca-7b240fbf16e3',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Client Message from ${formData.name} - Portfolio`,
          from_name: `${formData.name} (Portfolio)`
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 }
        });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage(
        error.message || 'Unable to send message right now. Please try again or email directly.'
      );
    }
  };

  return (
    <section id="contact" className="section-padding contact-section" ref={sectionRef}>
      <div className="contact-ambient-gradient"></div>
      <div className="container contact-container">

        {/* Left Column: Heading & Contact Info */}
        <div className="contact-left contact-reveal-left">
          <div className="section-tag">
            <span className="num">05</span>
            <span className="label">GET IN TOUCH</span>
          </div>

          <h2 className="contact-heading">
            Let's build<br />
            something great<br />
            together.
          </h2>

          <p className="contact-description">
            I'm always open to discussing new opportunities, interesting projects or just having a tech conversation.
          </p>

          <div className="contact-channels">
            <a href={`mailto:${personal.email}`} className="channel-item">
              <span className="channel-icon-box">
                <Mail size={16} />
              </span>
              <span className="channel-text">{personal.email}</span>
            </a>

            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="channel-item">
              <span className="channel-icon-box">
                <LinkedinIcon size={16} />
              </span>
              <span className="channel-text">{personal.linkedinDisplay}</span>
            </a>

            <a href={personal.github} target="_blank" rel="noreferrer" className="channel-item">
              <span className="channel-icon-box">
                <GithubIcon size={16} />
              </span>
              <span className="channel-text">{personal.githubDisplay}</span>
            </a>

            <div className="channel-item">
              <span className="channel-icon-box">
                <MapPin size={16} />
              </span>
              <span className="channel-text">{personal.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="contact-right contact-reveal-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <textarea
                name="message"
                id="contact-message"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <AnimatePresence>
              {errorMessage && (
                <motion.p 
                  className="form-error-text"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              {submitted && (
                <motion.div 
                  className="form-success-banner"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 size={18} className="text-green" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="pill-btn primary-btn send-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spin-slow" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
