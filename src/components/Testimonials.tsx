import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "We build for long-term maintainability: clean interfaces, predictable behavior, and systems that are easy to operate.",
    author: "Engineering",
    role: "What to expect",
    company: "AXOBITS",
    avatar: "EN",
    rating: 5,
  },
  {
    quote: "Security is treated as a baseline: least-privilege access, audit-friendly design, and careful data handling.",
    author: "Security",
    role: "What to expect",
    company: "AXOBITS",
    avatar: "SE",
    rating: 5,
  },
  {
    quote: "AI is used where it matters: automation and insights—without sacrificing reliability or control.",
    author: "Product",
    role: "What to expect",
    company: "AXOBITS",
    avatar: "PR",
    rating: 5,
  },
  {
    quote: "We ship with clarity: measurable outcomes, transparent timelines, and communication that stays honest.",
    author: "Delivery",
    role: "What to expect",
    company: "AXOBITS",
    avatar: "DL",
    rating: 5,
  },
  {
    quote: "Our systems are designed for scale: observability, resilience, and performance-first engineering.",
    author: "Platform",
    role: "What to expect",
    company: "AXOBITS",
    avatar: "PL",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const setupAnimations = () => {
      if (!sectionRef.current) return;

      // Clean up any existing context first
      if (ctx) {
        ctx.revert();
        ctx = null;
      }

      ctx = gsap.context(() => {
        const header = sectionRef.current?.querySelector('.testimonials-header');
        const cards = sectionRef.current?.querySelectorAll('.testimonial-card');

        // Section header reveal - use fromTo to avoid jitter
        if (header) {
          gsap.fromTo(header,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Cards reveal with stagger - use fromTo to avoid jitter
        if (cards && cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 30, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }, sectionRef);
    };

    const handleLayoutReady = () => {
      setupAnimations();
    };

    window.addEventListener('layoutReady', handleLayoutReady);

    // Check if layoutReady already fired
    if ((window as any).__layoutReadyFired) {
      setupAnimations();
    }

    // Safety net: if layoutReady never arrives, set up after 300ms anyway
    const safetyTimeout = window.setTimeout(() => {
      setupAnimations();
    }, 300);

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      clearTimeout(safetyTimeout);
      if (ctx) ctx.revert();
    };
  }, []);

  const navigateTo = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = direction === 'next'
      ? (activeIndex + 1) % testimonials.length
      : (activeIndex - 1 + testimonials.length) % testimonials.length;

    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-black to-dark-bg"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Decorative Quote */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.02]">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium mb-6">
            How we work
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold font-display mb-4">
            Built to feel dependable
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A calm, engineering-led approach to building serious software.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="testimonial-card relative p-8 md:p-12 rounded-3xl bg-dark-card border border-white/10 backdrop-blur-sm">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-8">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 font-semibold text-sm">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigateTo('prev')}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnimating && setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-brand-500' : 'bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateTo('next')}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                disabled={isAnimating}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div ref={sliderRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 group"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400/50 fill-yellow-400/50 group-hover:text-yellow-400 group-hover:fill-yellow-400 transition-colors" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{testimonial.author}</div>
                  <div className="text-gray-500 text-xs">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
