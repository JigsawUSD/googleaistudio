import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 2800; // Smooth 2.8s loading experience

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      
      // Eased progress calculation for natural velocity
      const eased = Math.floor(rawProgress);
      setProgress(eased);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) onComplete();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.95, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#fff8f7] flex items-center justify-center pointer-events-auto shadow-2xl overflow-hidden"
        >
          <motion.div
            exit={{
              y: -50,
              opacity: 0,
              transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] },
            }}
            className="text-center overflow-hidden px-6 max-w-lg w-full flex flex-col items-center justify-center"
          >
            {/* Subtitle */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="text-[#942225] font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] block mb-3 font-semibold"
            >
              Tradizione Italiana • 1987
            </motion.span>

            {/* Brand Title */}
            <div className="flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif text-5xl md:text-7xl font-bold text-[#942225] tracking-tight leading-none"
              >
                Di Napoli
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif italic text-2xl md:text-3xl text-[#942225]/85 font-medium tracking-wider mt-2"
              >
                Sabores
              </motion.p>
            </div>

            {/* Expanding divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-20 h-[2px] bg-[#942225]/30 mx-auto mt-6 origin-center"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="font-sans text-[#584140] text-[11px] md:text-xs uppercase tracking-[0.3em] mt-4 font-light"
            >
              Sorveteria & Cafeteria Heritage
            </motion.p>

            {/* Progress percentage & progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-col items-center gap-2.5 w-full max-w-[220px]"
            >
              <div className="w-full h-[2px] bg-[#942225]/15 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#942225] rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-[#942225] tracking-widest font-semibold">
                {progress}%
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

