import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'parallax'
  | 'splitText'
  | 'stagger';

interface UseScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  staggerAmount?: number;
  parallaxSpeed?: number;
}

export const useScrollAnimation = <T extends HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const ref = useRef<T>(null);
  const {
    type = 'fadeInUp',
    duration = 1,
    delay = 0,
    start = 'top 85%',
    end = 'bottom 15%',
    scrub = false,
    markers = false,
    staggerAmount = 0.1,
    parallaxSpeed = 0.5,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ctx: gsap.Context | null = null;
    let isSetup = false;

    const setupAnimations = () => {
      if (isSetup || !element) return;
      isSetup = true;

      ctx = gsap.context(() => {
        const getInitialState = () => {
          switch (type) {
            case 'fadeIn':
              return { opacity: 0 };
            case 'fadeInUp':
              return { opacity: 0, y: 60 };
            case 'fadeInDown':
              return { opacity: 0, y: -60 };
            case 'fadeInLeft':
              return { opacity: 0, x: -60 };
            case 'fadeInRight':
              return { opacity: 0, x: 60 };
            case 'scaleIn':
              return { opacity: 0, scale: 0.8 };
            case 'rotateIn':
              return { opacity: 0, rotation: 10 };
            default:
              return { opacity: 0 };
          }
        };

        const getFinalState = () => {
          switch (type) {
            case 'fadeIn':
              return { opacity: 1, duration, delay };
            case 'fadeInUp':
            case 'fadeInDown':
              return { opacity: 1, y: 0, duration, delay, ease: 'power3.out' };
            case 'fadeInLeft':
            case 'fadeInRight':
              return { opacity: 1, x: 0, duration, delay, ease: 'power3.out' };
            case 'scaleIn':
              return { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' };
            case 'rotateIn':
              return { opacity: 1, rotation: 0, duration, delay, ease: 'power2.out' };
            default:
              return { opacity: 1, duration, delay };
          }
        };

        if (type === 'parallax') {
          gsap.to(element, {
            y: () => -window.innerHeight * parallaxSpeed,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              markers,
            },
          });
        } else if (type === 'stagger') {
          const children = element.children;
          // Use fromTo to avoid jitter
          gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger: staggerAmount,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub,
                markers,
              },
            }
          );
        } else {
          // Use fromTo to avoid jitter
          gsap.fromTo(element,
            getInitialState(),
            {
              ...getFinalState(),
              scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub,
                markers,
              },
            }
          );
        }
      }, ref);
    };

    const handleLayoutReady = () => {
      setupAnimations();
    };

    window.addEventListener('layoutReady', handleLayoutReady);

    // Fallback: if layoutReady already fired before this listener was registered,
    // set up animations immediately to avoid blank elements stuck at opacity:0
    if ((window as any).__layoutReadyFired) {
      setupAnimations();
    }

    // Safety net: if layoutReady never arrives (e.g. timing edge case on first
    // navigation), set up animations after 300ms anyway. The isSetup guard
    // prevents double-setup if the event already fired.
    const safetyTimeout = window.setTimeout(() => {
      setupAnimations();
    }, 300);

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      clearTimeout(safetyTimeout);
      if (ctx) ctx.revert();
    };
  }, [type, duration, delay, start, end, scrub, markers, staggerAmount, parallaxSpeed]);

  return ref;
};

// Hook for horizontal scroll sections
export const useHorizontalScroll = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);
  const scrollerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return -(scroller.scrollWidth - window.innerWidth);
      };

      gsap.to(scroller, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scroller.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef, scrollerRef };
};

// Hook for text reveal animations
export const useTextReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Split text into lines
      const text = element.innerHTML;
      const words = text.split(' ');
      element.innerHTML = words.map(word => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`).join(' ');

      const innerSpans = element.querySelectorAll('span > span');

      gsap.to(innerSpans, {
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

// Hook for magnetic effect on elements
export const useMagnetic = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

export default useScrollAnimation;
