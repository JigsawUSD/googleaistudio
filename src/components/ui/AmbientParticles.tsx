import React from 'react';
import { motion } from 'motion/react';

export const AmbientParticles: React.FC<{ count?: number }> = ({ count = 8 }) => {
  const particles = Array.from({ length: count });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        const size = Math.floor(Math.random() * 3) + 2;
        const left = `${(i * 12 + 7) % 100}%`;
        const top = `${(i * 17 + 10) % 100}%`;
        const duration = 8 + (i % 4) * 2;
        const delay = i * 0.5;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.35, 0],
              y: [-10, -50],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute rounded-full bg-[#942225]/30 ${
              i > 4 ? 'hidden sm:block' : ''
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left,
              top,
            }}
          />
        );
      })}
    </div>
  );
};
