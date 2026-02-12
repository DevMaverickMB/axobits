import React, { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
// import NoiseBackground from './NoiseBackground';
import CursorGlow from './CursorGlow';
import DemoModal from './DemoModal';
import { ModalProvider } from '../context/ModalContext';
import { SmoothScrollProvider, useSmoothScroll } from '../context/SmoothScrollContext';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { scrollTo, lenis } = useSmoothScroll();
  const timeoutRefs = useRef<number[]>([]);

  // Use refs for scrollTo/lenis so useLayoutEffect doesn't depend on their identity.
  // scrollTo changes once when Lenis initializes (null→instance); without refs that
  // extra identity change would re-run useLayoutEffect, killing all ScrollTriggers and
  // resetting __layoutReadyFired at an unexpected time during the initial load sequence.
  const scrollToRef = useRef(scrollTo);
  const lenisRef = useRef(lenis);
  scrollToRef.current = scrollTo;
  lenisRef.current = lenis;

  // CRITICAL: Handle layoutReady dispatch coordination
  // Simplified logic: Always check __lenisReady flag instead of tracking first mount vs navigation.
  // This is Strict Mode compatible since we don't rely on refs that can get stale.
  useEffect(() => {
    // Clear any pending timeouts from previous effect run (Strict Mode or navigation)
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    const dispatchLayoutReady = () => {
      // Mark that layoutReady has fired
      (window as any).__layoutReadyFired = true;

      console.log('[Layout] layoutReady event dispatched');
      window.dispatchEvent(new CustomEvent('layoutReady'));

      // Immediate refresh so newly-created ScrollTriggers get correct positions
      ScrollTrigger.refresh(true);

      // Staggered refresh strategy to handle components setting up at different times
      timeoutRefs.current.push(
        window.setTimeout(() => {
          console.log('[Layout] ScrollTrigger.refresh() at 300ms');
          ScrollTrigger.refresh(true);
        }, 300),
        window.setTimeout(() => {
          console.log('[Layout] ScrollTrigger.refresh() at 600ms');
          ScrollTrigger.refresh(true);
        }, 600)
      );
    };

    // Check if Lenis is ready
    if ((window as any).__lenisReady) {
      // Lenis is already ready, dispatch after a short delay for DOM to settle
      console.log('[Layout] Lenis ready, scheduling layoutReady');
      const timeout = window.setTimeout(dispatchLayoutReady, 100);
      timeoutRefs.current.push(timeout);
    } else {
      // Wait for Lenis to be ready
      console.log('[Layout] Waiting for lenisReady event');
      const handleLenisReady = () => {
        console.log('[Layout] lenisReady received');
        const timeout = window.setTimeout(dispatchLayoutReady, 100);
        timeoutRefs.current.push(timeout);
      };

      window.addEventListener('lenisReady', handleLenisReady, { once: true });

      return () => {
        window.removeEventListener('lenisReady', handleLenisReady);
        timeoutRefs.current.forEach(clearTimeout);
        timeoutRefs.current = [];
      };
    }

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [location.pathname]);

  useLayoutEffect(() => {
    // CRITICAL: Reset layoutReadyFired flag FIRST, before child useEffects run.
    // useLayoutEffect runs before useEffect, so this ensures components don't see
    // a stale 'true' value from the previous route.
    (window as any).__layoutReadyFired = false;

    // CRITICAL: Kill all ScrollTrigger instances from the previous route.
    // Components manage their own cleanup via ctx.revert(), but we want to ensure
    // any orphaned triggers are cleaned up before the new page renders.
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // React Router doesn't reset scroll on navigation.
    // With smooth scrolling (Lenis), this can leave you "past" the new page's content,
    // making the route look blank until a hard refresh resets scroll.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    scrollToRef.current(0, { duration: 0, immediate: true });

    // Recalculate Lenis dimensions after pin spacers are removed
    if (lenisRef.current) {
      lenisRef.current.resize();
    }

    // Avoid stale trigger state (especially after pinned sections).
    ScrollTrigger.clearScrollMemory();
  }, [location.pathname]);

  // Fallback Intersection Observer for .reveal elements (non-GSAP animations)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Set up observer immediately
    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
      });
    };

    // Observe immediately
    observeElements();

    // Also observe after a delay to catch any late-mounting components
    const delayedObserve = setTimeout(observeElements, 200);

    return () => {
      clearTimeout(delayedObserve);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="antialiased selection:bg-brand-500 selection:text-white min-h-screen bg-dark-bg text-white">
      {/* <NoiseBackground /> */}
      <CursorGlow />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <DemoModal />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ModalProvider>
      <SmoothScrollProvider>
        <LayoutContent>{children}</LayoutContent>
      </SmoothScrollProvider>
    </ModalProvider>
  );
};

export default Layout;
