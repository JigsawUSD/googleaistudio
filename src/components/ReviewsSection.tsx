import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Send, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data/mockData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // Carousel index & visible items configuration
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Monitora tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setItemsPerView(1); // 1 card em telas pequenas (mobile)
      } else if (w < 1024) {
        setItemsPerView(2); // 2 cards em tablets
      } else {
        setItemsPerView(3); // 3 cards em desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Garante que o index não ultrapasse o max ao redimensionar
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Suporte a swipe de toque no celular
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // sensibilidade em pixels
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !author) return;

    const newReview: Review = {
      id: `r-${Date.now()}`,
      author,
      role: 'Avaliação no Site',
      rating,
      comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      date: 'Hoje',
    };

    setReviews([newReview, ...reviews]);
    setComment('');
    setAuthor('');
    setSubmitted(true);
    setCurrentIndex(0);
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmitted(false);
    }, 1800);
  };

  // Cálculo da porcentagem de deslocamento por card:
  // Como cada card tem largura de (100 / itemsPerView)% em relação à janela visível,
  // deslocar 1 card = deslocar (100 / itemsPerView)%.
  const translateXPercent = currentIndex * (100 / itemsPerView);

  return (
    <section id="avaliacoes" className="py-20 bg-[#eae7e4] relative overflow-hidden">
      {/* Luzes decorativas de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#942225]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#251918]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#942225] font-semibold uppercase tracking-[0.3em] text-xs block mb-2">
              Depoimentos Google & Locais
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#251918] mb-4">
              A voz dos nossos amigos.
            </h2>

            {/* Selo de Avaliação Google */}
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#8c716f]/15 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="font-serif font-bold text-lg text-[#251918]">
                  4,7
                </span>
                <div className="flex items-center text-amber-500 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <span className="h-3.5 w-px bg-[#8c716f]/20" />
              <span className="text-xs text-[#584140] font-medium">
                <strong className="text-[#251918] font-bold">509</strong> avaliações no Google
              </span>
            </div>
          </div>

          {/* Controles de Navegação (Setas) e Link do Google */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full border border-[#8c716f]/20 shadow-sm">
              <button
                onClick={prevSlide}
                aria-label="Depoimento anterior"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#251918] hover:bg-[#942225] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer border border-[#8c716f]/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-2 text-xs font-mono font-bold text-[#584140] select-none">
                {currentIndex + 1} / {maxIndex + 1}
              </div>

              <button
                onClick={nextSlide}
                aria-label="Próximo depoimento"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#251918] hover:bg-[#942225] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer border border-[#8c716f]/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href="https://maps.app.goo.gl/F28p2dYQ4b1F4LcaA"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#251918] hover:bg-[#942225] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffdad7]" />
              <span>Avaliar no Google</span>
            </a>
          </div>
        </div>

        {/* CONTAINER DO CARROSSEL */}
        <div
          className="relative w-full overflow-hidden rounded-3xl py-2 select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translateXPercent}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  width: `${100 / itemsPerView}%`,
                  minWidth: `${100 / itemsPerView}%`,
                }}
                className="px-2 sm:px-3 shrink-0 flex"
              >
                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#8c716f]/15 card-hardware-accelerated gpu-card min-h-[290px] h-full">
                  <div>
                    {/* Estrelas e Ícone de Aspas */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-500 gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <Quote className="w-7 h-7 text-[#942225]/20" />
                    </div>

                    {/* Texto do Depoimento */}
                    <p className="font-sans text-[#584140] text-sm sm:text-base leading-relaxed mb-6 font-light italic">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Autor e Data */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#8c716f]/10 mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-11 h-11 rounded-full object-cover border border-[#942225]/20 shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#251918] leading-tight truncate">
                          {review.author}
                        </h4>
                        <p className="text-[11px] text-[#584140]/80 truncate">{review.role}</p>
                      </div>
                    </div>
                    {review.date && (
                      <span className="text-[10px] text-[#8c716f] font-medium shrink-0">
                        {review.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Página (Dots) e Link de Formulário */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Ir para página ${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-[#942225]'
                    : 'w-2.5 bg-[#8c716f]/30 hover:bg-[#8c716f]/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="text-xs text-[#8c716f] hover:text-[#942225] font-medium underline underline-offset-4 cursor-pointer transition-colors"
          >
            Deseja deixar uma avaliação direta no site? Clique aqui.
          </button>
        </div>

        {/* Modal de Avaliação Direta */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-7 max-w-lg w-full shadow-2xl relative border border-[#8c716f]/20"
              >
                <h3 className="font-serif text-2xl text-[#251918] mb-1 font-bold">
                  Compartilhe sua Experiência
                </h3>
                <p className="text-sm text-[#584140] mb-5">
                  Sua opinião ajuda a manter viva a tradição da Di Napoli.
                </p>

                {submitted ? (
                  <div className="py-8 text-center text-green-700 font-semibold flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <span>Obrigado pelo seu carinho! Sua mensagem foi enviada.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#584140] mb-1">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Como gostaria de ser chamado(a)?"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#8c716f]/30 focus:border-[#942225] focus:ring-1 focus:ring-[#942225] outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#584140] mb-1">
                        Sua Avaliação
                      </label>
                      <div className="flex items-center gap-1 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#584140] mb-1">
                        Seu Depoimento
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Conte como foi sua visita à Di Napoli..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#8c716f]/30 focus:border-[#942225] focus:ring-1 focus:ring-[#942225] outline-none text-sm resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#8c716f]/10">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#584140] hover:bg-gray-100 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#942225] hover:bg-[#78181b] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publicar</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
