import React from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  id?: string;
  enableGpuHover?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  id,
  enableGpuHover = true,
}) => {
  return (
    <div
      id={id}
      className={`relative rounded-3xl ${enableGpuHover ? 'card-hardware-accelerated gpu-card' : ''} ${className}`}
    >
      {children}
    </div>
  );
};


