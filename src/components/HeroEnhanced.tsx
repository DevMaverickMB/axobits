import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MessageSquareCode, Wallet, Route, Database, ArrowDown } from 'lucide-react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import axobitsDashes from '../assets/Axobiits_Dashes.svg';
import { AuroraBackground } from './ui/aurora-background';

gsap.registerPlugin(ScrollTrigger);

const HeroEnhanced: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const curvedLinesRef = useRef<SVGSVGElement>(null);
  const floatingElement1Ref = useRef<HTMLDivElement>(null);
  const floatingElement2Ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let initialCtx: gsap.Context | null = null;
    let scrollCtx: gsap.Context | null = null;

    // IMMEDIATE: Play initial timeline animations (no delay needed)
    initialCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate icon
      tl.fromTo(iconRef.current,
        { scale: 0, rotation: -45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8 }
      );

      // Animate headline with split text effect
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          '-=0.4'
        );
      }

      // Animate subline
      tl.fromTo(sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Animate interface card
      tl.fromTo(interfaceRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power4.out' },
        '-=0.4'
      );

      // Animate floating elements
      tl.fromTo([floatingElement1Ref.current, floatingElement2Ref.current],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2 },
        '-=0.6'
      );

      // Animate scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // Floating animation for decorative elements (no ScrollTrigger)
      gsap.to(floatingElement1Ref.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(floatingElement2Ref.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll indicator bounce (no ScrollTrigger)
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    // DELAYED: Set up scroll-triggered animations after layoutReady
    const setupScrollAnimations = () => {
      if (!heroRef.current) return;

      // Clean up any existing scroll context first
      if (scrollCtx) {
        scrollCtx.revert();
        scrollCtx = null;
      }

      scrollCtx = gsap.context(() => {
        // Parallax effect on scroll
        gsap.to(interfaceRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Fade out hero content on scroll
        const fadeOutElements = [headlineRef.current, sublineRef.current, iconRef.current];
        fadeOutElements.forEach((el) => {
          if (el) {
            gsap.fromTo(el,
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: -50,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: '20% top',
                  end: '50% top',
                  scrub: true,
                  // markers: true // Debug markers
                },
              }
            );
          }
        });

        // Curved lines animation
        if (curvedLinesRef.current) {
          const paths = curvedLinesRef.current.querySelectorAll('path');
          paths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 2,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top center',
                end: 'center center',
                scrub: 1,
              },
            });
          });
        }
      }, heroRef);
    };

    const handleLayoutReady = () => {
      setupScrollAnimations();
    };

    window.addEventListener('layoutReady', handleLayoutReady);

    // Check if layoutReady already fired
    if ((window as any).__layoutReadyFired) {
      setupScrollAnimations();
    }

    // Safety net: if layoutReady never arrives, set up after 300ms anyway
    const safetyTimeout = window.setTimeout(() => {
      setupScrollAnimations();
    }, 300);

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      clearTimeout(safetyTimeout);
      if (initialCtx) initialCtx.revert();
      if (scrollCtx) scrollCtx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    scrollTo('#products', { duration: 1.5 });
  };

  return (
    <AuroraBackground
      ref={heroRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center pt-60 pb-20 overflow-hidden"
    >

      {/* Background Gradient Orb - Made slightly less intense to blend with Aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      {/* Curved Lines Background */}
      <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
        <svg ref={curvedLinesRef} className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Left Curves */}
          <path d="M-100 900 C 100 900, 400 600, 720 450" stroke="url(#grad1)" strokeWidth="2" strokeOpacity="0.6" />
          <path d="M-100 850 C 120 850, 420 580, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M-100 800 C 150 800, 450 550, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M-100 700 C 200 700, 500 500, 720 450" stroke="url(#grad1)" strokeWidth="1" strokeOpacity="0.15" />

          {/* Right Curves */}
          <path d="M1540 900 C 1340 900, 1040 600, 720 450" stroke="url(#grad1)" strokeWidth="2" strokeOpacity="0.6" />
          <path d="M1540 850 C 1320 850, 1020 580, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M1540 800 C 1290 800, 990 550, 720 450" stroke="url(#grad1)" strokeWidth="1.5" strokeOpacity="0.3" />
          <path d="M1540 700 C 1240 700, 940 500, 720 450" stroke="url(#grad1)" strokeWidth="1" strokeOpacity="0.15" />

          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B0D12" stopOpacity="0" />
              <stop offset="50%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#0B0D12" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Top Icon */}
        <div ref={iconRef} className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-dark-card border border-white/10 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(99,91,255,0.35)] hover:rotate-[10deg] transition-transform duration-500">
            <img src={axobitsDashes} alt="Axobits Logo" className="w-8 h-8" />
          </div>
        </div>

        {/* Main Headline with Word Animation */}
        <h1 ref={headlineRef} className="relative z-20 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 font-display overflow-hidden py-4">
          <span className="word inline-block">Software</span>{' '}
          <span className="word inline-block">done</span>{' '}
          <span className="word inline-block">right.</span>
          {/* <br className="hidden lg:block" /> */}
          {/* <span className="word inline-block text-gray-300">Ship with confidence.</span> */}
        </h1>

        <p ref={sublineRef} className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          Thoughtfully designed SaaS and AI products for teams that care about quality.
        </p>

        {/* Central Interface Visual */}
        <div ref={interfaceRef} className="relative w-full max-w-[420px] perspective-1000">
          {/* The "Phone/Card" Container */}
          <div className="relative bg-dark-card border border-white/10 rounded-[2rem] p-4 hero-interface-container backdrop-blur-sm transform-gpu hover:scale-[1.02] transition-transform duration-500">

            {/* Search Bar / Header */}
            <div className="flex items-center justify-between bg-white/5 rounded-full px-5 py-4 mb-6 border border-white/5 group hover:border-brand-500/25 transition-colors duration-300">
              <span className="text-sm text-gray-300 font-medium">Axobits Console — connect systems</span>
              <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/40 transition-colors">
                <Sparkles className="w-4 h-4 text-brand-300" />
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="space-y-3">

              {/* Card 1: Vera AI */}
              <div className="p-4 rounded-2xl bg-[#10131A] border border-white/5 flex items-center gap-4 hover:bg-[#131722] hover:border-brand-500/20 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 group-hover:bg-brand-500/15 transition-all duration-300">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">Data Assist</div>
                  <div className="text-xs text-gray-500">Secure query routed to warehouse</div>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              {/* Card 2: AI Ledger */}
              <div className="p-4 rounded-2xl bg-[#10131A] border border-white/5 flex items-center gap-4 hover:bg-[#131722] hover:border-brand-500/20 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-300">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">Cost Insights</div>
                  <div className="text-xs text-gray-500">Budgets, renewals, and vendor usage</div>
                </div>
              </div>

              {/* Card 3: Charioteer */}
              <div className="p-4 rounded-2xl bg-[#10131A] border border-white/5 flex items-center gap-4 hover:bg-[#131722] hover:border-brand-500/20 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-300">
                  <Route className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">Onboarding</div>
                  <div className="text-xs text-gray-500">Guided experiences for product adoption</div>
                </div>
              </div>

            </div>

            {/* Glow Behind */}
            <div className="absolute -inset-1 bg-gradient-to-b from-brand-500/12 to-transparent rounded-[2rem] -z-10 blur-xl"></div>
          </div>

          {/* Floating Decor Elements */}
          <div ref={floatingElement1Ref} className="hidden md:flex absolute top-10 -right-28 bg-dark-card/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full items-center gap-2 text-xs shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Docs Generated
          </div>
          <div ref={floatingElement2Ref} className="hidden md:flex absolute bottom-20 -left-24 bg-dark-card/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full items-center gap-2 text-xs shadow-lg">
            <Database className="w-3 h-3 text-brand-400" />
            Systems Connected
          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer" onClick={handleScrollDown}>
        <div className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroEnhanced;
