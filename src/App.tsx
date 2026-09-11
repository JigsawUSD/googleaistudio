import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { CuratorshipSection } from './components/CuratorshipSection';
import { TimelineSection } from './components/TimelineSection';
import { MenuSection } from './components/MenuSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationsSection } from './components/LocationsSection';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Lazy-load PDF modal so heavy pdfjs-dist does not block initial load
const FullMenuPdfModal = lazy(() =>
  import('./components/FullMenuPdfModal').then((mod) => ({
    default: mod.FullMenuPdfModal,
  }))
);

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [preselectedStoreId, setPreselectedStoreId] = useState<string | undefined>(undefined);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
  }, []);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      const isTouch =
        typeof window !== 'undefined' &&
        (window.matchMedia?.('(pointer: coarse)')?.matches || 'ontouchstart' in window);

      if (!isTouch) {
        lenis = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        (window as any).lenis = lenis;

        const raf = (time: number) => {
          if (lenis && !document.hidden) {
            lenis.raf(time);
          }
          rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);
      }
    } catch (e) {
      console.warn('Lenis smooth scroll disabled:', e);
    }

    // Global click handler for anchor links in navbar, footer, etc.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (href === '#' || href === '#top') {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          const targetEl = document.querySelector<HTMLElement>(href);
          if (targetEl) {
            if (lenis) {
              lenis.scrollTo(targetEl, {
                offset: -80,
                duration: 1.2,
              });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      if (lenis) {
        lenis.destroy();
        delete (window as any).lenis;
      }
    };
  }, []);

  const handleOpenReservation = (storeId?: string) => {
    setPreselectedStoreId(storeId);
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#251918] flex flex-col font-sans selection:bg-[#942225] selection:text-white">
      {/* Initial Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Header */}
      <Header
        onOpenReservation={() => handleOpenReservation()}
        onOpenFullMenu={() => setIsFullMenuOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onOpenFullMenu={() => setIsFullMenuOpen(true)}
          isLoaded={isPreloaderComplete}
        />
        <ManifestoSection />
        <CuratorshipSection />
        <TimelineSection />
        <MenuSection onOpenFullMenu={() => setIsFullMenuOpen(true)} />
        <AtmosphereSection />
        <ReviewsSection />
        <LocationsSection
          onOpenReservationWithStore={(storeId) => handleOpenReservation(storeId)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenFullMenu={() => setIsFullMenuOpen(true)} />

      {/* Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        preselectedStoreId={preselectedStoreId}
      />

      {isFullMenuOpen && (
        <Suspense fallback={null}>
          <FullMenuPdfModal
            isOpen={isFullMenuOpen}
            onClose={() => setIsFullMenuOpen(false)}
          />
        </Suspense>
      )}

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
