import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FoundationItem {
  title: string;
  description: string;
}

const foundations: FoundationItem[] = [
  {
    title: 'Security-first by default',
    description: 'Practical controls for access, encryption, and auditability—built into the product architecture.',
  },
  {
    title: 'Engineered for scale',
    description: 'Built to stay reliable as data grows, teams expand, and workloads become more complex.',
  },
  {
    title: 'Operationally mature',
    description: 'Observability, incident readiness, and maintainability are treated as core features—not add-ons.',
  },
  {
    title: 'Enterprise-ready foundations',
    description: 'Designed for real-world constraints: compliance, governance, and long-term support.',
  },
];

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        const statCards = sectionRef.current?.querySelectorAll('.stat-card');

        // Background parallax
        gsap.to('.stats-bg', {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Stats cards animation - use fromTo to avoid jitter
        if (statCards && statCards.length > 0) {
          gsap.fromTo(statCards,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
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

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="stats-bg absolute inset-0 bg-gradient-to-b from-dark-surface via-dark-bg to-dark-bg"></div>

      {/* Decorative Lines */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold font-display mb-4">
            Built on strong foundations
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AXOBITS focuses on the unglamorous details that make software dependable: security, reliability, and engineering discipline.
          </p>
        </div>

        {/* Foundations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {foundations.map((item, index) => (
            <div
              key={index}
              className="stat-card relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:border-brand-500/20 transition-colors duration-300"
            >
              <div className="relative z-10">
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Prefer a conversation over a sales pitch? Talk to the AXOBITS team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
