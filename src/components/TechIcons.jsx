import React from 'react';

export function TechIcon({ type, className = "w-6 h-6" }) {
  switch (type) {
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="#00D8FE">
          <circle cx="0" cy="0" r="2.05" fill="#00D8FE"/>
          <g stroke="#00D8FE" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#22C55E">
          <path d="M12 2L2 7.7v10.6L12 24l10-5.7V7.7L12 2zm7.9 14.8L12 21.3l-7.9-4.5V8.4L12 3.9l7.9 4.5v8.4z" />
          <path d="M12 7.5L6.5 10.6v5.3L12 19l5.5-3.1v-5.3L12 7.5z" opacity="0.6"/>
        </svg>
      );
    case 'express':
      return (
        <div className={`font-bold tracking-tighter select-none ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'currentColor' }}>
          ex
        </div>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#13AA52">
          <path d="M12 1.5C11.5 2 7 9.5 7 14c0 3.5 2.5 6.5 5 7.5 2.5-1 5-4 5-7.5 0-4.5-4.5-12-5-12.5zm0 18c-1.5-.8-3-2.8-3-5.5 0-2.5 2.5-7.5 3-8.5.5 1 3 6 3 8.5 0 2.7-1.5 4.7-3 5.5z"/>
          <path d="M11.5 14.5c0-1.5.5-3.5.5-3.5s.5 2 .5 3.5-1 2-1 2v-2z" fill="#0D6938"/>
        </svg>
      );
    case 'javascript':
      return (
        <div className={`font-extrabold rounded-sm select-none ${className}`} style={{ backgroundColor: '#F7DF1E', color: '#000000', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '2px', fontSize: '0.8rem', lineHeight: '0.9', borderRadius: '4px' }}>
          JS
        </div>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M21.6 10.66L13.34 2.4a2.27 2.27 0 0 0-3.2 0l-1.9 1.9 4.12 4.12a2.3 2.3 0 0 1 2.2 2.2l3.4 3.4a2.28 2.28 0 0 1 3.64-3.36zm-11 5.92l-4.12-4.12-4.08 4.08a2.27 2.27 0 0 0 0 3.2l8.26 8.26a2.27 2.27 0 0 0 3.2 0l4.08-4.08-4.12-4.12a2.29 2.29 0 0 1-3.22-3.22z"/>
        </svg>
      );
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF6C37">
          <circle cx="12" cy="12" r="10"/>
          <path d="M14.5 9.5a2.5 2.5 0 0 0-3.5 0l-3 3a2.5 2.5 0 0 0 3.5 3.5l1-1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      );
    default:
      return null;
  }
}
