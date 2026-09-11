import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleIcon } from './ui/GoogleIcon';
import { TypeAnimation } from 'react-type-animation';
import { AmbientParticles } from './ui/AmbientParticles';
import { MagneticButton } from './ui/MagneticButton';

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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Particles */}
      <AmbientParticles count={8} />

      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://6a694d871a1cec82568d0cd4.imgix.net/sandbox/654224559_18071732087228555_2355983258470594957_n.avif"
          alt="Di Napoli Hero"
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-45 scale-105 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#251918] via-black/70 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <span className="text-white/80 font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 shadow-inner">
            Um legado de família • Desde 1987
          </span>
        </motion.div>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
        >
          {!isLoaded ? (
            <span className="opacity-0">Fazendo história desde 1987.</span>
          ) : (
            <>
              {typingStep === 0 && (
                <TypeAnimation
                  sequence={['Fazendo ', () => setTypingStep(1)]}
                  wrapper="span"
                  speed={40}
                  repeat={0}
                  cursor={true}
                />
              )}

              {typingStep === 1 && (
                <>
                  <span>Fazendo </span>
                  <TypeAnimation
                    sequence={['história', () => setTypingStep(2)]}
                    wrapper="span"
                    speed={40}
                    repeat={0}
                    cursor={true}
                    className="italic text-[#E5C48A] font-normal"
                  />
                </>
              )}

              {typingStep >= 2 && (
                <>
                  <span>Fazendo </span>
                  <span className="italic text-[#E5C48A] font-normal">
                    história
                  </span>{' '}
                  <TypeAnimation
                    sequence={['desde 1987.']}
                    wrapper="span"
                    speed={40}
                    repeat={0}
                    cursor={true}
                  />
                </>
              )}
            </>
          )}
        </motion.h1>

        {/* Paragraph Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/85 text-base md:text-xl font-light max-w-2xl mb-12 leading-relaxed"
        >
          Onde o sorvete artesanal e a cultura dos cafés especiais se encontram em perfeita sintonia.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <MagneticButton
            onClick={onOpenReservation}
            className="w-full sm:w-auto bg-[#942225] hover:bg-[#b53a3a] text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#942225]/40 flex items-center justify-center gap-2.5 cursor-pointer"
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
            className="w-full sm:w-auto border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <GoogleIcon name="menu_book" filled size={18} className="text-[#ffdad7]" />
            <span>Cardápio PDF Completo</span>
          </MagneticButton>

          <MagneticButton
            onClick={scrollToLocations}
            className="w-full sm:w-auto border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Descubra</span>
        <GoogleIcon name="keyboard_arrow_down" size={24} className="animate-bounce group-hover:text-[#ffdad7]" />
      </motion.button>
    </section>
  );
};
