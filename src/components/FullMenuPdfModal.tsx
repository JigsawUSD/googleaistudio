import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleIcon } from './ui/GoogleIcon';
import * as pdfjsLib from 'pdfjs-dist';
import { getAssetUrl } from '../utils/asset';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface FullMenuPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullMenuPdfModal: React.FC<FullMenuPdfModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageCanvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadPdf(getAssetUrl('previafinal.pdf'));
    } else {
      document.body.style.overflow = '';
      pdfDocRef.current = null;
      setNumPages(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadPdf = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const loadingTask = pdfjsLib.getDocument({
        url,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@' + pdfjsLib.version + '/cmaps/',
        cMapPacked: true,
      });
      const pdf = await loadingTask.promise;
      pdfDocRef.current = pdf;
      setNumPages(pdf.numPages);
      setLoading(false);
    } catch (err) {
      console.error('Error loading PDF:', err);
      const fallbackUrl = getAssetUrl('cardapiofinal.pdf');
      if (url !== fallbackUrl) {
        loadPdf(fallbackUrl);
      } else {
        setError('Não foi possível carregar o arquivo PDF.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!loading && pdfDocRef.current && numPages > 0) {
      renderAllPages();
    }
  }, [loading, numPages]);

  const renderAllPages = async () => {
    const pdf = pdfDocRef.current;
    if (!pdf) return;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const canvas = pageCanvasRefs.current[pageNum];
        if (!canvas) continue;

        const context = canvas.getContext('2d');
        if (!context) continue;

        const desiredWidth = Math.min(window.innerWidth - 48, 620);
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = (desiredWidth / unscaledViewport.width) * (window.devicePixelRatio || 1.5);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${desiredWidth}px`;
        canvas.style.height = `${(viewport.height / viewport.width) * desiredWidth}px`;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        await page.render(renderContext).promise;
      } catch (e) {
        console.error(`Error rendering page ${pageNum}`, e);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cardápio Di Napoli',
          text: 'Confira o cardápio oficial da Di Napoli Sorveteria & Cafeteria!',
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do cardápio copiado!');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-hidden">
        {/* Main Modal Overlay Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-2xl h-[90vh] bg-white text-gray-900 rounded-[28px] md:rounded-[36px] shadow-2xl overflow-hidden flex flex-col border border-black/10"
        >
          {/* Top Embedded Card Header (Exact Linktree Style) */}
          <div className="pt-6 pb-4 px-6 text-center border-b border-gray-100 bg-white shrink-0 relative">
            <h3 className="font-serif font-bold text-xl md:text-2xl text-gray-900 tracking-tight">
              Cardápio
            </h3>
            <div className="flex items-center justify-center gap-1.5 text-gray-500 text-xs font-medium mt-1">
              <GoogleIcon name="description" filled size={16} className="text-gray-400" />
              <span>PDF · Documento Oficial</span>
            </div>
            <p className="text-xs font-semibold text-[#942225] mt-2 tracking-wide uppercase">
              Faça seu pedido no balcão.
            </p>
          </div>

          {/* Scrollable Document Area */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f7f5f3] space-y-6 flex flex-col items-center"
          >
            {loading && (
              <div className="my-auto py-20 flex flex-col items-center justify-center text-gray-500 gap-3">
                <GoogleIcon name="progress_activity" size={32} className="text-[#942225] animate-spin" />
                <span className="text-sm font-medium">Carregando cardápio...</span>
              </div>
            )}

            {error && (
              <div className="my-auto py-16 text-center text-gray-600 px-6">
                <p className="text-sm font-medium mb-4">{error}</p>
                <a
                  href={getAssetUrl('previafinal.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#942225] text-white text-xs font-bold shadow-md hover:bg-[#78181b] transition-all"
                >
                  Abrir PDF diretamente
                </a>
              </div>
            )}

            {!loading && !error && numPages > 0 && (
              <div className="w-full space-y-8 flex flex-col items-center">
                {Array.from({ length: numPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <div
                      key={pageNum}
                      className="flex flex-col items-center w-full max-w-[620px]"
                    >
                      {/* Page Counter Badge */}
                      <div className="mb-3 text-xs font-bold text-gray-600 bg-white px-4 py-1 rounded-full shadow-sm border border-gray-200">
                        {pageNum} de {numPages}
                      </div>

                      {/* Canvas Container Card */}
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden w-full flex justify-center p-1 sm:p-2">
                        <canvas
                          ref={(el) => {
                            pageCanvasRefs.current[pageNum] = el;
                          }}
                          className="max-w-full h-auto rounded-lg shadow-inner block"
                        />
                      </div>

                      <p className="text-[11px] font-medium text-gray-400 mt-2">
                        Faça seu pedido no balcão.
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Floating Action Bar */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3 shrink-0">
            <a
              href={getAssetUrl('previafinal.pdf')}
              download="cardapio_dinapoli.pdf"
              className="flex-1 max-w-[200px] sm:max-w-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#251918] hover:bg-[#942225] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <GoogleIcon name="download" filled size={18} />
              <span>Baixar Cardápio</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Compartilhar"
              >
                <GoogleIcon name="share" filled size={18} />
              </button>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#251918] hover:bg-[#942225] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                title="Fechar"
              >
                <GoogleIcon name="close" size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
