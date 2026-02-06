import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

gsap.registerPlugin(ScrollTrigger);

interface EngagementOption {
  title: string;
  description: string;
  highlights: string[];
}

const options: EngagementOption[] = [
  {
    title: 'Product discovery',
    description: 'Clarify scope, define success metrics, and map a plan that engineering teams can execute confidently.',
    highlights: ['Requirements + constraints', 'Architecture direction', 'Milestones and risks'],
  },
  {
    title: 'Build and ship',
    description: 'End-to-end delivery of production-grade software with clear milestones and reviewable outputs.',
    highlights: ['Implementation', 'Testing and QA', 'Deployment readiness'],
  },
  {
    title: 'Long-term partnership',
    description: 'Ongoing improvements, performance work, integrations, and platform hardening as your needs evolve.',
    highlights: ['Roadmap execution', 'Reliability improvements', 'Security and governance'],
  },
];

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal();

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
        // Header animation - use fromTo to avoid jitter
        gsap.fromTo('.pricing-header',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );

        // Cards animation with stagger - use fromTo to avoid jitter
        gsap.fromTo('.pricing-card',
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.pricing-cards',
              start: 'top 80%',
            },
          }
        );
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

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-28 relative overflow-hidden">
      {/* Background (subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-500/8 blur-[220px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
        {/* Header */}
        <div className="pricing-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
            Work with us
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold font-display mb-4">
            A calm way to build
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            AXOBITS PRIVATE LIMITED partners with teams that value reliability and craft. Start with a short conversation and we'll propose a clear plan.
          </p>
        </div>

        {/* Engagement Cards */}
        <div className="pricing-cards grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {options.map((option, index) => (
            <div
              key={index}
              className="pricing-card relative rounded-3xl p-8 flex flex-col bg-dark-card border border-white/5 hover:border-brand-500/20 transition-colors duration-300"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{option.description}</p>
              </div>

              {/* Highlights */}
              <ul className="space-y-3 mb-8 flex-grow">
                {option.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2"></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={openModal}
                className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 group bg-white text-black hover:bg-brand-300 hover:scale-[1.01]"
              >
                Talk to our team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Prefer email? Reach us via the contact form and we'll follow up.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
