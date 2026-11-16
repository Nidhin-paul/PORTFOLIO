import React from 'react';

export function Marquee({ text = "MERN STACK ARCHITECTURE • REACT & NODE.JS • HIGH-PERFORMANCE WEB APPS • SCALABLE REST APIS • CLEAN MODERN CODE •" }) {
  // Parse items from the text string to style bullets separately
  const items = text
    .split('•')
    .map(s => s.trim())
    .filter(Boolean);

  const renderGroup = (keyPrefix) => (
    <div className="marquee-group" key={keyPrefix}>
      {items.map((item, idx) => (
        <span className="marquee-item" key={`${keyPrefix}-${idx}`}>
          <span className="marquee-text">{item}</span>
          <span className="marquee-bullet">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="awwwards-marquee-container" aria-hidden="true">
      <div className="marquee-track">
        {renderGroup('g1')}
        {renderGroup('g2')}
        {renderGroup('g3')}
        {renderGroup('g4')}
      </div>
    </div>
  );
}
