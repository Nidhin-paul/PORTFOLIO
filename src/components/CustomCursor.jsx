import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentRingX = -100;
    let currentRingY = -100;
    let animationFrameId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isProject = Boolean(target.closest('.project-card, .project-preview-wrapper'));
      setIsProjectHovered(isProject);

      const isInteractive = Boolean(
        target.closest('button, a, input, textarea, .project-card, .skill-card, .v-nav-item, [role="button"]')
      );
      setIsHovered(isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      currentRingX += (targetX - currentRingX) * 0.16;
      currentRingY += (targetY - currentRingY) * 0.16;
      setRingPosition({ x: currentRingX, y: currentRingY });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot */}
      <div
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''} ${isProjectHovered ? 'project-hover' : ''}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />

      {/* Smooth trailing outer ring */}
      <div
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${isProjectHovered ? 'project-hover' : ''}`}
        style={{
          transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`
        }}
      >
        {isProjectHovered && (
          <span className="cursor-project-label">VIEW</span>
        )}
      </div>
    </>
  );
}
