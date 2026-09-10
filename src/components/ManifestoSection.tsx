import React from 'react';
import { motion } from 'motion/react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-28 md:py-40 bg-[#fff8f7] overflow-hidden">
      {/* Subtle radial ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(148,34,37,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#942225] font-semibold uppercase tracking-[0.3em] text-xs block mb-6"
          >
            O Manifesto Di Napoli
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl md:text-6xl text-[#251918] leading-[1.2] mb-10"
          >
            Nós não servimos <span className="italic text-[#942225] font-normal">apenas</span> café.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[2px] bg-[#942225]/30 mx-auto mb-10 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-[#584140] text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto font-light"
          >
            Na Di Napoli, o tempo desacelera. Cada colherada do nosso sorvete artesanal e cada aroma do nosso café espresso é um convite para o agora, celebrando a arte de viver com quem amamos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 text-[#251918]/70 text-xs uppercase tracking-widest font-semibold"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#942225]" /> Ingredientes DOP
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#942225]" /> Fermentação Natural
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#942225]" /> Lote Limitado
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
