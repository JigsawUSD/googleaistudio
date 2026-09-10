import React from 'react';

export const IFoodIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Cloche / Food dome icon with tray and steam */}
    <path d="M12 4v2" />
    <path d="M4 18h16" />
    <path d="M4 18a8 8 0 0 1 16 0" />
    <path d="M3 21h18" />
  </svg>
);
