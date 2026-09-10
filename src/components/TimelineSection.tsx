import React from 'react';
import { motion } from 'motion/react';

export const TimelineSection: React.FC = () => {
  const events = [
    {
      year: '1987',
      title: 'A Fundação',
      description:
        'A primeira semente plantada pela Família Rocha Bersan em São Paulo, trazendo as clássicas máquinas de gelato vindas de Bolonha e o desejo de perpetuar a verdadeira trattoria doce.',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '1995',
      title: 'A União de Saberes',
      description:
        'A chegada da Família Marchi refinou nossas receitas. Incorporamos o microtorrefação de cafés especiais arábica, unindo o mestre gelatiere ao barista especializado.',
      image:
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '2012',
      title: 'A Seleção Sem Amassados',
      description:
        'Início do fornecimento direto com produtores italianos e brasileiros de agricultura familiar sustentável. Certificação de pistache DOP e grãos acentuados acima de 84 pontos.',
      image:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    },
    {
      year: '2024',
      title: 'O Conceito Heritage',
      description:
        'Aprimoramento da nossa casa em Leme, São Paulo, promovendo experiências sensoriais completas com espaço pet friendly, ambiente acolhedor e reservas exclusivas.',
      image:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="historia" className="bg-[#fff0ef] py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="text-[#942225] font-semibold uppercase tracking-[0.3em] text-xs block mb-3">
            O Legado Di Napoli
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#251918]">
            Nossa linha do tempo
          </h2>
          <div className="w-16 h-[2px] bg-[#942225]/30 mx-auto mt-6" />
        </div>

        {/* Timeline Events */}
        <div className="relative">
          {/* Vertical central line for desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#942225]/20" />

          <div className="flex flex-col gap-16 lg:gap-24">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              // index 0 (1st): isEven=true -> x: 120 (from right)
              // index 1 (2nd): isEven=false -> x: -120 (from left)
              // index 2 (3rd): isEven=true -> x: 120 (from right)
              // index 3 (4th): isEven=false -> x: -120 (from left)
              const imageFromRight = isEven;

              return (
                <div
                  key={event.year}
                  className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`w-full lg:w-[45%] text-center ${
                      isEven ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <span className="font-serif text-6xl md:text-7xl font-bold text-[#942225]/20 block mb-2">
                      {event.year}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#251918] mb-4">
                      {event.title}
                    </h3>
                    <p className="font-sans text-[#584140] text-base leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>

                  {/* Central Node Badge (Desktop) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="hidden lg:flex w-10 h-10 rounded-full bg-[#942225] text-white items-center justify-center shadow-lg border-4 border-[#fff0ef] z-10 font-bold text-xs"
                  >
                    •
                  </motion.div>

                  {/* Image Card Lightweight reveal */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="w-full lg:w-[45%] rounded-3xl overflow-hidden shadow-xl border border-[#8c716f]/15 group"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-64 md:h-80 object-cover transform-gpu group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
