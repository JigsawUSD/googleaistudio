import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

export const CuratorshipSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Affogato Especial',
      subtitle: 'Novidade Exclusiva na Di Napoli',
      description:
        'A união perfeita entre o gelato artesanal cremoso e o café espresso 100% arábica extraído na hora. Uma experiência sensorial única inspirada nos clássicos italianos.',
      image: '/avif/affogato.avif',
      highlights: ['Espresso Extraído na Hora', 'Gelato Artesanal Cremoso', 'Lançamento Exclusivo'],
    },
    {
      title: 'Chocolate Quente Especial',
      subtitle: 'Com Marshmallows Tostados',
      description:
        'Cremoso chocolate quente artesanal preparado com cacau nobre e finalizado com marshmallows tostados na hora. Uma novidade especial irresistível na Di Napoli.',
      image: '/avif/chocolatequente.avif',
      highlights: ['Marshmallows Tostados na Hora', 'Chocolate Nobre Cremoso', 'Novidade Especial Di Napoli'],
    },
    {
      title: 'Cappuccino Cremoso',
      subtitle: 'A Combinação Perfeita de Espresso e Leite',
      description:
        'Nosso cappuccino artesanal preparado com café espresso selecionado e leite integral perfeitamente vaporizado até atingir uma microespuma aveludada e cremosa.',
      image: '/avif/capuccinocremoso.avif',
      highlights: ['Microespuma Aveludada', 'Espresso Selecionado', 'Preparo Artesanal'],
    },
    {
      title: 'Cacau Belga 70%',
      subtitle: 'Intensidade em Cada Colherada',
      description:
        'Chocolate Callebaut de origem sustentável temperado com precisão para atingir notas profundas de fruto do cacau torrado com raspas de nibs de cacau.',
      image:
        'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80',
      highlights: ['Cacau Sustentável', 'Sem Adição de Oleaginosas Baratas', 'Vegano/Lactose Free disponível'],
    },
  ];

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx);
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % pillars.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  return (
    <section className="bg-white py-24 md:py-36 border-t border-[#8c716f]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image Showcase */}
          <div className="lg:col-span-6 relative">
            <SpotlightCard enableGpuHover={false} className="shadow-2xl border border-[#8c716f]/15 group">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={pillars[activeTab].image}
                    alt={pillars[activeTab].title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover transform-gpu"
                  />
                </AnimatePresence>

                {/* Manual Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#251918]/80 hover:bg-[#942225] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#251918]/80 hover:bg-[#942225] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Badge overlay with synchronized content */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#181010]/95 text-white p-6 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2 text-[#ffdad7] text-xs uppercase font-semibold tracking-wider mb-1">
                    <Sparkles className="w-4 h-4 text-[#942225]" />
                    <span>{pillars[activeTab].subtitle}</span>
                  </div>
                  <h4 className="font-serif text-2xl font-bold">{pillars[activeTab].title}</h4>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Text Content & Tab Selectors */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#942225] font-semibold uppercase tracking-[0.3em] text-xs">
                A Curadoria de Ingredientes
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-[#251918] leading-tight mb-8">
              O Segredo <br />
              <span className="italic text-[#942225]">está na Origem.</span>
            </h2>

            {/* Interactive Pillar List */}
            <div className="flex flex-col gap-4 mb-8">
              {pillars.map((pillar, idx) => (
                <button
                  key={pillar.title}
                  onClick={() => handleSelectTab(idx)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 border flex flex-col gap-1 cursor-pointer relative overflow-hidden ${
                    activeTab === idx
                      ? 'bg-[#ffe9e7] border-[#942225]/30 shadow-md translate-x-2'
                      : 'bg-transparent border-transparent hover:bg-[#fff8f7] hover:border-[#8c716f]/10'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span
                      className={`font-serif text-lg font-bold ${
                        activeTab === idx ? 'text-[#942225]' : 'text-[#251918]'
                      }`}
                    >
                      {pillar.title}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === idx ? 'text-[#942225] translate-x-1' : 'text-[#584140]/40'
                      }`}
                    />
                  </div>
                  {activeTab === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-[#584140] text-sm leading-relaxed relative z-10"
                    >
                      <p className="mb-3">{pillar.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.highlights.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white text-[#942225] px-3 py-1 rounded-full shadow-xs border border-[#942225]/10"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#942225]" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Visual Indicators for manual navigation */}
            <div className="bg-[#fff8f7] p-4 rounded-2xl border border-[#8c716f]/15 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#584140]/80">Navegue pelas opções</span>
              {/* Dots for each slide */}
              <div className="flex items-center gap-2">
                {pillars.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectTab(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeTab === idx
                        ? 'w-8 bg-[#942225]'
                        : 'w-2.5 bg-[#8c716f]/30 hover:bg-[#942225]/50'
                    }`}
                    title={`Ir para o slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

