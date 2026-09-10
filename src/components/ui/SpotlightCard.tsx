import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(148, 34, 37, 0.12)',
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Directly mutate CSS variables on DOM node (zero React re-renders)
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--spotlight-color': spotlightColor } as React.CSSProperties}
      className={`relative overflow-hidden rounded-3xl transition-shadow duration-300 card-item ${className}`}
    >
      {/* Spotlight Overlay powered entirely by CSS Variables & GPU */}
      <div className="spotlight-overlay pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl" />
      {children}
    </div>
  );
};

