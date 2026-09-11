import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleIcon } from './ui/GoogleIcon';
import { TypeAnimation } from 'react-type-animation';
import { AmbientParticles } from './ui/AmbientParticles';
import { MagneticButton } from './ui/MagneticButton';
import { getAssetUrl } from '../utils/asset';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onOpenFullMenu?: () => void;
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onOpenFullMenu,
  isLoaded = true,
}) => {
  const [typingStep, setTypingStep] = useState(0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToLocations = () => {
    const el = document.getElementById('unidades');
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[100svh] min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20 md:py-0">
      {/* Background Particles */}
      <AmbientParticles count={8} />

      {/* Background Image with Dark Gradient Overlay - Local asset, zero external imgix requests */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={getAssetUrl('avif/fotodinapoli.avif')}
          alt="Di Napoli Sorveteria & Cafeteria"
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            const fallback = getAssetUrl('fotodinapoli.avif');
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
          className="w-full h-full object-cover opacity-35 sm:opacity-45 scale-105 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#251918] via-black/75 to-black/85" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center w-full">
        {/* Subtitle Badge - Proportional & Mobile-First */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 sm:mb-6 max-w-full"
        >
          <div className="inline-flex items-center justify-center max-w-full text-white/85 font-mono uppercase tracking-[0.14em] xs:tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.35em] text-[9px] xs:text-[10px] sm:text-xs bg-white/10 backdrop-blur-md px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2 rounded-full border border-white/15 shadow-inner leading-none text-center">
            <span className="whitespace-nowrap">Um legado de família</span>
            <span className="mx-1.5 xs:mx-2 text-white/40 select-none">•</span>
            <span className="whitespace-nowrap">Desde 1987</span>
          </div>
        </motion.div>

        {/* Display Title - Mobile-First Typography with Structured Natural Wrapping */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="font-serif text-white text-[2rem] xs:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.12] sm:leading-[1.08] md:leading-[1.04] mb-5 sm:mb-8 max-w-4xl mx-auto"
        >
          {!isLoaded ? (
            <span className="opacity-0">
              <span className="block sm:inline">Fazendo história</span>{' '}
              <span className="block sm:inline sm:ml-2">desde 1987.</span>
            </span>
          ) : (
            <>
              {typingStep === 0 && (
                <span className="block sm:inline">
                  <TypeAnimation
                    sequence={['Fazendo ', () => setTypingStep(1)]}
                    wrapper="span"
                    speed={40}
                    repeat={0}
                    cursor={true}
                  />
                </span>
              )}

              {typingStep === 1 && (
                <span className="block sm:inline">
                  <span>Fazendo </span>
                  <TypeAnimation
                    sequence={['história', () => setTypingStep(2)]}
                    wrapper="span"
                    speed={40}
                    repeat={0}
                    cursor={true}
                    className="italic text-[#E5C48A] font-normal"
                  />
                </span>
              )}

              {typingStep >= 2 && (
                <>
                  <span className="block sm:inline">
                    <span>Fazendo </span>
                    <span className="italic text-[#E5C48A] font-normal">
                      história
                    </span>
                  </span>{' '}
                  <span className="block sm:inline sm:ml-2">
                    <TypeAnimation
                      sequence={['desde 1987.']}
                      wrapper="span"
                      speed={40}
                      repeat={0}
                      cursor={true}
                    />
                  </span>
                </>
              )}
            </>
          )}
        </motion.h1>

        {/* Paragraph Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/85 text-sm xs:text-base md:text-xl font-light max-w-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2 sm:px-0"
        >
          Onde o sorvete artesanal e a cultura dos cafés especiais se encontram em perfeita sintonia.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-5 px-2 sm:px-0"
        >
          <MagneticButton
            onClick={onOpenReservation}
            className="w-full sm:w-auto bg-[#942225] hover:bg-[#b53a3a] text-white px-6 xs:px-7 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all shadow-xl shadow-[#942225]/40 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <GoogleIcon name="calendar_month" filled size={18} />
            <span>Reservar Mesa</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => {
              if (onOpenFullMenu) {
                onOpenFullMenu();
              } else {
                scrollToMenu();
              }
            }}
            className="w-full sm:w-auto border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 xs:px-7 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <GoogleIcon name="menu_book" filled size={18} className="text-[#ffdad7]" />
            <span>Cardápio PDF Completo</span>
          </MagneticButton>

          <MagneticButton
            onClick={scrollToLocations}
            className="w-full sm:w-auto border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 xs:px-7 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <GoogleIcon name="location_on" filled size={18} />
            <span>Como Chegar</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer group z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Descubra</span>
        <GoogleIcon name="keyboard_arrow_down" size={24} className="animate-bounce group-hover:text-[#ffdad7]" />
      </motion.button>
    </section>
  );
};
