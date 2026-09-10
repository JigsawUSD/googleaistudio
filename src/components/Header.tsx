import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, BookOpen, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IFoodIcon } from './IFoodIcon';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenFullMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  onOpenFullMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Manifesto', href: '#manifesto' },
    { name: 'Legado', href: '#historia' },
    { name: 'Cardápio', href: '#menu' },
    { name: 'Espaço', href: '#experiencia' },
    { name: 'Localização', href: '#unidades' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#fff8f7]/90 backdrop-blur-md py-4 border-b border-[#8c716f]/10 shadow-sm'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo */}
          <a
            href="#"
            className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-[#942225]' : 'text-white'
            }`}
          >
            Di Napoli
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-all relative group ${
                  isScrolled
                    ? 'text-[#251918] hover:text-[#942225]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#942225]' : 'bg-white'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Cardápio PDF Button */}
            {onOpenFullMenu && (
              <button
                onClick={onOpenFullMenu}
                className={`hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all transform hover:scale-105 border cursor-pointer ${
                  isScrolled
                    ? 'bg-[#251918] text-white border-[#251918] hover:bg-[#942225] hover:border-[#942225]'
                    : 'bg-white/10 text-white border-white/25 hover:bg-white/20 backdrop-blur-md'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#ffdad7]" />
                <span>Cardápio PDF</span>
              </button>
            )}

            {/* Reserve Table Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:flex items-center gap-2 bg-[#942225] hover:bg-[#78181b] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-md shadow-[#942225]/20 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar Mesa</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full ${
                isScrolled ? 'text-[#251918]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#fff8f7] pt-24 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-[#251918] hover:text-[#942225] transition-colors py-2 border-b border-[#8c716f]/10"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              {onOpenFullMenu && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFullMenu();
                  }}
                  className="w-full bg-[#251918] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#ffdad7]" />
                  Cardápio PDF Completo
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full bg-[#942225] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reservar Mesa
              </button>

              {/* Social Media Links */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#8c716f]/10">
                <a
                  href="https://www.instagram.com/dinapoli.sorveteria/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#ffe9e7] text-[#942225] flex items-center justify-center hover:bg-[#942225] hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/dinapoli.sorveteriaecafeteria/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#ffe9e7] text-[#942225] flex items-center justify-center hover:bg-[#942225] hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://ifood.com.br"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="iFood"
                  className="w-10 h-10 rounded-full bg-[#ffe9e7] text-[#942225] flex items-center justify-center hover:bg-[#942225] hover:text-white transition-colors"
                >
                  <IFoodIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
