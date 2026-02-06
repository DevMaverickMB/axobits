import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isReady: boolean;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReady: false,
  scrollTo: () => { },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const reqIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // CRITICAL: Dispatch lenisReady event after Lenis is connected to ScrollTrigger.
    // Layout.tsx listens for this on first mount to know when it's safe to dispatch layoutReady.
    // Use requestAnimationFrame to ensure Lenis has at least one frame to initialize.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      setIsReady(true);
      // Set global flag BEFORE dispatching event so late-mounting components can check it
      (window as any).__lenisReady = true;
      console.log('[SmoothScroll] lenisReady event dispatched');
      window.dispatchEvent(new CustomEvent('lenisReady'));
    });

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
      // Reset global flag on cleanup (e.g., HMR)
      (window as any).__lenisReady = false;
      lenisInstance.destroy();
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, isReady, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
