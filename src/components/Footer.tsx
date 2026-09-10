import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, CheckCircle2, BookOpen, Instagram, Facebook } from 'lucide-react';
import { IFoodIcon } from './IFoodIcon';

interface FooterProps {
  onOpenFullMenu?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFullMenu }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-[#8c716f]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="#" className="font-serif text-4xl text-[#942225] font-bold tracking-tight">
              Di Napoli
            </a>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#251918]/60 font-bold">
              <span className="w-6 h-[1.5px] bg-[#942225]" />
              Est. 1987 Heritage
            </div>
            <p className="text-[#584140] text-sm leading-relaxed max-w-sm">
              Redefinindo a experiência do sorvete artesanal e café através da excelência sensorial. Servido com paixão desde 1987.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/dinapoli.sorveteria/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Di Napoli"
                className="w-10 h-10 rounded-full bg-[#fff0ef] border border-[#942225]/20 text-[#942225] hover:bg-[#942225] hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/dinapoli.sorveteriaecafeteria/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Di Napoli"
                className="w-10 h-10 rounded-full bg-[#fff0ef] border border-[#942225]/20 text-[#942225] hover:bg-[#942225] hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://ifood.com.br"
                target="_blank"
                rel="noreferrer"
                aria-label="iFood Di Napoli"
                className="w-10 h-10 rounded-full bg-[#fff0ef] border border-[#942225]/20 text-[#942225] hover:bg-[#942225] hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-sm"
              >
                <IFoodIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-[#251918]/40">
                Navegação
              </h4>
              <ul className="space-y-3 text-xs font-semibold uppercase tracking-wider text-[#251918]">
                <li>
                  <a href="#manifesto" className="hover:text-[#942225] transition-colors">
                    O Manifesto
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#942225] transition-colors">
                    Nosso Menu
                  </a>
                </li>
                {onOpenFullMenu && (
                  <li>
                    <button
                      onClick={onOpenFullMenu}
                      className="text-[#942225] hover:text-[#78181b] transition-colors font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Cardápio PDF</span>
                    </button>
                  </li>
                )}
                <li>
                  <a href="#historia" className="hover:text-[#942225] transition-colors">
                    Nossa História
                  </a>
                </li>
                <li>
                  <a href="#unidades" className="hover:text-[#942225] transition-colors">
                    Localização (Leme)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-[#251918]/40">
                Presença Digital
              </h4>
              <ul className="space-y-4 text-xs font-semibold uppercase tracking-wider text-[#251918]">
                <li>
                  <a href="https://www.instagram.com/dinapoli.sorveteria/" target="_blank" rel="noreferrer" className="hover:text-[#942225] transition-colors flex items-center gap-2 group">
                    <span className="w-7 h-7 rounded-full bg-[#fff0ef] group-hover:bg-[#942225] text-[#942225] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Instagram className="w-3.5 h-3.5" />
                    </span>
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3 text-[#942225] ml-auto" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/dinapoli.sorveteriaecafeteria/" target="_blank" rel="noreferrer" className="hover:text-[#942225] transition-colors flex items-center gap-2 group">
                    <span className="w-7 h-7 rounded-full bg-[#fff0ef] group-hover:bg-[#942225] text-[#942225] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Facebook className="w-3.5 h-3.5" />
                    </span>
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3 h-3 text-[#942225] ml-auto" />
                  </a>
                </li>
                <li>
                  <a href="https://ifood.com.br" target="_blank" rel="noreferrer" className="hover:text-[#942225] transition-colors flex items-center gap-2 group">
                    <span className="w-7 h-7 rounded-full bg-[#fff0ef] group-hover:bg-[#942225] text-[#942225] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <IFoodIcon className="w-3.5 h-3.5" />
                    </span>
                    <span>iFood</span>
                    <ArrowUpRight className="w-3 h-3 text-[#942225] ml-auto" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-[#251918]/40">
                The Dispatch
              </h4>
              <p className="text-xs text-[#584140] mb-4">
                Receba novidades e convites para eventos de degustação exclusiva.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cadastrado com sucesso!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail principal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#fff8f7] border border-[#8c716f]/20 rounded-full py-3 pl-4 pr-10 text-xs focus:outline-none focus:border-[#942225] text-[#251918]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#942225] hover:bg-[#78181b] text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 border-t border-[#8c716f]/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#584140]">
          <p>© 2026 Di Napoli Heritage Sorveteria & Cafeteria. Todos os direitos reservados.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#942225] transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-[#942225] transition-colors">
              Privacidade
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#942225] font-bold hover:underline cursor-pointer"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
