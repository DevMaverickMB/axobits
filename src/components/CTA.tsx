import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const CTA: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="py-28 relative overflow-hidden flex items-center justify-center min-h-[55vh]" id="contact">
        {/* Background (subtle accent only) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,91,255,0.10)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        
        {/* Animated Particles/Grid Effect (Subtle) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '50px 50px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)' }}></div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            
            {/* Floating Logo Icon */}
            <div className="reveal w-16 h-16 bg-dark-card border border-white/10 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_30px_-12px_rgba(99,91,255,0.35)]">
                 <span className="text-base font-display font-semibold text-white tracking-tight">AX</span>
            </div>

            <h2 className="reveal delay-100 text-4xl md:text-6xl font-semibold mb-6 font-display tracking-tight text-white">
                Work with AXOBITS
            </h2>
            
            <p className="reveal delay-200 text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
                Talk to our team about building or scaling dependable SaaS software—engineering-led, security-aware, and designed to last.
            </p>
            
            <div className="reveal delay-300">
                <button onClick={openModal} className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(99,91,255,0.35)] overflow-hidden">
                    <span className="relative flex items-center gap-2">
                        Request a conversation
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </button>
                <p className="mt-4 text-xs text-gray-600">Response within 1 business day.</p>
            </div>
        </div>
    </section>
  );
};

export default CTA;
