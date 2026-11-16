import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(() => {
    try {
      return Boolean(sessionStorage.getItem('np_loaded'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isFinished) {
      onComplete?.();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic loading feel
      current += Math.floor(Math.random() * 12) + 3;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem('np_loaded', 'true');
          onComplete?.();
        }, 350);
      } else {
        setCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="awwwards-preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="preloader-content">
            <div className="preloader-top">
              <motion.span 
                className="preloader-brand"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                NIDHIN PAULSON
              </motion.span>
              <motion.span 
                className="preloader-role"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                PORTFOLIO © 2026
              </motion.span>
            </div>

            <div className="preloader-counter-wrap">
              <span className="preloader-number">{count}</span>
              <span className="preloader-percent">%</span>
            </div>

            <div className="preloader-bar-wrap">
              <motion.div 
                className="preloader-bar-fill"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
