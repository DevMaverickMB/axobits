import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Globe, Cpu, Lock, BarChart3, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Performance-focused software that stays fast as your team and data scale.',
    color: 'text-yellow-400',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Security-first architecture with strong access controls and auditability.',
    color: 'text-emerald-400',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Designed for reliability, observability, and resilient deployments.',
    color: 'text-blue-400',
  },
  {
    icon: Cpu,
    title: 'AI-Assisted',
    description: 'Use AI where it helps: automation, insights, and faster decision-making.',
    color: 'text-brand-400',
  },
  {
    icon: Lock,
    title: 'Zero Trust',
    description: 'Every request is verified. Every action is logged. Built for compliance needs.',
    color: 'text-red-400',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Visibility into performance and usage with actionable reporting.',
    color: 'text-cyan-400',
  },
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const setupAnimations = () => {
      if (!sectionRef.current) return;

      // Clean up any existing context first to avoid stacking animations
      if (ctx) {
        ctx.revert();
        ctx = null;
      }

      ctx = gsap.context(() => {
        const cards = cardsRef.current?.querySelectorAll('.feature-card');

        // Header animation - use fromTo to avoid jitter
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Cards stagger animation - use fromTo to avoid jitter
        if (cards && cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 85%',
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

    // Check if layoutReady already fired (for late-mounting components)
    if ((window as any).__layoutReadyFired) {
      setupAnimations();
    }

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
            Why AXOBITS
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 font-display">
            Built for modern teams
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AXOBITS builds SaaS products that prioritize speed, security, and clarity—so your teams can ship reliably.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-brand-500/20 transition-colors duration-300 overflow-hidden cursor-default"
            >
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <span>Designed for production</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/[0.02] rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
