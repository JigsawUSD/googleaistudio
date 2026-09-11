import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
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
    // Global click handler for anchor links with offset compensation for the fixed header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (href === '#' || href === '#top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetEl = document.querySelector<HTMLElement>(href);
          if (targetEl) {
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
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
