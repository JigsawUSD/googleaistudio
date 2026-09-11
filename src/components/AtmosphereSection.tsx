import React from 'react';
import { motion } from 'motion/react';
import { GoogleIcon } from './ui/GoogleIcon';
import { getAssetUrl } from '../utils/asset';

export const AtmosphereSection: React.FC = () => {
  const features = [
    {
      icon: <GoogleIcon name="storefront" filled weight={500} size={22} className="text-[#ffdad7]" />,
      title: 'Arquitetura Contemporânea',
      description:
        'Tijolos aparentes, madeira natural e um design inspirado nas tradicionais cafeterias europeias criam um ambiente acolhedor e cheio de personalidade.',
    },
    {
      icon: <GoogleIcon name="local_cafe" filled weight={500} size={22} className="text-[#ffdad7]" />,
      title: 'Ambiente Aconchegante',
      description:
        'Um espaço confortável para desacelerar, conversar, trabalhar ou apreciar um café especial em qualquer momento do dia.',
    },
    {
      icon: <GoogleIcon name="wb_sunny" filled weight={500} size={22} className="text-[#ffdad7]" />,
      title: 'Luz Natural & Vegetação',
      description:
        'Grandes aberturas e áreas verdes integram natureza e arquitetura, proporcionando uma experiência leve e agradável.',
    },
    {
      icon: <GoogleIcon name="auto_awesome" filled weight={500} size={22} className="text-[#ffdad7]" />,
      title: 'Experiência Di Napoli',
      description:
        'Cada detalhe da decoração foi pensado para unir conforto, bom gosto e hospitalidade, tornando cada visita memorável.',
    },
  ];

  return (
    <section id="experiencia" className="relative bg-[#251918] text-white py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Sticky Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={getAssetUrl('avif/parteinterna.avif')}
                alt="Ambiente interno Di Napoli"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#251918] via-transparent to-transparent opacity-80" />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-8 left-8 right-8 bg-[#181010]/90 p-6 rounded-2xl border border-white/15 shadow-xl"
              >
                <span className="text-[#ffdad7] text-xs font-mono uppercase tracking-widest block mb-1">
                  Arquitetura & Conforto
                </span>
                <h4 className="font-serif text-2xl font-bold">Inspirado nos Caffe de Milão</h4>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature List */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#ffdad7] font-semibold uppercase tracking-[0.3em] text-xs block mb-3"
            >
              Nossa Atmosfera
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8"
            >
              Aconchego em <br />
              <span className="italic text-[#ffdad7]">cada detalhe.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-white/80 text-lg leading-relaxed mb-12 font-light"
            >
              Materiais nobres como madeira de demolição, couro legítimo e vegetação nativa.
              Criamos o refúgio perfeito para suas conversas mais importantes ou momentos de quietude.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors hover:-translate-y-1 duration-300 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-[#942225] flex items-center justify-center mb-4 shadow-md">
                    {feat.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="font-sans text-white/70 text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
