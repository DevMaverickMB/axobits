import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageSquareCode, Map, BarChart3, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  features: string[];
  link: string;
}

const products: Product[] = [
  {
    id: 'vera',
    name: 'Vera AI',
    tagline: 'The intelligent data bridge',
    description: 'Transform how you interact with your databases. Ask questions in plain English and get instant, accurate results. No SQL required.',
    icon: MessageSquareCode,
    color: 'brand',
    gradient: 'from-brand-600 to-purple-600',
    features: ['Natural language queries', 'Multi-database support', 'Real-time insights', 'Secure by design'],
    link: '/products/vera',
  },
  {
    id: 'charioteer',
    name: 'Charioteer',
    tagline: 'Guided experiences, instantly',
    description: 'Create interactive product tours and onboarding flows without writing a single line of code. Boost adoption and reduce support tickets.',
    icon: Map,
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-500',
    features: ['No-code builder', 'Behavior tracking', 'A/B testing', 'Analytics dashboard'],
    link: '/products/charioteer',
  },
  {
    id: 'ledger',
    name: 'AI Ledger',
    tagline: 'Your AI cost command center',
    description: 'Consolidate, track, and optimize your AI subscriptions. Get forecasts, renewal alerts, and vendor comparisons in one place.',
    icon: BarChart3,
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-500',
    features: ['Cost consolidation', 'Usage forecasting', 'Renewal alerts', 'Vendor comparison'],
    link: '/products/ledger',
  },
  {
    id: 'blueprint',
    name: 'Blueprint AI',
    tagline: 'Living documentation',
    description: 'Documentation that writes itself. Keep your codebase documented and up-to-date automatically as your project evolves.',
    icon: FileCode,
    color: 'orange',
    gradient: 'from-orange-600 to-amber-500',
    features: ['Auto-generation', 'Code sync', 'API docs', 'Team collaboration'],
    link: '/products/blueprint',
  },
];

const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const setupAnimations = () => {
      if (!containerRef.current || !scrollerRef.current) return;

      // Clean up any existing context first
      if (ctx) {
        ctx.revert();
        ctx = null;
      }

      ctx = gsap.context(() => {
        // Header parallax - using fromTo for proper reversing
        gsap.fromTo(
          headerRef.current,
          { y: 0, opacity: 1 },
          {
            y: -100,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '20% top',
              scrub: true,
            },
          }
        );

        // Horizontal scroll
        const scrollWidth = scrollerRef.current?.scrollWidth || 0;
        const viewportWidth = window.innerWidth;

        const horizontalScrollTween = gsap.to(scrollerRef.current, {
          x: -(scrollWidth - viewportWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth - viewportWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Individual card animations during scroll
        const cards = scrollerRef.current?.querySelectorAll('.showcase-card');
        cards?.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScrollTween,
                start: 'left 80%',
                end: 'left 20%',
                scrub: true,
              },
            }
          );
        });
      }, containerRef);
    };

    const handleLayoutReady = () => {
      setupAnimations();
    };

    window.addEventListener('layoutReady', handleLayoutReady);

    // Check if layoutReady already fired
    if ((window as any).__layoutReadyFired) {
      setupAnimations();
    }

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      if (ctx) ctx.revert();
    };
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      brand: { bg: 'bg-brand-500/10', text: 'text-brand-400', border: 'border-brand-500/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    };
    return colorMap[color] || colorMap.brand;
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-black to-dark-bg"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Fixed Header */}
      <div ref={headerRef} className="absolute top-20 left-0 w-full z-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium mb-4">
            Product Suite
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-display">
            Our <span className="brand-gradient">Ecosystem</span>
          </h2>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div ref={scrollerRef} className="flex items-center h-full pl-6 md:pl-12 gap-8 pt-40">
        {products.map((product, index) => {
          const colors = getColorClasses(product.color);
          return (
            <div
              key={product.id}
              className="showcase-card shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] h-[500px] relative group"
            >
              <div className={`absolute inset-0 rounded-3xl bg-dark-card border ${colors.border} overflow-hidden transition-all duration-500 hover:border-opacity-60`}>
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <product.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <span className="text-gray-600 text-sm font-mono">0{index + 1}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h3>
                  <p className={`${colors.text} text-sm font-medium mb-4`}>{product.tagline}</p>
                  <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('/10', '')}`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      to={product.link}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${colors.border} ${colors.text} font-medium transition-all duration-300 hover:bg-white/5 group/btn`}
                    >
                      Explore {product.name}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-white/[0.02] to-transparent rounded-full"></div>
              </div>
            </div>
          );
        })}

        {/* End CTA Card */}
        <div className="showcase-card shrink-0 w-[85vw] md:w-[500px] h-[500px] flex items-center justify-center pr-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to explore?</h3>
            <p className="text-gray-400 mb-8">Explore the AXOBITS portfolio and how we build</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-gray-500 text-sm">Scroll to explore</span>
        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-brand-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
