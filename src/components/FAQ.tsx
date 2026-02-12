import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does AXOBITS PRIVATE LIMITED do?",
    answer: "AXOBITS PRIVATE LIMITED builds SaaS products and internal platforms for modern teams. We focus on reliable, secure, and maintainable software—using AI where it adds real leverage without adding risk.",
  },
  {
    question: "What kind of projects do you take on?",
    answer: "We build and ship production-grade software: SaaS products, enterprise integrations, automation systems, analytics layers, and AI-assisted workflows. If it needs to be dependable and scalable, it fits.",
  },
  {
    question: "How do you handle security and data privacy?",
    answer: "We design for least-privilege access, encryption, auditability, and clear data boundaries. We align implementation choices with your requirements and work within your security posture and compliance constraints.",
  },
  {
    question: "Do you support integrations with existing tools?",
    answer: "Yes. We integrate with common stacks like AWS/Azure/GCP, PostgreSQL/MySQL, Slack, Microsoft 365, Google Workspace, and internal APIs. We keep integrations robust with proper monitoring and failure handling.",
  },
  {
    question: "How do we start working together?",
    answer: "Start with a short call to understand your goals and constraints. Then we propose a scoped plan (timeline, deliverables, and success criteria). If it's a fit, we execute with weekly progress and clear accountability.",
  },
  {
    question: "What does delivery look like?",
    answer: "We work in milestones with clear acceptance criteria. You get predictable communication, reviewable outputs, and software that's ready for production environments.",
  },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        gsap.fromTo('.faq-header',
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

        // FAQ items animation - use fromTo to avoid jitter
        gsap.fromTo('.faq-item',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.faq-list',
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">

      <div className="max-w-4xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
        {/* Header */}
        <div className="faq-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm font-medium mb-6">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold font-display mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Quick answers about AXOBITS and how we build.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item rounded-2xl bg-dark-card border border-white/5 overflow-hidden transition-colors duration-300 hover:border-white/10"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="text-white font-medium text-lg pr-8 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index
                  ? 'bg-brand-500 text-white rotate-0'
                  : 'bg-white/5 text-gray-400 rotate-0'
                  }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="h-px w-full bg-white/5 mb-4"></div>
                  <p className="text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-dark-card border border-white/10">
          <p className="text-white font-medium mb-2">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-6">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-brand-300 transition-colors"
          >
            Contact AXOBITS
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
